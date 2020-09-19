from django.db import models
from django.db.models import Sum, Q
from mptt.models import MPTTModel
from versatileimagefield.fields import VersatileImageField

from . import ArticleStatus, ArticleCommentStatus
from .. import settings
from ..account.models import User
from ..core.permissions import BlogPermissions


class BlogSubscriber(models.Model):
    email = models.EmailField(unique=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, default=None, related_name='blog_subscribe')
    confirmed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.email} {'(not confirmed)' if self.confirmed else ''}"


class BlogCategoryQueryset(models.QuerySet):

    def published(self):
        return self.filter(is_published=True)

    @staticmethod
    def user_has_access_to_all(user):
        return user.is_active and user.has_perm(BlogPermissions.MANAGE_BLOG)

    def visible_to_user(self, user):
        if self.user_has_access_to_all(user):
            return self.all()
        return self.published()


class BlogCategory(MPTTModel):
    name = models.CharField(max_length=30)
    sort_order = models.IntegerField(null=True)
    slug = models.SlugField(max_length=30, default="", blank=False,
                            null=False, unique=True)
    image = VersatileImageField(
        upload_to='blog/categories', max_length=255, default=None, null=True)
    description = models.TextField()
    is_published = models.BooleanField(default=True)
    parent = models.ForeignKey(
        'self', null=True, blank=True, related_name='children',
        on_delete=models.CASCADE)

    objects = BlogCategoryQueryset.as_manager()

    class Meta:
        app_label = "blog"
        ordering = ("sort_order",)
        permissions = (
            (BlogPermissions.MANAGE_BLOG.codename, "Manage blog."),
        )

    def __str__(self):
        return self.name

    @property
    def image_url(self):
        return '%s%s' % (settings.MEDIA_URL, self.image.name)


class BlogArticleQueryset(models.QuerySet):

    def published(self, user):
        if user.is_authenticated:
            return self.filter(Q(is_published=True) | Q(author=user),
                               category__is_published=True
                               )
        return self.filter(is_published=True,
                           category__is_published=True
                           )

    @staticmethod
    def user_has_access_to_all(user):
        return user.is_active and user.has_perm(BlogPermissions.MANAGE_BLOG)

    def visible_to_user(self, user):
        if self.user_has_access_to_all(user):
            return self.all()
        return self.published(user)


class BlogArticle(models.Model):
    body = models.TextField()
    subtitle = models.CharField(max_length=150, blank=True)
    keywords = models.CharField(max_length=50, blank=True)
    title = models.CharField(max_length=128)
    slug = models.SlugField(max_length=128, default="", blank=False,
                            null=False, unique=True)
    image = VersatileImageField(
        upload_to='blog/articles', max_length=255, default=None, null=True)
    tags = models.CharField(max_length=50, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    date_published = models.DateTimeField(null=True)
    is_published = models.BooleanField(default=True)
    category = models.ForeignKey(BlogCategory, on_delete=models.CASCADE, related_name='articles')
    author = models.ForeignKey(User, related_name='articles', on_delete=models.SET_NULL, null=True)
    status = models.CharField(choices=ArticleStatus.CHOICES,
                              max_length=15,
                              default=ArticleStatus.DRAFT)

    objects = BlogArticleQueryset.as_manager()

    class Meta:
        app_label = "blog"
        ordering = ("-date_added",)

    def __str__(self):
        return self.title

    @property
    def image_url(self):
        return '%s%s' % (settings.MEDIA_URL, self.image.name)

    @property
    def average_rating(self):
        rating = self.blogarticlemeasure_set.aggregate(Sum('value'))
        return rating['value__sum'] or 0


class ArticleComment(models.Model):
    article = models.ForeignKey(BlogArticle, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=300)
    date_added = models.DateTimeField(auto_now_add=True)
    status = models.CharField(choices=ArticleCommentStatus.CHOICES,
                              max_length=15,
                              default=ArticleCommentStatus.HIDDEN)

    @property
    def average_rating(self):
        rating = self.blogcommentmeasure_set.aggregate(Sum('value'))
        return rating['value__sum'] or 0


COMMENT_VALUES = [
    (1, 'Like'),
    (0, 'Empty'),
    (-1, 'Dislike')
]


class BlogArticleMeasure(models.Model):
    value = models.IntegerField(choices=COMMENT_VALUES, default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article = models.ForeignKey(BlogArticle, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'article'], name='unique_user_article')
        ]


class BlogCommentMeasure(models.Model):
    value = models.IntegerField(choices=COMMENT_VALUES, default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    article_comment = models.ForeignKey(ArticleComment, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user', 'article_comment'], name='unique_user_article_comment')
        ]
