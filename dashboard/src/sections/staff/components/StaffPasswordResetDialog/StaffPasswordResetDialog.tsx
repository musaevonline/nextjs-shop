import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@temp/components/ConfirmButton";
import FormSpacer from "@temp/components/FormSpacer";
import { AccountErrorFragment } from "@temp/sections/customers/types/AccountErrorFragment";
import useModalDialogErrors from "@temp/hooks/useModalDialogErrors";
import { buttonMessages } from "@temp/intl";
import { DialogProps } from "@temp/types";
import { getFormErrors } from "@temp/utils/errors";
import getAccountErrorMessage from "@temp/utils/errors/account";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {useFormik} from "formik";

interface StaffPasswordResetDialogFormData {
  newPassword: string;
  oldPassword: string;
}
export interface StaffPasswordResetDialogProps extends DialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  errors: AccountErrorFragment[];
  onSubmit: (data: StaffPasswordResetDialogFormData) => void;
}

const initialForm: StaffPasswordResetDialogFormData = {
  newPassword: "",
  oldPassword: ""
};

const StaffPasswordResetDialog: React.FC<StaffPasswordResetDialogProps> = ({
  confirmButtonState,
  errors,
  open,
  onClose,
  onSubmit
}) => {
  const intl = useIntl();
  const dialogErrors = useModalDialogErrors(errors, open);

  const formErrors = getFormErrors(
    ["oldPassword", "newPassword"],
    dialogErrors
  );

  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialForm,
    onSubmit
  })

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        <FormattedMessage id="change_password"
          defaultMessage="Change Password"
          description="dialog header"
        />
      </DialogTitle>
      <form onSubmit={form.handleSubmit}>
          <>
            <DialogContent>
              <TextField
                error={!!formErrors.oldPassword}
                fullWidth
                helperText={getAccountErrorMessage(
                  formErrors.oldPassword,
                  intl
                )}
                label={intl.formatMessage({id: "previous_password",
                  defaultMessage: "Previous Password",
                  description: "input label"
                })}
                name="oldPassword"
                type="password"
                value={form.values.oldPassword}
                onChange={form.handleChange}
              />
              <FormSpacer />
              <TextField
                error={!!formErrors.newPassword}
                fullWidth
                helperText={
                  getAccountErrorMessage(formErrors.newPassword, intl) ||
                  intl.formatMessage({id: "new_password_least_8_characters",
                    defaultMessage:
                      "New password must be at least 8 characters long"
                  })
                }
                label={intl.formatMessage({id: "new_password",
                  defaultMessage: "New Password",
                  description: "input label"
                })}
                name="newPassword"
                type="password"
                value={form.values.newPassword}
                onChange={form.handleChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>
                <FormattedMessage {...buttonMessages.back} />
              </Button>
              <ConfirmButton
                disabled={form.values.newPassword.length < 8}
                transitionState={confirmButtonState}
                color="primary"
                variant="contained"
                type="submit"
                onClick={e => form.handleSubmit()}
              >
                <FormattedMessage {...buttonMessages.save} />
              </ConfirmButton>
            </DialogActions>
          </>
      </form>
    </Dialog>
  );
};

StaffPasswordResetDialog.displayName = "StaffPasswordResetDialog";
export default StaffPasswordResetDialog;
