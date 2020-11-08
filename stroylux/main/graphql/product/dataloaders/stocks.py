from collections import defaultdict

from main.graphql.core.dataloaders import DataLoader
from main.product.models import Stock


class StocksByVariantIdLoader(DataLoader):
    context_key = "stocks_by_variant"

    def batch_load(self, keys):
        stocks = Stock.objects.annotate_available_quantity().filter(product_variant_id__in=keys)
        stock_map = defaultdict(list)
        for s in stocks.iterator():
            stock_map[s.product_variant_id].append(s)
        return [stock_map.get(product_variant_id, []) for product_variant_id in keys]