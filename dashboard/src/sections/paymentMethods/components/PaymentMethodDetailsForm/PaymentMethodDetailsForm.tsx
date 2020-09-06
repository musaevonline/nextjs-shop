import TextField from "@material-ui/core/TextField";
import Hr from "@temp/components/Hr";
import {commonMessages} from "@temp/intl";
import { PaymentErrorFragment } from "@temp/sections/paymentMethods/types/PaymentErrorFragment";
import getPaymentErrorMessage from "@temp/utils/errors/payment";
import React from "react";
import { useIntl } from "react-intl";
import CardTitle from "@temp/components/CardTitle";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {getFormErrors} from "@temp/utils/errors";

export interface PaymentMethodDetailsFormData {
    name: string;
    description: string;
}

export interface PaymentMethodDetailsFormProps {
    disabled: boolean;
    errors: PaymentErrorFragment[];
    data: PaymentMethodDetailsFormData;
    onChange: (event: React.ChangeEvent<any>) => void;
}

const PaymentMethodDetailsForm: React.FC<PaymentMethodDetailsFormProps> = props => {
    const {
        disabled,
        errors,
        data,
        onChange
    } = props;

    const intl = useIntl();

    const formFields = [
        "name",
        "description"
    ];

    const formErrors = getFormErrors(formFields, errors);
    return (
        <Card>
            <CardTitle
                title={intl.formatMessage(commonMessages.generalInformation)}
            />
            <CardContent>
                <TextField
                    disabled={disabled}
                    error={!!formErrors.name}
                    fullWidth
                    helperText={
                        getPaymentErrorMessage(formErrors.name, intl) ||
                        intl.formatMessage({
                            id: "willBeShownCustomersAtCheckout",
                            defaultMessage:
                                "This will be shown to customers at checkout"
                        })
                    }
                    label={intl.formatMessage({
                        id: "paymentMethodName",
                        defaultMessage: "Payment Method Name",
                        description: "payment method name"
                    })}
                    name={"name" as keyof FormData}
                    value={data.name}
                    onChange={onChange}
                />
                <Hr />
                <TextField
                    disabled={disabled}
                    error={!!formErrors.description}
                    fullWidth
                    multiline
                    helperText={
                        getPaymentErrorMessage(formErrors.description, intl) ||
                        intl.formatMessage({
                            id: "willBeShownCustomersAtCheckout",
                            defaultMessage:
                                "This will be shown to customers at checkout"
                        })
                    }
                    label={intl.formatMessage({
                        id: "paymentMethodDescription",
                        defaultMessage: "Payment Method Description",
                        description: "payment method description"
                    })}
                    name={"description" as keyof FormData}
                    value={data.description}
                    onChange={onChange}
                />
            </CardContent>
        </Card>

    );
};
PaymentMethodDetailsForm.displayName = "PaymentMethodDetailsForm";
export default PaymentMethodDetailsForm;
