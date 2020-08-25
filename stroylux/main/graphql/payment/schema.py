import graphene

from ...core.permissions import OrderPermissions
from ..core.fields import PrefetchingConnectionField
from ..decorators import permission_required
from .mutations import PaymentCapture, PaymentRefund, PaymentSecureConfirm, PaymentVoid
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
    payment_methods = PrefetchingConnectionField(PaymentMethod, description="List of payment methods.")

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payment(self, info, **data):
        return graphene.Node.get_node_from_global_id(info, data.get("id"), Payment)

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_payments(self, info, query=None, **_kwargs):
        return resolve_payments(info, query)

    @staticmethod
    def resolve_payment_methods(self, info, query=None, **_kwargs):
        return resolve_payment_methods(info, query)


class PaymentMutations(graphene.ObjectType):
    payment_capture = PaymentCapture.Field()
    payment_refund = PaymentRefund.Field()
    payment_void = PaymentVoid.Field()
    payment_secure_confirm = PaymentSecureConfirm.Field()