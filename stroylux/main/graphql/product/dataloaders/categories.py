from collections import defaultdict

from main.product.models import Category
from ...core.dataloaders import DataLoader


class CategoryByIdLoader(DataLoader):
    context_key = "category_by_id"

    def batch_load(self, keys):
        categories = Category.objects.in_bulk(keys)
        return [categories.get(category_id) for category_id in keys]

class CategoryByParentIdLoader(DataLoader):
    context_key = "category_by_parent_id"

    def batch_load(self, keys):
        categories = Category.objects.filter(parent_id__in=keys)
        category_map = defaultdict(list)
        for cat in categories:
            category_map[cat.parent_id].append(cat)
        return [category_map[parent_id] for parent_id in keys]
