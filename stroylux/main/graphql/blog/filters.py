import django_filters

from main.blog.models import BlogCategory, BlogArticle
from main.graphql.core.types import FilterInputObjectType


class BlogCategoryFilter(django_filters.FilterSet):
    class Meta:
        model = BlogCategory
        fields = [
            "is_published",
            "slug",
            "name"
        ]


class BlogCategoryFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = BlogCategoryFilter


class BlogArticleFilter(django_filters.FilterSet):
    class Meta:
        model = BlogArticle
        fields = [
            "is_published",
            "slug",
            "title",
            "category",
            "category__slug"
        ]


class BlogArticleFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = BlogArticleFilter
