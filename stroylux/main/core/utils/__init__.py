import logging
import socket
from typing import Optional, Union, Type
from urllib.parse import urljoin

from django.db.models import Model
from django.utils.safestring import SafeText
from django.utils.text import slugify
from geolite2 import geolite2
from django_countries import countries
from django_countries.fields import Country

from django.contrib.sites.models import Site
from django.utils.encoding import iri_to_uri
from versatileimagefield.image_warmer import VersatileImageFieldWarmer
from transliterate import translit, get_available_language_codes

from ... import settings

logger = logging.getLogger(__name__)
georeader = geolite2.reader()


def build_absolute_uri(location: str) -> Optional[str]:
    host = Site.objects.get_current().domain
    protocol = "https" if settings.ENABLE_SSL else "http"
    current_uri = "%s://%s" % (protocol, host)
    location = urljoin(current_uri, location)
    return iri_to_uri(location)


def create_thumbnails(pk, model, size_set, image_attr=None):
    instance = model.objects.get(pk=pk)
    if not image_attr:
        image_attr = "image"
    image_instance = getattr(instance, image_attr)
    if image_instance.name == "":
        # There is no file, skip processing
        return
    warmer = VersatileImageFieldWarmer(
        instance_or_queryset=instance, rendition_key_set=size_set, image_attr=image_attr
    )
    logger.info("Creating thumbnails for  %s", pk)
    num_created, failed_to_create = warmer.warm()
    if num_created:
        logger.info("Created %d thumbnails", num_created)
    if failed_to_create:
        logger.error("Failed to generate thumbnails", extra={"paths": failed_to_create})


def is_valid_ipv4(ip: str) -> bool:
    """Check whether the passed IP is a valid V4 IP address."""
    try:
        socket.inet_pton(socket.AF_INET, ip)
    except socket.error:
        return False
    return True


def is_valid_ipv6(ip: str) -> bool:
    """Check whether the passed IP is a valid V6 IP address."""
    try:
        socket.inet_pton(socket.AF_INET6, ip)
    except socket.error:
        return False
    return True


def get_country_by_ip(ip_address):
    geo_data = georeader.get(ip_address)
    if geo_data and "country" in geo_data and "iso_code" in geo_data["country"]:
        country_iso_code = geo_data["country"]["iso_code"]
        if country_iso_code in countries:
            return Country(country_iso_code)
    return None


def get_client_ip(request):
    """Retrieve the IP address from the request data.
    Tries to get a valid IP address from X-Forwarded-For, if the user is hiding behind
    a transparent proxy or if the server is behind a proxy.
    If no forwarded IP was provided or all of them are invalid,
    it fallback to the requester IP.
    """
    ip = request.META.get("HTTP_X_FORWARDED_FOR", "")
    ips = ip.split(",")
    for ip in ips:
        if is_valid_ipv4(ip) or is_valid_ipv6(ip):
            return ip
    return request.META.get("REMOTE_ADDR", None)


def generate_unique_slug(
        instance: Type[Model], slugable_value: str, slug_field_name: str = "slug",
) -> str:
    """Create unique slug for model instance.
    The function uses `django.utils.text.slugifyStr` to generate a slug from
    the `slugable_value` of model field. If the slug already exists it adds
    a numeric suffix and increments it until a unique value is found.
    Args:
        instance: model instance for which slug is created
        slugable_value: value used to create slug
        slug_field_name: name of slug field in instance model
    """

    slug = slugify(slugable_value)
    if not slug:
        slug = slugify(translit(slugable_value, reversed=True))
    unique_slug: Union["SafeText", str] = slug

    ModelClass = instance.__class__
    extension = 1

    search_field = f"{slug_field_name}__iregex"
    pattern = rf"{slug}-\d+$|{slug}$"
    slug_values = (
        ModelClass._default_manager.filter(  # type: ignore
            **{search_field: pattern}
        )
            .exclude(pk=instance.pk)
            .values_list(slug_field_name, flat=True)
    )

    while unique_slug in slug_values:
        extension += 1
        unique_slug = f"{slug}-{extension}"

    return unique_slug
