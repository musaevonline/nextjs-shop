import DialogContentText from "@material-ui/core/DialogContentText";
import ActionDialog from "@temp/components/ActionDialog";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface MembersErrorDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const MembersErrorDialog: React.FC<MembersErrorDialogProps> = ({
  confirmButtonState,
  onClose,
  onConfirm,
  open
}) => {
  const intl = useIntl();

  return (
    <ActionDialog
      open={open}
      confirmButtonState={confirmButtonState}
      onClose={onClose}
      onConfirm={onConfirm}
      title={intl.formatMessage({id: "unassign_users",
        defaultMessage: "Unassign users",
        description: "dialog title"
      })}
      variant="default"
    >
      <DialogContentText>
        <FormattedMessage id="not_able_to_modify_group_members"
          defaultMessage="You are not able to modify this group members. Solve this problem to continue with request."
          description="dialog content"
        />
      </DialogContentText>
    </ActionDialog>
  );
};
MembersErrorDialog.displayName = "MembersErrorDialog";
export default MembersErrorDialog;
