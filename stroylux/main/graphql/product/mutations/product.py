import graphene
from typing import Union

from django.core.exceptions import ValidationError
from django.db import transaction

from ....core.permissions import ProductPermissions
from ....product import models
from ....product.error_codes import ProductErrorCode
from ..utils import create_stocks
from ...core.mutations import ModelMutation, ModelDeleteMutation, ModelBulkDeleteMutation, BaseBulkMutation
from ...core.scalars import Decimal
from ...core.types.common import ProductError
from ...core.utils import validate_slug_and_generate_if_needed
from ....product.tasks import update_product_minimal_variant_price_task


class ProductInput(graphene.InputObjectType):
    publication_date = graphene.types.datetime.Date(
        description="Publication date. ISO 8601 standard."
    )
    category = graphene.ID(description="ID of the product's category.", name="category")
    description = graphene.String(description="Product description (HTML/text).")
    description_json = graphene.JSONString(description="Product description (JSON).")
    is_published = graphene.Boolean(
        description="Determines if product is visible to customers."
    )
    name = graphene.String(description="Product name.")
    slug = graphene.String(description="Product slug.")
    base_price = Decimal(description="Product price.")
    sku = graphene.String(
        description=(
            "Stock keeping unit of a product. Note: this field is only used if "
            "a product doesn't use variants."
        )
    )


class StockInput(graphene.InputObjectType):
    quantity = graphene.Int(description="Quantity of items available for sell.")


class ProductCreateInput(ProductInput):
    product_type = graphene.ID(
        description="ID of the type that product belongs to.",
        name="productType",
        required=True,
    )
    stocks = graphene.List(
        graphene.NonNull(StockInput),
        description=(
            "Stocks of a product available for sale. Note: this field is "
            "only used if a product doesn't use variants."
        ),
        required=False,
    )


T_INSTANCE = Union[models.Product, models.ProductVariant]


class ProductCreate(ModelMutation):
    class Arguments:
        input = ProductCreateInput(
            required=True, description="Fields required to create a product."
        )

    class Meta:
        description = "Creates a new product."
        model = models.Product
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)

        product_type = (
            instance.product_type if instance.pk else cleaned_input.get("product_type")
        )  # type: models.ProductType

        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "name", cleaned_input
            )
        except ValidationError as error:
            error.code = ProductErrorCode.REQUIRED.value
            raise ValidationError({"slug": error})
        price = data.get("base_price", data.get("price"))
        if price is not None:
            if price < 0:
                raise ValidationError(
                    {
                        "basePrice": ValidationError(
                            "Product base price cannot be lower than 0.",
                            code=ProductErrorCode.INVALID,
                        )
                    }
                )
            if instance.minimal_variant_price_amount is None:
                # Set the default "minimal_variant_price" to the "price"
                cleaned_input["minimal_variant_price_amount"] = price

        is_published = cleaned_input.get("is_published")
        category = cleaned_input.get("category")
        if not category and is_published:
            raise ValidationError(
                {
                    "isPublished": ValidationError(
                        "You must select a category to be able to publish"
                    )
                }
            )
        cls.clean_sku(product_type, cleaned_input)
        return cleaned_input

    @classmethod
    def clean_sku(cls, product_type, cleaned_input):
        """Validate SKU input field.
        When creating products that don't use variants, SKU is required in
        the input in order to create the default variant underneath.
        See the documentation for `has_variants` field for details:
        http://docs.getsaleor.com/en/latest/architecture/products.html#product-types
        """
        if product_type and not product_type.has_variants:
            input_sku = cleaned_input.get("sku")
            if not input_sku:
                raise ValidationError(
                    {
                        "sku": ValidationError(
                            "This field cannot be blank.",
                            code=ProductErrorCode.REQUIRED,
                        )
                    }
                )
            elif models.ProductVariant.objects.filter(sku=input_sku).exists():
                raise ValidationError(
                    {
                        "sku": ValidationError(
                            "Product with this SKU already exists.",
                            code=ProductErrorCode.ALREADY_EXISTS,
                        )
                    }
                )

    @classmethod
    def get_instance(cls, info, **data):
        """Prefetch related fields that are needed to process the mutation."""
        # If we are updating an instance and want to update its attributes,
        # prefetch them.

        object_id = data.get("id")
        if object_id:
            qs = cls.Meta.model.objects.all()
            return cls.get_node_or_error(info, object_id, only_type="Product", qs=qs)

        return super().get_instance(info, **data)

    @classmethod
    @transaction.atomic
    def save(cls, info, instance, cleaned_input):
        instance.save()
        if not instance.product_type.has_variants:
            sku = cleaned_input.get("sku")
            variant = models.ProductVariant.objects.create(
                product=instance, sku=sku
            )
            stocks = cleaned_input.get("stocks")
            if stocks:
                cls.create_variant_stocks(variant, stocks)

    @classmethod
    def create_variant_stocks(cls, variant, stocks):
        create_stocks(variant, stocks)

    @classmethod
    def _save_m2m(cls, info, instance, cleaned_data):
        collections = cleaned_data.get("collections", None)
        if collections is not None:
            instance.collections.set(collections)

    @classmethod
    def perform_mutation(cls, _root, info, **data):
        return super().perform_mutation(_root, info, **data)


class ProductDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a product to delete.")

    class Meta:
        description = "Deletes a product."
        model = models.Product
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"


class ProductBulkDelete(ModelBulkDeleteMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID, required=True, description="List of product IDs to delete."
        )

    class Meta:
        description = "Deletes products."
        model = models.Product
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"


class ProductBulkPublish(BaseBulkMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID, required=True, description="List of products IDs to publish."
        )
        is_published = graphene.Boolean(
            required=True, description="Determine if products will be published or not."
        )

    class Meta:
        description = "Publish products."
        model = models.Product
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def bulk_action(cls, queryset, is_published):
        queryset.update(is_published=is_published)


class ProductUpdate(ProductCreate):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a product to update.")
        input = ProductInput(
            required=True, description="Fields required to update a product."
        )

    class Meta:
        description = "Updates an existing product."
        model = models.Product
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def clean_sku(cls, product_type, cleaned_input):
        input_sku = cleaned_input.get("sku")
        if (
            not product_type.has_variants
            and input_sku
            and models.ProductVariant.objects.filter(sku=input_sku).exists()
        ):
            raise ValidationError(
                {
                    "sku": ValidationError(
                        "Product with this SKU already exists.",
                        code=ProductErrorCode.ALREADY_EXISTS,
                    )
                }
            )

    @classmethod
    @transaction.atomic
    def save(cls, info, instance, cleaned_input):
        instance.save()
        if not instance.product_type.has_variants:
            variant = instance.variants.first()
            update_fields = []
            if "sku" in cleaned_input:
                variant.sku = cleaned_input["sku"]
                update_fields.append("sku")
            if update_fields:
                variant.save(update_fields=update_fields)
        # Recalculate the "minimal variant price"
        update_product_minimal_variant_price_task.delay(instance.pk)