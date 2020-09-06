import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import {usePaymentMethodDelete, usePaymentMethodUpdate} from "../mutations";
import {paymentMethodListUrl, PaymentMethodUrlQueryParams} from "../urls";
import {PaymentMethodDetailsFormData} from "@temp/sections/paymentMethods/components/PaymentMethodDetailsForm";
import {usePaymentMethod} from "@temp/sections/paymentMethods/queries";
import PaymentMethodUpdatePage from "@temp/sections/paymentMethods/components/PaymentMethodUpdatePage";

export interface PaymentMethodDetailsProps {
    id: string;
    params: PaymentMethodUrlQueryParams;
}

const PaymentMethodDetailsView: React.FC<PaymentMethodDetailsProps> = ({
                                                                           id,
                                                                           params
                                                                       }) => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const intl = useIntl();

    const { data, loading } = usePaymentMethod({
        displayLoader: true,
        variables: { id }
    });

    const [updatePaymentMethod, updatePaymentMethodOpts] = usePaymentMethodUpdate({
        onCompleted: data => {
            if (data.paymentMethodUpdate.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
            }
        }
    });

    const [deletePaymentMethod, deletePaymentRateMethod] = usePaymentMethodDelete({
        onCompleted: data => {
            if (data.paymentMethodDelete.errors.length === 0) {
                notify({
                    text: intl.formatMessage({
                        id: "paymentMethodDeleted",
                        defaultMessage: "Payment method deleted"
                    })
                });
                navigate(paymentMethodListUrl(), true);
            }
        }
    });

    const onSubmit = (formData: PaymentMethodDetailsFormData) => {
        updatePaymentMethod({
            variables: {
                id,
                input: formData
            }
        })

    };

    return (
        <PaymentMethodUpdatePage paymentMethod={data?.paymentMethod}
                                 disabled={updatePaymentMethodOpts.loading ||
                                 deletePaymentRateMethod.loading ||
                                 loading
                                 }
                                 errors={updatePaymentMethodOpts.data?.paymentMethodUpdate.errors || []}
                                 onBack={() => navigate(paymentMethodListUrl())}
                                 onSubmit={onSubmit}
                                 saveButtonBarState={updatePaymentMethodOpts.status}
                                 onDelete={() => deletePaymentMethod({variables: {id}})}

        />
    );
};
export default PaymentMethodDetailsView;
