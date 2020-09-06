import graphene
from django.conf import settings
from django.core.exceptions import ValidationError

from ...core.permissions import OrderPermissions
from ...core.taxes import zero_taxed_money
from ...core.utils import get_client_ip
from ...payment import models
from ...payment.error_codes import PaymentErrorCode
from ...payment.utils import create_payment
from ..account.types import AddressInput
from ..checkout.types import Checkout
from ..core.mutations import BaseMutation, ModelMutation
from ..core.scalars import Decimal
from ..core.types import common as common_types, PaymentError
from ..core.utils import from_global_id_strict_type
from .types import Payment, PaymentMethod


class PaymentInput(graphene.InputObjectType):
    # gateway = graphene.Field(
    #     graphene.String,
    #     description="A gateway to use with that payment.",
    #     required=True,
    # )
    token = graphene.String(
        required=True,
        description=(
            "Client-side generated payment token, representing customer's "
            "billing data in a secure manner."
        ),
    )
    amount = Decimal(
        required=False,
        description=(
            "Total amount of the transaction, including "
            "all taxes and discounts. If no amount is provided, "
            "the checkout total will be used."
        ),
    )
    billing_address = AddressInput(
        required=False,
        description=(
            "[Deprecated] Billing address. If empty, the billing address associated "
            "with the checkout instance will be used. Use `checkoutCreate` or "
            "`checkoutBillingAddressUpdate` mutations to set it. This field will be "
            "removed after 2020-07-31."
        ),
    )
    payment_method_id = graphene.ID(description='Payment method ID', required=True)


class CheckoutPaymentCreate(BaseMutation):
    checkout = graphene.Field(Checkout, description="Related checkout object.")
    payment = graphene.Field(Payment, description="A newly created payment.")

    class Arguments:
        checkout_id = graphene.ID(description="Checkout ID.", required=True)
        input = PaymentInput(
            description="Data required to create a new payment.", required=True
        )

    class Meta:
        description = "Create a new payment for given checkout."
        error_type_class = common_types.PaymentError
        error_type_field = "payment_errors"

    @classmethod
    def calculate_total(cls, info, checkout):
        checkout_total = checkout.get_total()
        return max(checkout_total, zero_taxed_money(checkout_total.currency))

    @classmethod
    def clean_payment_address(cls, payment_address):
        if payment_address is None:
            raise ValidationError(
                {
                    "payment_address": ValidationError(
                        "No payment address associated with this checkout.",
                        code=PaymentErrorCode.BILLING_ADDRESS_NOT_SET,
                    )
                }
            )

    @classmethod
    def clean_payment_amount(cls, checkout_total, amount):
        if amount != checkout_total.gross.amount:
            raise ValidationError(
                {
                    "amount": ValidationError(
                        "Partial payments are not allowed, amount should be "
                        "equal checkout's total.",
                        code=PaymentErrorCode.PARTIAL_PAYMENT_NOT_ALLOWED,
                    )
                }
            )

    @classmethod
    def clean_payment_method(cls, payment_method_id):
        pk = from_global_id_strict_type(
            payment_method_id, only_type=PaymentMethod, field="payment_method_id"
        )
        payment_method = models.PaymentMethod.objects.filter(pk=pk)
        if not payment_method:
            raise ValidationError(
                {
                    "payment_method": ValidationError(
                        "Payment method is not defined",
                        code=PaymentErrorCode.NOT_FOUND,
                    )
                }
            )
        return payment_method

    @classmethod
    def perform_mutation(cls, _root, info, checkout_id, **data):
        checkout_id = from_global_id_strict_type(
            checkout_id, only_type=Checkout, field="checkout_id"
        )
        checkout = models.Checkout.objects.prefetch_related(
            "lines__variant__product"
        ).get(pk=checkout_id)

        data = data["input"]

        checkout_total = cls.calculate_total(info, checkout)
        amount = data.get("amount", checkout_total.gross.amount)

        cls.clean_payment_address(checkout.payment_address)
        cls.clean_payment_amount(checkout_total, amount)
        payment_method = cls.clean_payment_method(data.get('paymentMethodId'))

        extra_data = {"customer_user_agent": info.context.META.get("HTTP_USER_AGENT")}

        payment = create_payment(
            gateway=data.get("gateway", 'gateway'),
            payment_token=data["token"],
            total=amount,
            currency=settings.DEFAULT_CURRENCY,
            email=checkout.email,
            extra_data=extra_data,
            customer_ip_address=get_client_ip(info.context),
            checkout=checkout,
            payment_method=payment_method
        )
        return CheckoutPaymentCreate(payment=payment)


