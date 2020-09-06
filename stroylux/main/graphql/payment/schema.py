import graphene

from .bulk_mutations import PaymentMethodBulkDelete
from ...core.permissions import OrderPermissions
from ..core.fields import PrefetchingConnectionField
from ..decorators import permission_required
from .mutations import PaymentCapture, PaymentRefund, PaymentSecureConfirm, PaymentVoid, PaymentMethodCreate, \
    PaymentMethodDelete, PaymentMethodUpdate
from .resolvers import resolve_payments, resolve_payment_methods
from .types import Payment, PaymentMethod


class PaymentQueries(graphene.ObjectType):
    payment = graphene.Field(
        Payment,
        description="Look up a payment by ID.",
        id=graphene.Argument(
            graphene.ID, description="ID of the payment.", required=True
        ),
    )
    payments = PrefetchingConnectionField(Payment, description="List of payments.")
    payment_method = graphene.Field(
        PaymentMethod,
        description="Look up a payment method by ID.",
        id=graphene.Argument(
            graphene.ID, description="ID of the payment method.", required=True
        ),
    )
    payment_methods = PrefetchingConnectionField(PaymentMethod, description="List of payment methods.")

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payment(self, info, **data):
        return graphene.Node.get_node_from_global_id(info, data.get("id"), Payment)

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payments(self, info, query=None, **_kwargs):
        return resolve_payments(info, query)

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payment_method(self, info, **data):
        return graphene.Node.get_node_from_global_id(info, data.get("id"), PaymentMethod)

    @staticmethod
    def resolve_payment_methods(self, info, query=None, **_kwargs):
        return resolve_payment_methods(info, query)


class PaymentMutations(graphene.ObjectType):
    payment_capture = PaymentCapture.Field()
    payment_refund = PaymentRefund.Field()
    payment_void = PaymentVoid.Field()
    payment_secure_confirm = PaymentSecureConfirm.Field()

    payment_method_create = PaymentMethodCreate.Field()
    payment_method_delete = PaymentMethodDelete.Field()
    payment_method_bulk_delete = PaymentMethodBulkDelete.Field()
    payment_method_update = PaymentMethodUpdate.Field()
