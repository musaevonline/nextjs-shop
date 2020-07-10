from django.contrib import admin
from .models import Order, OrderLine


@admin.register(Order, OrderLine)
class ProductAdmin(admin.ModelAdmin):
    exclude = ['weight']
