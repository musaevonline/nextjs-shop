import graphene

from .mutations import CheckoutEmailUpdate, CheckoutLinesAdd, CheckoutCreate, CheckoutLineDelete, CheckoutLinesUpdate, \
    CheckoutCustomerAttach, CheckoutCustomerDetach, CheckoutShippingAddressUpdate, CheckoutShippingMethodUpdate, \
    CheckoutComplete
from .resolvers import resolve_checkout, resolve_checkouts, resolve_checkout_lines
from .types import Checkout, CheckoutLine
from ..core.fields import BaseDjangoConnectionField, PrefetchingConnectionField
from ..decorators import permission_required
from ..payment.mutations import CheckoutPaymentCreate
from ...core.permissions import CheckoutPermissions


class CheckoutQueries(graphene.ObjectType):
    checkout = graphene.Field(
        Checkout,
        description="Look up a checkout by token.",
        token=graphene.Argument(graphene.UUID, description="The checkout's token."),
    )
    # FIXME we could optimize the below field
    checkouts = BaseDjangoConnectionField(Checkout, description="List of checkouts.")
    checkout_line = graphene.Field(
        CheckoutLine,
        id=graphene.Argument(graphene.ID, description="ID of the checkout line."),
        description="Look up a checkout line by ID.",
    )
    checkout_lines = PrefetchingConnectionField(
        CheckoutLine, description="List of checkout lines."
    )

    def resolve_checkout(self, info, token=None):
        return resolve_checkout(info, token)

    @permission_required(CheckoutPermissions.MANAGE_CHECKOUTS)
    def resolve_checkouts(self, *_args, **_kwargs):
        resolve_checkouts()

    def resolve_checkout_line(self, info, id):
        return graphene.Node.get_node_from_global_id(info, id, CheckoutLine)

    @permission_required(CheckoutPermissions.MANAGE_CHECKOUTS)
    def resolve_checkout_lines(self, *_args, **_kwargs):
        return resolve_checkout_lines()


class CheckoutMutations(graphene.ObjectType):
    checkout_complete = CheckoutComplete.Field()
    checkout_create = CheckoutCreate.Field()
    checkout_customer_attach = CheckoutCustomerAttach.Field()
    checkout_customer_detach = CheckoutCustomerDetach.Field()
    checkout_email_update = CheckoutEmailUpdate.Field()
    checkout_lines_add = CheckoutLinesAdd.Field()
    checkout_line_delete = CheckoutLineDelete.Field()
    checkout_lines_update = CheckoutLinesUpdate.Field()
    checkout_payment_create = CheckoutPaymentCreate.Field()
    checkout_shipping_address_update = CheckoutShippingAddressUpdate.Field()
    checkout_shipping_method_update = CheckoutShippingMethodUpdate.Field()