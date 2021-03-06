import graphene
import graphene_django_optimizer
from django.db.models import Sum
from django.db.models.functions import Coalesce
from graphene import relay
from graphene_federation import key
from graphql import GraphQLError

from main import settings
from main.core.permissions import ProductPermissions
from main.core.utils import build_absolute_uri
from main.graphql.core.connection import DjangoPkInterface
from main.graphql.core.fields import PrefetchingConnectionField, \
    FilterInputConnectionField
from main.graphql.core.types import Money, MoneyRange
from main.graphql.core.types.common import Image
from main.graphql.decorators import permission_required
from main.product import models
from main.product.availability import is_product_in_stock
from main.product.templatetags.product_images import get_thumbnail, \
    get_product_image_thumbnail
from main.product.utils import calculate_revenue_for_variant
from .attributes import SelectedAttribute, Attribute
from .. import StockStatus
from ..dataloaders import CategoryByIdLoader
from ..dataloaders.attributes import \
    SelectedAttributesByProductVariantIdLoader, \
    SelectedAttributesByProductIdLoader
from ..dataloaders.categories import CategoryByParentIdLoader
from ..dataloaders.products import ProductVariantsByProductIdLoader, \
    ImagesByProductIdLoader, \
    ProductByIdLoader, ImagesByProductVariantIdLoader, \
    ProductsByCategoryIdLoader
from ..dataloaders.stocks import StocksByVariantIdLoader
from ..filters import ProductReviewFilterInput, AttributeFilterInput
from ..resolvers import resolve_attributes
from ..sorters import ProductReviewOrderField
from ...core.connection import CountableDjangoObjectType
from ...core.enums import ReportingPeriod, VersatileImageMethod
from ...core.types.money import TaxedMoney
from ...utils import get_database_id, reporting_period_to_date


# def resolve_attribute_list(
#         instance: Union[models.Product, models.ProductVariant], *, user
# ) -> List[SelectedAttribute]:
#     """Resolve attributes from a product into a list of `SelectedAttribute`s.
#     Note: you have to prefetch the below M2M fields.
#         - product_type -> attribute[rel] -> [rel]assignments -> values
#         - product_type -> attribute[rel] -> attribute
#     """
#     resolved_attributes = []
#     attributes_qs = None
#
#     # Retrieve the product type
#     if isinstance(instance, models.Product):
#         product_type = instance.product_type
#         product_type_attributes_assoc_field = "attributeproduct"
#         assigned_attribute_instance_field = "productassignments"
#         assigned_attribute_instance_filters = {"product_id": instance.pk}
#         if hasattr(product_type, "storefront_attributes"):
#             attributes_qs = product_type.storefront_attributes  # type: ignore
#     elif isinstance(instance, models.ProductVariant):
#         product_type = instance.product.product_type
#         product_type_attributes_assoc_field = "attributevariant"
#         assigned_attribute_instance_field = "variantassignments"
#         assigned_attribute_instance_filters = {"variant_id": instance.pk}
#     else:
#         raise AssertionError(f"{instance.__class__.__name__} is unsupported")
#
#     # Retrieve all the product attributes assigned to this product type
#     if not attributes_qs:
#         attributes_qs = getattr(product_type, product_type_attributes_assoc_field)
#         attributes_qs = attributes_qs.get_visible_to_user(user)
#
#     # An empty QuerySet for unresolved values
#     empty_qs = models.AttributeValue.objects.none()
#
#     # Goes through all the attributes assigned to the product type
#     # The assigned values are returned as a QuerySet, but will assign a
#     # dummy empty QuerySet if no values are assigned to the given instance.
#     for attr_data_rel in attributes_qs:
#         attr_instance_data = getattr(attr_data_rel, assigned_attribute_instance_field)
#         # Retrieve the instance's associated data
#         attr_data = attr_instance_data.filter(**assigned_attribute_instance_filters)
#         attr_data = attr_data.first()
#
#         # Return the instance's attribute values if the assignment was found,
#         # otherwise it sets the values as an empty QuerySet
#         values = attr_data.values.all() if attr_data is not None else empty_qs
#         resolved_attributes.append(
#             SelectedAttribute(attribute=attr_data_rel.attribute, values=values)
#         )
#     return resolved_attributes


