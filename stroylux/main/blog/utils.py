from django.db import transaction
from typing import List


@transaction.atomic
def delete_blog(blog_ids: List[str]):
    """Delete blog and perform all necessary actions."""
    from .models import Blog

    Blog.objects.select_for_update().filter(pk__in=blog_ids).delete()


@transaction.atomic
def delete_blog_categories(ids: List[str]):
    """Delete blog categories and perform all necessary actions."""
    from .models import BlogCategory

    BlogCategory.objects.select_for_update().filter(pk__in=ids).delete()


@transaction.atomic
def delete_blog_articles(ids: List[str]):
    """Delete blog articles and perform all necessary actions."""
    from .models import BlogArticle

    BlogArticle.objects.select_for_update().filter(pk__in=ids).delete()
