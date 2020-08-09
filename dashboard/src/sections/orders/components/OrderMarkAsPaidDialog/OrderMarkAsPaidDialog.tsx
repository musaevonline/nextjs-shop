import DialogContentText from "@material-ui/core/DialogContentText";
import ActionDialog from "@temp/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import FormSpacer from "@temp/components/FormSpacer";
import useModalDialogErrors from "@temp/hooks/useModalDialogErrors";
import { OrderErrorFragment } from "@temp/sections/orders/types/OrderErrorFragment";
import getOrderErrorMessage from "@temp/utils/errors/order";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface OrderMarkAsPaidDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const OrderMarkAsPaidDialog: React.FC<OrderMarkAsPaidDialogProps> = ({
  confirmButtonState,
  errors: apiErrors,
  onClose,
  onConfirm,
  open
}) => {
  const intl = useIntl();
  const errors = useModalDialogErrors(apiErrors, open);

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      title={intl.formatMessage({
        id: "mark_order_as_paid",
        defaultMessage: "Mark Order as Paid",
        description: "dialog header"
      })}
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <DialogContentText>
        <FormattedMessage id="sure_mark_order_paid"
                          defaultMessage="Are you sure you want to mark this order as paid?" />
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
OrderMarkAsPaidDialog.displayName = "OrderMarkAsPaidDialog";
export default OrderMarkAsPaidDialog;
