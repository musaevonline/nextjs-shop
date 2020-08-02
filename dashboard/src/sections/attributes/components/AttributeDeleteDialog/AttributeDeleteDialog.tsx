import DialogContentText from "@material-ui/core/DialogContentText";
import ActionDialog from "@temp/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface AttributeDeleteDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  name: string;
}

const AttributeDeleteDialog: React.FC<AttributeDeleteDialogProps> = ({
  name,
  confirmButtonState,
  onClose,
  onConfirm,
  open
}) => {
  const intl = useIntl();

  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      confirmButtonState={confirmButtonState}
      onConfirm={onConfirm}
      variant="delete"
      title={intl.formatMessage({id: 'delete_attribute',
        defaultMessage: "Delete attribute",
        description: "dialog title"
      })}
    >
      <DialogContentText>
        <FormattedMessage id="sure_delete_attribute_text"
          defaultMessage="Are you sure you want to delete {attributeName}?"
          description="dialog content"
          values={{
            attributeName: <strong>{name}</strong>
          }}
        />
      </DialogContentText>
    </ActionDialog>
  );
};

AttributeDeleteDialog.displayName = "AttributeDeleteDialog";
export default AttributeDeleteDialog;
