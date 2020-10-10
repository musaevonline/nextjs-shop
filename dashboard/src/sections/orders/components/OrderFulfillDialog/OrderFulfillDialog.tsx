import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@temp/components/ConfirmButton";
import FormSpacer from "@temp/components/FormSpacer";
import useModalDialogErrors from "@temp/hooks/useModalDialogErrors";
import { buttonMessages } from "@temp/intl";
import { OrderErrorFragment } from "@temp/sections/orders/types/OrderErrorFragment";
import getOrderErrorMessage from "@temp/utils/errors/order";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface OrderFulfillDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  number: string;
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const OrderFulfillDialog: React.FC<OrderFulfillDialogProps> = props => {
  const {
    confirmButtonState,
    errors: apiErrors,
    number: orderNumber,
    open,
    onSubmit,
    onClose
  } = props;

  const intl = useIntl();
  const errors = useModalDialogErrors(apiErrors, open);

  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm">
      <DialogTitle>
        <FormattedMessage
          defaultMessage="Fulfill Order"
          description="dialog header"
          id="OrderFulfillDialogHeader"
        />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <FormattedMessage id="order_fulfill_dialog_text"
            defaultMessage="Are you sure you want to fulfill this order?"
            values={{
              b: (...chunks) => <b>{chunks}</b>,
              orderNumber
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>
          <FormattedMessage {...buttonMessages.back} />
        </Button>
        <ConfirmButton
          onClick={onSubmit}
          transitionState={confirmButtonState}
          variant="contained"
          type="submit"
        >
          <FormattedMessage {...buttonMessages.accept} />
        </ConfirmButton>
      </DialogActions>
    </Dialog>
  );
};
OrderFulfillDialog.displayName = "OrderFulfillDialog";
export default OrderFulfillDialog;
