import django_filters

from main.blog.models import BlogCategory, BlogArticle
from main.graphql.core.types import FilterInputObjectType
from main.graphql.utils import filter_by_query_param


def filter_fields_containing_value(*search_fields: str):
    """Create a icontains filters through given fields on a given query set object."""

    def _filter_qs(qs, _, value):
        if value:
            qs = filter_by_query_param(qs, value, search_fields)
        return qs

    return _filter_qs


class BlogCategoryFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(
        method=filter_fields_containing_value("slug", "name", "description")
    )

    class Meta:
        model = BlogCategory
        fields = [
            "is_published",
            "slug",
            "name",
            "search"
        ]


class BlogCategoryFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = BlogCategoryFilter


class BlogArticleFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(
        method=filter_fields_containing_value("slug", "title", "body")
    )

    class Meta:
        model = BlogArticle
        fields = [
            "is_published",
            "slug",
            "title",
            "category",
            "category__slug",
            "search"
        ]


class BlogArticleFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = BlogArticleFilter
