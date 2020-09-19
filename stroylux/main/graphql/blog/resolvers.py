import graphene
import graphene_django_optimizer

from main.blog.models import BlogCategory, BlogArticle
from main.graphql.blog.types import BlogCategoryType, BlogArticleType
from main.graphql.utils import get_database_id


def resolve_blog_category(info, id=None, slug=None):
    if id:
        return graphene.Node.get_node_from_global_id(info, id, BlogCategoryType)
    if slug:
        return graphene_django_optimizer.query(BlogCategory.objects.filter(slug=slug), info).first()
    return None


def resolve_blog_category_list(info, ids, **_kwargs):
    user = info.context.user
    qs = BlogCategory.objects.visible_to_user(user)

    qs = qs.distinct()

    if ids:
        db_ids = [get_database_id(info, node_id, BlogCategoryType) for node_id in ids]
        qs = qs.filter(pk__in=db_ids)

    return graphene_django_optimizer.query(qs, info)


def resolve_blog_article(info, id=None, slug=None):
    if id:
        return graphene.Node.get_node_from_global_id(info, id, BlogArticleType)
    if slug:
        return graphene_django_optimizer.query(BlogArticle.objects.filter(slug=slug), info).first()
    return None


def resolve_blog_article_list(info, ids, **_kwargs):
    user = info.context.user
    qs = BlogArticle.objects.visible_to_user(user)

    qs = qs.distinct()

    if ids:
        db_ids = [get_database_id(info, node_id, BlogArticleType) for node_id in ids]
        qs = qs.filter(pk__in=db_ids)

    return graphene_django_optimizer.query(qs, info)
