import os
from typing import Union

from django.conf import settings
from django.contrib.postgres.fields import JSONField
from django.db import models
from django.db.models import Sum, F, Avg, Q
from django.db.models.functions import Coalesce
from django.utils.encoding import smart_text
from django_measurement.models import MeasurementField
from django_prices.models import MoneyField
from measurement.measures import Weight
from mptt.managers import TreeManager
from mptt.models import MPTTModel
from prices import Money
from versatileimagefield.fields import PPOIField, VersatileImageField

from . import ReviewRating, ReviewStatus, AttributeInputType
from ..account.models import User
from ..core.models import (
    PublishableModel,
    PublishedQuerySet,
    SortableModel,
)
from ..core.permissions import ProductPermissions
from ..core.taxes import zero_money
from ..core.weight import WeightUnits, zero_weight
from ..graphql.core.types import MoneyRange
from ..graphql.product import StockStatus
from ..order.models import OrderLine


class Category(MPTTModel):
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    description_json = JSONField(blank=True, default=dict)
    parent = models.ForeignKey(
        "self", null=True, blank=True, related_name="children",
        on_delete=models.CASCADE
    )
    background_image = VersatileImageField(
        upload_to="category-backgrounds", blank=True, null=True
    )
    background_image_alt = models.CharField(max_length=128, blank=True)

    objects = models.Manager()
    tree = TreeManager()

    def __str__(self) -> str:
        return self.name

    def get_absolute_url(self) -> str:
        return f'/category/{self.slug}/{self.pk}/'


class ProductType(models.Model):
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True)
    has_variants = models.BooleanField(default=True)
    is_shipping_required = models.BooleanField(default=True)
    is_digital = models.BooleanField(default=False)
    weight = MeasurementField(
        measurement=Weight, unit_choices=WeightUnits.CHOICES,
        default=zero_weight
    )

    class Meta:
        app_label = "product"

    def __str__(self) -> str:
        return self.name

    def __repr__(self) -> str:
        class_ = type(self)
        return "<%s.%s(pk=%r, name=%r)>" % (
            class_.__module__,
            class_.__name__,
            self.pk,
            self.name,
        )


class ProductsQueryset(PublishedQuerySet):
    MINIMAL_PRICE_FIELDS = {"minimal_variant_price_amount",
                            "minimal_variant_price"}

    def create(self, **kwargs):
        """Create a product.
        In the case of absent "minimal_variant_price" make it default to the "price"
        """
        if not kwargs.keys() & self.MINIMAL_PRICE_FIELDS:
            minimal_amount = None
            if "price" in kwargs:
                minimal_amount = kwargs["price"].amount
            elif "price_amount" in kwargs:
                minimal_amount = kwargs["price_amount"]
            kwargs["minimal_variant_price_amount"] = minimal_amount
        return super().create(**kwargs)


