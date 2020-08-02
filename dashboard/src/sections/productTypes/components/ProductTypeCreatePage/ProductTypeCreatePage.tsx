import AppHeader from "@temp/components/AppHeader";
import CardSpacer from "@temp/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import { sectionNames } from "@temp/intl";
import { UserError } from "@temp/types";
import { WeightUnitsEnum } from "@temp/types/globalTypes";
import React from "react";
import {IntlShape, useIntl} from "react-intl";

import ProductTypeDetails from "../ProductTypeDetails/ProductTypeDetails";
import ProductTypeShipping from "../ProductTypeShipping/ProductTypeShipping";
import {useFormik} from "formik";
import * as yup from 'yup';

const createSchema = (intl: IntlShape) => yup.object().shape({
  isShippingRequired: yup.boolean(),
  name: yup.string(),
  weight: yup.number()
});

export interface ProductTypeForm {
  name: string;
  isShippingRequired: boolean;
  weight: number;
}

export interface ProductTypeCreatePageProps {
  errors: UserError[];
  defaultWeightUnit: WeightUnitsEnum;
  disabled: boolean;
  pageTitle: string;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: ProductTypeForm) => void;
}

const initialForm: ProductTypeForm = {
  isShippingRequired: false,
  name: "",
  weight: 0
};

const ProductTypeCreatePage: React.FC<ProductTypeCreatePageProps> = ({
  defaultWeightUnit,
  disabled,
  errors,
  pageTitle,
  saveButtonBarState,
  onBack,
  onSubmit
}: ProductTypeCreatePageProps) => {
  const intl = useIntl();
  const form = useFormik({
    initialValues: initialForm,
    enableReinitialize: true,
    validationSchema: createSchema(intl),
    onSubmit: values => {
      onSubmit(values);
    }
  })
  return (
    <form onSubmit={form.handleSubmit}>
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.productTypes)}
          </AppHeader>
          <PageHeader title={pageTitle} />
          <Grid>
            <div>
              <ProductTypeDetails
                data={form.values}
                disabled={disabled}
                errors={errors}
                onChange={form.handleChange}
              />
              <CardSpacer />
            </div>
            <div>
              <ProductTypeShipping
                disabled={disabled}
                data={form.values}
                defaultWeightUnit={defaultWeightUnit}
                onChange={form.handleChange}
              />
            </div>
          </Grid>
          <SaveButtonBar
            onCancel={onBack}
            onSave={form.handleSubmit}
            disabled={disabled || !form.isValid || !form.dirty}
            state={saveButtonBarState}
          />
        </Container>
    </form>
  );
};
ProductTypeCreatePage.displayName = "ProductTypeCreatePage";
export default ProductTypeCreatePage;
