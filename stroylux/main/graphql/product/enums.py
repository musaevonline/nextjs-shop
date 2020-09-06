import graphene

from main.graphql.core.enums import to_enum
from main.product import AttributeInputType

AttributeInputTypeEnum = to_enum(AttributeInputType)


class ProductTypeEnum(graphene.Enum):
    DIGITAL = "digital"
    SHIPPABLE = "shippable"


class AttributeTypeEnum(graphene.Enum):
    PRODUCT = "PRODUCT"
    VARIANT = "VARIANT"


class AttributeValueType(graphene.Enum):
    COLOR = "COLOR"
    GRADIENT = "GRADIENT"
    URL = "URL"
    STRING = "STRING"

class StockAvailability(graphene.Enum):
    IN_STOCK = "AVAILABLE"
    OUT_OF_STOCK = "OUT_OF_STOCK"