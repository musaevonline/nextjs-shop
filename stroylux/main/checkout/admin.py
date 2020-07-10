from django.contrib import admin
from .models import Checkout, CheckoutLine


@admin.register(Checkout, CheckoutLine)
class ProductAdmin(admin.ModelAdmin):
    pass
