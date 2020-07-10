import graphene

from .filters import PermissionGroupFilter
from .mutations.account import RequestEmailChange, ConfirmEmailChange, AccountAddressCreate, AccountAddressUpdate, \
    AccountAddressDelete, AccountSetDefaultAddress, AccountRegister, AccountUpdate, AccountRequestDeletion, \
    AccountDelete
from .mutations.base import RequestPasswordReset, ConfirmAccount, SetPassword, PasswordChange
from .resolvers import resolve_address, resolve_permission_groups, resolve_user
from .sorters import PermissionGroupSortingInput
from .types import User, Address, Group
from ..core.fields import FilterInputConnectionField
from ..core.types import FilterInputObjectType
from ..decorators import permission_required, one_of_permissions_required
from ...core.permissions import AccountPermissions


class PermissionGroupFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = PermissionGroupFilter


class AccountQueries(graphene.ObjectType):
    me = graphene.Field(User, description="Return the currently authenticated user.")
    address = graphene.Field(
        Address,
        id=graphene.Argument(
            graphene.ID, description="ID of an address.", required=True
        ),
        description="Look up an address by ID.",
    )
    permission_groups = FilterInputConnectionField(
        Group,
        filter=PermissionGroupFilterInput(
            description="Filtering options for permission groups."
        ),
        sort_by=PermissionGroupSortingInput(description="Sort permission groups."),
        description="List of permission groups.",
    )
    permission_group = graphene.Field(
        Group,
        id=graphene.Argument(
            graphene.ID, description="ID of the group.", required=True
        ),
        description="Look up permission group by ID.",
    )

    user = graphene.Field(
        User,
        id=graphene.Argument(graphene.ID, description="ID of the user.", required=True),
        description="Look up a user by ID.",
    )

    @staticmethod
    def resolve_me(self, info):
        user = info.context.user
        return user if user.is_authenticated else None

    @staticmethod
    def resolve_address(self, info, id):
        return resolve_address(info, id)

    @permission_required(AccountPermissions.MANAGE_STAFF)
    def resolve_permission_groups(self, info, query=None, **kwargs):
        return resolve_permission_groups(info, query=query, **kwargs)

    @permission_required(AccountPermissions.MANAGE_STAFF)
    def resolve_permission_group(self, info, id):
        return graphene.Node.get_node_from_global_id(info, id, Group)

    @one_of_permissions_required(
        [AccountPermissions.MANAGE_STAFF, AccountPermissions.MANAGE_USERS]
    )
    def resolve_user(self, info, id):
        return resolve_user(info, id)


class AccountMutations(graphene.ObjectType):
    # Base mutations
    request_password_reset = RequestPasswordReset.Field()
    confirm_account = ConfirmAccount.Field()
    set_password = SetPassword.Field()
    password_change = PasswordChange.Field()
    request_email_change = RequestEmailChange.Field()
    confirm_email_change = ConfirmEmailChange.Field()

    # Account mutations
    account_address_create = AccountAddressCreate.Field()
    account_address_update = AccountAddressUpdate.Field()
    account_address_delete = AccountAddressDelete.Field()
    account_set_default_address = AccountSetDefaultAddress.Field()

    account_register = AccountRegister.Field()
    account_update = AccountUpdate.Field()
    account_request_deletion = AccountRequestDeletion.Field()
    account_delete = AccountDelete.Field()