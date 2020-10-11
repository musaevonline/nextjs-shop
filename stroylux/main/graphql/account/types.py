import graphene
from django.contrib.auth import get_user_model, models as auth_models
from graphene import relay
from graphene_federation import key
import graphene_django_optimizer as gql_optimizer

from .enums import CountryCodeEnum
from .utils import can_user_manage_group, get_groups_which_user_can_manage
from ..checkout.types import Checkout
from ..core.connection import DjangoPkInterface
from ..core.enums import VersatileImageMethod
from ..core.fields import PrefetchingConnectionField
from ..core.types import CountryDisplay, Permission
from ..core.types.common import Image
from ..core.utils import from_global_id_strict_type
from ..decorators import one_of_permissions_required, permission_required
from ..utils import format_permissions_for_display
from ...account import models
from ...checkout.utils import get_user_checkout
from ..core.connection import CountableDjangoObjectType
from ...core.permissions import AccountPermissions, OrderPermissions
from ...product.templatetags.product_images import get_thumbnail


class UserPermission(Permission):
    source_permission_groups = graphene.List(
        graphene.NonNull("main.graphql.account.types.Group"),
        description="List of user permission groups which contains this permission.",
        user_id=graphene.Argument(
            graphene.ID,
            description="ID of user whose groups should be returned.",
            required=True,
        ),
        required=False,
    )

    def resolve_source_permission_groups(root: Permission, _info, user_id, **_kwargs):
        user_id = from_global_id_strict_type(user_id, only_type="User", field="pk")
        groups = auth_models.Group.objects.filter(
            user__pk=user_id, permissions__name=root.name
        )
        return groups

@key("id")
@key("email")
class User(CountableDjangoObjectType):
    checkout = graphene.Field(
        Checkout, description="Returns the last open checkout of this user."
    )
    addresses = gql_optimizer.field(
        graphene.List(lambda: Address, description="List of all user's addresses."),
        model_field="addresses",
    )
    note = graphene.String(description="A note about the customer.")
    user_permissions = gql_optimizer.field(
        graphene.List(UserPermission, description="List of user's permissions."),
        model_field="user_permissions",
    )
    permission_groups = gql_optimizer.field(
        graphene.List(
            "main.graphql.account.types.Group",
            description="List of user's permission groups.",
        ),
        model_field="groups",
    )
    editable_groups = graphene.List(
        "main.graphql.account.types.Group",
        description="List of user's permission groups which user can manage.",
    )
    avatar = graphene.Field(
        Image,
        size=graphene.String(description="Size of the avatar. Default 445x445"),
        method=graphene.Argument(VersatileImageMethod, description="VersatileImageMethod")
    )

    orders = PrefetchingConnectionField(
        "main.graphql.order.types.Order", description="List of user's orders."
    )

    class Meta:
        description = "Represents user data."
        interfaces = [relay.Node, DjangoPkInterface]
        model = get_user_model()
        only_fields = [
            "date_joined",
            "default_shipping_address",
            "email",
            "first_name",
            "id",
            "is_active",
            "is_staff",
            "last_login",
            "last_name",
            "note",
            "reviews"
        ]

    @staticmethod
    def resolve_checkout(root: models.User, _info, **_kwargs):
        return get_user_checkout(root)[0]

    @staticmethod
    def resolve_addresses(root: models.User, _info, **_kwargs):
        return root.addresses.all()

    @staticmethod
    def resolve_user_permissions(root: models.User, _info, **_kwargs):
        from .resolvers import resolve_permissions

        return resolve_permissions(root)

    @staticmethod
    def resolve_permission_groups(root: models.User, _info, **_kwargs):
        return root.groups.all()

    @staticmethod
    @one_of_permissions_required(
        [AccountPermissions.MANAGE_USERS, AccountPermissions.MANAGE_STAFF]
    )
    def resolve_note(root: models.User, info):
        return root.note

    @staticmethod
    def resolve_avatar(root: models.User, info, size='445x445', method='thumbnail', **_kwargs):
        if root.avatar:
            url = get_thumbnail(root.avatar, size, method=method, rendition_key_set='user_avatars')
            return Image(alt=None, url=info.context.build_absolute_uri(url))

    @staticmethod
    def resolve_editable_groups(root: models.User, _info, **_kwargs):
        return get_groups_which_user_can_manage(root)

    @staticmethod
    def __resolve_reference(root, _info, **_kwargs):
        if root.id is not None:
            return graphene.Node.get_node_from_global_id(_info, root.id)
        return get_user_model().objects.get(email=root.email)

    @staticmethod
    def resolve_orders(root: models.User, info, **_kwargs):
        viewer = info.context.user
        if viewer.has_perm(OrderPermissions.MANAGE_ORDERS):
            return root.orders.all()
        return root.orders.confirmed()


