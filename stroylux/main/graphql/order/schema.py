import graphene

from .bulk_mutations.draft_orders import DraftOrderBulkDelete, DraftOrderLinesBulkDelete
from .filters import OrderFilter, DraftOrderFilter
from .mutations.draft_orders import DraftOrderComplete, DraftOrderCreate, DraftOrderDelete, DraftOrderLinesCreate, \
    DraftOrderLineDelete, DraftOrderLineUpdate, DraftOrderUpdate
from .mutations.orders import OrderAddNote, OrderCancel, OrderCapture, OrderMarkAsPaid, OrderRefund, OrderUpdate, \
    OrderUpdateShipping, OrderVoid
from .resolvers import resolve_order_by_token, resolve_draft_orders, resolve_orders, resolve_order, \
    resolve_homepage_events
from .sorters import OrderSortingInput
from ..core.enums import ReportingPeriod
from ...core.permissions import OrderPermissions
from ..core.fields import FilterInputConnectionField, PrefetchingConnectionField
from ..core.types import FilterInputObjectType
from ..decorators import permission_required
from .enums import OrderStatusFilter

from .types import Order, OrderEvent


class OrderFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = OrderFilter


class OrderDraftFilterInput(FilterInputObjectType):
    class Meta:
        filterset_class = DraftOrderFilter


class OrderQueries(graphene.ObjectType):
    homepage_events = PrefetchingConnectionField(
        OrderEvent,
        description=(
            "List of activity events to display on "
            "homepage (at the moment it only contains order-events)."
        ),
    )
    order = graphene.Field(
        Order,
        description="Look up an order by ID.",
        id=graphene.Argument(graphene.ID, description="ID of an order.", required=True),
    )
    orders = FilterInputConnectionField(
        Order,
        sort_by=OrderSortingInput(description="Sort orders."),
        filter=OrderFilterInput(description="Filtering options for orders."),
        created=graphene.Argument(
            ReportingPeriod,
            description=(
                "[Deprecated] Filter orders from a selected timespan. Use the `filter` "
                "field instead. This field will be removed after 2020-07-31."
            ),
        ),
        status=graphene.Argument(
            OrderStatusFilter,
            description=(
                "[Deprecated] Filter order by status. Use the `filter` field instead. "
                "This field will be removed after 2020-07-31."
            ),
        ),
        description="List of orders.",
    )
    draft_orders = FilterInputConnectionField(
        Order,
        sort_by=OrderSortingInput(description="Sort draft orders."),
        filter=OrderDraftFilterInput(description="Filtering options for draft orders."),
        created=graphene.Argument(
            ReportingPeriod,
            description=(
                "[Deprecated] Filter draft orders from a selected timespan. Use the "
                "`filter` field instead. This field will be removed after 2020-07-31."
            ),
        ),
        description="List of draft orders.",
    )
    order_by_token = graphene.Field(
        Order,
        description="Look up an order by token.",
        token=graphene.Argument(
            graphene.UUID, description="The order's token.", required=True
        ),
    )

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_homepage_events(self, *_args, **_kwargs):
        return resolve_homepage_events()

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_order(self, info, **data):
        return resolve_order(info, data.get("id"))

    # @permission_required(OrderPermissions.MANAGE_ORDERS)
    @staticmethod
    def resolve_orders(self, info, created=None, status=None, **_kwargs):
        return resolve_orders(info, created, status)

    @permission_required(OrderPermissions.MANAGE_ORDERS)
    def resolve_draft_orders(self, info, created=None, **_kwargs):
        return resolve_draft_orders(info, created)

    def resolve_order_by_token(self, _info, token):
        return resolve_order_by_token(token)


class OrderMutations(graphene.ObjectType):
    draft_order_complete = DraftOrderComplete.Field()
    draft_order_create = DraftOrderCreate.Field()
    draft_order_delete = DraftOrderDelete.Field()
    draft_order_lines_create = DraftOrderLinesCreate.Field()
    draft_order_line_delete = DraftOrderLineDelete.Field()
    draft_order_line_update = DraftOrderLineUpdate.Field()
    draft_order_update = DraftOrderUpdate.Field()
    draft_order_bulk_delete = DraftOrderBulkDelete.Field()
    draft_order_lines_bulk_delete = DraftOrderLinesBulkDelete.Field()

    order_add_note = OrderAddNote.Field()
    order_cancel = OrderCancel.Field()
    order_capture = OrderCapture.Field()

    order_mark_as_paid = OrderMarkAsPaid.Field()
    order_refund = OrderRefund.Field()
    order_update = OrderUpdate.Field()
    order_update_shipping = OrderUpdateShipping.Field()
    order_void = OrderVoid.Field()