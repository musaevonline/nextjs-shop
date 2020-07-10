import graphene
from django.core.exceptions import ValidationError
from django.db import transaction

from main.graphql.core.mutations import ModelMutation
from main.graphql.core.types.common import ProductError
from main.product import models
from main.order import models as order_models
from main.product.error_codes import ProductErrorCode


class ProductReviewInput(graphene.InputObjectType):
    rating = graphene.Int(description="Rating of the review.", required=True)
    title = graphene.String(description="Title of the review.", required=True)
    content = graphene.String(description='Content of the review', required=True)
    advantages = graphene.JSONString(description='Advantages of the review')
    flaws = graphene.JSONString(description='Flaws of the review')
    # status = graphene.String(description='Status of the review')


class ProductReviewCreateInput(ProductReviewInput):
    order_line = graphene.ID(
        description="Order line ID.",
        required=True,
    )


class ProductReviewCreate(ModelMutation):
    class Arguments:
        input = ProductReviewCreateInput(
            required=True, description="Fields required to create a product review."
        )

    class Meta:
        description = "Creates a new review for a product."
        model = models.ProductReview
        # permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def clean_input(
            cls, info, instance: models.ProductReview, data: dict, input_cls=None
    ):
        cleaned_input = super().clean_input(info, instance, data)
        print(cleaned_input)
        line: order_models.OrderLine = cleaned_input.get("order_line")
        if not line or not line.variant:
            raise ValidationError(
                {
                    "line": ValidationError(
                        "Product review order line is invalid.",
                        code=ProductErrorCode.INVALID.value,
                    )
                }
            )
        if not line.order.user:
            raise ValidationError(
                {
                    "user": ValidationError(
                        "Order without user.",
                        code=ProductErrorCode.INVALID.value,
                    )
                }
            )
        cleaned_input.update({"product": line.variant.product})
        cleaned_input.update({"user": line.order.user})
        rating = cleaned_input.get("rating")
        if rating > 5 or rating < 1:
            raise ValidationError(
                {
                    "rating": ValidationError(
                        "Product review rating cannot be lower than 1.",
                        code=ProductErrorCode.INVALID.value,
                    )
                }
            )
        title = cleaned_input.get("title")
        if len(title) > 100:
            raise ValidationError(
                {
                    "title": ValidationError(
                        "Product review title cannot be more than 100.",
                        code=ProductErrorCode.INVALID.value,
                    )
                }
            )
        content = cleaned_input.get("content")
        if len(content) > 1000:
            raise ValidationError(
                {
                    "content": ValidationError(
                        "Product review content cannot be more than 1000.",
                        code=ProductErrorCode.INVALID.value,
                    )
                }
            )
        return cleaned_input

    # @classmethod
    # @transaction.atomic()
    # def save(cls, info, instance, cleaned_input):
    #     instance.save()
