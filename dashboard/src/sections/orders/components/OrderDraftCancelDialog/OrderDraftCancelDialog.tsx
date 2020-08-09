import DialogContentText from "@material-ui/core/DialogContentText";
import ActionDialog from "@temp/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import FormSpacer from "@temp/components/FormSpacer";
import useModalDialogErrors from "@temp/hooks/useModalDialogErrors";
import { OrderErrorFragment } from "@temp/sections/orders/types/OrderErrorFragment";
import getOrderErrorMessage from "@temp/utils/errors/order";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface OrderDraftCancelDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderNumber: string;
}

const OrderDraftCancelDialog: React.FC<OrderDraftCancelDialogProps> = ({
  confirmButtonState,
  errors: apiErrors,
  onClose,
  onConfirm,
  open,
  orderNumber
}) => {
  const intl = useIntl();
  const errors = useModalDialogErrors(apiErrors, open);

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      onClose={onClose}
      onConfirm={onConfirm}
      open={open}
      title={intl.formatMessage({id: "delete_draft_order",
        defaultMessage: "Delete Daft Order",
        description: "dialog header"
      })}
      variant="delete"
    >
      <DialogContentText>
        <FormattedMessage id="sure_delete_draft{orderNumber}"
          defaultMessage="Are you sure you want to delete draft #{orderNumber}?"
          values={{
            orderNumber: <strong>{orderNumber}</strong>
          }}
        />
      </DialogContentText>
      {errors.length > 0 && (
        <>
          <FormSpacer />
          {errors.map(err => (
            <DialogContentText color="error">
              {getOrderErrorMessage(err, intl)}
            </DialogContentText>
          ))}
        </>
      )}
    </ActionDialog>
  );
};
OrderDraftCancelDialog.displayName = "OrderDraftCancelDialog";
export default OrderDraftCancelDialog;
