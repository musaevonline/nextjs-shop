import AppHeader from "@temp/components/AppHeader";
import {ConfirmButtonTransitionState} from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import {sectionNames} from "@temp/intl";
import {PaymentErrorFragment} from "@temp/sections/paymentMethods/types/PaymentErrorFragment";
import React from "react";
import {useIntl} from "react-intl";
import {useFormik} from "formik";
import PaymentMethodDetailsForm, {PaymentMethodDetailsFormData} from "@temp/sections/paymentMethods/components/PaymentMethodDetailsForm";

export interface PaymentMethodCreatePageProps {
    disabled: boolean;
    errors: PaymentErrorFragment[];
    saveButtonBarState: ConfirmButtonTransitionState;
    onBack: () => void;
    onSubmit: (data: PaymentMethodDetailsFormData) => void;
}

const PaymentMethodCreatePage: React.FC<PaymentMethodCreatePageProps> = ({
                                                                             disabled,
                                                                             errors,
                                                                             onBack,
                                                                             onSubmit,
                                                                             saveButtonBarState
                                                                         }) => {
    const intl = useIntl();
    const initialForm: PaymentMethodDetailsFormData = {
        name: "",
        description: "",
    };

    const form = useFormik({
        enableReinitialize: true,
        initialValues: initialForm,
        onSubmit
    });
    return (
        <form onSubmit={form.handleSubmit}>
            <Container>
                <AppHeader onBack={onBack}>
                    {intl.formatMessage(sectionNames.paymentMethods)}
                </AppHeader>
                <PageHeader
                    title={intl.formatMessage({
                        id: "createNewPaymentMethod",
                        defaultMessage: "Create New Payment Method",
                        description: "header"
                    })}
                />
                <Grid>
                    <PaymentMethodDetailsForm data={form.values}
                                              disabled={disabled}
                                              errors={errors}
                                              onChange={form.handleChange}
                    />
                </Grid>
                <SaveButtonBar
                    disabled={disabled || !form.dirty || !form.isValid}
                    onCancel={onBack}
                    state={saveButtonBarState}
                    onSave={form.handleSubmit}
                />
            </Container>
        </form>
    );
};
PaymentMethodCreatePage.displayName = "PaymentMethodCreatePage";
export default PaymentMethodCreatePage;
