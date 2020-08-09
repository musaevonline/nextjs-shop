import graphene

from ...account import error_codes as account_error_codes
from ...core.weight import WeightUnits
from ...product import error_codes as product_error_codes
from ...shipping import error_codes as shipping_error_codes
from ...payment import error_codes as payment_error_codes
from ...checkout import error_codes as checkout_error_codes
from ...order import error_codes as order_error_codes
from ...core.permissions import get_permissions_enum_list
from ...core import error_codes as core_error_codes
from .utils import str_to_enum


class ReportingPeriod(graphene.Enum):
    TODAY = "TODAY"
    THIS_MONTH = "THIS_MONTH"


def to_enum(enum_cls, *, type_name=None, **options) -> graphene.Enum:
    """Create a Graphene enum from a class containing a set of options.
    :param enum_cls:
        The class to build the enum from.
    :param type_name:
        The name of the type. Default is the class name + 'Enum'.
    :param options:
        - description:
            Contains the type description (default is the class's docstring)
        - deprecation_reason:
            Contains the deprecation reason.
            The default is enum_cls.__deprecation_reason__ or None.
    :return:
    """

    # note this won't work until
    # https://github.com/graphql-python/graphene/issues/956 is fixed
    deprecation_reason = getattr(enum_cls, "__deprecation_reason__", None)
    if deprecation_reason:
        options.setdefault("deprecation_reason", deprecation_reason)

    type_name = type_name or (enum_cls.__name__ + "Enum")
    enum_data = [(str_to_enum(code.upper()), code) for code, name in enum_cls.CHOICES]
    return graphene.Enum(type_name, enum_data, **options)


WeightUnitsEnum = graphene.Enum(
    "WeightUnitsEnum", [(str_to_enum(unit[0]), unit[0]) for unit in WeightUnits.CHOICES]
)


class OrderDirection(graphene.Enum):
    ASC = ""
    DESC = "-"

    @property
    def description(self):
        # Disable all the no-member violations in this function
        # pylint: disable=no-member
        if self == OrderDirection.ASC:
            return "Specifies an ascending sort order."
        if self == OrderDirection.DESC:
            return "Specifies a descending sort order."
        raise ValueError("Unsupported enum value: %s" % self.value)


PermissionEnum = graphene.Enum("PermissionEnum", get_permissions_enum_list())

AccountErrorCode = graphene.Enum.from_enum(account_error_codes.AccountErrorCode)
ProductErrorCode = graphene.Enum.from_enum(product_error_codes.ProductErrorCode)
StockErrorCode = graphene.Enum.from_enum(product_error_codes.StockErrorCode)
ShippingErrorCode = graphene.Enum.from_enum(shipping_error_codes.ShippingErrorCode)
PaymentErrorCode = graphene.Enum.from_enum(payment_error_codes.PaymentErrorCode)
CheckoutErrorCode = graphene.Enum.from_enum(checkout_error_codes.CheckoutErrorCode)
OrderErrorCode = graphene.Enum.from_enum(order_error_codes.OrderErrorCode)
PermissionGroupErrorCode = graphene.Enum.from_enum(
    account_error_codes.PermissionGroupErrorCode
)
ShopErrorCode = graphene.Enum.from_enum(core_error_codes.ShopErrorCode)
