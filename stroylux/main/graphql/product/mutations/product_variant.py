from collections import defaultdict

import graphene
from django.core.exceptions import ValidationError
from django.db import transaction

from main.core.permissions import ProductPermissions
from main.graphql.core.mutations import ModelMutation, ModelDeleteMutation, ModelBulkDeleteMutation, BaseMutation
from main.graphql.core.scalars import Decimal, WeightScalar
from main.graphql.core.types.common import ProductError, BulkProductError, BulkStockError, StockError
from main.graphql.product.mutations.product import StockInput
from main.graphql.product.types import ProductVariant
from main.graphql.product.utils import create_stocks
from main.product import models
from main.product.error_codes import ProductErrorCode
from main.product.models import Stock
from main.product.tasks import update_product_minimal_variant_price_task


class ProductVariantInput(graphene.InputObjectType):
    cost_price = Decimal(description="Cost price of the variant.")
    price_override = Decimal(description="Special price of the particular variant.")
    sku = graphene.String(description="Stock keeping unit.")
    weight = WeightScalar(description="Weight of the Product Variant.", required=False)
    name = graphene.String(description='Product variant name', required=False)


class ProductVariantCreateInput(ProductVariantInput):
    product = graphene.ID(
        description="Product ID of which type is the variant.",
        name="product",
        required=True,
    )
    stocks = graphene.List(
        graphene.NonNull(StockInput),
        description=("Stocks of a product available for sale."),
        required=False,
    )


class ProductVariantCreate(ModelMutation):
    class Arguments:
        input = ProductVariantCreateInput(
            required=True, description="Fields required to create a product variant."
        )

    class Meta:
        description = "Creates a new variant for a product."
        model = models.ProductVariant
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def clean_input(
            cls, info, instance: models.ProductVariant, data: dict, input_cls=None
    ):
        cleaned_input = super().clean_input(info, instance, data)

        if "cost_price" in cleaned_input:
            cost_price = cleaned_input.pop("cost_price")
            if cost_price and cost_price < 0:
                raise ValidationError(
                    {
                        "costPrice": ValidationError(
                            "Product price cannot be lower than 0.",
                            code=ProductErrorCode.INVALID.value,
                        )
                    }
                )
            cleaned_input["cost_price_amount"] = cost_price

        if "price_override" in cleaned_input:
            price_override = cleaned_input.pop("price_override")
            if price_override and price_override < 0:
                raise ValidationError(
                    {
                        "priceOverride": ValidationError(
                            "Product price cannot be lower than 0.",
                            code=ProductErrorCode.INVALID.value,
                        )
                    }
                )
            cleaned_input["price_override_amount"] = price_override

        return cleaned_input

    @classmethod
    def get_instance(cls, info, **data):
        """Prefetch related fields that are needed to process the mutation.
        If we are updating an instance and want to update its attributes,
        # prefetch them.
        """

        object_id = data.get("id")
        if object_id and data.get("attributes"):
            # Prefetches needed by AttributeAssignmentMixin and
            # associate_attribute_values_to_instance
            qs = cls.Meta.model.objects.prefetch_related(
                "product__product_type__variant_attributes__values",
                "product__product_type__attributevariant",
            )
            return cls.get_node_or_error(
                info, object_id, only_type="ProductVariant", qs=qs
            )

        return super().get_instance(info, **data)

    @classmethod
    @transaction.atomic()
    def save(cls, info, instance, cleaned_input):
        instance.save()
        # Recalculate the "minimal variant price" for the parent product
        update_product_minimal_variant_price_task.delay(instance.product_id)
        stocks = cleaned_input.get("stocks")
        if stocks:
            cls.create_variant_stocks(instance, stocks)

    @classmethod
    def create_variant_stocks(cls, variant, stocks):
        create_stocks(variant, stocks)


class ProductVariantUpdate(ProductVariantCreate):
    class Arguments:
        id = graphene.ID(
            required=True, description="ID of a product variant to update."
        )
        input = ProductVariantInput(
            required=True, description="Fields required to update a product variant."
        )

    class Meta:
        description = "Updates an existing variant for product."
        model = models.ProductVariant
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"


