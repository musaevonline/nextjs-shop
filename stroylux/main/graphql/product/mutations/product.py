from typing import Union, Tuple, List, Iterable

import graphene
from django.core.exceptions import ValidationError
from django.db import transaction
from django.db.models import QuerySet, Q
from django.utils.text import slugify
from graphql_relay import from_global_id

from ..utils import create_stocks, validate_attribute_input_for_product, validate_attribute_input_for_variant
from ...core.mutations import ModelMutation, ModelDeleteMutation, ModelBulkDeleteMutation, BaseBulkMutation
from ...core.types.common import ProductError
from ...core.utils import validate_slug_and_generate_if_needed
from ....core.permissions import ProductPermissions
from ....product import models
from ....product.error_codes import ProductErrorCode
from ....product.tasks import update_product_minimal_variant_price_task
from ....product.utils.attributes import associate_attribute_values_to_instance


class AttributeValueInput(graphene.InputObjectType):
    id = graphene.ID(description="ID of the selected attribute.")
    values = graphene.List(
        graphene.String,
        required=True,
        description=(
            "The value or slug of an attribute to resolve. "
            "If the passed value is non-existent, it will be created."
        ),
    )


class ProductInput(graphene.InputObjectType):
    attributes = graphene.List(AttributeValueInput, description="List of attributes.")
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
    # base_price = Decimal(description="Product price.")
    sku = graphene.String(
        description=(
            "Stock keeping unit of a product. Note: this field is only used if "
            "a product doesn't use variants."
        )
    )


class StockInput(graphene.InputObjectType):
    quantity = graphene.Int(description="Quantity of items available for sell.")
    id = graphene.ID(description="Stock id")


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
T_INPUT_MAP = List[Tuple[models.Attribute, List[str]]]

