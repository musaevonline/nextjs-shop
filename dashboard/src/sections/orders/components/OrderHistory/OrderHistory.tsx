import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Hr from "@temp/components/Hr";
import Skeleton from "@temp/components/Skeleton";
import {
  Timeline,
  TimelineAddNote,
  TimelineEvent,
  TimelineNote
} from "@temp/components/Timeline";
import React from "react";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";

import {
  OrderEventsEmailsEnum,
  OrderEventsEnum
} from "@temp/types/globalTypes";
import { OrderDetails_order_events } from "../../types/OrderDetails";
import {useFormik} from "formik";

export interface FormData {
  message: string;
}

const getEventMessage = (event: OrderDetails_order_events, intl: IntlShape) => {
  switch (event.type) {
    case OrderEventsEnum.CANCELED:
      return intl.formatMessage({
        id: 'order_was_cancelled',
        defaultMessage: "Order was cancelled",
        description: "order history message"
      });
    case OrderEventsEnum.DRAFT_ADDED_PRODUCTS:
      return intl.formatMessage({
        id: "products_were_added_to_draft_order",
        defaultMessage: "Products were added to draft order",
        description: "order history message"
      });
    case OrderEventsEnum.DRAFT_CREATED:
      return intl.formatMessage({
        id: "draft_order_was_created",
        defaultMessage: "Draft order was created",
        description: "order history message"
      });
    case OrderEventsEnum.DRAFT_REMOVED_PRODUCTS:
      return intl.formatMessage({
        id: "products_were_deleted_from_draft_order",
        defaultMessage: "Products were deleted from draft order",
        description: "order history message"
      });
    case OrderEventsEnum.EMAIL_SENT:
      switch (event.emailType) {
        case OrderEventsEmailsEnum.DIGITAL_LINKS:
          return intl.formatMessage({
            id: "links_to_the_order's_digital_goods_were_sent",
            defaultMessage: "Links to the order's digital goods were sent",
            description: "order history message"
          });
        case OrderEventsEmailsEnum.FULFILLMENT_CONFIRMATION:
          return intl.formatMessage({
            id: "fulfillment_confirmation",
            defaultMessage: "Fulfillment confirmation was sent to customer",
            description: "order history message"
          });
        case OrderEventsEmailsEnum.ORDER_CONFIRMATION:
          return intl.formatMessage({
            id: "order_confirmation_was_sent_to_customer",
            defaultMessage: "Order confirmation was sent to customer",
            description: "order history message"
          });
        case OrderEventsEmailsEnum.PAYMENT_CONFIRMATION:
          return intl.formatMessage({
            id: "payment_confirmation_was_sent_to_customer",
            defaultMessage: "Payment confirmation was sent to customer",
            description: "order history message"
          });
        case OrderEventsEmailsEnum.SHIPPING_CONFIRMATION:
          return intl.formatMessage({
            id: "shipping_details_was_sent",
            defaultMessage: "Shipping details was sent to customer",
            description: "order history message"
          });
        case OrderEventsEmailsEnum.TRACKING_UPDATED:
          return intl.formatMessage({
            id: "shipping_tracking_number_was_sent",
            defaultMessage: "Shipping tracking number was sent to customer",
            description: "order history message"
          });
      }
    case OrderEventsEnum.FULFILLMENT_CANCELED:
      return intl.formatMessage({
        id: "fulfillment_was_cancelled",
        defaultMessage: "Fulfillment was cancelled",
        description: "order history message"
      });
    case OrderEventsEnum.FULFILLMENT_FULFILLED_ITEMS:
      return intl.formatMessage(
          {
            id: "fulfilled{quantity}items",
            defaultMessage: "Fulfilled {quantity} items",
            description: "order history message"
          },
          {
            quantity: event.quantity
          }
      );
    case OrderEventsEnum.FULFILLMENT_RESTOCKED_ITEMS:
      return intl.formatMessage(
          {
            id: "restocked_items{quantity}",
            defaultMessage: "Restocked {quantity} items",
            description: "order history message"
          },
          {
            quantity: event.quantity
          }
      );
    case OrderEventsEnum.NOTE_ADDED:
      return intl.formatMessage({
        id: "note_was_added_to_the_order",
        defaultMessage: "Note was added to the order",
        description: "order history message"
      });
    case OrderEventsEnum.ORDER_FULLY_PAID:
      return intl.formatMessage({
        id: "order_was_fully_paid",
        defaultMessage: "Order was fully paid",
        description: "order history message"
      });
    case OrderEventsEnum.ORDER_MARKED_AS_PAID:
      return intl.formatMessage({
        id: "marked_order_as_paid",
        defaultMessage: "Marked order as paid",
        description: "order history message"
      });
    case OrderEventsEnum.OTHER:
      return event.message;
    case OrderEventsEnum.OVERSOLD_ITEMS:
      return intl.formatMessage(
          {
            id: "oversold_items{quantity}",
            defaultMessage: "Oversold {quantity} items",
            description: "order history message"
          },
          {
            quantity: event.quantity
          }
      );
    case OrderEventsEnum.PAYMENT_CAPTURED:
      return intl.formatMessage({
        id: "payment_was_captured",
        defaultMessage: "Payment was captured",
        description: "order history message"
      });
    case OrderEventsEnum.PAYMENT_FAILED:
      return intl.formatMessage({
        id: "payment_failed",
        defaultMessage: "Payment failed",
        description: "order history message"
      });
    case OrderEventsEnum.PAYMENT_REFUNDED:
      return intl.formatMessage({
        id: "payment_was_refunded",
        defaultMessage: "Payment was refunded",
        description: "order history message"
      });
    case OrderEventsEnum.PAYMENT_VOIDED:
      return intl.formatMessage({
        id: "paymnet_was_voided",
        defaultMessage: "Payment was voided",
        description: "order history message"
      });
    case OrderEventsEnum.PLACED:
      return intl.formatMessage({
        id: "order_wasa_placed",
        defaultMessage: "Order was placed",
        description: "order history message"
      });
    case OrderEventsEnum.PLACED_FROM_DRAFT:
      return intl.formatMessage({
        id: "order_was_created_from_draft",
        defaultMessage: "Order was created from draft",
        description: "order history message"
      });
    case OrderEventsEnum.TRACKING_UPDATED:
      return intl.formatMessage({
        id: "updated_fulfillment_tracking_number",
        defaultMessage: "Updated fulfillment group's tracking number",
        description: "order history message"
      });
    case OrderEventsEnum.UPDATED_ADDRESS:
      return intl.formatMessage({
        id: "ordedr_address_was_updated",
        defaultMessage: "Order address was updated",
        description: "order history message"
      });
  }
};

