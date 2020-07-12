import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import {buttonMessages, commonMessages, formMessages} from "@temp/intl";
import React from "react";
import {FormattedMessage, IntlShape, useIntl} from "react-intl";
import * as yup from 'yup';

import ConfirmButton, { ConfirmButtonTransitionState } from "../ConfirmButton";
import {useFormik} from "formik";

const createSchema = (intl: IntlShape) => yup.object().shape({
  name: yup.string().required(intl.formatMessage(formMessages.requiredField))
})

export interface SaveFilterTabDialogFormData {
  name: string;
}

export interface SaveFilterTabDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: SaveFilterTabDialogFormData) => void;
}

const SaveFilterTabDialog: React.FC<SaveFilterTabDialogProps> = ({
                                                                   confirmButtonState,
                                                                   onClose,
                                                                   onSubmit,
                                                                   open
                                                                 }) => {
  const intl = useIntl();
  const schema = createSchema(intl);

  const form = useFormik({
    initialValues: {name: ""},
    validationSchema: schema,
    onSubmit: values => {
      onSubmit(values);
    }
  })

  return (
      <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
        <DialogTitle>
          <FormattedMessage {...commonMessages.saveCustomSearch}/>
        </DialogTitle>
        <form onSubmit={form.handleSubmit}>
          <>
            <DialogContent>
              <TextField
                  autoFocus
                  fullWidth
                  label={intl.formatMessage(formMessages.searchName)}
                  name="name"
                  value={form.values.name}
                  onChange={form.handleChange}
                  onBlur={form.handleBlur}
                  error={!!(form.dirty && form.touched.name && form.errors.name)}
                  helperText={form.dirty && form.touched.name && form.errors.name}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>
                <FormattedMessage {...buttonMessages.back} />
              </Button>
              <ConfirmButton
                  transitionState={confirmButtonState}
                  color="primary"
                  variant="contained"
                  type="submit"
              >
                <FormattedMessage {...buttonMessages.save} />
              </ConfirmButton>
            </DialogActions>
          </>
        </form>
      </Dialog>
  );
};
SaveFilterTabDialog.displayName = "SaveFilterTabDialog";
export default SaveFilterTabDialog;
