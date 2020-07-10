from typing import List

from django.db import transaction

from .variant_prices import collect_categories_tree_products
from ..tasks import update_products_minimal_variant_prices_task


@transaction.atomic
def delete_categories(categories_ids: List[str]):
    """Delete categories and perform all necessary actions.
    Set products of deleted categories as unpublished, delete categories
    and update products minimal variant prices.
    """
    from ..models import Product, Category

    categories = Category.objects.select_for_update().filter(pk__in=categories_ids)
    categories.prefetch_related("products")

    products = Product.objects.none()
    for category in categories:
        products = products | collect_categories_tree_products(category)

    products.update(is_published=False, publication_date=None)
    product_ids = list(products.values_list("id", flat=True))
    categories.delete()
    update_products_minimal_variant_prices_task.delay(product_ids=product_ids)
