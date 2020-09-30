import graphene
from main.graphql.core.fields import register_graphene_fields

from graphene_federation import build_schema
from graphene_django.debug import DjangoDebug

from .core.schema import CoreMutations, CoreQueries
from .account.schema import AccountMutations, AccountQueries
from .product.schema import ProductMutations, ProductQueries
from .shipping.schema import ShippingMutations, ShippingQueries
from .payment.schema import PaymentMutations, PaymentQueries
from .checkout.schema import CheckoutQueries, CheckoutMutations
from .order.schema import OrderQueries, OrderMutations
from .shop.schema import ShopQueries, ShopMutations
from .blog.schema import BlogQueries, BlogMutations
from .page.schema import PageQueries, PageMutations

register_graphene_fields() # Need for money field order


class Query(
    CoreQueries,
    AccountQueries,
    ProductQueries,
    ShippingQueries,
    PaymentQueries,
    CheckoutQueries,
    OrderQueries,
    BlogQueries,
    ShopQueries,
    PageQueries
):
    debug = graphene.Field(DjangoDebug, name='_debug')


class Mutation(
    CoreMutations,
    AccountMutations,
    ProductMutations,
    ShippingMutations,
    PaymentMutations,
    CheckoutMutations,
    OrderMutations,
    ShopMutations,
    BlogMutations,
    PageMutations
):
    pass


schema = build_schema(Query, mutation=Mutation)
