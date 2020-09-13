from django.contrib import admin

from main.blog.models import Blog, BlogCategory, BlogArticle


@admin.register(Blog, BlogCategory, BlogArticle)
class ProductAdmin(admin.ModelAdmin):
    exclude = ['subscribers']
