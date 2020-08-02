import DialogContentText from "@material-ui/core/DialogContentText";
import ActionDialog from "@temp/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface ProductTypeDeleteDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  name: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ProductTypeDeleteDialog: React.FC<ProductTypeDeleteDialogProps> = ({
  confirmButtonState,
  open,
  name,
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
      title={intl.formatMessage({id: 'delete_product_type',
        defaultMessage: "Delete Product Type",
        description: "dialog header"
      })}
    >
      <DialogContentText>
        <FormattedMessage id="sure_delete_product_type_{name}"
          defaultMessage="Are you sure you want to delete {name}?"
          description="delete product type"
          values={{
            name: <strong>{name}</strong>
          }}
        />
      </DialogContentText>
    </ActionDialog>
  );
};
ProductTypeDeleteDialog.displayName = "ProductTypeDeleteDialog";
export default ProductTypeDeleteDialog;