class Margin(graphene.ObjectType):
    start = graphene.Int()
    stop = graphene.Int()


@key(fields="id")
class ProductVariant(CountableDjangoObjectType):
    price_override = graphene.Field(
        Money,
        description=(
            "Override the base price of a product if necessary. A value of `null` "
            "indicates that the default product price is used."
        ),
    )
    price = graphene.Field(
        Money,
        description=(
            "Override the base price of a product."
        ),
    )
    images = graphene.List(
        lambda: ProductImage,
        description="List of images for the product variant."
    )
    cost_price = graphene.Field(Money,
                                description="Cost price of the variant.")
    stocks = graphene_django_optimizer.field(
        graphene.List(lambda: Stock,
                      description="Stocks for the product variant."),
        model_field="stocks"
    )
    attributes = graphene.List(
        graphene.NonNull(SelectedAttribute),
        required=True,
        description="List of attributes assigned to this variant.",
    )
    revenue = graphene.Field(
        TaxedMoney,
        period=graphene.Argument(ReportingPeriod),
        description=(
            "Total revenue generated by a variant in given period of time. Note: this "
            "field should be queried using `reportProductSales` query as it uses "
            "optimizations suitable for such calculations."
        ),
    )
    quantity_ordered = graphene.Int(description="Total quantity ordered.")

    class Meta:
        description = (
            "Represents a version of a product such as different size or color."
        )
        interfaces = [relay.Node, DjangoPkInterface]
        model = models.ProductVariant
        only_fields = ["id", "name", "product", "sku", "weight"]

    @staticmethod
    def resolve_stocks(root: models.ProductVariant, info):
        return StocksByVariantIdLoader(info.context).load(root.pk)

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_cost_price(root: models.ProductVariant, *_args):
        return root.cost_price

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_price_override(root: models.ProductVariant, *_args):
        return root.price_override

    @staticmethod
    def resolve_price(root: models.ProductVariant, *_args):
        return root.base_price

    @staticmethod
    def resolve_images(root: models.ProductVariant, info):
        return ImagesByProductVariantIdLoader(info.context).load(root.id)

    @classmethod
    def get_node(cls, info, id):
        user = info.context.user
        visible_products = models.Product.objects.visible_to_user(
            user).values_list(
            "pk", flat=True
        )
        qs = cls._meta.model.objects.filter(product__id__in=visible_products)
        return cls.maybe_optimize(info, qs, id)

    @staticmethod
    def resolve_attributes(root: models.ProductVariant, info):
        return SelectedAttributesByProductVariantIdLoader(info.context).load(
            root.id)

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_revenue(root: models.ProductVariant, *_args, period):
        start_date = reporting_period_to_date(period)
        return calculate_revenue_for_variant(root, start_date)

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_quantity_ordered(root: models.ProductVariant, *_args):
        # This field is added through annotation when using the
        # `resolve_report_product_sales` resolver.
        return getattr(root, "quantity_ordered", None)

    @staticmethod
    def resolve_product(root: models.ProductVariant, info):
        return ProductByIdLoader(info.context).load(root.product_id)


class Rating(graphene.ObjectType):
    rating_avg = graphene.Float(description="Product avg rating")
    count = graphene.Int(description="Product rating count")


