from typing import List

from .models import Product
from .utils.variant_prices import update_products_minimal_variant_prices, update_product_minimal_variant_price
from ..celeryconf import app

@app.task
def update_product_minimal_variant_price_task(product_pk: int):
    product = Product.objects.get(pk=product_pk)
    update_product_minimal_variant_price(product)


@app.task
def update_products_minimal_variant_prices_task(product_ids: List[int]):
    products = Product.objects.filter(pk__in=product_ids)
    update_products_minimal_variant_prices(products)