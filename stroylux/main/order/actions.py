import logging
from decimal import Decimal

from django.db import transaction

from .utils import recalculate_order
from ..checkout.models import Checkout
from ..payment import ChargeStatus, CustomPaymentChoices, PaymentError
from ..product.management import decrease_stock, allocate_stock
from . import OrderStatus, events
from .emails import send_payment_confirmation, send_order_confirmation, \
    send_staff_order_confirmation

from .models import Order
from ..payment.models import Payment
from ..account.models import User

logger = logging.getLogger(__name__)


def order_created(order: "Order", user: "User", from_draft: bool = False):
    events.order_created_event(order=order, user=user, from_draft=from_draft)


def handle_fully_paid_order(order: "Order"):
    events.order_fully_paid_event(order=order)
    if order.get_customer_email():
        events.email_sent_event(
            order=order, user=None, email_type=events.OrderEventsEmails.PAYMENT
        )
        send_payment_confirmation.delay(order.pk)


def cancel_order(order: "Order", user: "User"):
    """Cancel order and associated fulfillments.

    Return products to corresponding stocks if restock is set to True.
    """
    events.order_canceled_event(order=order, user=user)
    order.status = OrderStatus.CANCELED
    order.save(update_fields=["status"])

    payments = order.payments.filter(is_active=True).exclude(
        charge_status=ChargeStatus.FULLY_REFUNDED
    )
    from ..payment import gateway
    for payment in payments:
        if payment.can_refund():
            gateway.refund(payment)
        elif payment.can_void():
            gateway.void(payment)


def order_refunded(order: "Order", user: "User", amount: "Decimal", payment: "Payment"):
    events.payment_refunded_event(
        order=order, user=user, amount=amount, payment=payment
    )


def order_voided(order: "Order", user: "User", payment: "Payment"):
    events.payment_voided_event(order=order, user=user, payment=payment)


def order_shipping_updated(order: "Order"):
    recalculate_order(order)
    print('order_shipping_updated')


def order_captured(order: "Order", user: "User", amount: "Decimal", payment: "Payment"):
    events.payment_captured_event(
        order=order, user=user, amount=amount, payment=payment
    )


@transaction.atomic
def mark_order_as_paid(order: "Order", request_user: "User"):
    """Mark order as paid.

    Allows to create a payment for an order without actually performing any
    payment by the gateway.
    """
    # pylint: disable=cyclic-import
    from ..payment.utils import create_payment

    payment = create_payment(
        gateway=CustomPaymentChoices.MANUAL,
        payment_token="",
        currency=order.total.gross.currency,
        email=order.user_email,
        total=order.total.gross.amount,
        order=order,
    )
    payment.charge_status = ChargeStatus.FULLY_CHARGED
    payment.captured_amount = order.total.gross.amount
    payment.save(update_fields=["captured_amount", "charge_status", "modified"])
    events.order_manually_marked_as_paid_event(order=order, user=request_user)


def clean_mark_order_as_paid(order: "Order"):
    """Check if an order can be marked as paid."""
    if order.payments.exists():
        raise PaymentError("Orders with payments can not be manually marked as paid.", )


def fulfill_order_line(order_line, quantity, warehouse_pk):
    """Fulfill order line with given quantity."""
    if order_line.variant and order_line.variant:
        decrease_stock(order_line, quantity)
    order_line.quantity_fulfilled += quantity
    order_line.save(update_fields=["quantity_fulfilled"])


@transaction.atomic
def create_order(
        *, checkout: Checkout, order_data: dict, user: User, redirect_url: str
) -> Order:
    """Create an order from the checkout.
    Each order will get a private copy of both the billing and the shipping
    address (if shipping).
    If any of the addresses is new and the user is logged in the address
    will also get saved to that user's address book.
    Current user's language is saved in the order so we can later determine
    which language to use when sending email.
    """

    order = Order.objects.filter(checkout_token=checkout.token).first()
    if order is not None:
        return order

    order_lines = order_data.pop("lines")
    total_price_left = order_data.pop("total_price_left")
    order = Order.objects.create(**order_data, checkout_token=checkout.token)
    order.lines.set(order_lines, bulk=False)

    # allocate stocks from the lines
    for line in order_lines:  # type: OrderLine
        variant = line.variant
        if variant:
            allocate_stock(line, line.quantity)

    # assign checkout payments to the order
    checkout.payments.update(order=order)
    order.save()

    order_created(order=order, user=user)

    # Send the order confirmation email
    transaction.on_commit(
        lambda: send_order_confirmation.delay(order.pk, redirect_url, user.pk if user else None)
    )
    transaction.on_commit(
        lambda: send_staff_order_confirmation.delay(order.pk, redirect_url)
    )

    return order
