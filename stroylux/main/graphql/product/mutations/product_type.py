import graphene
from django.core.exceptions import ValidationError, ObjectDoesNotExist
from django.db import transaction

from main.core.permissions import ProductPermissions
from main.graphql.core.mutations import ModelMutation, ModelDeleteMutation, ModelBulkDeleteMutation, BaseMutation
from main.graphql.core.scalars import WeightScalar
from main.graphql.core.types.common import ProductError
from main.graphql.core.utils import validate_slug_and_generate_if_needed, from_global_id_strict_type
from main.graphql.core.utils.reordering import perform_reordering
from main.graphql.product.enums import AttributeTypeEnum
from main.graphql.product.mutations.attributes import ReorderInput
from main.graphql.product.types import ProductType, Attribute
from main.product import models
from main.product.error_codes import ProductErrorCode
from main.product.tasks import update_variants_names


class ProductTypeInput(graphene.InputObjectType):
    name = graphene.String(description="Name of the product type.")
    slug = graphene.String(description="Product type slug.")
    has_variants = graphene.Boolean(
        description=(
            "Determines if product of this type has multiple variants. This option "
            "mainly simplifies product management in the dashboard. There is always at "
            "least one variant created under the hood."
        )
    )
    product_attributes = graphene.List(
        graphene.ID,
        description="List of attributes shared among all product variants.",
        name="productAttributes",
    )
    variant_attributes = graphene.List(
        graphene.ID,
        description=(
            "List of attributes used to distinguish between different variants of "
            "a product."
        ),
        name="variantAttributes",
    )
    is_shipping_required = graphene.Boolean(
        description="Determines if shipping is required for products of this variant."
    )
    is_digital = graphene.Boolean(
        description="Determines if products are digital.", required=False
    )
    weight = WeightScalar(description="Weight of the Product Variant.", required=False)


class ProductTypeCreate(ModelMutation):
    class Arguments:
        input = ProductTypeInput(
            required=True, description="Fields required to create a product type."
        )

    class Meta:
        description = "Creates a new product type."
        model = models.ProductType
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)
        try:
            cleaned_input = validate_slug_and_generate_if_needed(
                instance, "name", cleaned_input
            )
        except ValidationError as error:
            error.code = ProductErrorCode.REQUIRED.value
            raise ValidationError({"slug": error})
        return cleaned_input

    @classmethod
    def _save_m2m(cls, info, instance, cleaned_data):
        super()._save_m2m(info, instance, cleaned_data)
        if "product_attributes" in cleaned_data:
            instance.product_attributes.set(cleaned_data["product_attributes"])
        if "variant_attributes" in cleaned_data:
            instance.variant_attributes.set(cleaned_data["variant_attributes"])


class ProductTypeUpdate(ProductTypeCreate):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a product type to update.")
        input = ProductTypeInput(
            required=True, description="Fields required to update a product type."
        )

    class Meta:
        description = "Updates an existing product type."
        model = models.ProductType
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def save(cls, info, instance, cleaned_input):
        variant_attr = cleaned_input.get("variant_attributes")
        if variant_attr:
            variant_attr = set(variant_attr)
            variant_attr_ids = [attr.pk for attr in variant_attr]
            update_variants_names.delay(instance.pk, variant_attr_ids)
        super().save(info, instance, cleaned_input)


class ProductTypeDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(required=True, description="ID of a product type to delete.")

    class Meta:
        description = "Deletes a product type."
        model = models.ProductType
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"


class ProductTypeBulkDelete(ModelBulkDeleteMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID,
            required=True,
            description="List of product type IDs to delete.",
        )

    class Meta:
        description = "Deletes product types."
        model = models.ProductType
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"


class ProductTypeReorderAttributes(BaseMutation):
    product_type = graphene.Field(
        ProductType, description="Product type from which attributes are reordered."
    )

    class Meta:
        description = "Reorder the attributes of a product type."
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    class Arguments:
        product_type_id = graphene.Argument(
            graphene.ID, required=True, description="ID of a product type."
        )
        type = AttributeTypeEnum(
            required=True, description="The attribute type to reorder."
        )
        moves = graphene.List(
            ReorderInput,
            required=True,
            description="The list of attribute reordering operations.",
        )

    @classmethod
    def perform_mutation(cls, _root, info, product_type_id, type, moves):
        pk = from_global_id_strict_type(
            product_type_id, only_type=ProductType, field="product_type_id"
        )

        if type == AttributeTypeEnum.PRODUCT:
            m2m_field = "attributeproduct"
        else:
            m2m_field = "attributevariant"

        try:
            product_type = models.ProductType.objects.prefetch_related(m2m_field).get(
                pk=pk
            )
        except ObjectDoesNotExist:
            raise ValidationError(
                {
                    "product_type_id": ValidationError(
                        (f"Couldn't resolve to a product type: {product_type_id}"),
                        code=ProductErrorCode.NOT_FOUND,
                    )
                }
            )

        attributes_m2m = getattr(product_type, m2m_field)
        operations = {}

        # Resolve the attributes
        for move_info in moves:
            attribute_pk = from_global_id_strict_type(
                move_info.id, only_type=Attribute, field="moves"
            )

            try:
                m2m_info = attributes_m2m.get(attribute_id=int(attribute_pk))
            except ObjectDoesNotExist:
                raise ValidationError(
                    {
                        "moves": ValidationError(
                            f"Couldn't resolve to an attribute: {move_info.id}",
                            code=ProductErrorCode.NOT_FOUND,
                        )
                    }
                )
            operations[m2m_info.pk] = move_info.sort_order

        with transaction.atomic():
            perform_reordering(attributes_m2m, operations)
        return ProductTypeReorderAttributes(product_type=product_type)