class ProductVariantDelete(ModelDeleteMutation):
    class Arguments:
        id = graphene.ID(
            required=True, description="ID of a product variant to delete."
        )

    class Meta:
        description = "Deletes a product variant."
        model = models.ProductVariant
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"

    @classmethod
    def success_response(cls, instance):
        # Update the "minimal_variant_prices" of the parent product
        update_product_minimal_variant_price_task.delay(instance.product_id)
        return super().success_response(instance)


class ProductVariantBulkCreateInput(ProductVariantInput):
    stocks = graphene.List(
        graphene.NonNull(StockInput),
        description=("Stocks of a product available for sale."),
        required=False,
    )
    sku = graphene.String(required=True, description="Stock keeping unit.")


def generate_name_for_variant(instance):
    pass


class ProductVariantBulkCreate(BaseMutation):
    count = graphene.Int(
        required=True,
        default_value=0,
        description="Returns how many objects were created.",
    )
    product_variants = graphene.List(
        graphene.NonNull(ProductVariant),
        required=True,
        default_value=[],
        description="List of the created variants.",
    )

    class Arguments:
        variants = graphene.List(
            ProductVariantBulkCreateInput,
            required=True,
            description="Input list of product variants to create.",
        )
        product_id = graphene.ID(
            description="ID of the product to create the variants for.",
            name="product",
            required=True,
        )

    class Meta:
        description = "Creates product variants for a given product."
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = BulkProductError
        error_type_field = "bulk_product_errors"

    @classmethod
    def clean_variant_input(
            cls,
            info,
            instance: models.ProductVariant,
            data: dict,
            errors: dict,
            variant_index: int,
    ):
        cleaned_input = ModelMutation.clean_input(
            info, instance, data, input_cls=ProductVariantBulkCreateInput
        )

        cost_price_amount = cleaned_input.pop("cost_price", None)
        if cost_price_amount is not None:
            if cost_price_amount < 0:
                errors["costPrice"] = ValidationError(
                    "Product price cannot be lower than 0.",
                    code=ProductErrorCode.INVALID.value,
                    params={"scss": variant_index},
                )
            cleaned_input["cost_price_amount"] = cost_price_amount

        price_override_amount = cleaned_input.pop("price_override", None)
        if price_override_amount is not None:
            if price_override_amount < 0:
                errors["priceOverride"] = ValidationError(
                    "Product price cannot be lower than 0.",
                    code=ProductErrorCode.INVALID.value,
                    params={"scss": variant_index},
                )
            cleaned_input["price_override_amount"] = price_override_amount

        return cleaned_input

    @classmethod
    def add_indexes_to_errors(cls, index, error, error_dict):
        """Append errorsAddressCreate with scss in params to mutation error dict."""
        for key, value in error.error_dict.items():
            for e in value:
                if e.params:
                    e.params["scss"] = index
                else:
                    e.params = {"scss": index}
            error_dict[key].extend(value)

    @classmethod
    def save(cls, info, instance, cleaned_input):
        instance.save()

    @classmethod
    def create_variants(cls, info, cleaned_inputs, product, errors):
        instances = []
        for index, cleaned_input in enumerate(cleaned_inputs):
            if not cleaned_input:
                continue
            try:
                instance = models.ProductVariant()
                cleaned_input["product"] = product
                instance = cls.construct_instance(instance, cleaned_input)
                cls.clean_instance(info, instance)
                instances.append(instance)
            except ValidationError as exc:
                cls.add_indexes_to_errors(index, exc, errors)
        return instances

    @classmethod
    def validate_duplicated_sku(cls, sku, index, sku_list, errors):
        if sku in sku_list:
            errors["sku"].append(
                ValidationError(
                    "Duplicated SKU.", ProductErrorCode.UNIQUE, params={"scss": index}
                )
            )
        sku_list.append(sku)

    @classmethod
    def clean_variants(cls, info, variants, product, errors):
        cleaned_inputs = []
        sku_list = []
        for index, variant_data in enumerate(variants):
            variant_data["product_type"] = product.product_type
            cleaned_input = cls.clean_variant_input(
                info, None, variant_data, errors, index
            )

            cleaned_inputs.append(cleaned_input if cleaned_input else None)

            if not variant_data.sku:
                continue
            cls.validate_duplicated_sku(variant_data.sku, index, sku_list, errors)
        return cleaned_inputs

    @classmethod
    @transaction.atomic
    def save_variants(cls, info, instances, cleaned_inputs):
        assert len(instances) == len(
            cleaned_inputs
        ), "There should be the same number of instances and cleaned inputs."
        for instance, cleaned_input in zip(instances, cleaned_inputs):
            cls.save(info, instance, cleaned_input)
            cls.create_variant_stocks(instance, cleaned_input)

    @classmethod
    def create_variant_stocks(cls, variant, cleaned_input):
        stocks = cleaned_input.get("stocks")
        if not stocks:
            return
        create_stocks(variant, stocks)

    @classmethod
    def perform_mutation(cls, root, info, **data):
        product = cls.get_node_or_error(info, data["product_id"], models.Product)
        errors = defaultdict(list)

        cleaned_inputs = cls.clean_variants(info, data["variants"], product, errors)
        instances = cls.create_variants(info, cleaned_inputs, product, errors)
        if errors:
            raise ValidationError(errors)
        cls.save_variants(info, instances, cleaned_inputs)

        # Recalculate the "minimal variant price" for the parent product
        update_product_minimal_variant_price_task.delay(product.pk)

        return ProductVariantBulkCreate(
            count=len(instances), product_variants=instances
        )


