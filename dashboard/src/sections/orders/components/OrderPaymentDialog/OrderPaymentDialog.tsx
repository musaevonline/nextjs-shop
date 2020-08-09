import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@temp/components/ConfirmButton";
import Form from "@temp/components/Form";
import FormSpacer from "@temp/components/FormSpacer";
import { buttonMessages } from "@temp/intl";
import { OrderErrorFragment } from "@temp/sections/orders/types/OrderErrorFragment";
import { getFormErrors } from "@temp/utils/errors";
import getOrderErrorMessage from "@temp/utils/errors/order";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface FormData {
  amount: number;
}

export interface OrderPaymentDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  initial: number;
  variant: "capture" | "refund";
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}

const OrderPaymentDialog: React.FC<OrderPaymentDialogProps> = ({
  confirmButtonState,
  errors,
  open,
  initial,
  variant,
  onClose,
  onSubmit
}) => {
  const intl = useIntl();

  const formFields = ["payment"];
  const formErrors = getFormErrors(formFields, errors);

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="xs">
      <Form
        initial={{
          amount: initial
        }}
        onSubmit={onSubmit}
      >
        {({ data, change, submit }) => (
          <>
            <DialogTitle>
              {variant === "capture"
                ? intl.formatMessage({id: "capture_payment",
                    defaultMessage: "Capture Payment",
                    description: "dialog header"
                  })
                : intl.formatMessage({id: "refund_payment",
                    defaultMessage: "Refund Payment",
                    description: "dialog header"
                  })}
            </DialogTitle>
            <DialogContent>
              <TextField
                error={!!formErrors.payment}
                fullWidth
                helperText={getOrderErrorMessage(formErrors.payment, intl)}
                label={intl.formatMessage({id: "amount",
                  defaultMessage: "Amount",
                  description: "amount of refunded money"
                })}
                name="amount"
                onChange={change}
                inputProps={{
                  step: "0.01"
                }}
                type="number"
                value={data.amount}
              />
              {errors.length > 0 && (
                <>
                  <FormSpacer />
                  {errors
                    .filter(err => !formFields.includes(err.field))
                    .map(err => (
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
                transitionState={confirmButtonState}
                color="primary"
                variant="contained"
                onClick={submit}
              >
                <FormattedMessage {...buttonMessages.confirm} />
              </ConfirmButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};
OrderPaymentDialog.displayName = "OrderPaymentDialog";
export default OrderPaymentDialog;
