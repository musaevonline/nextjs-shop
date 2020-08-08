import { Typography } from "@material-ui/core";
import DialogContentText from "@material-ui/core/DialogContentText";
import ActionDialog from "@temp/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import { PermissionGroupErrorFragment } from "@temp/sections/permissionGroups/types/PermissionGroupErrorFragment";
import { PermissionGroupErrorCode } from "@temp/types/globalTypes";
import getPermissionGroupErrorMessage from "@temp/utils/errors/permissionGroups";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface PermissionDeleteDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  error?: PermissionGroupErrorFragment;
  name: string;
  onClose: () => void;
  onConfirm: () => void;
  open: boolean;
}

const PermissionGroupDeleteDialog: React.FC<PermissionDeleteDialogProps> = ({
  confirmButtonState,
  error,
  name,
  onClose,
  onConfirm,
  open
}) => {
  const intl = useIntl();

  let errorMessage;
  if (error?.code === PermissionGroupErrorCode.OUT_OF_SCOPE_PERMISSION) {
    errorMessage = intl.formatMessage({id: "cants_delete_group_out_permission_scope",
      defaultMessage:
        "Cant's delete group which is out of your permission scope",
      description: "deletion error message"
    });
  } else if (!!error) {
    errorMessage = getPermissionGroupErrorMessage(error, intl);
  }

  return (
    <ActionDialog
      open={open}
      confirmButtonState={confirmButtonState}
      onClose={onClose}
      onConfirm={onConfirm}
      title={intl.formatMessage({id: "delete_permission_group",
        defaultMessage: "Delete permission group",
        description: "dialog title"
      })}
      variant="delete"
    >
      <DialogContentText>
        <FormattedMessage id="sure_delete{name}"
          defaultMessage="Are you sure you want to delete {name}?"
          description="dialog content"
          values={{
            name: <strong>{name}</strong>
          }}
        />
      </DialogContentText>
      {!!errorMessage && <Typography color="error">{errorMessage}</Typography>}
    </ActionDialog>
  );
};
PermissionGroupDeleteDialog.displayName = "PermissionGroupDeleteDialog";
export default PermissionGroupDeleteDialog;
