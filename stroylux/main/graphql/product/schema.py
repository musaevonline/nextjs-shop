import graphene
import graphene_django_optimizer

from .filters import ProductFilterInput, CategoryFilterInput, ProductTypeFilterInput, StockFilterInput, \
    AttributeFilterInput, ProductReviewFilterInput
from .mutations.attributes import AttributeCreate, AttributeDelete, AttributeUpdate, AttributeValueCreate, \
    AttributeValueDelete, AttributeValueUpdate
from .mutations.category import CategoryCreate, CategoryDelete, CategoryBulkDelete, CategoryUpdate
from .mutations.product import ProductCreate, ProductDelete, ProductBulkDelete, ProductBulkPublish, ProductUpdate
from .mutations.product_image import ProductImageCreate, ProductImageDelete, ProductImageReorder, ProductImageUpdate, \
    ProductImageBulkDelete
from .mutations.product_review import ProductReviewCreate
from .mutations.product_type import ProductTypeCreate, ProductTypeDelete, ProductTypeBulkDelete, ProductTypeUpdate
from .mutations.product_variant import ProductVariantCreate, ProductVariantDelete, ProductVariantBulkDelete, \
    ProductVariantUpdate, ProductVariantBulkCreate, ProductVariantStocksCreate, ProductVariantStocksDelete, \
    ProductVariantStocksUpdate, VariantImageAssign, VariantImageUnassign
from .resolvers import resolve_products, resolve_categories, resolve_product_variants, resolve_product_types, \
    resolve_attributes, resolve_product_reviews
from .sorters import ProductOrder, CategorySortingInput, ProductTypeSortingInput, AttributeSortingInput, \
    ProductReviewOrder
from .types import Product, ProductVariant, Category, ProductType, Stock
from main.graphql.core.fields import FilterInputConnectionField, PrefetchingConnectionField
from .types.attributes import Attribute
# from .types.products import ProductReview
from .types.products import ProductReview
from ..decorators import permission_required
from ...core.permissions import ProductPermissions
from ...product import models


class ProductQueries(graphene.ObjectType):
    category = graphene.Field(
        Category,
        id=graphene.Argument(
            graphene.ID, required=True, description="ID of the category."
        ),
        description="Look up a category by ID.",
    )
    categories = FilterInputConnectionField(
        Category,
        filter=CategoryFilterInput(description="Filtering options for categories."),
        sort_by=CategorySortingInput(description="Sort categories."),
        level=graphene.Argument(
            graphene.Int,
            description="Filter categories by the nesting level in the category tree.",
        ),
        description="List of the shop's categories.",
    )
    product = graphene.Field(
        Product,
        id=graphene.Argument(
            graphene.ID, description="ID of the product.", required=True
        ),
        description="Look up a product by ID.",
    )
    products = FilterInputConnectionField(
        Product,
        filter=ProductFilterInput(description="Filtering options for products."),
        sort_by=ProductOrder(description="Sort products."),
        ids=graphene.List(
            graphene.ID, description="Filter products by given IDs."
        ),
        description="List of the shop's products.",
    )
    product_variant = graphene.Field(
        ProductVariant,
        id=graphene.Argument(
            graphene.ID, description="ID of the product variant.", required=True
        ),
        description="Look up a product variant by ID.",
    )
    product_variants = PrefetchingConnectionField(
        ProductVariant,
        ids=graphene.List(
            graphene.ID, description="Filter product variants by given IDs."
        ),
        description="List of product variants.",
    )
    product_type = graphene.Field(
        ProductType,
        id=graphene.Argument(
            graphene.ID, description="ID of the product type.", required=True
        ),
        description="Look up a product type by ID.",
    )
    product_types = FilterInputConnectionField(
        ProductType,
        filter=ProductTypeFilterInput(
            description="Filtering options for product types."
        ),
        sort_by=ProductTypeSortingInput(description="Sort product types."),
        description="List of the shop's product types.",
    )
    stock = graphene.Field(
        Stock,
        description="Look up a stock by ID",
        id=graphene.ID(required=True, description="ID of an warehouse"),
    )
    stocks = FilterInputConnectionField(
        Stock, description="List of stocks.", filter=StockFilterInput()
    )
    attributes = FilterInputConnectionField(
        Attribute,
        description="List of the shop's attributes.",
        filter=AttributeFilterInput(description="Filtering options for attributes."),
        sort_by=AttributeSortingInput(description="Sorting options for attributes."),
    )
    attribute = graphene.Field(
        Attribute,
        id=graphene.Argument(
            graphene.ID, description="ID of the attribute.", required=True
        ),
        description="Look up an attribute by ID.",
    )
    product_review = graphene.Field(
        ProductReview,
        id=graphene.Argument(
            graphene.ID, description="ID of the product review.", required=True
        ),
        description="Look up a product by ID.",
    )
    product_reviews = FilterInputConnectionField(
        ProductReview,
        filter=ProductReviewFilterInput(description="Filtering options for product reviews."),
        sort_by=ProductReviewOrder(description="Sort product reviews."),
        description="List of the shop's products.",
    )
    # reviews = FilterInputConnectionField(
    #     lambda: ProductReview,
    #     filter=ProductReviewFilterInput(description="Filtering options for reviews."),
    #     sort_by=ProductReviewOrderField(description="Sort reviews."),
    #     description="List of the shop's product reviews.",
    # )

    @staticmethod
    def resolve_categories(self, info, level=None, **kwargs):
        return resolve_categories(info, level=level, **kwargs)

    @staticmethod
    def resolve_category(self, info, id):
        return graphene.Node.get_node_from_global_id(info, id, Category)

    @staticmethod
    def resolve_product(self, info, id):
        return graphene.Node.get_node_from_global_id(info, id, Product)

    @staticmethod
    def resolve_products(self, info, ids=None, **kwargs):
        return resolve_products(info, ids, **kwargs)

    @staticmethod
    def resolve_product_type(self, info, id):
        return graphene.Node.get_node_from_global_id(info, id, ProductType)

    @staticmethod
    def resolve_product_types(self, info, **kwargs):
        return resolve_product_types(info, **kwargs)

    @staticmethod
    def resolve_product_variant(self, info, id):
        return graphene.Node.get_node_from_global_id(info, id, ProductVariant)

    @staticmethod
    def resolve_product_variants(self, info, ids=None, **_kwargs):
        return resolve_product_variants(info, ids)

    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_stock(self, info, **kwargs):
        stock_id = kwargs.get("id")
        stock = graphene.Node.get_node_from_global_id(info, stock_id, Stock)
        return stock

    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_stocks(self, info, **_kwargs):
        qs = models.Stock.objects.all()
        return graphene_django_optimizer.query(qs, info)

    @staticmethod
    def resolve_attributes(self, info, **kwargs):
        return resolve_attributes(info, **kwargs)

    @staticmethod
    def resolve_attribute(self, info, id):
        return graphene.Node.get_node_from_global_id(info, id, Attribute)

    @staticmethod
    def resolve_product_review(self, info, id):
        return graphene.Node.get_node_from_global_id(info, id, ProductReview)

    @staticmethod
    def resolve_product_reviews(self, info, **kwargs):
        return resolve_product_reviews(info, **kwargs)


