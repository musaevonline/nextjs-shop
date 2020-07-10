from django.contrib import admin

from .models import (Product, ProductType, Category, ProductVariant, ProductImage,
                     VariantImage, Stock, Allocation, ProductReview, ProductReviewImage, Attribute, AttributeValue,
                     AttributeVariant, AttributeProduct, AssignedVariantAttribute, AssignedProductAttribute)


@admin.register(ProductType, Category, ProductImage,
                VariantImage, Stock, Allocation, ProductReview, ProductReviewImage,
                Attribute, AttributeValue, AttributeProduct, AttributeVariant)
class ProductElementsAdmin(admin.ModelAdmin):
    exclude = ['weight']


class AttributeVariantInline(admin.TabularInline):
    model = AssignedVariantAttribute
    extra = 1


@admin.register(ProductVariant)
class ProductAdmin(admin.ModelAdmin):
    exclude = ['weight']
    inlines = (AttributeVariantInline,)


class AttributeProductInline(admin.TabularInline):
    model = AssignedProductAttribute
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    exclude = ['weight']
    list_select_related = ['category']
    list_filter = ['is_published', 'category']
    list_display = ['name', 'category', 'minimal_variant_price_amount']
    search_fields = ('name',)
    view_on_site = True
    inlines = (AttributeProductInline,)

    def view_on_site(self, obj: Product):
        url = f"http://localhost:3000/product/{obj.slug}/{obj.pk}/"
        return url
