from django.contrib.sitemaps import Sitemap

from main.blog.models import BlogArticle
from main.page.models import Page
from main.product.models import Product, Category


class ProductSitemap(Sitemap):
    name = 'product'
    changefreq = 'daily'
    limit = 100000

    def items(self):
        return Product.objects.published()


class CategorySitemap(Sitemap):
    name = 'category'
    changefreq = 'daily'
    limit = 100000

    def items(self):
        return Category.objects.all()


class BlogArticleSitemap(Sitemap):
    name = 'article'
    changefreq = 'daily'
    limit = 100000

    def items(self):
        return BlogArticle.objects.visible_to_user()


class PageSitemap(Sitemap):
    name = 'page'
    changefreq = 'daily'
    limit = 100000

    def items(self):
        return Page.objects.published()


sitemaps = {
    ProductSitemap.name: ProductSitemap,
    CategorySitemap.name: CategorySitemap,
    BlogArticleSitemap.name: BlogArticleSitemap,
    PageSitemap.name: PageSitemap,
}