class Product(PublishableModel):
    product_type = models.ForeignKey(
        ProductType, related_name="products", on_delete=models.CASCADE
    )
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField(blank=True)
    description_json = JSONField(blank=True, default=dict)
    category = models.ForeignKey(
        Category,
        related_name="products",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    currency = models.CharField(
        max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH,
        default=settings.DEFAULT_CURRENCY,
    )

    minimal_variant_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
    )
    minimal_variant_price = MoneyField(
        amount_field="minimal_variant_price_amount", currency_field="currency"
    )
    maximal_variant_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        default=0
    )
    maximal_variant_price = MoneyField(
        amount_field="maximal_variant_price_amount", currency_field="currency"
    )
    updated_at = models.DateTimeField(auto_now=True, null=True)
    unit = models.CharField(max_length=50, default='pcs', blank=True,
                            null=True)
    objects = ProductsQueryset.as_manager()

    class Meta:
        app_label = "product"
        ordering = ("name",)
        permissions = (
            (ProductPermissions.MANAGE_PRODUCTS.codename, "Manage products."),
        )

    def __iter__(self):
        if not hasattr(self, "__variants"):
            setattr(self, "__variants", self.variants.all())
        return iter(getattr(self, "__variants"))

    def __repr__(self) -> str:
        class_ = type(self)
        return "<%s.%s(pk=%r, name=%r)>" % (
            class_.__module__,
            class_.__name__,
            self.pk,
            self.name,
        )

    def __str__(self) -> str:
        return self.name

    def save(
        self, force_insert=False, force_update=False, using=None,
        update_fields=None
    ):
        # Make sure the "variant_price_amount" is set
        if self.minimal_variant_price_amount is None:
            self.minimal_variant_price_amount = 0
        if self.maximal_variant_price_amount is None:
            self.maximal_variant_price_amount = 0

        return super().save(force_insert, force_update, using, update_fields)

    def get_first_image(self):
        images = list(self.images.all())
        return images[0] if images else None

    def get_price_range(
        self
    ) -> MoneyRange:
        prices = [variant.base_price for variant in self]
        return MoneyRange(min(prices) or zero_money(),
                          max(prices) or zero_money())

    def get_absolute_url(self) -> str:
        return f'/product/{self.slug}/{self.pk}/'

    @property
    def stock_status(self) -> str:
        is_available = any(
            [variant.is_available() for variant in self.variants.all()])
        if is_available:
            return StockStatus.IN_STOCK
        return StockStatus.BACKORDER

    @property
    def rating_avg(self) -> float:
        rating = self.reviews.aggregate(Avg('rating'))
        return rating['rating__avg'] or 0


class ProductVariant(models.Model):
    sku = models.CharField(max_length=255, unique=True)
    name = models.CharField(max_length=255, blank=True)
    currency = models.CharField(
        max_length=settings.DEFAULT_CURRENCY_CODE_LENGTH,
        default=settings.DEFAULT_CURRENCY,
        blank=True,
        null=True,
    )
    price_override_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        blank=True,
        null=True,
    )
    price_override = MoneyField(
        amount_field="price_override_amount", currency_field="currency"
    )
    cost_price_amount = models.DecimalField(
        max_digits=settings.DEFAULT_MAX_DIGITS,
        decimal_places=settings.DEFAULT_DECIMAL_PLACES,
        blank=True,
        null=True,
    )
    cost_price = MoneyField(amount_field="cost_price_amount",
                            currency_field="currency")
    product = models.ForeignKey(
        Product, related_name="variants", on_delete=models.CASCADE
    )
    images = models.ManyToManyField("ProductImage", through="VariantImage")

    weight = MeasurementField(
        measurement=Weight, unit_choices=WeightUnits.CHOICES,
        default=zero_weight
    )

    class Meta:
        ordering = ("sku",)
        app_label = "product"

    def __str__(self) -> str:
        return '{0} ({1})'.format(self.product.name, self.name or self.sku)

    @property
    def is_visible(self) -> bool:
        return self.product.is_visible

    @property
    def base_price(self) -> "Money":
        return self.price_override or zero_money()

    def get_weight(self):
        return self.weight or self.product.product_type.weight

    def is_shipping_required(self) -> bool:
        return self.product.product_type.is_shipping_required

    def is_digital(self) -> bool:
        is_digital = self.product.product_type.is_digital
        return not self.is_shipping_required() and is_digital

    def get_first_image(self) -> "ProductImage":
        images = list(self.images.all())
        return images[0] if images else self.product.get_first_image()

    def display_product(self) -> str:
        variant_display = str(self)
        product = self.product
        product_display = (
            f"{product} ({variant_display})" if variant_display else str(
                product)
        )
        return smart_text(product_display)

    def is_available(self):
        return any(
            [stock.available_quantity() > 0 for stock in self.stocks.all()])

    def update_product_price(self):
        product = self.product
        price_range = product.get_price_range()
        minimal = price_range.start.amount
        maximal = price_range.stop.amount
        product.minimal_variant_price = Money(minimal, 'BYN')
        product.maximal_variant_price = Money(maximal, 'BYN')
        product.save()

    def save(self, **kwargs):
        super().save(**kwargs)
        self.update_product_price()


