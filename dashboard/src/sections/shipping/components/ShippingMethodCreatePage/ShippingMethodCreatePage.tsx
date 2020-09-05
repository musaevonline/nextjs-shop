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

export interface ShippingMethodCreatePageProps {
  defaultCurrency: string;
  disabled: boolean;
  errors: ShippingErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: ShippingMethodDetailsFormData) => void;
}

const ShippingMethodCreatePage: React.FC<ShippingMethodCreatePageProps> = ({
                                                                             defaultCurrency,
                                                                             disabled,
                                                                             errors,
                                                                             onBack,
                                                                             onSubmit,
                                                                             saveButtonBarState
                                                                           }) => {
  const intl = useIntl();
  const initialForm: ShippingMethodDetailsFormData = {
    isFree: false,
    maxValue: "",
    minValue: "",
    name: "",
    noLimits: false,
    price: ""
  };

  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialForm,
    onSubmit: values => {
      console.log(values);
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
                id: "createNewShippingMethod",
                defaultMessage: "Create New Shipping Method",
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
          />
        </Container>
      </form>
  );
};
ShippingMethodCreatePage.displayName = "ShippingMethodCreatePage";
export default ShippingMethodCreatePage;
