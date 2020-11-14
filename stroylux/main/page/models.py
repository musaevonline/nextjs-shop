from django.db import models
from draftjs_sanitizer import clean_draft_js

from main.core.db.fields import SanitizedJSONField
from main.core.models import PublishedQuerySet, PublishableModel
from main.core.permissions import PagePermissions


class PagePublishedQuerySet(PublishedQuerySet):
    @staticmethod
    def user_has_access_to_all(user):
        return user.is_active and user.has_perm(PagePermissions.MANAGE_PAGES)


class Page(PublishableModel):
    slug = models.SlugField(unique=True, max_length=255)
    title = models.CharField(max_length=250)
    content = models.TextField(blank=True)
    content_json = SanitizedJSONField(
        blank=True, default=dict, sanitizer=clean_draft_js
    )
    created = models.DateTimeField(auto_now_add=True)

    objects = PagePublishedQuerySet.as_manager()

    class Meta:
        ordering = ("slug",)
        permissions = ((PagePermissions.MANAGE_PAGES.codename, "Manage pages."),)

    def __str__(self):
        return self.title

    def get_absolute_url(self) -> str:
        return f'/page/{self.slug}/'
