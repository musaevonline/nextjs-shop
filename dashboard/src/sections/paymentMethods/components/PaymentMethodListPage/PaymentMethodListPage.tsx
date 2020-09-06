import AppHeader from "@temp/components/AppHeader";
import Container from "@temp/components/Container";
import PageHeader from "@temp/components/PageHeader";
import { sectionNames } from "@temp/intl";
import { ListActions, PageListProps, UserPermissionProps } from "@temp/types";
import React from "react";
import { useIntl } from "react-intl";

import { PaymentMethodFragment } from "../../types/PaymentMethodFragment";
import PaymentMethodList from "../PaymentMethodList";

export interface PaymentMethodListPageProps
    extends PageListProps,
        ListActions,
        UserPermissionProps {
    paymentMethods: PaymentMethodFragment[];
    onBack: () => void;
    onRemove: (id: string) => void;
}

const PaymentMethodListPage: React.FC<PaymentMethodListPageProps> = ({
                                                                         disabled,
                                                                         userPermissions,
                                                                         onBack,
                                                                         ...listProps
                                                                     }) => {
    const intl = useIntl();

    return (
        <Container>
            <AppHeader onBack={onBack}>
                {intl.formatMessage(sectionNames.configuration)}
            </AppHeader>
            <PageHeader
                title={intl.formatMessage({
                    id: "payment",
                    defaultMessage: "Payment",
                    description: "header"
                })}
            />
            <PaymentMethodList disabled={disabled} {...listProps} />
        </Container>
    );
};
PaymentMethodListPage.displayName = "PaymentMethodListPage";
export default PaymentMethodListPage;
