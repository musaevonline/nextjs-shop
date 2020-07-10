import graphene
from graphql_jwt.exceptions import PermissionDenied
from promise import Promise

from ...checkout import models
from ...checkout.base_calculations import base_checkout_line_total
from ...checkout.utils import get_valid_shipping_methods_for_checkout
from ...core.permissions import AccountPermissions, CheckoutPermissions
from ...core.taxes import display_gross_prices, zero_taxed_money, zero_money
from ..core.connection import CountableDjangoObjectType
from ..core.types.money import TaxedMoney
from ..decorators import permission_required
from ..shipping.types import ShippingMethod
from .dataloaders import CheckoutLinesByCheckoutTokenLoader


class CheckoutLine(CountableDjangoObjectType):
    total_price = graphene.Field(
        TaxedMoney,
        description="The sum of the checkout line price, taxes and discounts.",
    )
    requires_shipping = graphene.Boolean(
        description="Indicates whether the item need to be delivered."
    )

    class Meta:
        only_fields = ["id", "quantity", "variant"]
        description = "Represents an item in the checkout."
        interfaces = [graphene.relay.Node]
        model = models.CheckoutLine
        filter_fields = ["id"]

    @staticmethod
    def resolve_total_price(self, info):
        return base_checkout_line_total(self)

    @staticmethod
    def resolve_requires_shipping(root: models.CheckoutLine, *_args):
        return root.is_shipping_required()


class Checkout(CountableDjangoObjectType):
    available_shipping_methods = graphene.List(
        ShippingMethod,
        required=False,
        description="Shipping methods that can be used with this order.",
    )
    email = graphene.String(description="Email of a customer.", required=True)
    is_shipping_required = graphene.Boolean(
        description="Returns True, if checkout requires shipping.", required=True
    )
    lines = graphene.List(
        CheckoutLine,
        description=(
            "A list of checkout lines, each containing information about "
            "an item in the checkout."
        ),
    )
    shipping_price = graphene.Field(
        TaxedMoney,
        description="The price of the shipping, with all the taxes included.",
    )
    subtotal_price = graphene.Field(
        TaxedMoney,
        description="The price of the checkout before shipping, with taxes included.",
    )
    total_price = graphene.Field(
        TaxedMoney,
        description=(
            "The sum of the the checkout line prices, with all the taxes,"
            "shipping costs, and discounts included."
        ),
    )

    class Meta:
        only_fields = [
            "created",
            "is_shipping_required",
            "last_change",
            "note",
            "quantity",
            "shipping_address",
            "shipping_method",
            "token",
            "user",
        ]
        description = "Checkout object."
        model = models.Checkout
        interfaces = [graphene.relay.Node,]
        filter_fields = ["token"]

    @staticmethod
    def resolve_user(root: models.Checkout, info):
        user = info.context.user
        if user == root.user or user.has_perm(AccountPermissions.MANAGE_USERS):
            return root.user
        raise PermissionDenied()

    @staticmethod
    def resolve_email(root: models.Checkout, info):
        return root.get_customer_email()

    @staticmethod
    def resolve_total_price(root: models.Checkout, info):
        return root.get_total()

    @staticmethod
    def resolve_subtotal_price(root: models.Checkout, info):
        return root.get_subtotal()

    @staticmethod
    def resolve_shipping_price(root: models.Checkout, info):
        return root.get_shipping_price()

    @staticmethod
    def resolve_lines(root: models.Checkout, *_args):
        return root.lines.prefetch_related("variant")

    @staticmethod
    def resolve_available_shipping_methods(root: models.Checkout, info):
        # lines = CheckoutLinesByCheckoutTokenLoader(info.context).load(root.token)
        valid_methods = get_valid_shipping_methods_for_checkout(root, root.lines.all())
        return valid_methods


    @staticmethod
    def resolve_is_shipping_required(root: models.Checkout, _info):
        return root.is_shipping_required()