@key(fields="id")
class Product(CountableDjangoObjectType):
    variants = graphene.List(ProductVariant,
                             description="List of variants for the product.")
    thumbnail = graphene.Field(
        Image,
        description="The main thumbnail for a product.",
        size=graphene.String(description="Size of thumbnail. Default 800x450"),
        method=graphene.Argument(VersatileImageMethod,
                                 description="VersatileImageMethod")
    )
    images = graphene.List(
        lambda: ProductImage, description="List of images for the product."
    )
    price_range = graphene.Field(MoneyRange, description='Product price range')
    stock_status = graphene.String(description="Product variants stock status")
    rating = graphene.Field(Rating, description="Product rating")
    reviews = FilterInputConnectionField(
        lambda: ProductReview,
        filter=ProductReviewFilterInput(
            description="Filtering options for reviews."),
        sort_by=ProductReviewOrderField(description="Sort reviews."),
        description="List of the shop's product reviews.",
    )
    attributes = graphene.List(
        graphene.NonNull(SelectedAttribute),
        required=True,
        description="List of attributes assigned to this product.",
    )
    image_by_id = graphene.Field(
        lambda: ProductImage,
        id=graphene.Argument(graphene.ID,
                             description="ID of a product image."),
        description="Get a single product image by ID.",
    )
    is_available = graphene.Boolean(
        description="Whether the product is in stock and visible or not."
    )

    class Meta:
        description = "Represents product data."
        interfaces = [relay.Node, DjangoPkInterface]
        model = models.Product
        only_fields = [
            'name',
            'slug',
            'is_published',
            'description',
            'description_json',
            'minimal_variant_price',
            'product_type',
            'category',
            'unit',
            'publication_date'
        ]

    @staticmethod
    def resolve_variants(root: models.Product, info, **_kwargs):
        return ProductVariantsByProductIdLoader(info.context).load(root.id)

    @staticmethod
    @graphene_django_optimizer.resolver_hints(prefetch_related="images")
    def resolve_thumbnail(root: models.Product, info, size='255x255',
                          method='thumbnail_webp'):
        def return_first_thumbnail(images):
            image = images[0] if images else None
            url = get_product_image_thumbnail(image, size, method=method)
            alt = image.alt if image else ''
            return Image(alt=alt, url=build_absolute_uri(url))

        return (
            ImagesByProductIdLoader(info.context)
                .load(root.id)
                .then(return_first_thumbnail)
        )

    @staticmethod
    def resolve_images(root: models.Product, info, **_kwargs):
        return ImagesByProductIdLoader(info.context).load(root.id)

    @staticmethod
    def resolve_price_range(root: models.Product, *_args, **_kwargs):
        return MoneyRange(root.minimal_variant_price,
                          root.maximal_variant_price)

    @staticmethod
    def resolve_stock_status(root: models.Product, *_args, **_kwargs):
        ids = root.variants.all().values_list('id')
        stocks = models.Stock.objects.filter(
            product_variant__pk__in=ids).annotate(
            quantity_allocated=Coalesce(Sum("allocations__quantity_allocated"),
                                        0)
        )
        for s in stocks:
            quantity_allocated = s.quantity_allocated
            available_quantity = max(s.quantity - quantity_allocated, 0)
            is_available = min(available_quantity,
                               settings.MAX_CHECKOUT_LINE_QUANTITY)
            if is_available:
                return StockStatus.IN_STOCK
        return StockStatus.OUT_STOCK

    @staticmethod
    def resolve_rating(root: models.Product, *_args, **_kwargs):
        return Rating(rating_avg=root.rating_avg or 0,
                      count=root.reviews.count())

    def resolve_reviews(root: models.Product, info, *_args, **_kwargs):
        return models.ProductReview.objects.visible_to_user(
            info.context.user).filter(product=root)

    @staticmethod
    def resolve_attributes(root: models.Product, info):
        return SelectedAttributesByProductIdLoader(info.context).load(root.id)

    @staticmethod
    def resolve_image_by_id(root: models.Product, info, id):
        pk = get_database_id(info, id, ProductImage)
        try:
            return root.images.get(pk=pk)
        except models.ProductImage.DoesNotExist:
            raise GraphQLError("Product image not found.")

    @staticmethod
    def resolve_is_available(root: models.Product, info):
        in_stock = is_product_in_stock(root)
        return root.is_visible and in_stock

    @staticmethod
    def resolve_category(root: models.Product, info):
        category_id = root.category_id
        if category_id is None:
            return None

        return CategoryByIdLoader(info.context).load(category_id)


