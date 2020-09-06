import functools
import operator
from collections import defaultdict

import django_filters
import graphene
from django.db.models import Q, Sum, F, Subquery
from django.db.models.functions import Coalesce
from graphene_django.filter import GlobalIDMultipleChoiceFilter, GlobalIDFilter
from typing import List, Optional, Dict, Iterable

from .descriptions import AttributeDescriptions, AttributeValueDescriptions
from .enums import ProductTypeEnum, StockAvailability
from ..core.filters import EnumFilter, ListObjectTypeFilter, ObjectTypeFilter
from ..core.types import FilterInputObjectType
from ..core.types.common import PriceRangeInput
from ..core.utils import from_global_id_strict_type
from ..utils import filter_by_query_param
from ...product.models import Product, Category, ProductType, Stock, ProductReview, Attribute
from ...search.backends import picker


def filter_search(qs, _, value):
    if value:
        search = picker.pick_backend()
        qs &= search(value).distinct()
    return qs


def filter_fields_containing_value(*search_fields: str):
    """Create a icontains filters through given fields on a given query set object."""
    def _filter_qs(qs, _, value):
        if value:
            qs = filter_by_query_param(qs, value, search_fields)
        return qs

    return _filter_qs


def filter_product_type(qs, _, value):
    if value == ProductTypeEnum.DIGITAL:
        qs = qs.filter(is_digital=True)
    elif value == ProductTypeEnum.SHIPPABLE:
        qs = qs.filter(is_shipping_required=True)
    return qs


def filter_search_stock(qs, _, value):
    search_fields = [
        "product_variant__product__name",
        "product_variant__name"
    ]
    if value:
        qs = qs.select_related("product_variant").prefetch_related(
            "product_variant__product"
        )
        qs = filter_by_query_param(qs, value, search_fields)
    return qs


def filter_categories_products(qs, _, value):
    category_id = value[0]
    pk = from_global_id_strict_type(category_id, 'Category', field="checkout_id")
    root = Category.objects.filter(id=pk).first()
    tree = root.get_descendants(include_self=True)
    qs = Product.objects.published()
    qs = qs.filter(category__in=tree)
    qs = qs.distinct()
    return qs


def filter_attributes_by_product_types(qs, field, value):
    if not value:
        return qs

    if field == "in_category":
        category_id = from_global_id_strict_type(
            value, only_type="Category", field=field
        )
        category = Category.objects.filter(pk=category_id).first()

        if category is None:
            return qs.none()

        tree = category.get_descendants(include_self=True)
        product_qs = Product.objects.filter(category__in=tree)
    else:
        raise NotImplementedError(f"Filtering by {field} is unsupported")

    product_types = set(product_qs.values_list("product_type_id", flat=True))
    return qs.filter(
        Q(product_types__in=product_types) | Q(product_variant_types__in=product_types)
    )


T_PRODUCT_FILTER_QUERIES = Dict[int, Iterable[int]]


def filter_products_by_attributes_values(qs, queries: T_PRODUCT_FILTER_QUERIES):
    # Combine filters of the same attribute with OR operator
    # and then combine full query with AND operator.
    # combine_and = [
    #     Q(**{"attributes__values__pk__in": values_pk})
    #     | Q(**{"variants__attributes__values__pk__in": values_pk})
    #     for _, values_pk in queries.items()
    # ]
    for _, values_pk in queries.items():
        qs = qs.filter(Q(**{"attributes__values__pk__in": values_pk})
                       | Q(**{"variants__attributes__values__pk__in": values_pk}))
    # query = functools.reduce(operator.and_, combine_and)
    # qs = qs.filter(query).distinct()
    return qs.distinct()


def _clean_product_attributes_filter_input(
        filter_value,
) -> Dict[int, List[Optional[int]]]:
    attributes = Attribute.objects.prefetch_related("values")
    attributes_map: Dict[str, int] = {
        attribute.slug: attribute.pk for attribute in attributes
    }
    values_map: Dict[str, Dict[str, int]] = {
        attr.slug: {value.slug: value.pk for value in attr.values.all()}
        for attr in attributes
    }
    queries: Dict[int, List[Optional[int]]] = defaultdict(list)
    # Convert attribute:value pairs into a dictionary where
    # attributes are keys and values are grouped in lists
    for attr_name, val_slugs in filter_value:
        if attr_name not in attributes_map:
            raise ValueError("Unknown attribute name: %r" % (attr_name,))
        attr_pk = attributes_map[attr_name]
        attr_val_pk = [
            values_map[attr_name][val_slug]
            for val_slug in val_slugs
            if val_slug in values_map[attr_name]
        ]
        queries[attr_pk] += attr_val_pk
    return queries