@key(fields="id")
class Group(CountableDjangoObjectType):
    users = graphene.List(User, description="List of group users")
    permissions = graphene.List(Permission, description="List of group permissions")
    user_can_manage = graphene.Boolean(
        required=True,
        description=(
            "True, if the currently authenticated user has rights to manage a group."
        ),
    )

    class Meta:
        description = "Represents permission group data."
        interfaces = [relay.Node]
        model = auth_models.Group
        only_fields = ["name", "permissions", "id"]

    @staticmethod
    @permission_required(AccountPermissions.MANAGE_STAFF)
    @gql_optimizer.resolver_hints(prefetch_related="user_set")
    def resolve_users(root: auth_models.Group, _info):
        return root.user_set.all()

    @staticmethod
    @gql_optimizer.resolver_hints(prefetch_related="permissions")
    def resolve_permissions(root: auth_models.Group, _info):
        permissions = root.permissions.prefetch_related("content_type").order_by(
            "codename"
        )
        return format_permissions_for_display(permissions)

    @staticmethod
    def resolve_user_can_manage(root: auth_models.Group, info):
        user = info.context.user
        return can_user_manage_group(user, root)


class AddressInput(graphene.InputObjectType):
    first_name = graphene.String(description="Given name.")
    last_name = graphene.String(description="Family name.")
    company_name = graphene.String(description="Company or organization.")
    street_address_1 = graphene.String(description="Address.")
    street_address_2 = graphene.String(description="Address.")
    city = graphene.String(description="City.")
    city_area = graphene.String(description="District.")
    postal_code = graphene.String(description="Postal code.")
    country = CountryCodeEnum(description="Country.")
    country_area = graphene.String(description="State or province.")
    phone = graphene.String(description="Phone number.")


@key(fields="id")
class Address(CountableDjangoObjectType):
    country = graphene.Field(
        CountryDisplay, required=True, description="Shop's default country."
    )
    is_default_shipping_address = graphene.Boolean(
        required=False, description="Address is user's default shipping address."
    )

    class Meta:
        description = "Represents user address data."
        interfaces = [relay.Node]
        model = models.Address
        only_fields = [
            "city",
            "city_area",
            "company_name",
            "country",
            "country_area",
            "first_name",
            "id",
            "last_name",
            "phone",
            "postal_code",
            "street_address_1",
            "street_address_2",
        ]

    @staticmethod
    def resolve_country(root: models.Address, _info):
        return CountryDisplay(code=root.country.code, country=root.country.name)

    @staticmethod
    def resolve_is_default_shipping_address(root: models.Address, _info):
        """Look if the address is the default shipping address of the user.
        This field is added through annotation when using the
        `resolve_addresses` resolver. It's invalid for
        `resolve_default_shipping_address` and
        `resolve_default_billing_address`
        """
        if not hasattr(root, "user_default_shipping_address_pk"):
            return None

        user_default_shipping_address_pk = getattr(
            root, "user_default_shipping_address_pk"
        )
        if user_default_shipping_address_pk == root.pk:
            return True
        return False

    @staticmethod
    def __resolve_reference(root, _info, **_kwargs):
        return graphene.Node.get_node_from_global_id(_info, root.id)
