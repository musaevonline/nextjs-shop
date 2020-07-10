"""Checkout-related utility functions."""
from decimal import Decimal
from typing import Iterable, Optional, Tuple

from django.core.exceptions import ValidationError
from django.db.models import Sum
from django.utils.encoding import smart_text
from prices import TaxedMoney

from . import AddressType
from .base_calculations import base_checkout_subtotal, base_checkout_line_total
from .error_codes import CheckoutErrorCode
from .. import settings
from ..account.models import User
from ..account.utils import store_user_address
from ..core.taxes import zero_taxed_money, quantize_price
from ..order.models import OrderLine
from ..product.availability import check_stock_quantity
from ..shipping.models import ShippingMethod
from .models import Checkout, CheckoutLine

COOKIE_NAME = "checkout"


def get_valid_shipping_methods_for_checkout(
        checkout: Checkout,
        lines: Iterable[CheckoutLine]
):
    return ShippingMethod.objects.applicable_shipping_methods_for_instance(
        checkout,
        price=checkout.get_subtotal().gross,
    )


def get_user_checkout(
        user: User, checkout_queryset=Checkout.objects.all(), auto_create=False
) -> Tuple[Optional[Checkout], bool]:
    """Return an active checkout for given user or None if no auto create.
    If auto create is enabled, it will retrieve an active checkout or create it
    (safer for concurrency).
    """
    if auto_create:
        return checkout_queryset.get_or_create(
            user=user,
            defaults={
                "shipping_address": user.default_shipping_address
            },
        )
    return checkout_queryset.filter(user=user).first(), False


def get_anonymous_checkout_from_token(token, checkout_queryset=Checkout.objects.all()):
    """Return an open unassigned checkout with given token if any."""
    return checkout_queryset.filter(token=token, user=None).first()


def check_variant_in_stock(
        checkout, variant, quantity=1, replace=False, check_quantity=True
) -> Tuple[int, Optional[CheckoutLine]]:
    """Check if a given variant is in stock and return the new quantity + line."""
    line = checkout.lines.filter(variant=variant).first()
    line_quantity = 0 if line is None else line.quantity

    new_quantity = quantity if replace else (quantity + line_quantity)

    if new_quantity < 0:
        raise ValueError(
            "%r is not a valid quantity (results in %r)" % (quantity, new_quantity)
        )

    if new_quantity > 0 and check_quantity:
        check_stock_quantity(variant, new_quantity)

    return new_quantity, line


def update_checkout_quantity(checkout):
    """Update the total quantity in checkout."""
    total_lines = checkout.lines.aggregate(total_quantity=Sum("quantity"))[
        "total_quantity"
    ]
    if not total_lines:
        total_lines = 0
    checkout.quantity = total_lines
    checkout.save(update_fields=["quantity"])


def add_variant_to_checkout(
        checkout, variant, quantity=1, replace=False, check_quantity=True
):
    """Add a product variant to checkout.
    If `replace` is truthy then any previous quantity is discarded instead
    of added to.
    """

    new_quantity, line = check_variant_in_stock(
        checkout,
        variant,
        quantity=quantity,
        replace=replace,
        check_quantity=check_quantity,
    )

    if line is None:
        line = checkout.lines.filter(variant=variant).first()

    if new_quantity == 0:
        if line is not None:
            line.delete()
    elif line is None:
        checkout.lines.create(checkout=checkout, variant=variant, quantity=new_quantity)
    elif new_quantity > 0:
        line.quantity = new_quantity
        line.save(update_fields=["quantity"])

    update_checkout_quantity(checkout)


def get_valid_shipping_methods_for_checkout(
        checkout: Checkout,
        lines: Iterable[CheckoutLine],
):
    return ShippingMethod.objects.applicable_shipping_methods_for_instance(
        checkout,
        price=base_checkout_subtotal([base_checkout_line_total(line) for line in lines],
                                     currency=settings.DEFAULT_CURRENCY).gross,
    )


def _check_new_checkout_address(checkout, address):
    """Check if and address in checkout has changed and if to remove old one."""
    old_address = checkout.shipping_address

    has_address_changed = any(
        [
            not address and old_address,
            address and not old_address,
            address and old_address and address != old_address,
        ]
    )

    remove_old_address = (
            has_address_changed
            and old_address is not None
            and (not checkout.user or old_address not in checkout.user.addresses.all())
    )

    return has_address_changed, remove_old_address


def change_shipping_address_in_checkout(checkout, address):
    """Save shipping address in checkout if changed.
    Remove previously saved address if not connected to any user.
    """
    changed, remove = _check_new_checkout_address(checkout, address)
    if changed:
        if remove:
            checkout.shipping_address.delete()
        checkout.shipping_address = address
        checkout.save(update_fields=["shipping_address", "last_change"])


def is_valid_shipping_method(
        checkout: Checkout, lines: Iterable[CheckoutLine]
):
    """Check if shipping method is valid and remove (if not)."""
    if not checkout.shipping_method:
        return False

    valid_methods = get_valid_shipping_methods_for_checkout(checkout, lines)
    if valid_methods is None or checkout.shipping_method not in valid_methods:
        clear_shipping_method(checkout)
        return False
    return True


