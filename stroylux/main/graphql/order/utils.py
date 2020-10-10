from django.core.exceptions import ValidationError

from ...core.exceptions import InsufficientStock
from ...order import OrderStatus
from ...order.error_codes import OrderErrorCode
from ...product.availability import check_stock_quantity


def validate_total_quantity(order):
    if order.get_total_quantity() == 0:
        raise ValidationError(
            {
                "lines": ValidationError(
                    "Could not create order without any products.",
                    code=OrderErrorCode.REQUIRED,
                )
            }
        )


def validate_shipping_method(order):
    method = order.shipping_method
    shipping_address = order.shipping_address
    shipping_not_valid = (
            method
            and shipping_address
    )  # noqa
    if shipping_not_valid:
        raise ValidationError(
            {
                "shipping": ValidationError(
                    "Shipping method is not valid for chosen shipping address",
                    code=OrderErrorCode.SHIPPING_METHOD_NOT_APPLICABLE,
                )
            }
        )


def validate_order_lines(order):
    for line in order:
        if line.variant is None:
            raise ValidationError(
                {
                    "lines": ValidationError(
                        "Could not create orders with non-existing products.",
                        code=OrderErrorCode.NOT_FOUND,
                    )
                }
            )
        try:
            check_stock_quantity(line.variant, line.quantity)
        except InsufficientStock as exc:
            raise ValidationError(
                {
                    "lines": ValidationError(
                        f"Insufficient product stock: {exc.item}",
                        code=OrderErrorCode.INSUFFICIENT_STOCK,
                    )
                }
            )


def validate_draft_order(order):
    """Check if the given order contains the proper data.
    - Has proper customer data,
    - Shipping address and method are set up,
    - Product variants for order lines still exists in database.
    - Product variants are availale in requested quantity.
    Returns a list of errorsAddressCreate if any were found.
    """
    if order.is_shipping_required():
        validate_shipping_method(order)
    validate_total_quantity(order)
    validate_order_lines(order)


def update_order_status(order):
    """Update order status depending on fulfillments."""
    quantity_fulfilled = order.quantity_fulfilled
    total_quantity = order.get_total_quantity()

    if quantity_fulfilled <= 0:
        status = OrderStatus.UNFULFILLED
    elif quantity_fulfilled < total_quantity:
        status = OrderStatus.PARTIALLY_FULFILLED
    else:
        status = OrderStatus.FULFILLED

    if status != order.status:
        order.status = status
        order.save(update_fields=["status"])
