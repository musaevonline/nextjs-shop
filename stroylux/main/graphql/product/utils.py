from django.core.exceptions import ValidationError
from django.db import transaction, IntegrityError
from typing import List, Dict

from django.db.models import QuerySet

from ...product.models import ProductVariant, Stock


@transaction.atomic
def create_stocks(
    variant: "ProductVariant", stocks_data: List[Dict[str, str]]
):
    try:
        Stock.objects.bulk_create(
            [
                Stock(
                    product_variant=variant,
                    quantity=stock_data["quantity"],
                )
                for stock_data in stocks_data
            ]
        )
    except IntegrityError:
        msg = "Stock for one of warehouses already exists for this product variant."
        raise ValidationError(msg)