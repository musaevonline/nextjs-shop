import {formMessages} from "@temp/intl";
import { OrderErrorFragment } from "@temp/sections/orders/types/OrderErrorFragment";
import { OrderErrorCode } from "@temp/types/globalTypes";
import { defineMessages, IntlShape } from "react-intl";

import commonErrorMessages from "./common";

const messages = defineMessages({
  cannotCancelFulfillment: {id: "this_fulfillment_cannot_be_canceled",
    defaultMessage: "This fulfillment cannot be cancelled",
    description: "error message"
  },
  cannotCancelOrder: {id: "order_cannot_be_canceled",
    defaultMessage: "This order cannot be cancelled",
    description: "error message"
  },
  cannotFulfillLine: {id: "not_enough_items_to_fulfill",
    defaultMessage: "Not enough items to fulfill",
    description: "error message"
  },
  cannotRefund: {id: "manual_payments_can_not_be_refunded",
    defaultMessage: "Manual payments can not be refunded",
    description: "error message"
  },
  cannotVoid: {id: "only_pre_authorized_payments_can_be_voided",
    defaultMessage: "Only pre-authorized payments can be voided",
    description: "error message"
  },
  captureInactive: {id: "only_pre_authorized_payments_can_be_captured",
    defaultMessage: "Only pre-authorized payments can be captured",
    description: "error message"
  },
  noShippingAddress: {id: "cannot_choose_shipping_method_without_shipping_address",
    defaultMessage:
      "Cannot choose a shipping method for an order without the shipping address",
    description: "error message"
  },
  notEditable: {id: "only_draft_orders_can_be_edited",
    defaultMessage: "Only draft orders can be edited",
    description: "error message"
  },
  paymentMissing: {id: "no_payment_associated_with_order",
    defaultMessage: "There's no payment associated with the order",
    description: "error message"
  },
  shippingNotApplicable: {id: "shipping_method-is_no_valid_for_chosen_address",
    defaultMessage: "Shipping method is not valid for chosen shipping address",
    description: "error message"
  },
  shippingRequired: {id: "shipping_method_is_required_for_this_order",
    defaultMessage: "Shipping method is required for this order",
    description: "error message"
  }
});

function getOrderErrorMessage(
  err: OrderErrorFragment,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case OrderErrorCode.CANNOT_CANCEL_FULFILLMENT:
        return intl.formatMessage(messages.cannotCancelFulfillment);
      case OrderErrorCode.CANNOT_CANCEL_ORDER:
        return intl.formatMessage(messages.cannotCancelOrder);
      case OrderErrorCode.CANNOT_REFUND:
        return intl.formatMessage(messages.cannotRefund);
      case OrderErrorCode.CAPTURE_INACTIVE_PAYMENT:
        return intl.formatMessage(messages.captureInactive);
      case OrderErrorCode.FULFILL_ORDER_LINE:
        return intl.formatMessage(messages.cannotFulfillLine);
      case OrderErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case OrderErrorCode.INVALID:
        return intl.formatMessage(commonErrorMessages.invalid);
      case OrderErrorCode.NOT_EDITABLE:
        return intl.formatMessage(messages.notEditable);
      case OrderErrorCode.ORDER_NO_SHIPPING_ADDRESS:
        return intl.formatMessage(messages.noShippingAddress);
      case OrderErrorCode.PAYMENT_MISSING:
        return intl.formatMessage(messages.paymentMissing);
      case OrderErrorCode.REQUIRED:
        return intl.formatMessage(formMessages.requiredField);
      case OrderErrorCode.SHIPPING_METHOD_NOT_APPLICABLE:
        return intl.formatMessage(messages.shippingNotApplicable);
      case OrderErrorCode.SHIPPING_METHOD_REQUIRED:
        return intl.formatMessage(messages.shippingRequired);
      case OrderErrorCode.VOID_INACTIVE_PAYMENT:
        return intl.formatMessage(messages.cannotVoid);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }

  return undefined;
}

export default getOrderErrorMessage;