class ProductType(CountableDjangoObjectType):
    products = PrefetchingConnectionField(
        Product, description="List of products of this type."
    )

    variant_attributes = graphene.List(
        Attribute, description="Variant attributes of that product type."
    )
    product_attributes = graphene.List(
        Attribute, description="Product attributes of that product type."
    )
    available_attributes = FilterInputConnectionField(
        Attribute, filter=AttributeFilterInput()
    )

    class Meta:
        description = (
            "Represents a type of product. It defines what attributes are available to "
            "products of this type."
        )
        interfaces = [relay.Node, DjangoPkInterface]
        model = models.ProductType
        only_fields = [
            "has_variants",
            "id",
            "is_digital",
            "is_shipping_required",
            "name",
            "slug",
            "weight"
        ]

    @staticmethod
    def resolve_products(root: models.ProductType, info, **_kwargs):
        return root.products.visible_to_user(info.context.user)

    @staticmethod
    def __resolve_reference(root, _info, **_kwargs):
        return graphene.Node.get_node_from_global_id(_info, root.id)

    @staticmethod
    def resolve_product_attributes(root: models.ProductType, *_args,
                                   **_kwargs):
        return root.product_attributes.product_attributes_sorted().all()

    @staticmethod
    def resolve_variant_attributes(root: models.ProductType, *_args,
                                   **_kwargs):
        return root.variant_attributes.variant_attributes_sorted().all()

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_available_attributes(root: models.ProductType, info, **kwargs):
        qs = models.Attribute.objects.get_unassigned_attributes(root.pk)
        return resolve_attributes(info, qs=qs, **kwargs)


class Category(CountableDjangoObjectType):
    ancestors = PrefetchingConnectionField(
        lambda: Category, description="List of ancestors of the category."
    )
    products = PrefetchingConnectionField(
        Product, description="List of products in the category."
    )
    children = PrefetchingConnectionField(
        lambda: Category, description="List of children of the category."
    )
    background_image = graphene.Field(
        Image, size=graphene.Int(description="Size of the image.")
    )
    thumbnail = graphene.Field(
        Image,
        description="The main thumbnail for a product.",
        size=graphene.String(description="Size of thumbnail. Default 800x450"),
        method=graphene.Argument(VersatileImageMethod,
                                 description="VersatileImageMethod")
    )
    parent = graphene.Field(
        lambda: Category, description="Parent of the category."
    )

    class Meta:
        description = (
            "Represents a single category of products. Categories allow to organize "
            "products in a tree-hierarchies which can be used for navigation in the "
            "storefront."
        )
        only_fields = [
            "description",
            "description_json",
            "id",
            "level",
            "name",
            "parent",
            "slug",
        ]
        interfaces = [relay.Node, DjangoPkInterface]
        model = models.Category

    @staticmethod
    def resolve_ancestors(root: models.Category, info, **_kwargs):
        qs = root.get_ancestors()
        return graphene_django_optimizer.query(qs, info)

    @staticmethod
    def resolve_background_image(root: models.Category, info, size=None,
                                 **_kwargs):
        if root.background_image:
            return Image.get_adjusted(
                image=root.background_image,
                alt=root.background_image_alt,
                size=size,
                rendition_key_set="background_images",
                info=info,
            )

    @staticmethod
    def resolve_children(root: models.Category, info, **_kwargs):
        return CategoryByParentIdLoader(info.context).load(root.id)

    @staticmethod
    def resolve_products(root: models.Category, info, **_kwargs):
        ids = list(root.get_descendants(include_self=True).values_list('id',
                                                                       flat=True))

        # qs = models.Product.objects.published()
        # qs = qs.filter(category__in=tree)
        # qs = qs.distinct()
        # return graphene_django_optimizer.query(qs, info)
        def map_ids_to_products(products):
            return models.Product.objects.filter(
                id__in=list({p.id for p_list in products for p in p_list}))

        return ProductsByCategoryIdLoader(info.context).load_many(ids).then(
            map_ids_to_products)

    @staticmethod
    def __resolve_reference(root, _info, **_kwargs):
        return graphene.Node.get_node_from_global_id(_info, root.id)

    @staticmethod
    def resolve_thumbnail(root: models.Category, info, size='255x255',
                          method='thumbnail_webp'):
        url = get_thumbnail(root.background_image, size, method)
        return Image(alt=root.background_image_alt,
                     url=build_absolute_uri(url))

    @staticmethod
    def resolve_parent(root: models.Category, info):
        if root.parent_id:
            return CategoryByIdLoader(info.context).load(root.parent_id)
        return None


