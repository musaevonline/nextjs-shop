from ...checkout import models
from ...checkout.utils import get_user_checkout
from ...core.permissions import CheckoutPermissions


def resolve_checkout_lines():
    queryset = models.CheckoutLine.objects.all()
    return queryset


def resolve_checkouts():
    queryset = models.Checkout.objects.all()
    return queryset


def resolve_checkout(info, token=None):
    user = info.context.user
    if not token and user and user.is_authenticated:
        return get_user_checkout(user)[0]
    if not token:
        return None
    checkout = models.Checkout.objects.filter(token=token).first()

    if checkout is None:
        return None

    # resolve checkout for anonymous customer
    if not checkout.user:
        return checkout

    # resolve checkout for logged-in customer
    if checkout.user == info.context.user:
        return checkout

    # resolve checkout for staff user
    requester = info.context.user
    if requester.has_perm(CheckoutPermissions.MANAGE_CHECKOUTS):
        return checkout
    return None
