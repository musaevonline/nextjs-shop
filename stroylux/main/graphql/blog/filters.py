import django_filters

from main.blog.models import Blog, BlogCategory, BlogArticle
from main.graphql.core.types import FilterInputObjectType


class BlogFilter(django_filters.FilterSet):
    class Meta:
        model = Blog
        fields = [
            "is_published",
            "slug",
            "name"
        ]


class BlogFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = BlogFilter


class BlogCategoryFilter(django_filters.FilterSet):
    class Meta:
        model = BlogCategory
        fields = [
            "is_published",
            "slug",
            "name",
            "blog"
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
            "category__blog"
        ]


class BlogArticleFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = BlogArticleFilter
