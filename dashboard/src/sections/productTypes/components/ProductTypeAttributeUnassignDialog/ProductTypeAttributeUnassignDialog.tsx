import DialogContentText from "@material-ui/core/DialogContentText";
import ActionDialog from "@temp/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface ProductTypeAttributeUnassignDialogProps {
  attributeName: string;
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  productTypeName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ProductTypeAttributeUnassignDialog: React.FC<ProductTypeAttributeUnassignDialogProps> = ({
  attributeName,
  confirmButtonState,
  open,
  productTypeName,
  onClose,
  onConfirm
}) => {
  const intl = useIntl();

  return (
    <ActionDialog
      confirmButtonState={confirmButtonState}
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={intl.formatMessage({id: 'unassign_attribute_title',
        defaultMessage: "Unassign Attribute From Product Type",
        description: "dialog header"
      })}
    >
      <DialogContentText>
        <FormattedMessage id="sure_unassign_attribute_{attributeName}{productTypeName}"
          defaultMessage="Are you sure you want to unassign {attributeName} from {productTypeName}?"
          values={{
            attributeName: <strong>{attributeName}</strong>,
            productTypeName: <strong>{productTypeName}</strong>
          }}
        />
      </DialogContentText>
    </ActionDialog>
  );
};
ProductTypeAttributeUnassignDialog.displayName =
  "ProductTypeAttributeUnassignDialog";
export default ProductTypeAttributeUnassignDialog;
