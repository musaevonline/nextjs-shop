import AppHeader from "@temp/components/AppHeader";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import RequirePermissions from "@temp/components/RequirePermissions";
import { sectionNames } from "@temp/intl";
import { ListActions, PageListProps, UserPermissionProps } from "@temp/types";
import { PermissionEnum, WeightUnitsEnum } from "@temp/types/globalTypes";
import React from "react";
import { useIntl } from "react-intl";

import { ShippingMethodFragment } from "../../types/ShippingMethodFragment";
import ShippingWeightUnitForm from "../ShippingWeightUnitForm";
import ShippingMethodList from "../ShippingMethodList";

export interface ShippingMethodListPageProps
    extends PageListProps,
        ListActions,
        UserPermissionProps {
    defaultWeightUnit: WeightUnitsEnum;
    shippingMethods: ShippingMethodFragment[];
    onBack: () => void;
    onRemove: (id: string) => void;
    onSubmit: (unit: WeightUnitsEnum) => void;
}

const ShippingMethodListPage: React.FC<ShippingMethodListPageProps> = ({
                                                                           defaultWeightUnit,
                                                                           disabled,
                                                                           userPermissions,
                                                                           onBack,
                                                                           onSubmit,
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
                    id: "shipping",
                    defaultMessage: "Shipping",
                    description: "header"
                })}
            />
            <Grid>
                <div>
                    <ShippingMethodList disabled={disabled} {...listProps} />
                </div>
                <div>
                    <RequirePermissions
                        userPermissions={userPermissions}
                        requiredPermissions={[PermissionEnum.MANAGE_SETTINGS]}
                    >
                        <ShippingWeightUnitForm
                            defaultWeightUnit={defaultWeightUnit}
                            disabled={disabled}
                            onSubmit={onSubmit}
                        />
                    </RequirePermissions>
                </div>
            </Grid>
        </Container>
    );
};
ShippingMethodListPage.displayName = "ShippingMethodListPage";
export default ShippingMethodListPage;