class AttributeAssignmentMixin:
    """Handles cleaning of the attribute input and creating the proper relations.

    1. You should first call ``clean_input``, to transform and attempt to resolve
       the provided input into actual objects. It will then perform a few
       checks to validate the operations supplied by the user are possible and allowed.
    2. Once everything is ready and all your data is saved inside a transaction,
       you shall call ``save`` with the cleaned input to build all the required
       relations. Once the ``save`` call is done, you are safe from continuing working
       or to commit the transaction.

    Note: you shall never call ``save`` outside of a transaction and never before
    the targeted instance owns a primary key. Failing to do so, the relations will
    be unable to build or might only be partially built.
    """

    @classmethod
    def _resolve_attribute_nodes(
        cls,
        qs: QuerySet,
        *,
        global_ids: List[str],
        pks: Iterable[int],
        slugs: Iterable[str],
    ):
        """Retrieve attributes nodes from given global IDs and/or slugs."""
        qs = qs.filter(Q(pk__in=pks) | Q(slug__in=slugs))
        nodes = list(qs)  # type: List[models.Attribute]

        if not nodes:
            raise ValidationError(
                (
                    f"Could not resolve to a node: ids={global_ids}"
                    f" and slugs={list(slugs)}"
                ),
                code=ProductErrorCode.NOT_FOUND.value,
            )

        nodes_pk_list = set()
        nodes_slug_list = set()
        for node in nodes:
            nodes_pk_list.add(node.pk)
            nodes_slug_list.add(node.slug)

        for pk, global_id in zip(pks, global_ids):
            if pk not in nodes_pk_list:
                raise ValidationError(
                    f"Could not resolve {global_id!r} to Attribute",
                    code=ProductErrorCode.NOT_FOUND.value,
                )

        for slug in slugs:
            if slug not in nodes_slug_list:
                raise ValidationError(
                    f"Could not resolve slug {slug!r} to Attribute",
                    code=ProductErrorCode.NOT_FOUND.value,
                )

        return nodes

    @classmethod
    def _resolve_attribute_global_id(cls, global_id: str) -> int:
        """Resolve an Attribute global ID into an internal ID (int)."""
        graphene_type, internal_id = from_global_id(global_id)  # type: str, str
        if graphene_type != "Attribute":
            raise ValidationError(
                f"Must receive an Attribute id, got {graphene_type}.",
                code=ProductErrorCode.INVALID.value,
            )
        if not internal_id.isnumeric():
            raise ValidationError(
                f"An invalid ID value was passed: {global_id}",
                code=ProductErrorCode.INVALID.value,
            )
        return int(internal_id)

    @classmethod
    def _pre_save_values(cls, attribute: models.Attribute, values: List[str]):
        """Lazy-retrieve or create the database objects from the supplied raw values."""
        print(attribute)
        get_or_create = attribute.values.get_or_create
        return tuple(
            get_or_create(
                attribute=attribute, slug=slugify(value), defaults={"name": value}
            )[0]
            for value in values
        )

    @classmethod
    def _check_input_for_product(cls, cleaned_input: T_INPUT_MAP, qs: QuerySet):
        """Check the cleaned attribute input for a product.

        An Attribute queryset is supplied.

        - ensure all required attributes are passed
        - ensure the values are correct for a product
        """
        supplied_attribute_pk = []
        for attribute, values in cleaned_input:
            validate_attribute_input_for_product(attribute, values)
            supplied_attribute_pk.append(attribute.pk)

        # Asserts all required attributes are supplied
        missing_required_filter = Q(value_required=True) & ~Q(
            pk__in=supplied_attribute_pk
        )

        if qs.filter(missing_required_filter).exists():
            raise ValidationError(
                "All attributes flagged as having a value required must be supplied.",
                code=ProductErrorCode.REQUIRED.value,
            )

    @classmethod
    def _check_input_for_variant(cls, cleaned_input: T_INPUT_MAP, qs: QuerySet):
        """Check the cleaned attribute input for a variant.

        An Attribute queryset is supplied.

        - ensure all attributes are passed
        - ensure the values are correct for a variant
        """
        if len(cleaned_input) != qs.count():
            raise ValidationError(
                "All attributes must take a value", code=ProductErrorCode.REQUIRED.value
            )

        for attribute, values in cleaned_input:
            validate_attribute_input_for_variant(attribute, values)

    @classmethod
    def _validate_input(
        cls, cleaned_input: T_INPUT_MAP, attribute_qs, is_variant: bool
    ):
        """Check if no invalid operations were supplied.

        :raises ValidationError: when an invalid operation was found.
        """
        if is_variant:
            return cls._check_input_for_variant(cleaned_input, attribute_qs)
        else:
            return cls._check_input_for_product(cleaned_input, attribute_qs)

    @classmethod
    def clean_input(
        cls, raw_input: dict, attributes_qs: QuerySet, is_variant: bool
    ) -> T_INPUT_MAP:
        """Resolve and prepare the input for further checks.

        :param raw_input: The user's attributes input.
        :param attributes_qs:
            A queryset of attributes, the attribute values must be prefetched.
            Prefetch is needed by ``_pre_save_values`` during save.
        :param is_variant: Whether the input is for a variant or a product.

        :raises ValidationError: contain the message.
        :return: The resolved data
        """

        # Mapping to associate the input values back to the resolved attribute nodes
        pks = {}
        slugs = {}

        # Temporary storage of the passed ID for error reporting
        global_ids = []

        for attribute_input in raw_input:
            global_id = attribute_input.get("id")
            slug = attribute_input.get("slug")
            values = attribute_input["values"]

            if global_id:
                internal_id = cls._resolve_attribute_global_id(global_id)
                global_ids.append(global_id)
                pks[internal_id] = values
            elif slug:
                slugs[slug] = values
            else:
                raise ValidationError(
                    "You must whether supply an ID or a slug",
                    code=ProductErrorCode.REQUIRED.value,
                )

        attributes = cls._resolve_attribute_nodes(
            attributes_qs, global_ids=global_ids, pks=pks.keys(), slugs=slugs.keys()
        )
        cleaned_input = []
        for attribute in attributes:
            key = pks.get(attribute.pk, None)

            # Retrieve the primary key by slug if it
            # was not resolved through a global ID but a slug
            if key is None:
                key = slugs[attribute.slug]

            cleaned_input.append((attribute, key))
        cls._validate_input(cleaned_input, attributes_qs, is_variant)
        return cleaned_input

    @classmethod
    def save(cls, instance: T_INSTANCE, cleaned_input: T_INPUT_MAP):
        """Save the cleaned input into the database against the given instance.

        Note: this should always be ran inside a transaction.

        :param instance: the product or variant to associate the attribute against.
        :param cleaned_input: the cleaned user input (refer to clean_attributes)
        """
        for attribute, values in cleaned_input:
            attribute_values = cls._pre_save_values(attribute, values)
            associate_attribute_values_to_instance(
                instance, attribute, *attribute_values
            )


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
    def clean_attributes(
            cls, attributes: dict, product_type: models.ProductType
    ) -> T_INPUT_MAP:
        attributes_qs = product_type.product_attributes
        attributes = AttributeAssignmentMixin.clean_input(
            attributes, attributes_qs, is_variant=False
        )
        return attributes

    @classmethod
    def clean_input(cls, info, instance, data):
        cleaned_input = super().clean_input(info, instance, data)

        attributes = cleaned_input.get("attributes")

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
        # price = data.get("base_price", data.get("price"))
        # if price is not None:
        #     if price < 0:
        #         raise ValidationError(
        #             {
        #                 "basePrice": ValidationError(
        #                     "Product base price cannot be lower than 0.",
        #                     code=ProductErrorCode.INVALID,
        #                 )
        #             }
        #         )
        if instance.minimal_variant_price_amount is None:
            cleaned_input["minimal_variant_price_amount"] = 0
        if attributes and product_type:
            try:
                cleaned_input["attributes"] = cls.clean_attributes(
                    attributes, product_type
                )
            except ValidationError as exc:
                raise ValidationError({"attributes": exc})
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
            qs = models.Product.objects.all()
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
        attributes = cleaned_input.get("attributes")
        if attributes:
            AttributeAssignmentMixin.save(instance, attributes)

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
    def clean_input(cls, info, instance, data):
        return super().clean_input(info, instance, data)

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

        attributes = cleaned_input.get("attributes")
        if attributes:
            AttributeAssignmentMixin.save(instance, attributes)