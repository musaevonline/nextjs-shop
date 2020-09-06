import graphene

from ...core.permissions import OrderPermissions
from ...payment import models
from ..core.mutations import ModelBulkDeleteMutation
from ..core.types.common import PaymentError


class PaymentMethodBulkDelete(ModelBulkDeleteMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID,
            required=True,
            description="List of payment method IDs to delete.",
        )

    class Meta:
        description = "Deletes payment prices."
        model = models.PaymentMethod
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = PaymentError
        error_type_field = "payment_errors"