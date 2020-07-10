import graphene
from django.core.exceptions import ValidationError

from .enums import ShippingMethodTypeEnum
from ..core.mutations import BaseMutation, ModelMutation
from ..core.scalars import Decimal, WeightScalar
from ..core.types.common import ShippingError
from ...core.permissions import ShippingPermissions
from ...shipping import models
from ...shipping.error_codes import ShippingErrorCode
from .types import ShippingMethod


class ShippingPriceInput(graphene.InputObjectType):
    name = graphene.String(description="Name of the shipping method.")
    price = Decimal(description="Shipping price of the shipping method.")
    minimum_order_price = Decimal(
        description="Minimum order price to use this shipping method."
    )
    maximum_order_price = Decimal(
        description="Maximum order price to use this shipping method."
    )
    minimum_order_weight = WeightScalar(
        description="Minimum order weight to use this shipping method."
    )
    maximum_order_weight = WeightScalar(
        description="Maximum order weight to use this shipping method."
    )
    type = ShippingMethodTypeEnum(description="Shipping type: price or weight based.")


class ShippingPriceMixin:
    @classmethod
    def clean_input(cls, info, instance, data, input_cls=None):
        cleaned_input = super().clean_input(info, instance, data)

        # Rename the price field to price_amount (the model's)
        price_amount = cleaned_input.pop("price", None)
        if price_amount is not None:
            if price_amount < 0:
                raise ValidationError(
                    {
                        "price": ValidationError(
                            ("Shipping rate price cannot be lower than 0."),
                            code=ShippingErrorCode.INVALID,
                        )
                    }
                )
            cleaned_input["price_amount"] = price_amount

        cleaned_type = cleaned_input.get("type")
        if cleaned_type:
            if cleaned_type == ShippingMethodTypeEnum.PRICE.value:
                min_price = cleaned_input.pop("minimum_order_price", None)
                max_price = cleaned_input.pop("maximum_order_price", None)

                if min_price is not None:
                    cleaned_input["minimum_order_price_amount"] = min_price

                if max_price is not None:
                    cleaned_input["maximum_order_price_amount"] = max_price

                if (
                        min_price is not None
                        and max_price is not None
                        and max_price <= min_price
                ):
                    raise ValidationError(
                        {
                            "maximum_order_price": ValidationError(
                                (
                                    "Maximum order price should be larger than "
                                    "the minimum order price."
                                ),
                                code=ShippingErrorCode.MAX_LESS_THAN_MIN,
                            )
                        }
                    )
            else:
                min_weight = cleaned_input.get("minimum_order_weight")
                max_weight = cleaned_input.get("maximum_order_weight")
                if (
                        min_weight is not None
                        and max_weight is not None
                        and max_weight <= min_weight
                ):
                    raise ValidationError(
                        {
                            "maximum_order_weight": ValidationError(
                                (
                                    "Maximum order weight should be larger than the "
                                    "minimum order weight."
                                ),
                                code=ShippingErrorCode.MAX_LESS_THAN_MIN,
                            )
                        }
                    )
        return cleaned_input


class ShippingPriceCreate(ShippingPriceMixin, ModelMutation):

    class Arguments:
        input = ShippingPriceInput(
            description="Fields required to create a shipping price.", required=True
        )

    class Meta:
        description = "Creates a new shipping price."
        model = models.ShippingMethod
        permissions = (ShippingPermissions.MANAGE_SHIPPING,)
        error_type_class = ShippingError
        error_type_field = "shipping_errors"

    @classmethod
    def success_response(cls, instance):
        response = super().success_response(instance)
        return response


class ShippingPriceUpdate(ShippingPriceMixin, ModelMutation):

    class Arguments:
        id = graphene.ID(description="ID of a shipping price to update.", required=True)
        input = ShippingPriceInput(
            description="Fields required to update a shipping price.", required=True
        )

    class Meta:
        description = "Updates a new shipping price."
        model = models.ShippingMethod
        permissions = (ShippingPermissions.MANAGE_SHIPPING,)
        error_type_class = ShippingError
        error_type_field = "shipping_errors"

    @classmethod
    def success_response(cls, instance):
        response = super().success_response(instance)
        return response


class ShippingPriceDelete(BaseMutation):
    shipping_method = graphene.Field(
        ShippingMethod, description="A shipping method to delete."
    )

    class Arguments:
        id = graphene.ID(required=True, description="ID of a shipping price to delete.")

    class Meta:
        description = "Deletes a shipping price."
        permissions = (ShippingPermissions.MANAGE_SHIPPING,)
        error_type_class = ShippingError
        error_type_field = "shipping_errors"

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        shipping_method = cls.get_node_or_error(
            info, data.get("id"), only_type=ShippingMethod
        )
        shipping_method_id = shipping_method.id
        shipping_method.delete()
        shipping_method.id = shipping_method_id
        return ShippingPriceDelete(
            shipping_method=shipping_method
        )
