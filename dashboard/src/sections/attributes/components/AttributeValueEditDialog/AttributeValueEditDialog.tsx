import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import { getAttributeValueErrorMessage } from "../../errors";
import { ProductErrorFragment } from "@temp/sections/products/types/ProductErrorFragment";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@temp/components/ConfirmButton";
import useModalDialogErrors from "@temp/hooks/useModalDialogErrors";
import {buttonMessages, formMessages} from "@temp/intl";
import { maybe } from "@temp/misc";
import { getFormErrors } from "@temp/utils/errors";
import React from "react";
import {FormattedMessage, IntlShape, useIntl} from "react-intl";

import { AttributeDetails_attribute_values } from "../../types/AttributeDetails";
import {useFormik} from "formik";
import * as yup from 'yup';
import {slugifyStr} from "@temp/core/utils";

const createSchema = (intl: IntlShape) => yup.object().shape({
  name: yup.string().required(intl.formatMessage(formMessages.requiredField))
});

export interface AttributeValueEditDialogFormData {
  name: string;
  slug: string;
}
export interface AttributeValueEditDialogProps {
  attributeValue: AttributeDetails_attribute_values | null;
  confirmButtonState: ConfirmButtonTransitionState;
  disabled: boolean;
  errors: ProductErrorFragment[];
  open: boolean;
  onSubmit: (data: AttributeValueEditDialogFormData) => void;
  onClose: () => void;
}

const AttributeValueEditDialog: React.FC<AttributeValueEditDialogProps> = ({
  attributeValue,
  confirmButtonState,
  disabled,
  errors: apiErrors,
  onClose,
  onSubmit,
  open
}) => {
  const intl = useIntl();
  const initialForm: AttributeValueEditDialogFormData = {
    name: maybe(() => attributeValue.name, ""),
    slug: maybe(() => attributeValue.slug, "")
  };
  const errors = useModalDialogErrors(apiErrors, open);
  const formErrors = getFormErrors(["name"], errors);

  const form = useFormik({
    initialValues: initialForm,
    enableReinitialize: true,
    validationSchema: createSchema(intl),
    onSubmit: values => {
      onSubmit({...values, slug: slugifyStr(values.name)});
    }
  })

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="sm">
      <DialogTitle>
        {attributeValue === null ? (
          <FormattedMessage id="add_value"
            defaultMessage="Add Value"
            description="add attribute value"
          />
        ) : (
          <FormattedMessage id="edit_value"
            defaultMessage="Edit Value"
            description="edit attribute value"
          />
        )}
      </DialogTitle>
      <form onSubmit={form.handleSubmit}>
            <DialogContent>
              <TextField
                autoFocus
                disabled={disabled}
                error={!!formErrors.name}
                fullWidth
                helperText={getAttributeValueErrorMessage(
                  formErrors.name,
                  intl
                )}
                name={"name" as keyof AttributeValueEditDialogFormData}
                label={intl.formatMessage({id: 'name',
                  defaultMessage: "Name",
                  description: "attribute name"
                })}
                value={form.values.name}
                onChange={form.handleChange}
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
                disabled={!form.dirty || !form.isValid}
              >
                <FormattedMessage {...buttonMessages.save} />
              </ConfirmButton>
            </DialogActions>
      </form>
    </Dialog>
  );
};
AttributeValueEditDialog.displayName = "AttributeValueEditDialog";
export default AttributeValueEditDialog;
