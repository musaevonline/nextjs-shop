import graphene
from django.db.models import QuerySet, Subquery, OuterRef, IntegerField, Count
from django.db.models.functions import Coalesce

from ..core.types.sort_input import SortInputObjectType
from ...product.models import Category, Product


class ProductOrderField(graphene.Enum):
    NAME = ["name", "slug"]
    DATE = ["created_at", "updated_at", "name", "slug"]
    TYPE = ["product_type__name", "name", "slug"]
    PUBLISHED = ["is_published", "name", "slug"]
    ORDER_COUNT = ["order_count", "name", "slug"]

    @property
    def description(self):
        # pylint: disable=no-member
        descriptions = {
            ProductOrderField.NAME.name: "name",
            ProductOrderField.TYPE.name: "type",
            ProductOrderField.DATE.name: "create date",
            ProductOrderField.PUBLISHED.name: "publication status",
            ProductOrderField.ORDER_COUNT.name: "popular",
        }
        if self.name in descriptions:
            return f"Sort products by {descriptions[self.name]}."
        raise ValueError("Unsupported enum value: %s" % self.value)

    @staticmethod
    def qs_with_order_count(queryset: QuerySet) -> QuerySet:
        return queryset.annotate(order_count=Count('variants__order_lines'))


class ProductReviewOrderField(graphene.Enum):
    DATE = ["created_at", "updated_at"]
    STATUS = ["status"]

    @property
    def description(self):
        # pylint: disable=no-member
        descriptions = {
            ProductOrderField.STATUS.name: "status",
            ProductOrderField.DATE.name: "create date",
        }
        if self.name in descriptions:
            return f"Sort products by {descriptions[self.name]}."
        raise ValueError("Unsupported enum value: %s" % self.value)


class ProductOrder(SortInputObjectType):
    attribute_id = graphene.Argument(
        graphene.ID,
        description=(
            "Sort product by the selected attribute's values.\n"
            "Note: this doesn't take translations into account yet."
        ),
    )
    field = graphene.Argument(
        ProductOrderField, description=f"Sort products by the selected field."
    )

    class Meta:
        sort_enum = ProductOrderField


class ProductReviewOrder(SortInputObjectType):
    field = graphene.Argument(
        ProductOrderField, description=f"Sort reviews by the selected field."
    )

    class Meta:
        sort_enum = ProductReviewOrderField


class CategorySortField(graphene.Enum):
    NAME = ["name", "slug"]
    PRODUCT_COUNT = ["product_count", "name", "slug"]
    SUBCATEGORY_COUNT = ["subcategory_count", "name", "slug"]

    @property
    def description(self):
        # pylint: disable=no-member
        if self in [
            CategorySortField.NAME,
            CategorySortField.PRODUCT_COUNT,
            CategorySortField.SUBCATEGORY_COUNT,
        ]:
            sort_name = self.name.lower().replace("_", " ")
            return f"Sort categories by {sort_name}."
        raise ValueError("Unsupported enum value: %s" % self.value)

    @staticmethod
    def qs_with_product_count(queryset: QuerySet) -> QuerySet:
        return queryset.annotate(
            product_count=Coalesce(
                Subquery(
                    Category.tree.add_related_count(
                        queryset, Product, "category", "p_c", cumulative=True
                    )
                        .values("p_c")
                        .filter(pk=OuterRef("pk"))[:1]
                ),
                0,
                output_field=IntegerField(),
            )
        )

    @staticmethod
    def qs_with_subcategory_count(queryset: QuerySet) -> QuerySet:
        return queryset.annotate(subcategory_count=Count("children__id"))


class CategorySortingInput(SortInputObjectType):
    class Meta:
        sort_enum = CategorySortField
        type_name = "categories"


class ProductTypeSortField(graphene.Enum):
    NAME = ["name", "slug"]
    DIGITAL = ["is_digital", "name", "slug"]
    SHIPPING_REQUIRED = ["is_shipping_required", "name", "slug"]

    @property
    def description(self):
        # pylint: disable=no-member
        descriptions = {
            ProductTypeSortField.NAME.name: "name",
            ProductTypeSortField.DIGITAL.name: "type",
            ProductTypeSortField.SHIPPING_REQUIRED.name: "shipping",
        }
        if self.name in descriptions:
            return f"Sort products by {descriptions[self.name]}."
        raise ValueError("Unsupported enum value: %s" % self.value)


class AttributeSortField(graphene.Enum):
    NAME = ["name", "slug"]
    SLUG = ["slug"]
    VALUE_REQUIRED = ["value_required", "name", "slug"]
    IS_VARIANT_ONLY = ["is_variant_only", "name", "slug"]
    VISIBLE_IN_STOREFRONT = ["visible_in_storefront", "name", "slug"]
    FILTERABLE_IN_STOREFRONT = ["filterable_in_storefront", "name", "slug"]
    FILTERABLE_IN_DASHBOARD = ["filterable_in_dashboard", "name", "slug"]
    STOREFRONT_SEARCH_POSITION = ["storefront_search_position", "name", "pk"]
    AVAILABLE_IN_GRID = ["available_in_grid", "name", "pk"]

    @property
    def description(self):
        # pylint: disable=no-member
        descriptions = {
            AttributeSortField.NAME.name: "Sort attributes by name",
            AttributeSortField.SLUG.name: "Sort attributes by slug",
            AttributeSortField.VALUE_REQUIRED.name: (
                "Sort attributes by the value required flag"
            ),
            AttributeSortField.IS_VARIANT_ONLY.name: (
                "Sort attributes by the variant only flag"
            ),
            AttributeSortField.VISIBLE_IN_STOREFRONT.name: (
                "Sort attributes by visibility in the storefront"
            ),
            AttributeSortField.FILTERABLE_IN_STOREFRONT.name: (
                "Sort attributes by the filterable in storefront flag"
            ),
            AttributeSortField.FILTERABLE_IN_DASHBOARD.name: (
                "Sort attributes by the filterable in dashboard flag"
            ),
            AttributeSortField.STOREFRONT_SEARCH_POSITION.name: (
                "Sort attributes by their position in storefront"
            ),
            AttributeSortField.AVAILABLE_IN_GRID.name: (
                "Sort attributes based on whether they can be displayed "
                "or not in a product grid."
            ),
        }
        if self.name in descriptions:
            return descriptions[self.name]
        raise ValueError("Unsupported enum value: %s" % self.value)


class ProductTypeSortingInput(SortInputObjectType):
    class Meta:
        sort_enum = ProductTypeSortField
        type_name = "product types"


class AttributeSortingInput(SortInputObjectType):
    class Meta:
        sort_enum = AttributeSortField
        type_name = "attributes"
