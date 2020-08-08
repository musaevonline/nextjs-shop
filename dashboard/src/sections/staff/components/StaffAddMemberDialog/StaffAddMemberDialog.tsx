import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@temp/components/ConfirmButton";
import FormSpacer from "@temp/components/FormSpacer";
import useModalDialogErrors from "@temp/hooks/useModalDialogErrors";
import { buttonMessages, commonMessages } from "@temp/intl";
import { SearchPermissionGroups_search_edges_node } from "@temp/searches/types/SearchPermissionGroups";
import { StaffErrorFragment } from "@temp/sections/staff/types/StaffErrorFragment";
import { FetchMoreProps, SearchPageProps } from "@temp/types";
import { getFormErrors } from "@temp/utils/errors";
import getStaffErrorMessage from "@temp/utils/errors/staff";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {useFormik} from "formik";

export interface AddMemberFormData {
  email: string;
  firstName: string;
  lastName: string;
  permissionGroups: string[];
}

const initialForm: AddMemberFormData = {
  email: "",
  firstName: "",
  lastName: "",
  permissionGroups: []
};

const useStyles = makeStyles(
  theme => ({
    hr: {
      backgroundColor: "#eaeaea",
      border: "none",
      height: 1,
      marginBottom: 0
    },
    sectionTitle: {
      fontWeight: 600 as 600,
      marginBottom: theme.spacing(),
      marginTop: theme.spacing(2)
    },
    textFieldGrid: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: "1fr 1fr"
    }
  }),
  { name: "StaffAddMemberDialog" }
);

interface StaffAddMemberDialogProps extends SearchPageProps {
  availablePermissionGroups: SearchPermissionGroups_search_edges_node[];
  confirmButtonState: ConfirmButtonTransitionState;
  disabled: boolean;
  errors: StaffErrorFragment[];
  fetchMorePermissionGroups: FetchMoreProps;
  open: boolean;
  onClose: () => void;
  onConfirm: (data: AddMemberFormData) => void;
}

const StaffAddMemberDialog: React.FC<StaffAddMemberDialogProps> = props => {
  const { confirmButtonState, errors, onClose, onConfirm, open } = props;

  const classes = useStyles(props);
  const dialogErrors = useModalDialogErrors(errors, open);
  const intl = useIntl();
  const formErrors = getFormErrors(
    ["firstName", "lastName", "email"],
    dialogErrors
  );

  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialForm,
    onSubmit: onConfirm
  })

  return (
    <Dialog onClose={onClose} open={open}>
      <form onSubmit={form.handleSubmit}>
          <>
            <DialogTitle>
              <FormattedMessage id="invite_staff_member"
                defaultMessage="Invite Staff Member"
                description="dialog header"
              />
            </DialogTitle>
            <DialogContent>
              <div className={classes.textFieldGrid}>
                <TextField
                  error={!!formErrors.firstName}
                  helperText={
                    !!formErrors.firstName &&
                    getStaffErrorMessage(formErrors.firstName, intl)
                  }
                  label={intl.formatMessage(commonMessages.firstName)}
                  name="firstName"
                  type="text"
                  value={form.values.firstName}
                  onChange={form.handleChange}
                />
                <TextField
                  error={!!formErrors.lastName}
                  helperText={
                    !!formErrors.lastName &&
                    getStaffErrorMessage(formErrors.lastName, intl)
                  }
                  label={intl.formatMessage(commonMessages.lastName)}
                  name="lastName"
                  type="text"
                  value={form.values.lastName}
                  onChange={form.handleChange}
                />
              </div>
              <FormSpacer />
              <TextField
                error={!!formErrors.email}
                fullWidth
                helperText={
                  !!formErrors.email &&
                  getStaffErrorMessage(formErrors.email, intl)
                }
                label={intl.formatMessage(commonMessages.email)}
                name="email"
                type="email"
                value={form.values.email}
                onChange={form.handleChange}
              />
            </DialogContent>
            <hr className={classes.hr} />
            <DialogActions>
              <Button onClick={onClose}>
                <FormattedMessage {...buttonMessages.back} />
              </Button>
              <ConfirmButton
                color="primary"
                disabled={!form.dirty || !form.isValid}
                variant="contained"
                type="submit"
                transitionState={confirmButtonState}
              >
                <FormattedMessage id="send_invite"
                  defaultMessage="Send invite"
                  description="button"
                />
              </ConfirmButton>
            </DialogActions>
          </>
      </form>
    </Dialog>
  );
};
StaffAddMemberDialog.displayName = "StaffAddMemberDialog";
export default StaffAddMemberDialog;
