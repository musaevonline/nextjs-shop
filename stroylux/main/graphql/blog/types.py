import graphene
import graphene_django_optimizer
from graphene import relay
from graphene_federation import key

from main.blog import models
from main.graphql.core.types.common import Image
from main.product.templatetags.product_images import get_thumbnail
from ..core.connection import CountableDjangoObjectType


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
            "is_published",
            "articles"
        ]

    @staticmethod
    @graphene_django_optimizer.resolver_hints(only=["image"])
    def resolve_thumbnail(root: models.BlogCategory, info, *, size=255):
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
    def resolve_thumbnail(self: models.BlogArticle, info, *, size=255):
        url = get_thumbnail(self.image, size, method="thumbnail")
        return Image(alt=self.title, url=info.context.build_absolute_uri(url))

    @graphene_django_optimizer.resolver_hints(select_related=["author"])
    def resolve_author_name(self: models.BlogArticle, info):
        return self.author.get_full_name()