const useStyles = makeStyles(
    theme => ({
      header: {
        fontWeight: 500,
        marginBottom: theme.spacing(1)
      },
      root: { marginTop: theme.spacing(4) },
      user: {
        marginBottom: theme.spacing(1)
      }
    }),
    { name: "OrderHistory" }
);

interface OrderHistoryProps {
  history: OrderDetails_order_events[];
  onNoteAdd: (data: FormData) => void;
}

const OrderHistory: React.FC<OrderHistoryProps> = props => {
  const { history, onNoteAdd } = props;
  const classes = useStyles(props);

  const intl = useIntl();
  const form = useFormik({
    enableReinitialize: true,
    initialValues: {message: ""},
    onSubmit: onNoteAdd
  });

  return (
      <div className={classes.root}>
        <Typography className={classes.header} color="textSecondary">
          <FormattedMessage id="order_history" defaultMessage="Order History" />
        </Typography>
        <Hr />
        {history ? (
            <Timeline>
              <form onSubmit={form.handleSubmit}>
                <TimelineAddNote
                    message={form.values.message}
                    onChange={form.handleChange}
                    reset={form.resetForm}
                    onSubmit={form.submitForm}
                />
              </form>
              {history
                  .slice()
                  .reverse()
                  .map(event => {
                    if (event.type === OrderEventsEnum.NOTE_ADDED) {
                      return (
                          <TimelineNote
                              date={event.date}
                              user={event.user}
                              message={event.message}
                              key={event.id}
                          />
                      );
                    }
                    return (
                        <TimelineEvent
                            date={event.date}
                            title={getEventMessage(event, intl)}
                            key={event.id}
                        />
                    );
                  })}
            </Timeline>
        ) : (
            <Skeleton />
        )}
      </div>
  );
};
OrderHistory.displayName = "OrderHistory";
export default OrderHistory;