class ProductImage(SortableModel):
    product = models.ForeignKey(
        Product, related_name="images", on_delete=models.CASCADE
    )
    image = VersatileImageField(upload_to="products", ppoi_field="ppoi",
                                blank=False)
    ppoi = PPOIField()
    alt = models.CharField(max_length=128, blank=True)

    class Meta:
        ordering = ("sort_order",)
        app_label = "product"

    def __str__(self):
        return f"Изображение - {self.product.name}"

    def get_ordering_queryset(self):
        return self.product.images.all()


class VariantImage(models.Model):
    variant = models.ForeignKey(
        "ProductVariant", related_name="variant_images",
        on_delete=models.CASCADE
    )
    image = models.ForeignKey(
        ProductImage, related_name="variant_images", on_delete=models.CASCADE
    )


class StockQuerySet(models.QuerySet):
    def annotate_available_quantity(self):
        return self.annotate(
            available_quantity=F("quantity") - Coalesce(
                Sum("allocations__quantity_allocated"), 0)
        )


class Stock(models.Model):
    product_variant = models.ForeignKey(
        ProductVariant, null=False, on_delete=models.CASCADE,
        related_name="stocks"
    )
    quantity = models.PositiveIntegerField(default=0)

    objects = StockQuerySet.as_manager()

    class Meta:
        # unique_together = [["warehouse", "product_variant"]]
        ordering = ("pk",)

    def __str__(self):
        return self.product_variant.name

    def available_quantity(self):
        quantity_allocated = self.allocations.aggregate(
            quantity_allocated=Coalesce(Sum("quantity_allocated"), 0)
        )["quantity_allocated"]
        available_quantity = max(self.quantity - quantity_allocated, 0)
        return min(available_quantity, settings.MAX_CHECKOUT_LINE_QUANTITY)

    def increase_stock(self, quantity: int, commit: bool = True):
        """Return given quantity of product to a stock."""
        self.quantity = F("quantity") + quantity
        if commit:
            self.save(update_fields=["quantity"])

    def decrease_stock(self, quantity: int, commit: bool = True):
        self.quantity = F("quantity") - quantity
        if commit:
            self.save(update_fields=["quantity"])


class Allocation(models.Model):
    order_line = models.ForeignKey(
        OrderLine,
        null=False,
        blank=False,
        default=1,
        on_delete=models.CASCADE,
        related_name="allocations",
    )
    stock = models.ForeignKey(
        Stock,
        null=False,
        blank=False,
        on_delete=models.CASCADE,
        related_name="allocations",
    )
    quantity_allocated = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = [["order_line", "stock"]]
        ordering = ("pk",)

    def __str__(self):
        return f"{self.order_line} --- {self.quantity_allocated}"


class ProductReviewQuerySet(models.QuerySet):
    def published(self, user):
        if user.is_authenticated:
            return self.filter(Q(status=ReviewStatus.PUBLISHED) | Q(user=user),
                               user__isnull=False)
        return self.filter(status=ReviewStatus.PUBLISHED, user__isnull=False)

    @staticmethod
    def user_has_access_to_all(user):
        return user.is_active and user.has_perm(
            ProductPermissions.MANAGE_PRODUCTS)

    def visible_to_user(self, user):
        return self.all()
        # if self.user_has_access_to_all(user):
        #     return self.all()
        # return self.published(user)


