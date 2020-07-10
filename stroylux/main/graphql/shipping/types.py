from graphene import relay

from .enums import ShippingMethodTypeEnum
from ..core.connection import CountableDjangoObjectType
from ...shipping import models


class ShippingMethod(CountableDjangoObjectType):
    type = ShippingMethodTypeEnum(description="Type of the shipping method.")

    class Meta:
        description = (
            "Shipping method are the methods you'll use to get customer's orders to "
            "them. They are directly exposed to the customers."
        )
        model = models.ShippingMethod
        interfaces = [relay.Node, ]
        only_fields = [
            "id",
            "maximum_order_price",
            "maximum_order_weight",
            "minimum_order_price",
            "minimum_order_weight",
            "name",
            "price",
            "description"
        ]
