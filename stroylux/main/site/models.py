from email.headerregistry import Address
from email.utils import parseaddr
from typing import Optional

from django.conf import settings
from django.contrib.sites.models import Site
from django.core.exceptions import ImproperlyConfigured
from django.core.validators import MaxLengthValidator, RegexValidator
from django.db import models
from versatileimagefield.fields import VersatileImageField, PPOIField

from ..core.models import SortableModel
from ..core.permissions import SitePermissions
from ..core.weight import WeightUnits
from . import AuthenticationBackends
from .error_codes import SiteErrorCode
from .patch_sites import patch_contrib_sites

patch_contrib_sites()


def email_sender_name_validators():
    return [
        RegexValidator(
            r"[\n\r]",
            inverse_match=True,
            message="New lines are not allowed.",
            code=SiteErrorCode.FORBIDDEN_CHARACTER.value,
        ),
        MaxLengthValidator(settings.DEFAULT_MAX_EMAIL_DISPLAY_NAME_LENGTH),
    ]


class SiteSettings(models.Model):
    site = models.OneToOneField(Site, related_name="settings", on_delete=models.CASCADE)
    header_text = models.CharField(max_length=200, blank=True)
    description = models.CharField(max_length=500, blank=True)
    default_weight_unit = models.CharField(
        max_length=10, choices=WeightUnits.CHOICES, default=WeightUnits.KILOGRAM
    )
    company_address = models.ForeignKey(
        "account.Address", blank=True, null=True, on_delete=models.SET_NULL
    )
    default_mail_sender_name = models.CharField(
        max_length=settings.DEFAULT_MAX_EMAIL_DISPLAY_NAME_LENGTH,
        blank=True,
        default="",
        validators=email_sender_name_validators(),
    )
    default_mail_sender_address = models.EmailField(blank=True, null=True)
    customer_set_password_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        permissions = (
            (SitePermissions.MANAGE_SETTINGS.codename, "Manage settings."),
        )

    def __str__(self):
        return self.site.name

    @property
    def default_from_email(self) -> str:
        sender_name: str = self.default_mail_sender_name
        sender_address: Optional[str] = self.default_mail_sender_address

        if not sender_address:
            sender_address = settings.DEFAULT_FROM_EMAIL

            if not sender_address:
                raise ImproperlyConfigured("No sender email address has been set-up")

            sender_name, sender_address = parseaddr(sender_address)

        value = str(Address(sender_name, addr_spec=sender_address))
        return value

    def available_backends(self):
        return self.authorizationkey_set.values_list("name", flat=True)


class AuthorizationKey(models.Model):
    site_settings = models.ForeignKey(SiteSettings, on_delete=models.CASCADE)
    name = models.CharField(max_length=20, choices=AuthenticationBackends.BACKENDS)
    key = models.TextField()
    password = models.TextField()

    class Meta:
        unique_together = (("site_settings", "name"),)

    def __str__(self):
        return self.name

    def key_and_secret(self):
        return self.key, self.password


class BannerImage(SortableModel):
    site = models.ForeignKey(
        SiteSettings, related_name="images", on_delete=models.CASCADE
    )
    image = VersatileImageField(upload_to="site", ppoi_field="ppoi", blank=False)
    ppoi = PPOIField()
    alt = models.CharField(max_length=128, blank=True)
    description = models.TextField()

    class Meta:
        ordering = ("sort_order",)

    def __str__(self):
        return f"Изображение - {self.product.name}"

    def get_ordering_queryset(self):
        return self.site.images.all()
