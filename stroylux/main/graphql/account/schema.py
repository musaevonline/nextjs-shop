import graphene

from .bulk_mutations import CustomerBulkDelete, StaffBulkDelete, UserBulkSetActive
from .filters import PermissionGroupFilter, StaffUserFilter, CustomerFilter
from .mutations.account import RequestEmailChange, ConfirmEmailChange, AccountAddressCreate, AccountAddressUpdate, \
    AccountAddressDelete, AccountSetDefaultAddress, AccountRegister, AccountUpdate, AccountRequestDeletion, \
    AccountDelete
from .mutations.base import RequestPasswordReset, ConfirmAccount, SetPassword, PasswordChange
from .mutations.permission_group import PermissionGroupCreate, PermissionGroupUpdate, PermissionGroupDelete
from .mutations.staff import StaffCreate, StaffUpdate, StaffDelete, UserAvatarDelete, UserAvatarUpdate, CustomerCreate, \
    CustomerUpdate, CustomerDelete, AddressCreate, AddressUpdate, AddressDelete, AddressSetDefault
from .resolvers import resolve_address, resolve_permission_groups, resolve_user, resolve_staff_users, resolve_customers
from .sorters import PermissionGroupSortingInput, UserSortingInput
from .types import User, Address, Group
from ..core.fields import FilterInputConnectionField
from ..core.types import FilterInputObjectType
from ..decorators import permission_required, one_of_permissions_required
from ...core.permissions import AccountPermissions


class PermissionGroupFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = PermissionGroupFilter


class StaffUserInput(FilterInputObjectType):
    class Meta:
        filterset_class = StaffUserFilter


class CustomerFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = CustomerFilter


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

    staff_users = FilterInputConnectionField(
        User,
        filter=StaffUserInput(description="Filtering options for staff users."),
        sort_by=UserSortingInput(description="Sort staff users."),
        description="List of the shop's staff users.",
    )

    user = graphene.Field(
        User,
        id=graphene.Argument(graphene.ID, description="ID of the user.", required=True),
        description="Look up a user by ID.",
    )

    customers = FilterInputConnectionField(
        User,
        filter=CustomerFilterInput(description="Filtering options for customers."),
        sort_by=UserSortingInput(description="Sort customers."),
        description="List of the shop's customers.",
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

    @permission_required(AccountPermissions.MANAGE_STAFF)
    def resolve_staff_users(self, info, query=None, **kwargs):
        return resolve_staff_users(info, query=query, **kwargs)

    @one_of_permissions_required(
        [AccountPermissions.MANAGE_STAFF, AccountPermissions.MANAGE_USERS]
    )
    def resolve_user(self, info, id):
        return resolve_user(info, id)

    @permission_required(AccountPermissions.MANAGE_USERS)
    def resolve_customers(self, info, query=None, **kwargs):
        return resolve_customers(info, query=query, **kwargs)


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

    # Staff mutations
    address_create = AddressCreate.Field()
    address_update = AddressUpdate.Field()
    address_delete = AddressDelete.Field()
    address_set_default = AddressSetDefault.Field()

    customer_create = CustomerCreate.Field()
    customer_update = CustomerUpdate.Field()
    customer_delete = CustomerDelete.Field()
    customer_bulk_delete = CustomerBulkDelete.Field()

    staff_create = StaffCreate.Field()
    staff_update = StaffUpdate.Field()
    staff_delete = StaffDelete.Field()
    staff_bulk_delete = StaffBulkDelete.Field()

    user_avatar_update = UserAvatarUpdate.Field()
    user_avatar_delete = UserAvatarDelete.Field()
    user_bulk_set_active = UserBulkSetActive.Field()

    # Permission group mutations
    permission_group_create = PermissionGroupCreate.Field()
    permission_group_update = PermissionGroupUpdate.Field()
    permission_group_delete = PermissionGroupDelete.Field()
