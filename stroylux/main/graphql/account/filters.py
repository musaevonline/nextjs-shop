import django_filters

from main.graphql.utils import filter_by_query_param


def filter_search(qs, _, value):
    search_fields = ("name",)
    if value:
        qs = filter_by_query_param(qs, value, search_fields)
    return qs


class PermissionGroupFilter(django_filters.FilterSet):
    search = django_filters.CharFilter(method=filter_search)