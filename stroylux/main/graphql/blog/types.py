import graphene
import graphene_django_optimizer
from graphene import relay
from graphene_federation import key

from main.blog import models
from .filters import BlogCategoryFilterInput
from .sorters import BlogCategoryOrder
from ..core.connection import CountableDjangoObjectType
from main.graphql.core.types.common import Image
from main.product.templatetags.product_images import get_thumbnail
from ..core.fields import FilterInputConnectionField


@key(fields="id")
@key(fields="slug")
class BlogType(CountableDjangoObjectType):
    thumbnail = graphene.Field(
        Image,
        description="The main thumbnail for a blog.",
        size=graphene.Argument(graphene.Int, description="Size of thumbnail."),
    )

    # categories = graphene_django_optimizer.field(FilterInputConnectionField(
    #     lambda: BlogCategoryType,
    #     filter=BlogCategoryFilterInput(description="Filtering options for blog category list."),
    #     sort_by=BlogCategoryOrder(description="Sort blog category list."),
    #     ids=graphene.List(
    #         graphene.ID, description="Filter blog category list by given IDs."
    #     ),
    #     description="List of the shop's blog category.",
    # ),
    #     model_field='categories'
    # )

    class Meta:
        description = "Represents a blog of a given type."
        interfaces = [relay.Node]
        model = models.Blog
        filter_fields = ["id"]
        only_fields = [
            "id",
            "name",
            "slug",
            "description",
            "is_published",
            "categories"
        ]

    @staticmethod
    @graphene_django_optimizer.resolver_hints(only=["image"])
    def resolve_thumbnail(root: models.Blog, info, *, size=255):
        url = get_thumbnail(root.image, size, method="thumbnail")
        return Image(alt=root.name, url=info.context.build_absolute_uri(url))


@key(fields="id")
@key(fields="slug")
class BlogCategoryType(CountableDjangoObjectType):
    thumbnail = graphene.Field(
        Image,
        description="The main thumbnail for a blog category.",
        size=graphene.Argument(graphene.Int, description="Size of thumbnail."),
    )

    class Meta:
        description = "Represents a blog category of a given type."
        interfaces = [relay.Node]
        model = models.BlogCategory
        filter_fields = ["id"]
        only_fields = [
            "id",
            "name",
            "slug",
            "description",
            "is_published"
        ]

    @staticmethod
    @graphene_django_optimizer.resolver_hints(only=["image"])
    def resolve_thumbnail(root: models.Blog, info, *, size=255):
        url = get_thumbnail(root.image, size, method="thumbnail")
        return Image(alt=root.name, url=info.context.build_absolute_uri(url))


@key(fields="id")
@key(fields="slug")
class BlogArticleType(CountableDjangoObjectType):
    thumbnail = graphene.Field(
        Image,
        description="The main thumbnail for a blog article.",
        size=graphene.Argument(graphene.Int, description="Size of thumbnail."),
    )

    class Meta:
        description = "Represents a blog article of a given type."
        interfaces = [relay.Node]
        model = models.BlogArticle
        filter_fields = ["id"]
        only_fields = [
            "id",
            "title",
            "slug",
            "body",
            "is_published"
        ]

    @staticmethod
    @graphene_django_optimizer.resolver_hints(only=["image"])
    def resolve_thumbnail(root: models.Blog, info, *, size=255):
        url = get_thumbnail(root.image, size, method="thumbnail")
        return Image(alt=root.name, url=info.context.build_absolute_uri(url))
