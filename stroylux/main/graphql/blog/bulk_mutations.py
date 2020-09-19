import graphene

from main.blog.models import BlogCategory, BlogArticle
from main.blog.utils import delete_blog_categories, delete_blog_articles
from main.core.permissions import BlogPermissions
from main.graphql.core.mutations import ModelBulkDeleteMutation
from main.graphql.core.types.common import BlogError


class BlogCategoryBulkDelete(ModelBulkDeleteMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID, required=True, description="List of blog category IDs to delete."
        )

    class Meta:
        description = "Deletes blog categories."
        model = BlogCategory
        permissions = (BlogPermissions.MANAGE_BLOG,)
        error_type_class = BlogError
        error_type_field = "blog_errors"

    @classmethod
    def bulk_action(cls, queryset):
        delete_blog_categories(queryset.values_list("pk", flat=True))


class BlogArticleBulkDelete(ModelBulkDeleteMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID, required=True, description="List of blog article IDs to delete."
        )

    class Meta:
        description = "Deletes blog articles."
        model = BlogArticle
        permissions = (BlogPermissions.MANAGE_BLOG,)
        error_type_class = BlogError
        error_type_field = "blog_errors"

    @classmethod
    def bulk_action(cls, queryset):
        delete_blog_articles(queryset.values_list("pk", flat=True))
