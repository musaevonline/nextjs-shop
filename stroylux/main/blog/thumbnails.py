from ..celeryconf import app
from ..core.utils import create_thumbnails
from .models import Blog, BlogCategory, BlogArticle


@app.task
def create_blog_thumbnails(image_id: str):
    """Take a Blog model and create thumbnails for it."""
    create_thumbnails(pk=image_id, model=Blog, size_set="blog")


@app.task
def create_blog_category_thumbnails(image_id: str):
    """Take a Blog model and create thumbnails for it."""
    create_thumbnails(pk=image_id, model=BlogCategory, size_set="blog")

@app.task
def create_blog_article_thumbnails(image_id: str):
    """Take a Blog model and create thumbnails for it."""
    create_thumbnails(pk=image_id, model=BlogArticle, size_set="blog")
