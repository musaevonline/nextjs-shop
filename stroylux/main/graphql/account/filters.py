import django_filters

from main.account.models import User
from main.graphql.account.enums import StaffMemberStatus
from main.graphql.core.filters import EnumFilter
from main.graphql.utils import filter_by_query_param


def filter_search(qs, _, value):
    search_fields = ("name",)
    if value:
        qs = filter_by_query_param(qs, value, search_fields)
    return qs


def filter_status(qs, _, value):
    if value == StaffMemberStatus.ACTIVE:
        qs = qs.filter(is_staff=True, is_active=True)
    elif value == StaffMemberStatus.DEACTIVATED:
        qs = qs.filter(is_staff=True, is_active=False)
    return qs


def filter_staff_search(qs, _, value):
    search_fields = (
        "email",
        "first_name",
        "last_name",
        "default_shipping_address__first_name",
        "default_shipping_address__last_name",
        "default_shipping_address__city",
        "default_shipping_address__country",
    )
    if value:
        qs = filter_by_query_param(qs, value, search_fields)
    return qs


class PermissionGroupFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method=filter_search)


class StaffUserFilter(django_filters.FilterSet):
    status = EnumFilter(input_class=StaffMemberStatus, method=filter_status)
    search = django_filters.CharFilter(method=filter_staff_search)

    # TODO - Figure out after permision types
    # department = ObjectTypeFilter

    class Meta:
        model = User
        fields = ["status", "search"]