class ProductReview(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    product = models.ForeignKey(Product, related_name="reviews",
                                on_delete=models.CASCADE)
    rating = models.IntegerField(choices=ReviewRating.CHOICES,
                                 default=ReviewRating.EXCELLENT)
    title = models.CharField(max_length=100)
    content = models.TextField(max_length=1000)
    advantages = JSONField(default=dict, max_length=200)
    flaws = JSONField(default=dict, max_length=200)
    user = models.ForeignKey(User, related_name="reviews",
                             on_delete=models.SET_NULL, null=True, blank=True)
    status = models.CharField(choices=ReviewStatus.CHOICES,
                              default=ReviewStatus.IN_PROGRESS, max_length=50)
    order_line = models.OneToOneField(
        "order.OrderLine",
        on_delete=models.SET_NULL,
        blank=True,
        null=True,
    )

    objects = ProductReviewQuerySet.as_manager()

    def __str__(self):
        return self.title


def get_review_upload_path(instance: "ProductReviewImage", filename: str):
    return os.path.join(
        "reviews", "product_%s" % instance.review.product.id, filename)


class ProductReviewImage(SortableModel):
    review = models.ForeignKey(
        ProductReview, related_name="images", on_delete=models.CASCADE
    )
    image = VersatileImageField(upload_to=get_review_upload_path,
                                ppoi_field="ppoi", blank=False)
    ppoi = PPOIField()
    alt = models.CharField(max_length=128, blank=True)

    class Meta:
        ordering = ("sort_order",)
        app_label = "product"

    def __str__(self):
        return self.review.title

    def get_ordering_queryset(self):
        return self.review.images.all()


# ATTRIBUTES
class BaseAttributeQuerySet(models.QuerySet):
    @staticmethod
    def user_has_access_to_all(user: "User") -> bool:
        return user.is_active and user.has_perm(
            ProductPermissions.MANAGE_PRODUCTS)

    def get_public_attributes(self):
        raise NotImplementedError

    def get_visible_to_user(self, user: "User"):
        if self.user_has_access_to_all(user):
            return self.all()
        return self.get_public_attributes()


class BaseAssignedAttribute(models.Model):
    assignment = None
    values = models.ManyToManyField("AttributeValue")

    class Meta:
        abstract = True

    @property
    def attribute(self):
        return self.assignment.attribute

    @property
    def attribute_pk(self):
        return self.assignment.attribute_id


class AssignedProductAttribute(BaseAssignedAttribute):
    """Associate a product type attribute and selected values to a given product."""

    product = models.ForeignKey(
        Product, related_name="attributes", on_delete=models.CASCADE
    )
    assignment = models.ForeignKey(
        "AttributeProduct", on_delete=models.CASCADE,
        related_name="productassignments"
    )

    class Meta:
        unique_together = (("product", "assignment"),)


class AssignedVariantAttribute(BaseAssignedAttribute):
    """Associate a product type attribute and selected values to a given variant."""

    variant = models.ForeignKey(
        ProductVariant, related_name="attributes", on_delete=models.CASCADE
    )
    assignment = models.ForeignKey(
        "AttributeVariant", on_delete=models.CASCADE,
        related_name="variantassignments"
    )

    class Meta:
        unique_together = (("variant", "assignment"),)


class AssociatedAttributeQuerySet(BaseAttributeQuerySet):
    def get_public_attributes(self):
        return self.filter(attribute__visible_in_storefront=True)


class AttributeProduct(SortableModel):
    attribute = models.ForeignKey(
        "Attribute", related_name="attributeproduct", on_delete=models.CASCADE
    )
    product_type = models.ForeignKey(
        ProductType, related_name="attributeproduct", on_delete=models.CASCADE
    )
    assigned_products = models.ManyToManyField(
        Product,
        blank=True,
        through=AssignedProductAttribute,
        through_fields=("assignment", "product"),
        related_name="attributesrelated",
    )

    objects = AssociatedAttributeQuerySet.as_manager()

    class Meta:
        unique_together = (("attribute", "product_type"),)
        ordering = ("sort_order",)

    def __str__(self):
        return f"{self.product_type} - {self.attribute}"

    def get_ordering_queryset(self):
        return self.product_type.attributeproduct.all()


class AttributeVariant(SortableModel):
    attribute = models.ForeignKey(
        "Attribute", related_name="attributevariant", on_delete=models.CASCADE
    )
    product_type = models.ForeignKey(
        ProductType, related_name="attributevariant", on_delete=models.CASCADE
    )
    assigned_variants = models.ManyToManyField(
        ProductVariant,
        blank=True,
        through=AssignedVariantAttribute,
        through_fields=("assignment", "variant"),
        related_name="attributesrelated",
    )

    objects = AssociatedAttributeQuerySet.as_manager()

    class Meta:
        unique_together = (("attribute", "product_type"),)
        ordering = ("sort_order",)

    def get_ordering_queryset(self):
        return self.product_type.attributevariant.all()


class AttributeQuerySet(BaseAttributeQuerySet):
    def get_unassigned_attributes(self, product_type_pk: int):
        return self.exclude(
            Q(attributeproduct__product_type_id=product_type_pk)
            | Q(attributevariant__product_type_id=product_type_pk)
        )

    def get_assigned_attributes(self, product_type_pk: int):
        return self.filter(
            Q(attributeproduct__product_type_id=product_type_pk)
            | Q(attributevariant__product_type_id=product_type_pk)
        )

    def get_public_attributes(self):
        return self.filter(visible_in_storefront=True)

    def _get_sorted_m2m_field(self, m2m_field_name: str, asc: bool):
        sort_order_field = F(f"{m2m_field_name}__sort_order")
        id_field = F(f"{m2m_field_name}__id")
        if asc:
            sort_method = sort_order_field.asc(nulls_last=True)
            id_sort: Union["OrderBy", "F"] = id_field
        else:
            sort_method = sort_order_field.desc(nulls_first=True)
            id_sort = id_field.desc()

        return self.order_by(sort_method, id_sort)

    def product_attributes_sorted(self, asc=True):
        return self._get_sorted_m2m_field("attributeproduct", asc)

    def variant_attributes_sorted(self, asc=True):
        return self._get_sorted_m2m_field("attributevariant", asc)


class Attribute(models.Model):
    slug = models.SlugField(max_length=250, unique=True)
    name = models.CharField(max_length=255)

    input_type = models.CharField(
        max_length=50,
        choices=AttributeInputType.CHOICES,
        default=AttributeInputType.DROPDOWN,
    )

    product_types = models.ManyToManyField(
        ProductType,
        blank=True,
        related_name="product_attributes",
        through=AttributeProduct,
        through_fields=("attribute", "product_type"),
    )
    product_variant_types = models.ManyToManyField(
        ProductType,
        blank=True,
        related_name="variant_attributes",
        through=AttributeVariant,
        through_fields=("attribute", "product_type"),
    )

    value_required = models.BooleanField(default=False, blank=True)
    is_variant_only = models.BooleanField(default=False, blank=True)
    visible_in_storefront = models.BooleanField(default=True, blank=True)

    filterable_in_storefront = models.BooleanField(default=True, blank=True)
    filterable_in_dashboard = models.BooleanField(default=True, blank=True)

    storefront_search_position = models.IntegerField(default=0, blank=True)
    available_in_grid = models.BooleanField(default=True, blank=True)

    objects = AttributeQuerySet.as_manager()

    class Meta:
        ordering = ("storefront_search_position", "slug")

    def __str__(self) -> str:
        return self.name

    def has_values(self) -> bool:
        return self.values.exists()


class AttributeValue(SortableModel):
    name = models.CharField(max_length=250)
    value = models.CharField(max_length=100, blank=True, default="")
    slug = models.SlugField(max_length=255)
    attribute = models.ForeignKey(
        Attribute, related_name="values", on_delete=models.CASCADE
    )

    class Meta:
        ordering = ("sort_order", "id")
        unique_together = ("slug", "attribute")

    def __str__(self) -> str:
        return self.name

    @property
    def input_type(self):
        return self.attribute.input_type

    def get_ordering_queryset(self):
        return self.attribute.values.all()
