from collections import defaultdict

from ...core.dataloaders import DataLoader
from ....product.models import (
    Product,
    ProductImage,
    ProductVariant, VariantImage,
)


class ProductByIdLoader(DataLoader):
    context_key = "product_by_id"

    def batch_load(self, keys):
        products = Product.objects.visible_to_user(self.user).in_bulk(keys)
        return [products.get(product_id) for product_id in keys]


class ProductsByCategoryIdLoader(DataLoader):
    context_key = "products_by_category_id"

    def batch_load(self, keys):
        products = Product.objects.visible_to_user(self.user).filter(
            category_id__in=keys)
        product_map = defaultdict(list)
        for p in products:
            product_map[p.category_id].append(p)
        return [product_map[key] for key in keys]


class ImagesByProductIdLoader(DataLoader):
    context_key = "images_by_product"

    def batch_load(self, keys):
        images = ProductImage.objects.filter(product_id__in=keys)
        image_map = defaultdict(list)
        for image in images:
            image_map[image.product_id].append(image)
        return [image_map[product_id] for product_id in keys]


class ImagesByProductVariantIdLoader(DataLoader):
    context_key = "images_by_variant"

    def batch_load(self, keys):
        images = VariantImage.objects.filter(
            variant_id__in=keys).select_related('image').distinct()
        image_map = defaultdict(list)
        for image in images:
            image_map[image.variant_id].append(image.image)
        return [image_map[variant_id] for variant_id in keys]


class ProductVariantByIdLoader(DataLoader):
    context_key = "productvariant_by_id"

    def batch_load(self, keys):
        variants = ProductVariant.objects.in_bulk(keys)
        return [variants.get(key) for key in keys]


class ProductVariantsByProductIdLoader(DataLoader):
    context_key = "productvariants_by_product"

    def batch_load(self, keys):
        variants = ProductVariant.objects.filter(product_id__in=keys)
        variant_map = defaultdict(list)
        variant_loader = ProductVariantByIdLoader(self.context)
        for variant in variants.iterator():
            variant_map[variant.product_id].append(variant)
            variant_loader.prime(variant.id, variant)
        return [variant_map.get(product_id, []) for product_id in keys]
