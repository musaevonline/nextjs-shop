import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import AddressEdit from "@temp/components/AddressEdit";
import ConfirmButton, {
  ConfirmButtonTransitionState
} from "@temp/components/ConfirmButton";
import { AddressTypeInput } from "@temp/sections/customers/types";
import useAddressValidation from "@temp/hooks/useAddressValidation";
import useModalDialogErrors from "@temp/hooks/useModalDialogErrors";
import useStateFromProps from "@temp/hooks/useStateFromProps";
import { buttonMessages } from "@temp/intl";
import { maybe } from "@temp/misc";
import { OrderErrorFragment } from "@temp/sections/orders/types/OrderErrorFragment";
import {AddressInput, CountryCode} from "@temp/types/globalTypes";
import createSingleAutocompleteSelectHandler from "@temp/utils/handlers/singleAutocompleteSelectChangeHandler";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {useFormik} from "formik";

const useStyles = makeStyles(
    {
      overflow: {
        overflowY: "visible"
      }
    },
    { name: "OrderAddressEditDialog" }
);

interface OrderAddressEditDialogProps {
  confirmButtonState: ConfirmButtonTransitionState;
  address: AddressTypeInput;
  open: boolean;
  errors: OrderErrorFragment[];
  countries?: Array<{
    code: string;
    label: string;
  }>;
  onClose();
  onConfirm(data: AddressInput);
}

const OrderAddressEditDialog: React.FC<OrderAddressEditDialogProps> = props => {
  const {
    address,
    confirmButtonState,
    open,
    errors,
    countries,
    onClose,
    onConfirm
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();
  const [countryDisplayName, setCountryDisplayName] = useStateFromProps(
      maybe(
          () => countries.find(country => address.country === country.code).label
      )
  );
  const {
    errors: validationErrors,
    submit: handleSubmit
  } = useAddressValidation(onConfirm);
  const dialogErrors = useModalDialogErrors(
      [...errors, ...validationErrors],
      open
  );

  const countryChoices = countries.map(country => ({
    label: country.label,
    value: country.code
  }));
  const form = useFormik({
    enableReinitialize: true,
    initialValues: {...address, country: CountryCode.BY},
    onSubmit: handleSubmit
  });
  const handleCountrySelect = createSingleAutocompleteSelectHandler(
      form.handleChange,
      setCountryDisplayName,
      countryChoices
  );
  return (
      <Dialog onClose={onClose} open={open} classes={{ paper: classes.overflow }}>
        <form onSubmit={form.handleSubmit}>
          <DialogTitle>
            {intl.formatMessage({id: "edit_shipping_address",
              defaultMessage: "Edit Shipping Address",
              description: "dialog header"
            })}
          </DialogTitle>
          <DialogContent className={classes.overflow}>
            <AddressEdit
                countries={countryChoices}
                countryDisplayValue={countryDisplayName}
                data={form.values}
                errors={dialogErrors}
                onChange={form.handleChange}
                onCountryChange={handleCountrySelect}
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
                onClick={e => {form.handleSubmit()}}
                type="submit"
            >
              <FormattedMessage {...buttonMessages.confirm} />
            </ConfirmButton>
          </DialogActions>
        </form>
      </Dialog>
  );
};

OrderAddressEditDialog.displayName = "OrderAddressEditDialog";
export default OrderAddressEditDialog;
