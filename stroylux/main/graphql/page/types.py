from graphene import relay

from ...page import models
from ..core.connection import CountableDjangoObjectType


class Page(CountableDjangoObjectType):

    class Meta:
        description = (
            "A static page that can be manually added by a shop operator through the "
            "dashboard."
        )
        only_fields = [
            "content",
            "content_json",
            "created",
            "id",
            "is_published",
            "publication_date",
            "slug",
            "title",
        ]
        interfaces = [relay.Node]
        model = models.Page
