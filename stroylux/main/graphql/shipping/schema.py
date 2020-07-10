import graphene
from ..core.fields import PrefetchingConnectionField
from .bulk_mutations import ShippingPriceBulkDelete
from .mutations import (
    ShippingPriceCreate,
    ShippingPriceDelete,
    ShippingPriceUpdate
)
from .resolvers import resolve_shipping_methods
from .types import ShippingMethod
from ..decorators import permission_required
from ...core.permissions import ShippingPermissions


class ShippingQueries(graphene.ObjectType):
    shipping_method = graphene.Field(
        ShippingMethod,
        id=graphene.Argument(
            graphene.ID, description="ID of the shipping zone.", required=True
        ),
        description="Look up a shipping zone by ID.",
    )
    shipping_methods = PrefetchingConnectionField(
        ShippingMethod, description="List of the shop's shipping zones."
    )

    @permission_required(ShippingPermissions.MANAGE_SHIPPING)
    def resolve_shipping_method(self, info, id):
        return graphene.Node.get_node_from_global_id(info, id, ShippingMethod)

    @permission_required(ShippingPermissions.MANAGE_SHIPPING)
    def resolve_shipping_methods(self, info, **_kwargs):
        return resolve_shipping_methods(info)


class ShippingMutations(graphene.ObjectType):
    shipping_price_create = ShippingPriceCreate.Field()
    shipping_price_delete = ShippingPriceDelete.Field()
    shipping_price_bulk_delete = ShippingPriceBulkDelete.Field()
    shipping_price_update = ShippingPriceUpdate.Field()
