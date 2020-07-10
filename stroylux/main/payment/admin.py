from django.contrib import admin
from .models import Payment, Transaction, PaymentMethod


@admin.register(Payment, Transaction, PaymentMethod)
class ProductAdmin(admin.ModelAdmin):
    pass
