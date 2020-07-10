from ...core.permissions import OrderPermissions
from ...payment import models
from ..utils import filter_by_query_param

PAYMENT_SEARCH_FIELDS = ["id"]


def resolve_payments(info, query):
    queryset = models.Payment.objects.all().distinct()
    return filter_by_query_param(queryset, query, PAYMENT_SEARCH_FIELDS)


def resolve_payment_methods(info, query):
    user = info.context.user
    if user.is_active and user.has_perm(OrderPermissions.MANAGE_ORDERS):
        queryset = models.PaymentMethod.objects.all().distinct()
    else:
        queryset = models.PaymentMethod.objects.filter(is_active=True).distinct()
    return filter_by_query_param(queryset, query, PAYMENT_SEARCH_FIELDS)
