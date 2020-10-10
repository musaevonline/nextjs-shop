import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import createDialogActionHandlers from "@temp/utils/handlers/dialogActionHandlers";
import React from "react";
import { useIntl } from "react-intl";

import { OrderAddNote } from "../../types/OrderAddNote";
import { OrderCancel } from "../../types/OrderCancel";
import { OrderCapture } from "../../types/OrderCapture";
import { OrderDraftCancel } from "../../types/OrderDraftCancel";
import { OrderDraftFinalize } from "../../types/OrderDraftFinalize";
import { OrderDraftUpdate } from "../../types/OrderDraftUpdate";
import { OrderLineDelete } from "../../types/OrderLineDelete";
import { OrderLinesAdd } from "../../types/OrderLinesAdd";
import { OrderLineUpdate } from "../../types/OrderLineUpdate";
import { OrderMarkAsPaid } from "../../types/OrderMarkAsPaid";
import { OrderRefund } from "../../types/OrderRefund";
import { OrderShippingMethodUpdate } from "../../types/OrderShippingMethodUpdate";
import { OrderUpdate } from "../../types/OrderUpdate";
import { OrderVoid } from "../../types/OrderVoid";
import { orderUrl, OrderUrlQueryParams } from "../../urls";
import {FulfillOrder} from "@temp/sections/orders/types/FulfillOrder";

interface OrderDetailsMessages {
  children: (props: {
    handleDraftCancel: (data: OrderDraftCancel) => void;
    handleDraftFinalize: (data: OrderDraftFinalize) => void;
    handleDraftUpdate: (data: OrderDraftUpdate) => void;
    handleNoteAdd: (data: OrderAddNote) => void;
    handleOrderCancel: (data: OrderCancel) => void;
    handleOrderLinesAdd: (data: OrderLinesAdd) => void;
    handleOrderLineDelete: (data: OrderLineDelete) => void;
    handleOrderLineUpdate: (data: OrderLineUpdate) => void;
    handleOrderMarkAsPaid: (data: OrderMarkAsPaid) => void;
    handleOrderVoid: (data: OrderVoid) => void;
    handlePaymentCapture: (data: OrderCapture) => void;
    handlePaymentRefund: (data: OrderRefund) => void;
    handleShippingMethodUpdate: (data: OrderShippingMethodUpdate) => void;
    handleUpdate: (data: OrderUpdate) => void;
    handleFulfill: (data: FulfillOrder) => void;
  }) => React.ReactElement;
  id: string;
  params: OrderUrlQueryParams;
}

export const OrderDetailsMessages: React.FC<OrderDetailsMessages> = ({
  children,
  id,
  params
}) => {
  const navigate = useNavigator();
  const pushMessage = useNotifier();
  const intl = useIntl();

  const [, closeModal] = createDialogActionHandlers(
    navigate,
    params => orderUrl(id, params),
    params
  );

  const handlePaymentCapture = (data: OrderCapture) => {
    const errs = data.orderCapture?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "payment_successfully_captured",
          defaultMessage: "Payment successfully captured"
        })
      });
      closeModal();
    }
  };
  const handlePaymentRefund = (data: OrderRefund) => {
    const errs = data.orderRefund?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "payment_successfully_refunded",
          defaultMessage: "Payment successfully refunded"
        })
      });
      closeModal();
    }
  };
  const handleOrderMarkAsPaid = (data: OrderMarkAsPaid) => {
    const errs = data.orderMarkAsPaid?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "order_mark_as_paid",
          defaultMessage: "Order marked as paid"
        })
      });
      closeModal();
    }
  };
  const handleOrderCancel = (data: OrderCancel) => {
    const errs = data.orderCancel?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "order_successfully_cancelled",
          defaultMessage: "Order successfully cancelled"
        })
      });
      closeModal();
    }
  };
  const handleDraftCancel = (data: OrderDraftCancel) => {
    const errs = data.draftOrderDelete?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "order_successfully_cancelled",
          defaultMessage: "Order successfully cancelled"
        })
      });
      closeModal();
    }
  };
  const handleOrderVoid = (data: OrderVoid) => {
    const errs = data.orderVoid?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "order_successfully_voided",
          defaultMessage: "Order payment successfully voided"
        })
      });
      closeModal();
    }
  };
  const handleNoteAdd = (data: OrderAddNote) => {
    const errs = data.orderAddNote?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "note_successfully_added",
          defaultMessage: "Note successfully added"
        })
      });
    }
  };
  const handleUpdate = (data: OrderUpdate) => {
    const errs = data.orderUpdate?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "order_successfully_updated",
          defaultMessage: "Order successfully updated"
        })
      });
    }
  };
  const handleDraftUpdate = (data: OrderDraftUpdate) => {
    const errs = data.draftOrderUpdate?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "order_successfully_updated",
          defaultMessage: "Order successfully updated"
        })
      });
    }
  };
  const handleShippingMethodUpdate = (data: OrderShippingMethodUpdate) => {
    const errs = data.orderUpdateShipping?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "shipping_method_successfully_updated",
          defaultMessage: "Shipping method successfully updated"
        })
      });
      closeModal();
    }
  };
  const handleOrderLineDelete = (data: OrderLineDelete) => {
    const errs = data.draftOrderLineDelete?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "order_line_deleted",
          defaultMessage: "Order line deleted"
        })
      });
    }
  };
  const handleOrderLinesAdd = (data: OrderLinesAdd) => {
    const errs = data.draftOrderLinesCreate?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "order_line_added",
          defaultMessage: "Order line added"
        })
      });
      closeModal();
    }
  };
  const handleOrderLineUpdate = (data: OrderLineUpdate) => {
    const errs = data.draftOrderLineUpdate?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "order_line_updated",
          defaultMessage: "Order line updated"
        })
      });
    }
  };
  const handleDraftFinalize = (data: OrderDraftFinalize) => {
    const errs = data.draftOrderComplete?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "draft_order_line_finalized",
          defaultMessage: "Draft order successfully finalized"
        })
      });
      closeModal();
    }
  };
  const handleFulfill = (data: FulfillOrder) => {
    const errs = data.orderFulfill?.errors;
    if (errs.length === 0) {
      pushMessage({
        text: intl.formatMessage({id: "order_fulfill",
          defaultMessage: "Order successfully fulfilled"
        })
      });
      closeModal();
    }
  };

  return children({
    handleDraftCancel,
    handleDraftFinalize,
    handleDraftUpdate,
    handleNoteAdd,
    handleOrderCancel,
    handleOrderLineDelete,
    handleOrderLineUpdate,
    handleOrderLinesAdd,
    handleOrderMarkAsPaid,
    handleOrderVoid,
    handlePaymentCapture,
    handlePaymentRefund,
    handleShippingMethodUpdate,
    handleUpdate,
    handleFulfill
  });
};
