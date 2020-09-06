import graphene_django_optimizer as gql_optimizer
from django.db.models import Sum

from ..utils import get_database_id, filter_by_period
from ...order import OrderStatus
from ...product import models
from .filters import filter_attributes_by_product_types


def resolve_products(info, ids, **_kwargs):
    user = info.context.user
    qs = models.Product.objects.visible_to_user(user)

    qs = qs.distinct()

    if ids:
        db_ids = [get_database_id(info, node_id, "Product") for node_id in ids]
        qs = qs.filter(pk__in=db_ids)

    return gql_optimizer.query(qs, info)


def resolve_product_types(info, **_kwargs):
    qs = models.ProductType.objects.all()
    return gql_optimizer.query(qs, info)


def resolve_categories(info, level=None, **_kwargs):
    qs = models.Category.objects.prefetch_related("children")
    if level is not None:
        qs = qs.filter(level=level)
    qs = qs.distinct()
    return gql_optimizer.query(qs, info)


def resolve_product_variants(info, ids=None):
    user = info.context.user
    visible_products = models.Product.objects.visible_to_user(user).values_list(
        "pk", flat=True
    )
    qs = models.ProductVariant.objects.filter(product__id__in=visible_products)
    if ids:
        db_ids = [get_database_id(info, node_id, "ProductVariant") for node_id in ids]
        qs = qs.filter(pk__in=db_ids)
    return gql_optimizer.query(qs, info)


def resolve_attributes(info, qs=None, in_category=None, **_kwargs):
    qs = qs or models.Attribute.objects.get_visible_to_user(info.context.user)

    if in_category:
        qs = filter_attributes_by_product_types(qs, "in_category", in_category)

    return qs.distinct()


def resolve_product_reviews(info, **_kwargs):
    user = info.context.user
    qs = models.ProductReview.objects.visible_to_user(user)
    qs = qs.distinct()
    return gql_optimizer.query(qs, info)


def resolve_report_product_sales(period):
    qs = models.ProductVariant.objects.all()

    # exclude draft and canceled orders
    exclude_status = [OrderStatus.DRAFT, OrderStatus.CANCELED]
    qs = qs.exclude(order_lines__order__status__in=exclude_status)

    # filter by period
    qs = filter_by_period(qs, period, "order_lines__order__created")

    qs = qs.annotate(quantity_ordered=Sum("order_lines__quantity"))
    qs = qs.filter(quantity_ordered__isnull=False)
    return qs.order_by("-quantity_ordered")
