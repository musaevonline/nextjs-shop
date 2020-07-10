from django.contrib import admin
from .models import ShippingMethod


@admin.register(ShippingMethod)
class ProductAdmin(admin.ModelAdmin):
    exclude = ['minimum_order_weight', 'maximum_order_weight']
