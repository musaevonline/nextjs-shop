import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import PaymentMethodCreatePage from "../components/PaymentMethodCreatePage";
import {usePaymentMethodCreate} from "../mutations";
import {paymentMethodListUrl, paymentMethodUrl} from "../urls";
import {PaymentMethodDetailsFormData} from "@temp/sections/paymentMethods/components/PaymentMethodDetailsForm";

const PaymentMethodCreate: React.FC<{}> = () => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const intl = useIntl();

    const [createPaymentMethod, createPaymentMethodOpts] = usePaymentMethodCreate({
        onCompleted: data => {
            if (data.paymentMethodCreate.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
                navigate(paymentMethodUrl(data.paymentMethodCreate.paymentMethod.id));
            }
        }
    });

    const onSubmit = (formData: PaymentMethodDetailsFormData) => {
        createPaymentMethod({
            variables: {
                input: formData
            }
        })

    };

    return (
        <PaymentMethodCreatePage disabled={createPaymentMethodOpts.loading}
                                 errors={createPaymentMethodOpts.data?.paymentMethodCreate.errors || []}
                                 onBack={() => navigate(paymentMethodListUrl())}
                                 onSubmit={onSubmit}
                                 saveButtonBarState={createPaymentMethodOpts.status}
        />
    );
};
export default PaymentMethodCreate;
