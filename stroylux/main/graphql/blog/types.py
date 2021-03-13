import graphene
import graphene_django_optimizer
from graphene import relay
from graphene_federation import key

from main.blog import models
from main.graphql.core.types.common import Image
from main.product.templatetags.product_images import get_thumbnail
from ..core.connection import CountableDjangoObjectType
from ..core.enums import VersatileImageMethod
from ...core.utils import build_absolute_uri


@key(fields="id")
@key(fields="slug")
class BlogCategoryType(CountableDjangoObjectType):
    thumbnail = graphene.Field(
        Image,
        description="The main thumbnail for a blog category.",
        size=graphene.String(description="Size of thumbnail. Default 800x450"),
        method=graphene.Argument(VersatileImageMethod, description="VersatileImageMethod")
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
            "is_published",
            "articles"
        ]

    @staticmethod
    @graphene_django_optimizer.resolver_hints(only=["image"])
    def resolve_thumbnail(root: models.BlogCategory, info, size='800x450', method='crop_webp'):
        url = get_thumbnail(root.image, size, method=method, rendition_key_set='blog')
        return Image(alt=root.name, url=build_absolute_uri(url))


@key(fields="id")
@key(fields="slug")
class BlogArticleType(CountableDjangoObjectType):
    thumbnail = graphene.Field(
        Image,
        description="The main thumbnail for a blog article.",
        size=graphene.String(description="Size of thumbnail. Default 800x450"),
        method=graphene.Argument(VersatileImageMethod, description="VersatileImageMethod")
    )
    author_name = graphene.String()

    class Meta:
        description = "Represents a blog article of a given type."
        interfaces = [relay.Node]
        model = models.BlogArticle
        filter_fields = ["id"]
        only_fields = [
            "id",
            "title",
            "subtitle",
            "keywords",
            "tags",
            "status",
            "slug",
            "body",
            "is_published",
            "date_added",
            "date_published",
            "category"
        ]

    @graphene_django_optimizer.resolver_hints(only=["image"])
    def resolve_thumbnail(self: models.BlogArticle, info, size='800x450', method='crop_webp'):
        url = get_thumbnail(self.image, size, method=method, rendition_key_set='blog')
        return Image(alt=self.title, url=build_absolute_uri(url))

    @graphene_django_optimizer.resolver_hints(select_related=["author"])
    def resolve_author_name(self: models.BlogArticle, info):
        return self.author.get_full_name()