class PaymentCapture(BaseMutation):
    payment = graphene.Field(Payment, description="Updated payment.")

    class Arguments:
        payment_id = graphene.ID(required=True, description="Payment ID.")
        amount = Decimal(description="Transaction amount.")

    class Meta:
        description = "Captures the authorized payment amount."
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = common_types.PaymentError
        error_type_field = "payment_errors"

    @classmethod
    def perform_mutation(cls, _root, info, payment_id, amount=None):
        payment = cls.get_node_or_error(
            info, payment_id, field="payment_id", only_type=Payment
        )
        # try:
        #     gateway.capture(payment, amount)
        # except PaymentError as e:
        #     raise ValidationError(str(e), code=PaymentErrorCode.PAYMENT_ERROR)
        return PaymentCapture(payment=payment)


class PaymentRefund(PaymentCapture):
    class Meta:
        description = "Refunds the captured payment amount."
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = common_types.PaymentError
        error_type_field = "payment_errors"

    @classmethod
    def perform_mutation(cls, _root, info, payment_id, amount=None):
        payment = cls.get_node_or_error(
            info, payment_id, field="payment_id", only_type=Payment
        )
        # try:
        #     gateway.refund(payment, amount=amount)
        # except PaymentError as e:
        #     raise ValidationError(str(e), code=PaymentErrorCode.PAYMENT_ERROR)
        return PaymentRefund(payment=payment)


class PaymentVoid(BaseMutation):
    payment = graphene.Field(Payment, description="Updated payment.")

    class Arguments:
        payment_id = graphene.ID(required=True, description="Payment ID.")

    class Meta:
        description = "Voids the authorized payment."
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = common_types.PaymentError
        error_type_field = "payment_errors"

    @classmethod
    def perform_mutation(cls, _root, info, payment_id):
        payment = cls.get_node_or_error(
            info, payment_id, field="payment_id", only_type=Payment
        )
        # try:
        #     gateway.void(payment)
        # except PaymentError as e:
        #     raise ValidationError(str(e), code=PaymentErrorCode.PAYMENT_ERROR)
        return PaymentVoid(payment=payment)


class PaymentSecureConfirm(BaseMutation):
    payment = graphene.Field(Payment, description="Updated payment.")

    class Arguments:
        payment_id = graphene.ID(required=True, description="Payment ID.")

    class Meta:
        description = "Confirms payment in a two-step process like 3D secure"
        error_type_class = common_types.PaymentError
        error_type_field = "payment_errors"

    @classmethod
    def perform_mutation(cls, _root, info, payment_id):
        payment = cls.get_node_or_error(
            info, payment_id, field="payment_id", only_type=Payment
        )
        # try:
        #     gateway.confirm(payment)
        # except PaymentError as e:
        #     raise ValidationError(str(e), code=PaymentErrorCode.PAYMENT_ERROR)
        return PaymentSecureConfirm(payment=payment)


class PaymentMethodInput(graphene.InputObjectType):
    name = graphene.String(description="Name of the payment method.")
    description = graphene.String(description="Description of the payment method.")
    

class PaymentMethodMixin:
    @classmethod
    def clean_input(cls, info, instance, data, input_cls=None):
        cleaned_input = super().clean_input(info, instance, data)
        return cleaned_input


class PaymentMethodCreate(PaymentMethodMixin, ModelMutation):

    class Arguments:
        input = PaymentMethodInput(
            description="Fields required to create a payment method.", required=True
        )

    class Meta:
        description = "Creates a new payment method."
        model = models.PaymentMethod
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = PaymentError
        error_type_field = "payment_errors"

    @classmethod
    def success_response(cls, instance):
        response = super().success_response(instance)
        return response


class PaymentMethodUpdate(PaymentMethodMixin, ModelMutation):

    class Arguments:
        id = graphene.ID(description="ID of a payment price to update.", required=True)
        input = PaymentMethodInput(
            description="Fields required to update a payment method.", required=True
        )

    class Meta:
        description = "Updates a new payment method."
        model = models.PaymentMethod
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = PaymentError
        error_type_field = "payment_errors"

    @classmethod
    def success_response(cls, instance):
        response = super().success_response(instance)
        return response


class PaymentMethodDelete(BaseMutation):
    payment_method = graphene.Field(
        PaymentMethod, description="A payment method to delete."
    )

    class Arguments:
        id = graphene.ID(required=True, description="ID of a payment method to delete.")

    class Meta:
        description = "Deletes a payment method."
        permissions = (OrderPermissions.MANAGE_ORDERS,)
        error_type_class = PaymentError
        error_type_field = "payment_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        payment_method = cls.get_node_or_error(
            info, data.get("id"), only_type=PaymentMethod
        )
        payment_method_id = payment_method.id
        payment_method.delete()
        payment_method.id = payment_method_id
        return PaymentMethodDelete(
            payment_method=payment_method
        )