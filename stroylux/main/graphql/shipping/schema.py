import graphene
from ..core.fields import PrefetchingConnectionField
from .bulk_mutations import ShippingMethodBulkDelete
from .mutations import ShippingMethodCreate, ShippingMethodDelete, ShippingMethodUpdate
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
    shipping_method_create = ShippingMethodCreate.Field()
    shipping_method_delete = ShippingMethodDelete.Field()
    shipping_method_bulk_delete = ShippingMethodBulkDelete.Field()
    shipping_method_update = ShippingMethodUpdate.Field()
