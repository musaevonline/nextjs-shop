import { ProductErrorFragment } from "@temp/sections/products/types/ProductErrorFragment";
import AppHeader from "@temp/components/AppHeader";
import { CardSpacer } from "@temp/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import {commonMessages, sectionNames} from "@temp/intl";
import React from "react";
import { useIntl } from "react-intl";

import CategoryDetailsForm from "../../components/CategoryDetailsForm";
import {useFormik} from "formik";
import * as yup from 'yup';

const schema = yup.object().shape({
    description: yup.string(),
    name: yup.string()
});

interface FormData {
  description: string;
  name: string;
}

const initialData: FormData = {
  description: "",
  name: "",
};

export interface CategoryCreatePageProps {
  errors: ProductErrorFragment[];
  disabled: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  onSubmit(data: FormData);
  onBack();
}

export const CategoryCreatePage: React.FC<CategoryCreatePageProps> = ({
  disabled,
  onSubmit,
  onBack,
  errors,
  saveButtonBarState
}) => {
  const intl = useIntl();

  const form = useFormik({
        initialValues: initialData,
        enableReinitialize: true,
        validationSchema: schema,
        onSubmit: values => {
            onSubmit(values)
        }
    });

  return (
    <form onSubmit={form.handleSubmit}>
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.categories)}
          </AppHeader>
          <PageHeader
            title={intl.formatMessage(commonMessages.createNewCategory)}
          />
          <div>
            <CategoryDetailsForm
              disabled={disabled}
              data={form.values}
              onChange={form.handleChange}
              errors={errors}
            />
            <CardSpacer />
            <SaveButtonBar
              onCancel={onBack}
              onSave={form.handleSubmit}
              state={saveButtonBarState}
              disabled={disabled || !form.isValid || !form.dirty}
            />
          </div>
        </Container>
    </form>
  );
};
CategoryCreatePage.displayName = "CategoryCreatePage";
export default CategoryCreatePage;