@key(fields="id")
class ProductImage(CountableDjangoObjectType):
    url = graphene.String(
        required=True,
        description="The URL of the image.",
        size=graphene.Int(description="Size of the image."),
    )
    thumbnail = graphene.Field(
        graphene.String,
        description="The thumbnail image.",
        size=graphene.String(description="Size of thumbnail. Default 540x450"),
        method=graphene.Argument(VersatileImageMethod,
                                 description="VersatileImageMethod")
    )

    class Meta:
        description = "Represents a product image."
        only_fields = ["alt", "id", "sort_order"]
        interfaces = [relay.Node]
        model = models.ProductImage

    @staticmethod
    def resolve_url(root: models.ProductImage, info, *, size=None):
        if size:
            url = get_thumbnail(root.image, size, method="thumbnail")
        else:
            url = root.image.url
        return build_absolute_uri(url)

    @staticmethod
    def __resolve_reference(root, _info, **_kwargs):
        return graphene.Node.get_node_from_global_id(_info, root.id)

    @staticmethod
    def resolve_thumbnail(root: models.ProductImage, info, size='540x540',
                          method='thumbnail_webp'):
        url = get_thumbnail(root.image, size, method=method)
        return build_absolute_uri(url)


class Stock(CountableDjangoObjectType):
    stock_quantity = graphene.Int(
        description="Quantity of a product available for sale.", required=True
    )

    quantity = graphene.Int(
        required=True,
        description="Quantity of a product in the warehouse's possession, "
                    "including the allocated stock that is waiting for shipment.",
    )
    quantity_allocated = graphene.Int(
        required=True, description="Quantity allocated for orders"
    )

    class Meta:
        description = "Represents stock."
        model = models.Stock
        interfaces = [graphene.relay.Node]
        only_fields = ["product_variant", "quantity", "quantity_allocated"]

    @staticmethod
    def resolve_stock_quantity(root: models.Stock, *_args):
        return min(root.available_quantity,
                   settings.MAX_CHECKOUT_LINE_QUANTITY)

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_quantity(root, *_args):
        return root.quantity

    @staticmethod
    @permission_required(ProductPermissions.MANAGE_PRODUCTS)
    def resolve_quantity_allocated(root, *_args):
        return root.allocations.aggregate(
            quantity_allocated=Coalesce(Sum("quantity_allocated"), 0)
        )["quantity_allocated"]


class ProductReview(CountableDjangoObjectType):
    user_name = graphene.String()
    user_avatar = graphene.String(description="The URL of the image.",
                                  size=graphene.Int(
                                      description="Size of the image."), )

    class Meta:
        description = "Represents product review."
        model = models.ProductReview
        interfaces = [graphene.relay.Node]
        only_fields = ["created_at", "updated_at", "title",
                       "rating", "content", "status",
                       "advantages", "flaws", "order_line"
                       ]

    def resolve_user_name(root: models.ProductReview, info):
        return root.user.get_full_name()

    def resolve_user_avatar(root: models.ProductReview, info, size=60):
        image = root.user.avatar
        if image:
            url = get_thumbnail(image, size, method="thumbnail")
            return build_absolute_uri(url)
        return None
