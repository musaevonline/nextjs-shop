from django.contrib import admin
from .models import SiteSettings


@admin.register(SiteSettings)
class SiteAdmin(admin.ModelAdmin):
    pass
