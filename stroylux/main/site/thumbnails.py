from ..celeryconf import app
from ..core.utils import create_thumbnails
from .models import BannerImage


@app.task
def create_site_thumbnails(image_id: str):
    """Take a BannerImage model and create thumbnails for it."""
    create_thumbnails(pk=image_id, model=BannerImage, size_set="products")