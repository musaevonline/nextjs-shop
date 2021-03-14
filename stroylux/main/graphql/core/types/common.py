import graphene

from main.core.utils import build_absolute_uri
from main.product.templatetags.product_images import get_thumbnail
from ..enums import (
    AccountErrorCode,
    PermissionEnum,
    ProductErrorCode,
    StockErrorCode,
    ShippingErrorCode,
    PaymentErrorCode,
    CheckoutErrorCode,
    OrderErrorCode, PermissionGroupErrorCode, ShopErrorCode, BlogErrorCode, PageErrorCode
)


class CountryDisplay(graphene.ObjectType):
    code = graphene.String(description="Country code.", required=True)
    country = graphene.String(description="Country name.", required=True)


class Permission(graphene.ObjectType):
    code = PermissionEnum(description="Internal code for permission.", required=True)
    name = graphene.String(
        description="Describe action(s) allowed to do by permission.", required=True
    )

    class Meta:
        description = "Represents a permission object in a friendly form."


class Error(graphene.ObjectType):
    field = graphene.String(
        description=(
            "Name of a field that caused the error. A value of `null` indicates that "
            "the error isn't associated with a particular field."
        ),
        required=False,
    )
    message = graphene.String(description="The error message.")

    class Meta:
        description = "Represents an error in the input of a mutation."


class AccountError(Error):
    code = AccountErrorCode(description="The error code.", required=True)


class ShippingError(Error):
    code = ShippingErrorCode(description="The error code.", required=True)


class PermissionDisplay(graphene.ObjectType):
    code = PermissionEnum(description="Internal code for permission.", required=True)
    name = graphene.String(
        description="Describe action(s) allowed to do by permission.", required=True
    )

    class Meta:
        description = "Represents a permission object in a friendly form."


class Weight(graphene.ObjectType):
    unit = graphene.String(description="Weight unit.", required=True)
    value = graphene.Float(description="Weight value.", required=True)

    class Meta:
        description = "Represents weight value in a specific weight unit."


class Image(graphene.ObjectType):
    url = graphene.String(required=True, description="The URL of the image.")
    alt = graphene.String(description="Alt text for an image.")

    class Meta:
        description = "Represents an image."

    @staticmethod
    def get_adjusted(image, alt, size, rendition_key_set, info):
        """Return Image adjusted with given size."""
        if size:
            url = get_thumbnail(
                image_file=image,
                size=size,
                method="thumbnail",
                rendition_key_set=rendition_key_set,
            )
        else:
            url = image.url
        url = build_absolute_uri(url)
        return Image(url, alt)


class PriceRangeInput(graphene.InputObjectType):
    gte = graphene.Float(description="Price greater than or equal to.", required=False)
    lte = graphene.Float(description="Price less than or equal to.", required=False)


class DateRangeInput(graphene.InputObjectType):
    gte = graphene.Date(description="Start date.", required=False)
    lte = graphene.Date(description="End date.", required=False)


class DateTimeRangeInput(graphene.InputObjectType):
    gte = graphene.DateTime(description="Start date.", required=False)
    lte = graphene.DateTime(description="End date.", required=False)


class IntRangeInput(graphene.InputObjectType):
    gte = graphene.Int(description="Value greater than or equal to.", required=False)
    lte = graphene.Int(description="Value less than or equal to.", required=False)


class TaxType(graphene.ObjectType):
    """Representation of tax types fetched from tax gateway."""

    description = graphene.String(description="Description of the tax type.")
    tax_code = graphene.String(
        description="External tax code used to identify given tax group."
    )


class ProductError(Error):
    code = ProductErrorCode(description="The error code.", required=True)


class ProductAttributeError(ProductError):
    attributes = graphene.List(
        graphene.NonNull(graphene.ID),
        description="List of attributes IDs which causes the error.",
        required=False,
    )


class StockError(Error):
    code = StockErrorCode(description="The error code.", required=True)


class BulkProductError(ProductError):
    index = graphene.Int(
        description="Index of an input list item that caused the error."
    )


class BulkStockError(ProductError):
    index = graphene.Int(
        description="Index of an input list item that caused the error."
    )


class PaymentError(Error):
    code = PaymentErrorCode(description="The error code.", required=True)


class CheckoutError(Error):
    code = CheckoutErrorCode(description="The error code.", required=True)


class OrderError(Error):
    code = OrderErrorCode(description="The error code.", required=True)


class StaffError(AccountError):
    permissions = graphene.List(
        graphene.NonNull(PermissionEnum),
        description="List of permissions which causes the error.",
        required=False,
    )
    groups = graphene.List(
        graphene.NonNull(graphene.ID),
        description="List of permission group IDs which cause the error.",
        required=False,
    )
    users = graphene.List(
        graphene.NonNull(graphene.ID),
        description="List of user IDs which causes the error.",
        required=False,
    )


class PermissionGroupError(Error):
    code = PermissionGroupErrorCode(description="The error code.", required=True)
    permissions = graphene.List(
        graphene.NonNull(PermissionEnum),
        description="List of permissions which causes the error.",
        required=False,
    )
    users = graphene.List(
        graphene.NonNull(graphene.ID),
        description="List of user IDs which causes the error.",
        required=False,
    )


class ShopError(Error):
    code = ShopErrorCode(description="The error code.", required=True)


class BlogError(Error):
    code = BlogErrorCode(description="The error code.", required=True)


class PageError(Error):
    code = PageErrorCode(description="The error code.", required=True)
