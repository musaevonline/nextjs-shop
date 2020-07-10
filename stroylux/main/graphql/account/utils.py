from typing import TYPE_CHECKING

from django.contrib.auth.models import Group, Permission
from django.db.models import Value
from django.db.models.functions import Concat

from ...core.permissions import get_permissions

if TYPE_CHECKING:
    from django.db.models import QuerySet
    from ...account.models import User


def can_user_manage_group(user: "User", group: Group) -> bool:
    """User can't manage a group with permission that is out of the user's scope."""
    permissions = get_group_permission_codes(group)
    return user.has_perms(permissions)


def get_group_permission_codes(group: Group) -> "QuerySet":
    """Return group permissions in the format '<app label>.<permission codename>'."""
    return group.permissions.annotate(
        formated_codename=Concat("content_type__app_label", Value("."), "codename")
    ).values_list("formated_codename", flat=True)


def get_user_permissions(user: "User") -> "QuerySet":
    """Return all user permissions - from user groups and user_permissions field."""
    if user.is_superuser:
        return get_permissions()
    groups = user.groups.all()
    user_permissions = user.user_permissions.all()
    group_permissions = Permission.objects.filter(group__in=groups)
    permissions = user_permissions | group_permissions
    return permissions









