import graphene

from .types import Shop


class ShopQueries(graphene.ObjectType):
    shop = graphene.Field(
        Shop, description="Return information about the shop.", required=True
    )

    @staticmethod
    def resolve_shop(self, _info):
        return Shop()
