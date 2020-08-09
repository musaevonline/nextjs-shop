import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import ConfirmButton, {
    ConfirmButtonTransitionState
} from "@temp/components/ConfirmButton";
import FormSpacer from "@temp/components/FormSpacer";
import Money from "@temp/components/Money";
import { SingleSelectField } from "@temp/components/SingleSelectField";
import useModalDialogErrors from "@temp/hooks/useModalDialogErrors";
import { buttonMessages } from "@temp/intl";
import { OrderErrorFragment } from "@temp/sections/orders/types/OrderErrorFragment";
import { getFormErrors } from "@temp/utils/errors";
import getOrderErrorMessage from "@temp/utils/errors/order";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { OrderDetails_order_availableShippingMethods } from "../../types/OrderDetails";
import {useFormik} from "formik";

export interface FormData {
    shippingMethod: string;
}

const useStyles = makeStyles(
    theme => ({
        dialog: {
            overflowY: "visible"
        },
        menuItem: {
            display: "flex",
            width: "100%"
        },
        price: {
            marginRight: theme.spacing(3)
        },
        root: {
            overflowY: "visible",
            width: theme.breakpoints.values.sm
        },
        shippingMethodName: {
            flex: 1,
            overflowX: "hidden",
            textOverflow: "ellipsis"
        }
    }),
    { name: "OrderShippingMethodEditDialog" }
);

export interface OrderShippingMethodEditDialogProps {
    confirmButtonState: ConfirmButtonTransitionState;
    errors: OrderErrorFragment[];
    open: boolean;
    shippingMethod: string;
    shippingMethods?: OrderDetails_order_availableShippingMethods[];
    onClose();
    onSubmit?(data: FormData);
}

const OrderShippingMethodEditDialog: React.FC<OrderShippingMethodEditDialogProps> = props => {
    const {
        confirmButtonState,
        errors: apiErrors,
        open,
        shippingMethod,
        shippingMethods,
        onClose,
        onSubmit
    } = props;
    const classes = useStyles(props);
    const errors = useModalDialogErrors(apiErrors, open);
    const intl = useIntl();

    const formFields = ["shippingMethod"];
    const formErrors = getFormErrors(formFields, errors);
    const nonFieldErrors = errors.filter(err => !formFields.includes(err.field));

    const choices = shippingMethods
        ? shippingMethods.map(s => ({
            label: (
                <div className={classes.menuItem}>
                    <span className={classes.shippingMethodName}>{s.name}</span>
                    &nbsp;
                    <span className={classes.price}>
              <Money money={s.price} />
            </span>
                </div>
            ),
            value: s.id
        }))
        : [];
    const initialForm: FormData = {
        shippingMethod
    };

    const form = useFormik({
        enableReinitialize: true,
        initialValues: initialForm,
        onSubmit
    });

    return (
        <Dialog onClose={onClose} open={open} classes={{ paper: classes.dialog }}>
            <DialogTitle>
                <FormattedMessage id="edit_shipping_method"
                                  defaultMessage="Edit Shipping Method"
                                  description="dialog header"
                />
            </DialogTitle>
            <form onSubmit={form.handleSubmit}>
                <DialogContent className={classes.root}>
                    <SingleSelectField
                        choices={choices}
                        error={!!formErrors.shippingMethod}
                        hint={getOrderErrorMessage(formErrors.shippingMethod, intl)}
                        name="shippingMethod"
                        value={form.values.shippingMethod}
                        onChange={form.handleChange}
                    />
                    {nonFieldErrors.length > 0 && (
                        <>
                            <FormSpacer />
                            {nonFieldErrors.map(err => (
                                <DialogContentText color="error">
                                    {getOrderErrorMessage(err, intl)}
                                </DialogContentText>
                            ))}
                        </>
                    )}
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
                        <FormattedMessage {...buttonMessages.confirm} />
                    </ConfirmButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
OrderShippingMethodEditDialog.displayName = "OrderShippingMethodEditDialog";
export default OrderShippingMethodEditDialog;
