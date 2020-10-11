import graphene
import graphene_django_optimizer
from django.conf import settings
from graphene_federation import key
from phonenumbers import COUNTRY_CODE_TO_REGION_CODE

from ..core.connection import CountableDjangoObjectType
from ...product.templatetags.product_images import get_thumbnail
from ...site import models as site_models
from .enums import AuthorizationKeyType
from ..account.types import Address
from ..core.enums import WeightUnitsEnum, VersatileImageMethod
from ..core.types.common import CountryDisplay, Permission
from ..decorators import permission_required
from ..utils import format_permissions_for_display
from ...core.permissions import SitePermissions, get_permissions
from ...core.utils import get_client_ip, get_country_by_ip


class AuthorizationKey(graphene.ObjectType):
    name = AuthorizationKeyType(
        description="Name of the authorization backend.", required=True
    )
    key = graphene.String(description="Authorization key (client ID).", required=True)


@key(fields="id")
class SiteBannerImage(CountableDjangoObjectType):
    url = graphene.String(
        required=True,
        description="The URL of the image.",
        size=graphene.String(description="Size of the image. Default 1080x600"),
        method=graphene.Argument(
            VersatileImageMethod,
            description="VersatileImageMethod")
    )

    class Meta:
        description = (
            "Represents a site banner image."
        )
        interfaces = [graphene.relay.Node, ]
        model = site_models.BannerImage
        only_fields = ["id", "alt", "description", 'sort_order']

    @staticmethod
    def resolve_url(root: site_models.BannerImage, info, size='1080x600', method='thumbnail'):
        if size:
            url = get_thumbnail(root.image, size, method, rendition_key_set='shop_banner')
        else:
            url = root.image.url
        return info.context.build_absolute_uri(url)

    @staticmethod
    def __resolve_reference(root, _info, **_kwargs):
        return graphene.Node.get_node_from_global_id(_info, root.id)


class Domain(graphene.ObjectType):
    host = graphene.String(description="The host name of the domain.", required=True)
    ssl_enabled = graphene.Boolean(
        description="Inform if SSL is enabled.", required=True
    )
    url = graphene.String(description="Shop's absolute URL.", required=True)

    class Meta:
        description = "Represents shop's domain."


class Geolocalization(graphene.ObjectType):
    country = graphene.Field(
        CountryDisplay, description="Country of the user acquired by his IP address."
    )

    class Meta:
        description = "Represents customers's geolocalization data."


