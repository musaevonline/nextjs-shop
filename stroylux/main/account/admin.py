from django.contrib import admin
from .models import Address, User


@admin.register(Address, User)
class AddressAdmin(admin.ModelAdmin):
    pass