class ProductMutations(graphene.ObjectType):
    attribute_create = AttributeCreate.Field()
    attribute_delete = AttributeDelete.Field()
    attribute_update = AttributeUpdate.Field()

    attribute_value_create = AttributeValueCreate.Field()
    attribute_value_delete = AttributeValueDelete.Field()
    attribute_value_update = AttributeValueUpdate.Field()

    category_create = CategoryCreate.Field()
    category_delete = CategoryDelete.Field()
    category_bulk_delete = CategoryBulkDelete.Field()
    category_update = CategoryUpdate.Field()

    product_create = ProductCreate.Field()
    product_delete = ProductDelete.Field()
    product_bulk_delete = ProductBulkDelete.Field()
    product_bulk_publish = ProductBulkPublish.Field()
    product_update = ProductUpdate.Field()

    product_image_create = ProductImageCreate.Field()
    product_image_delete = ProductImageDelete.Field()
    product_image_bulk_delete = ProductImageBulkDelete.Field()
    product_image_reorder = ProductImageReorder.Field()
    product_image_update = ProductImageUpdate.Field()

    product_type_create = ProductTypeCreate.Field()
    product_type_delete = ProductTypeDelete.Field()
    product_type_bulk_delete = ProductTypeBulkDelete.Field()
    product_type_update = ProductTypeUpdate.Field()

    product_variant_create = ProductVariantCreate.Field()
    product_variant_delete = ProductVariantDelete.Field()
    product_variant_bulk_create = ProductVariantBulkCreate.Field()
    product_variant_bulk_delete = ProductVariantBulkDelete.Field()
    product_variant_stocks_create = ProductVariantStocksCreate.Field()
    product_variant_stocks_delete = ProductVariantStocksDelete.Field()
    product_variant_stocks_update = ProductVariantStocksUpdate.Field()
    product_variant_update = ProductVariantUpdate.Field()

    product_review_create = ProductReviewCreate.Field()

    variant_image_assign = VariantImageAssign.Field()
    variant_image_unassign = VariantImageUnassign.Field()
