import logging

from django.conf import settings
from django.contrib.sites.models import Site
from django.core.exceptions import MiddlewareNotUsed
from django.utils import timezone
from django.utils.functional import SimpleLazyObject
from django.utils.translation import get_language
from django_countries.fields import Country

from . import analytics
from .utils import get_client_ip, get_country_by_ip

logger = logging.getLogger(__name__)


def google_analytics(get_response):
    """Report a page view to Google Analytics."""

    if not settings.GOOGLE_ANALYTICS_TRACKING_ID:
        raise MiddlewareNotUsed()

    def _google_analytics_middleware(request):
        client_id = analytics.get_client_id(request)
        path = request.path
        language = get_language()
        headers = request.META
        try:
            analytics.report_view(
                client_id, path=path, language=language, headers=headers
            )
        except Exception:
            logger.exception("Unable to update analytics")
        return get_response(request)

    return _google_analytics_middleware


def request_time(get_response):
    def _stamp_request(request):
        request.request_time = timezone.now()
        return get_response(request)

    return _stamp_request


def country(get_response):
    """Detect the user's country and assign it to `request.country`."""

    def _country_middleware(request):
        client_ip = get_client_ip(request)
        if client_ip:
            request.country = get_country_by_ip(client_ip)
        try:
            if not request.country:
                request.country = Country(settings.DEFAULT_COUNTRY)
        except AttributeError:
            request.country = Country(settings.DEFAULT_COUNTRY)
        return get_response(request)

    return _country_middleware


def site(get_response):
    """Clear the Sites cache and assign the current site to `request.site`.
    By default django.contrib.sites caches Site instances at the module
    level. This leads to problems when updating Site instances, as it's
    required to restart all application servers in order to invalidate
    the cache. Using this middleware solves this problem.
    """

    def _get_site():
        Site.objects.clear_cache()
        return Site.objects.get_current()

    def _site_middleware(request):
        request.site = SimpleLazyObject(_get_site)
        return get_response(request)

    return _site_middleware