class ProductVariantBulkDelete(ModelBulkDeleteMutation):
    class Arguments:
        ids = graphene.List(
            graphene.ID,
            required=True,
            description="List of product variant IDs to delete.",
        )

    class Meta:
        description = "Deletes product variants."
        model = models.ProductVariant
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = ProductError
        error_type_field = "product_errors"


class ProductVariantStocksCreate(BaseMutation):
    product_variant = graphene.Field(
        ProductVariant, description="Updated product variant."
    )

    class Arguments:
        variant_id = graphene.ID(
            required=True,
            description="ID of a product variant for which stocks will be created.",
        )
        stocks = graphene.List(
            graphene.NonNull(StockInput),
            required=True,
            description="Input list of stocks to create.",
        )

    class Meta:
        description = "Creates stocks for product variant."
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = BulkStockError
        error_type_field = "bulk_stock_errors"

    @classmethod
    def perform_mutation(cls, root, info, **data):
        errors = defaultdict(list)
        stocks = data["stocks"]
        variant = cls.get_node_or_error(
            info, data["variant_id"], only_type=ProductVariant
        )
        if errors:
            raise ValidationError(errors)
        create_stocks(variant, stocks)
        return cls(product_variant=variant)

    @classmethod
    def update_errors(cls, errors, msg, field, code, indexes):
        for index in indexes:
            error = ValidationError(msg, code=code, params={"scss": index})
            errors[field].append(error)


class ProductVariantStocksUpdate(ProductVariantStocksCreate):
    class Meta:
        description = "Update stocks for product variant."
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = BulkStockError
        error_type_field = "bulk_stock_errors"

    @classmethod
    def perform_mutation(cls, root, info, **data):
        errors = defaultdict(list)
        stocks = data["stocks"]
        variant = cls.get_node_or_error(
            info, data["variant_id"], only_type=ProductVariant
        )
        if errors:
            raise ValidationError(errors)
        cls.update_or_create_variant_stocks(variant, stocks)
        return cls(product_variant=variant)

    @classmethod
    @transaction.atomic
    def update_or_create_variant_stocks(cls, variant, stocks_data):
        stocks = []
        for stock_data in stocks_data:
            stock, _ = Stock.objects.get_or_create(
                product_variant=variant
            )
            stock.quantity = stock_data["quantity"]
            stocks.append(stock)
        Stock.objects.bulk_update(stocks, ["quantity"])


class ProductVariantStocksDelete(BaseMutation):
    product_variant = graphene.Field(
        ProductVariant, description="Updated product variant."
    )

    class Arguments:
        variant_id = graphene.ID(
            required=True,
            description="ID of product variant for which stocks will be deleted.",
        )
        warehouse_ids = graphene.List(graphene.NonNull(graphene.ID),)

    class Meta:
        description = "Delete stocks from product variant."
        permissions = (ProductPermissions.MANAGE_PRODUCTS,)
        error_type_class = StockError
        error_type_field = "stock_errors"

    @classmethod
    def perform_mutation(cls, root, info, **data):
        variant = cls.get_node_or_error(info, data["variant_id"], only_type=ProductVariant)
        Stock.objects.filter(product_variant=variant).delete()
        return cls(product_variant=variant)
