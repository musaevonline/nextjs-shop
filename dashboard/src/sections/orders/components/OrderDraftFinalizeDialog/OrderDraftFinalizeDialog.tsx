import DialogContentText from "@material-ui/core/DialogContentText";
import ActionDialog from "@temp/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import FormSpacer from "@temp/components/FormSpacer";
import useModalDialogErrors from "@temp/hooks/useModalDialogErrors";
import { OrderErrorFragment } from "@temp/sections/orders/types/OrderErrorFragment";
import getOrderErrorMessage from "@temp/utils/errors/order";
import React from "react";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";

export enum OrderDraftFinalizeWarning {
  NO_SHIPPING,
  NO_USER,
  NO_SHIPPING_METHOD,
  UNNECESSARY_SHIPPING_METHOD
}

export interface OrderDraftFinalizeDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: OrderErrorFragment[];
  open: boolean;
  orderNumber: string;
  warnings: OrderDraftFinalizeWarning[];
  onClose: () => void;
  onConfirm: () => void;
}

function translateWarnings(
  intl: IntlShape
): Record<OrderDraftFinalizeWarning, string> {
  return {
    [OrderDraftFinalizeWarning.NO_SHIPPING]: intl.formatMessage({
      id: "no_shipping_address",
      defaultMessage: "No shipping address"
    }),
    [OrderDraftFinalizeWarning.NO_SHIPPING_METHOD]: intl.formatMessage({
      id: "some_products_required_shipping_method",
      defaultMessage: "Some products require shipping, but no method provided"
    }),
    [OrderDraftFinalizeWarning.NO_USER]: intl.formatMessage({
      id: "no_user_information",
      defaultMessage: "No user information"
    }),
    [OrderDraftFinalizeWarning.UNNECESSARY_SHIPPING_METHOD]: intl.formatMessage(
      {
        id: "shipping_method_provided_but_no_product_requires_it",
        defaultMessage: "Shipping method provided, but no product requires it"
      }
    )
  };
}

const OrderDraftFinalizeDialog: React.FC<OrderDraftFinalizeDialogProps> = ({
  confirmButtonState,
  errors: apiErrors,
  open,
  warnings,
  onClose,
  onConfirm,
  orderNumber
}) => {
  const intl = useIntl();
  const errors = useModalDialogErrors(apiErrors, open);

  const translatedWarnings = translateWarnings(intl);

  return (
    <ActionDialog
      onClose={onClose}
      onConfirm={onConfirm}
      open={open}
      title={intl.formatMessage({id: "finalize_draft_order",
        defaultMessage: "Finalize Draft Order",
        description: "dialog header"
      })}
      confirmButtonLabel={
        warnings.length > 0
          ? intl.formatMessage({id: "finalize_anyway",
              defaultMessage: "Finalize anyway",
              description: "button"
            })
          : intl.formatMessage({id: "finalize",
              defaultMessage: "Finalize",
              description: "button"
            })
      }
      confirmButtonState={confirmButtonState}
      variant={warnings.length > 0 ? "delete" : "default"}
    >
      <DialogContentText component="div">
        {warnings.length > 0 && (
          <>
            <p>
              <FormattedMessage id="missing_or_incorrect_order_information"
                                defaultMessage="There are missing or incorrect information about this order:" />
            </p>
            <ul>
              {warnings.map(warning => (
                <li key={warning}>{translatedWarnings[warning]}</li>
              ))}
            </ul>
          </>
        )}
        <FormattedMessage id="sure_finalize_draft{orderNumber}"
          defaultMessage="Are you sure you want to finalize draft #{orderNumber}?"
          values={{
            orderNumber
          }}
        />
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
      </DialogContentText>
    </ActionDialog>
  );
};
OrderDraftFinalizeDialog.displayName = "OrderDraftFinalize";
export default OrderDraftFinalizeDialog;
