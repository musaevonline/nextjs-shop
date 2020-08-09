import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createStyles, WithStyles, withStyles } from "@material-ui/core/styles";
import AddressEdit from "@temp/components/AddressEdit";
import ConfirmButton, {
    ConfirmButtonTransitionState
} from "@temp/components/ConfirmButton";
import { AccountErrorFragment } from "@temp/sections/customers/types/AccountErrorFragment";
import useAddressValidation from "@temp/hooks/useAddressValidation";
import useModalDialogErrors from "@temp/hooks/useModalDialogErrors";
import useStateFromProps from "@temp/hooks/useStateFromProps";
import { buttonMessages } from "@temp/intl";
import { maybe } from "@temp/misc";
import { AddressInput } from "@temp/types/globalTypes";
import createSingleAutocompleteSelectHandler from "@temp/utils/handlers/singleAutocompleteSelectChangeHandler";
import React from "react";
import { FormattedMessage } from "react-intl";

import { AddressTypeInput } from "../../types";
import { CustomerAddresses_user_addresses } from "../../types/CustomerAddresses";
import {useFormik} from "formik";

export interface CustomerAddressDialogProps {
    address: CustomerAddresses_user_addresses;
    confirmButtonState: ConfirmButtonTransitionState;
    countries: Array<{
        code: string;
        label: string;
    }>;
    errors: AccountErrorFragment[];
    open: boolean;
    variant: "create" | "edit";
    onClose: () => void;
    onConfirm: (data: AddressInput) => void;
}

const styles = createStyles({
    overflow: {
        overflowY: "visible"
    }
});

const CustomerAddressDialog = withStyles(
    styles,
    {}
)(
    ({
         address,
         classes,
         confirmButtonState,
         countries,
         errors,
         open,
         variant,
         onClose,
         onConfirm
     }: CustomerAddressDialogProps & WithStyles<typeof styles>) => {
        const [countryDisplayName, setCountryDisplayName] = useStateFromProps(
            maybe(() => address.country.country, "")
        );
        const {
            errors: validationErrors,
            submit: handleSubmit
        } = useAddressValidation(onConfirm);
        const dialogErrors = useModalDialogErrors(
            [...errors, ...validationErrors],
            open
        );

        const initialForm: AddressTypeInput = {
            city: maybe(() => address.city, ""),
            cityArea: maybe(() => address.cityArea, ""),
            companyName: maybe(() => address.companyName, ""),
            country: maybe(() => address.country.code, ""),
            countryArea: maybe(() => address.countryArea, ""),
            firstName: maybe(() => address.firstName, ""),
            lastName: maybe(() => address.lastName, ""),
            phone: maybe(() => address.phone, ""),
            postalCode: maybe(() => address.postalCode, ""),
            streetAddress1: maybe(() => address.streetAddress1, ""),
            streetAddress2: maybe(() => address.streetAddress2, "")
        };

        const countryChoices = maybe(
            () =>
                countries.map(country => ({
                    label: country.label,
                    value: country.code
                })),
            []
        );

        const form = useFormik({
            enableReinitialize: true,
            initialValues: initialForm,
            onSubmit: handleSubmit
        })

        const handleCountrySelect = createSingleAutocompleteSelectHandler(
            form.handleChange,
            setCountryDisplayName,
            countryChoices
        );
        return (
            <Dialog
                onClose={onClose}
                open={open}
                classes={{ paper: classes.overflow }}
                fullWidth
                maxWidth="sm"
            >
                <form onSubmit={form.handleSubmit}>
                    <DialogTitle>
                        {variant === "create" ? (
                            <FormattedMessage id="add_address"
                                              defaultMessage="Add Address"
                                              description="dialog title"
                            />
                        ) : (
                            <FormattedMessage id="edit_address"
                                              defaultMessage="Edit Address"
                                              description="dialog title"
                            />
                        )}
                    </DialogTitle>
                    <DialogContent className={classes.overflow}>
                        <AddressEdit
                            countries={countryChoices}
                            data={form.values}
                            countryDisplayValue={countryDisplayName}
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
                            type="submit"
                        >
                            <FormattedMessage {...buttonMessages.save} />
                        </ConfirmButton>
                    </DialogActions>
                </form>
            </Dialog>
        );
    }
);
CustomerAddressDialog.displayName = "CustomerAddressDialog";
export default CustomerAddressDialog;