def clear_shipping_method(checkout: Checkout):
    checkout.shipping_method = None
    checkout.save(update_fields=["shipping_method", "last_change"])


def clean_checkout(
        checkout: Checkout, lines: Iterable[CheckoutLine]
):
    """Check if checkout can be completed."""
    if checkout.is_shipping_required():
        if not checkout.shipping_method:
            raise ValidationError(
                "Shipping method is not set",
                code=CheckoutErrorCode.SHIPPING_METHOD_NOT_SET.value,
            )
        if not checkout.shipping_address:
            raise ValidationError(
                "Shipping address is not set",
                code=CheckoutErrorCode.SHIPPING_ADDRESS_NOT_SET.value,
            )
        if not is_valid_shipping_method(checkout, lines):
            raise ValidationError(
                "Shipping method is not valid for your shipping address",
                code=CheckoutErrorCode.INVALID_SHIPPING_METHOD.value,
            )

    # if not is_fully_paid(checkout):
    #     raise ValidationError(
    #         "Provided payment methods can not cover the checkout's total amount",
    #         code=CheckoutErrorCode.CHECKOUT_NOT_FULLY_PAID.value,
    #     )


def is_fully_paid(
        checkout: Checkout
):
    """Check if provided payment methods cover the checkout's total amount.
    Note that these payments may not be captured or charged at all.
    """
    payments = [payment for payment in checkout.payments.all() if payment.is_active]
    total_paid = sum([p.total for p in payments])
    checkout_total = checkout.get_total()
    checkout_total = max(
        checkout_total, zero_taxed_money(checkout_total.currency)
    ).gross
    return total_paid >= checkout_total.amount


def _process_shipping_data_for_order(
        checkout: Checkout, shipping_price: TaxedMoney
) -> dict:
    """Fetch, process and return shipping data from checkout."""
    if not checkout.is_shipping_required():
        return {}

    shipping_address = checkout.shipping_address

    if checkout.user:
        store_user_address(checkout.user, shipping_address, AddressType.SHIPPING)
        if (
                shipping_address
                and checkout.user.addresses.filter(pk=shipping_address.pk).exists()
        ):
            shipping_address = shipping_address.get_copy()

    return {
        "shipping_address": shipping_address,
        "shipping_method": checkout.shipping_method,
        "shipping_method_name": smart_text(checkout.shipping_method),
        "shipping_price": shipping_price,
        "weight": checkout.get_total_weight(),
    }


def _process_user_data_for_order(checkout: Checkout):
    """Fetch, process and return shipping data from checkout."""
    shipping_address = checkout.shipping_address

    if checkout.user:
        store_user_address(checkout.user, shipping_address, AddressType.SHIPPING)
        if (
                shipping_address
                and checkout.user.addresses.filter(pk=shipping_address.pk).exists()
        ):
            shipping_address = shipping_address.get_copy()

    return {
        "user": checkout.user,
        "user_email": checkout.get_customer_email(),
        "shipping_address": shipping_address,
        "customer_note": checkout.note,
    }


def create_line_for_order(checkout_line: "CheckoutLine") -> OrderLine:
    """Create a line for the given order.
    :raises InsufficientStock: when there is not enough items in stock for this variant.
    """

    quantity = checkout_line.quantity
    variant = checkout_line.variant
    product = variant.product
    check_stock_quantity(variant, quantity)

    product_name = str(product)
    variant_name = str(variant)
    total_line_price = checkout_line.get_total()
    unit_price = quantize_price(
        total_line_price / checkout_line.quantity, total_line_price.currency
    )
    tax_rate = (
        unit_price.tax / unit_price.net
        if not isinstance(unit_price, Decimal)
        else Decimal("0.0")
    )
    line = OrderLine(
        product_name=product_name,
        variant_name=variant_name,
        product_sku=variant.sku,
        is_shipping_required=variant.is_shipping_required(),
        quantity=quantity,
        variant=variant,
        unit_price=unit_price,  # type: ignore
        tax_rate=tax_rate,
    )

    return line


def prepare_order_data(
        *, checkout: Checkout, tracking_code: str
) -> dict:
    """Run checks and return all the data from a given checkout to create an order.
    :raises NotApplicable InsufficientStock:
    """
    order_data = {}

    taxed_total = checkout.get_total()
    cards_total = checkout.get_total_gift_cards_balance()
    taxed_total.gross -= cards_total
    taxed_total.net -= cards_total

    taxed_total = max(taxed_total, zero_taxed_money(checkout.currency))

    shipping_total = checkout.get_shipping_price()
    order_data.update(_process_shipping_data_for_order(checkout, shipping_total))
    order_data.update(_process_user_data_for_order(checkout))
    order_data.update(
        {
            "tracking_client_id": tracking_code,
            "total": taxed_total,
        }
    )

    order_data["lines"] = [
        create_line_for_order(checkout_line=line)
        for line in checkout
    ]

    # assign gift cards to the order
    order_data["total_price_left"] = checkout.get_total().gross

    return order_data