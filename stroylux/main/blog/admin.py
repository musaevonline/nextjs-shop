from django.contrib import admin

from main.blog.models import BlogCategory, BlogArticle


@admin.register(BlogCategory, BlogArticle)
class ProductAdmin(admin.ModelAdmin):
    exclude = ['subscribers']
