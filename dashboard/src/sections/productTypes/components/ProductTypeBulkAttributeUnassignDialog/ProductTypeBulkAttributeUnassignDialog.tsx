import DialogContentText from "@material-ui/core/DialogContentText";
import ActionDialog from "@temp/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface ProductTypeBulkAttributeUnassignDialogProps {
  attributeQuantity: number;
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  productTypeName: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ProductTypeBulkAttributeUnassignDialog: React.FC<ProductTypeBulkAttributeUnassignDialogProps> = ({
  attributeQuantity,
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
        defaultMessage: "Unassign Attribute from Product Type",
        description: "dialog header"
      })}
    >
      <DialogContentText>
        <FormattedMessage id="sure_unassign_attribute_text"
          defaultMessage="{counter,plural,one{Are you sure you want to unassign this attribute from {productTypeName}?} other{Are you sure you want to unassign {attributeQuantity} attributes from {productTypeName}?}}"
          description="unassign multiple attributes from product type"
          values={{
            attributeQuantity: <strong>{attributeQuantity}</strong>,
            counter: attributeQuantity,
            productTypeName: <strong>{productTypeName}</strong>
          }}
        />
      </DialogContentText>
    </ActionDialog>
  );
};
ProductTypeBulkAttributeUnassignDialog.displayName =
  "ProductTypeBulkAttributeUnassignDialog";
export default ProductTypeBulkAttributeUnassignDialog;
