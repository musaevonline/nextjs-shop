import graphene

from ...core.permissions import ShippingPermissions
from ...shipping import models
from ..core.mutations import ModelBulkDeleteMutation
from ..core.types.common import ShippingError


class ShippingMethodBulkDelete(ModelBulkDeleteMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID,
            required=True,
            description="List of shipping method IDs to delete.",
        )

    class Meta:
        description = "Deletes shipping prices."
        model = models.ShippingMethod
        permissions = (ShippingPermissions.MANAGE_SHIPPING,)
        error_type_class = ShippingError
        error_type_field = "shipping_errors"