def filter_products_by_attributes(qs, filter_value):
    queries = _clean_product_attributes_filter_input(filter_value)
    return filter_products_by_attributes_values(qs, queries)


def filter_attributes(qs, _, value):
    if value:
        value_list = []
        for v in value:
            slug = v["slug"]
            values = v.get("values", [])
            value_list.append((slug, values))
        qs = filter_products_by_attributes(qs, value_list)
    return qs


def filter_products_by_price(qs, price_lte=None, price_gte=None):
    if price_lte:
        qs = qs.filter(maximal_variant_price_amount__gte=price_lte)
    if price_gte:
        qs = qs.filter(minimal_variant_price_amount__lte=price_gte)
    return qs


def filter_price(qs, _, value):
    qs = filter_products_by_price(
        qs, price_lte=value.get("lte"), price_gte=value.get("gte")
    )
    return qs

def filter_products_by_stock_availability(qs, stock_availability):
    total_stock = (
        Stock.objects.select_related("product_variant")
        .values("product_variant__product_id")
        .annotate(
            total_quantity_allocated=Coalesce(Sum("allocations__quantity_allocated"), 0)
        )
        .annotate(total_quantity=Coalesce(Sum("quantity"), 0))
        .annotate(total_available=F("total_quantity") - F("total_quantity_allocated"))
        .filter(total_available__lte=0)
        .values_list("product_variant__product_id", flat=True)
    )
    if stock_availability == StockAvailability.IN_STOCK:
        qs = qs.exclude(id__in=Subquery(total_stock))
    elif stock_availability == StockAvailability.OUT_OF_STOCK:
        qs = qs.filter(id__in=Subquery(total_stock))
    return qs


def filter_stock_availability(qs, _, value):
    if value:
        qs = filter_products_by_stock_availability(qs, value)
    return qs


class AttributeInput(graphene.InputObjectType):
    slug = graphene.String(required=True, description=AttributeDescriptions.SLUG)
    values = graphene.List(
        graphene.String, required=False, description=AttributeValueDescriptions.SLUG
    )


class ProductFilter(django_filters.FilterSet):
    is_published = django_filters.BooleanFilter()
    product_types = GlobalIDMultipleChoiceFilter(field_name="product_type")
    categories = GlobalIDMultipleChoiceFilter(method=filter_categories_products)
    search = django_filters.CharFilter(method=filter_search)
    attributes = ListObjectTypeFilter(
        input_class=AttributeInput, method=filter_attributes
    )
    price = ObjectTypeFilter(
        input_class=PriceRangeInput, method=filter_price, field_name="price_amount"
    )
    stock_availability = EnumFilter(
        input_class=StockAvailability, method=filter_stock_availability
    )

    class Meta:
        model = Product
        fields = [
            "is_published",
            "product_type",
            "search",
            "stock_availability"
        ]


class ProductReviewFilter(django_filters.FilterSet):
    class Meta:
        model = ProductReview
        fields = [
            "status",
            "rating",
            "created_at",
            "product"
        ]


class ProductTypeFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(
        method=filter_fields_containing_value("name", "slug")
    )

    product_type = EnumFilter(input_class=ProductTypeEnum, method=filter_product_type)
    ids = GlobalIDMultipleChoiceFilter(field_name="id")

    class Meta:
        model = ProductType
        fields = ["search", "product_type"]


class CategoryFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(
        method=filter_fields_containing_value("slug", "name", "description")
    )
    ids = GlobalIDMultipleChoiceFilter(field_name="id")

    class Meta:
        model = Category
        fields = ["search"]


class StockFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method=filter_search_stock)

    class Meta:
        model = Stock
        fields = ["quantity"]


class AttributeFilter(django_filters.FilterSet):
    # Search by attribute name and slug
    search = django_filters.CharFilter(
        method=filter_fields_containing_value("slug", "name")
    )
    ids = GlobalIDMultipleChoiceFilter(field_name="id")

    in_category = GlobalIDFilter(method=filter_attributes_by_product_types)

    class Meta:
        model = Attribute
        fields = [
            "value_required",
            "is_variant_only",
            "visible_in_storefront",
            "filterable_in_storefront",
            "filterable_in_dashboard",
            "available_in_grid",
        ]


class ProductFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = ProductFilter


class ProductTypeFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = ProductTypeFilter


class CategoryFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = CategoryFilter


class StockFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = StockFilter


class ProductReviewFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = ProductReviewFilter


class AttributeFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = AttributeFilter