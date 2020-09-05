import AppHeader from "@temp/components/AppHeader";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import { sectionNames } from "@temp/intl";
import { ShippingErrorFragment } from "@temp/sections/shipping/types/ShippingErrorFragment";
import React from "react";
import { useIntl } from "react-intl";
import {useFormik} from "formik";
import ShippingMethodDetailsForm, {ShippingMethodDetailsFormData} from "@temp/sections/shipping/components/ShippingMethodDetailsForm";
import {ShippingMethodTypeEnum} from "@temp/types/globalTypes";
import {ShippingMethodFragment} from "@temp/sections/shipping/types/ShippingMethodFragment";
import {maybe} from "@temp/misc";

export interface ShippingMethodUpdatePageProps {
    defaultCurrency: string;
    shippingMethod: ShippingMethodFragment
    disabled: boolean;
    errors: ShippingErrorFragment[];
    saveButtonBarState: ConfirmButtonTransitionState;
    onBack: () => void;
    onDelete: () => void;
    onSubmit: (data: ShippingMethodDetailsFormData) => void;
}

const ShippingMethodUpdatePage: React.FC<ShippingMethodUpdatePageProps> = ({
                                                                               defaultCurrency,
                                                                               shippingMethod,
                                                                               disabled,
                                                                               errors,
                                                                               onBack,
                                                                               onDelete,
                                                                               onSubmit,
                                                                               saveButtonBarState
                                                                           }) => {
    const intl = useIntl();
    const initialForm: ShippingMethodDetailsFormData = {
        isFree: maybe(() => shippingMethod.price.amount === 0, false),
        maxValue:
            shippingMethod?.type === ShippingMethodTypeEnum.PRICE
                ? maybe(() => shippingMethod.maximumOrderPrice.amount.toString(), "")
                : maybe(() => shippingMethod.maximumOrderWeight.value.toString(), ""),
        minValue:
            shippingMethod?.type === ShippingMethodTypeEnum.PRICE
                ? maybe(() => shippingMethod.minimumOrderPrice.amount.toString(), "")
                : maybe(() => shippingMethod.minimumOrderWeight.value.toString(), ""),
        name: maybe(() => shippingMethod.name, ""),
        noLimits: false,
        price: maybe(() => shippingMethod.price.amount.toString(), "")
    };

    const form = useFormik({
        enableReinitialize: true,
        initialValues: initialForm,
        onSubmit: values => {
            onSubmit(values);
        }
    })
    return (
        <form onSubmit={form.handleSubmit}>
            <Container>
                <AppHeader onBack={onBack}>
                    {intl.formatMessage(sectionNames.shipping)}
                </AppHeader>
                <PageHeader
                    title={intl.formatMessage({
                        id: "updateShippingMethod",
                        defaultMessage: "Update Shipping Method",
                        description: "header"
                    })}
                />
                <Grid>
                    <ShippingMethodDetailsForm data={form.values}
                                               disabled={disabled}
                                               defaultCurrency={defaultCurrency}
                                               errors={errors}
                                               onChange={form.handleChange}
                                               variant={ShippingMethodTypeEnum.PRICE}
                    />
                </Grid>
                <SaveButtonBar
                    disabled={disabled || !form.dirty || !form.isValid}
                    onCancel={onBack}
                    state={saveButtonBarState}
                    onSave={form.handleSubmit}
                    onDelete={onDelete}
                />
            </Container>
        </form>
    );
};
ShippingMethodUpdatePage.displayName = "ShippingMethodUpdatePage";
export default ShippingMethodUpdatePage;