class Shop(graphene.ObjectType):
    geolocalization = graphene.Field(
        Geolocalization, description="Customer's geolocalization data."
    )
    authorization_keys = graphene.List(
        AuthorizationKey,
        description=(
            "List of configured authorization keys. Authorization keys are used to "
            "enable third-party OAuth authorization (currently Facebook or Google)."
        ),
        required=True,
    )
    currencies = graphene.List(
        graphene.String, description="List of available currencies.", required=True
    )
    default_currency = graphene.String(
        description="Shop's default currency.", required=True
    )
    default_mail_sender_name = graphene.String(
        description="Default shop's email sender's name."
    )
    default_mail_sender_address = graphene.String(
        description="Default shop's email sender's address."
    )
    description = graphene.String(description="Shop's description.")
    domain = graphene.Field(Domain, required=True, description="Shop's domain data.")

    name = graphene.String(description="Shop's name.", required=True)
    permissions = graphene.List(
        Permission, description="List of available permissions.", required=True
    )
    phone_prefixes = graphene.List(
        graphene.String, description="List of possible phone prefixes.", required=True
    )
    header_text = graphene.String(description="Header text.")
    include_taxes_in_prices = graphene.Boolean(
        description="Include taxes in prices.", required=True
    )
    display_gross_prices = graphene.Boolean(
        description="Display prices with tax in store.", required=True
    )
    charge_taxes_on_shipping = graphene.Boolean(
        description="Charge taxes on shipping.", required=True
    )
    track_inventory_by_default = graphene.Boolean(
        description="Enable inventory tracking."
    )
    default_weight_unit = WeightUnitsEnum(description="Default weight unit.")

    company_address = graphene.Field(
        Address, description="Company address.", required=False
    )
    customer_set_password_url = graphene.String(
        description="URL of a view where customers can set their password.",
        required=False,
    )

    images = graphene.List(
        lambda: SiteBannerImage, description="List of images for the site."
    )

    class Meta:
        description = (
            "Represents a shop resource containing general shop data and configuration."
        )

    @staticmethod
    def resolve_currencies(_, _info):
        return settings.AVAILABLE_CURRENCIES

    @staticmethod
    def resolve_domain(_, info):
        site = info.context.site
        return Domain(
            host=site.domain,
            ssl_enabled=settings.ENABLE_SSL,
            url=info.context.build_absolute_uri("/"),
        )

    @staticmethod
    @permission_required(SitePermissions.MANAGE_SETTINGS)
    def resolve_authorization_keys(_, _info):
        return site_models.AuthorizationKey.objects.all()

    @staticmethod
    def resolve_geolocalization(_, info):
        client_ip = get_client_ip(info.context)
        country = get_country_by_ip(client_ip)
        if country:
            return Geolocalization(
                country=CountryDisplay(code=country.code, country=country.name)
            )
        return Geolocalization(country=None)

    @staticmethod
    def resolve_default_currency(_, _info):
        return settings.DEFAULT_CURRENCY

    @staticmethod
    def resolve_description(_, info):
        return info.context.site.settings.description

    @staticmethod
    def resolve_name(_, info):
        return info.context.site.name

    @staticmethod
    def resolve_permissions(_, _info):
        permissions = get_permissions()
        return format_permissions_for_display(permissions)

    @staticmethod
    def resolve_phone_prefixes(_, _info):
        return list(COUNTRY_CODE_TO_REGION_CODE.keys())

    @staticmethod
    def resolve_header_text(_, info):
        return info.context.site.settings.header_text

    @staticmethod
    def resolve_include_taxes_in_prices(_, info):
        # return info.context.site.settings.include_taxes_in_prices
        return True

    @staticmethod
    def resolve_display_gross_prices(_, info):
        # return info.context.site.settings.display_gross_prices
        return True

    @staticmethod
    def resolve_charge_taxes_on_shipping(_, info):
        return info.context.site.settings.charge_taxes_on_shipping

    @staticmethod
    def resolve_track_inventory_by_default(_, info):
        # return info.context.site.settings.track_inventory_by_default
        return True

    @staticmethod
    def resolve_default_weight_unit(_, info):
        return info.context.site.settings.default_weight_unit

    @staticmethod
    @permission_required(SitePermissions.MANAGE_SETTINGS)
    def resolve_default_mail_sender_name(_, info):
        return info.context.site.settings.default_mail_sender_name

    @staticmethod
    @permission_required(SitePermissions.MANAGE_SETTINGS)
    def resolve_default_mail_sender_address(_, info):
        return info.context.site.settings.default_mail_sender_address

    @staticmethod
    def resolve_company_address(_, info):
        return info.context.site.settings.company_address

    @staticmethod
    def resolve_customer_set_password_url(_, info):
        return info.context.site.settings.customer_set_password_url

    @staticmethod
    @permission_required(SitePermissions.MANAGE_SETTINGS)
    def resolve_automatic_fulfillment_digital_products(_, info):
        site_settings = info.context.site.settings
        return site_settings.automatic_fulfillment_digital_products

    @staticmethod
    @permission_required(SitePermissions.MANAGE_SETTINGS)
    def resolve_default_digital_max_downloads(_, info):
        return info.context.site.settings.default_digital_max_downloads

    @staticmethod
    def resolve_images(_, info):
        return info.context.site.settings.images.all()
