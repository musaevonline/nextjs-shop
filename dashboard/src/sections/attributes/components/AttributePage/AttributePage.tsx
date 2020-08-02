import { ProductErrorFragment } from "@temp/sections/products/types/ProductErrorFragment";
import AppHeader from "@temp/components/AppHeader";
import CardSpacer from "@temp/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import { sectionNames } from "@temp/intl";
import { maybe } from "@temp/misc";
import { ReorderAction } from "@temp/types";
import { AttributeInputTypeEnum } from "@temp/types/globalTypes";
import React from "react";
import {IntlShape, useIntl} from "react-intl";
import slugify from "slugify";

import {
  AttributeDetailsFragment,
  AttributeDetailsFragment_values
} from "../../types/AttributeDetailsFragment";
import AttributeDetails from "../AttributeDetails";
import AttributeProperties from "../AttributeProperties";
import AttributeValues from "../AttributeValues";
import {useFormik} from "formik";
import * as yup from 'yup';

const createSchema = (intl: IntlShape) => yup.object().shape({
  availableInGrid: yup.boolean(),
  filterableInDashboard: yup.boolean(),
  filterableInStorefront: yup.boolean(),
  inputType: yup.string(),
  name: yup.string(),
  slug: yup.string(),
  storefrontSearchPosition: yup.string(),
  valueRequired: yup.boolean(),
  visibleInStorefront: yup.boolean()
})

export interface AttributePageProps {
  attribute: AttributeDetailsFragment | null;
  disabled: boolean;
  errors: ProductErrorFragment[];
  saveButtonBarState: ConfirmButtonTransitionState;
  values: AttributeDetailsFragment_values[];
  onBack: () => void;
  onDelete: () => void;
  onSubmit: (data: AttributePageFormData) => void;
  onValueAdd: () => void;
  onValueDelete: (id: string) => void;
  onValueReorder: ReorderAction;
  onValueUpdate: (id: string) => void;
}

export interface AttributePageFormData {
  availableInGrid: boolean;
  filterableInDashboard: boolean;
  inputType: AttributeInputTypeEnum;
  filterableInStorefront: boolean;
  name: string;
  slug: string;
  storefrontSearchPosition: string;
  valueRequired: boolean;
  visibleInStorefront: boolean;
}

const AttributePage: React.FC<AttributePageProps> = ({
                                                       attribute,
                                                       disabled,
                                                       errors,
                                                       saveButtonBarState,
                                                       values,
                                                       onBack,
                                                       onDelete,
                                                       onSubmit,
                                                       onValueAdd,
                                                       onValueDelete,
                                                       onValueReorder,
                                                       onValueUpdate
                                                     }) => {
  const intl = useIntl();

  const initialForm: AttributePageFormData =
      attribute === null
          ? {
            availableInGrid: true,
            filterableInDashboard: true,
            filterableInStorefront: true,
            inputType: AttributeInputTypeEnum.DROPDOWN,
            name: "",
            slug: "",
            storefrontSearchPosition: "",
            valueRequired: true,
            visibleInStorefront: true
          }
          : {
            availableInGrid: maybe(() => attribute.availableInGrid, true),
            filterableInDashboard: maybe(
                () => attribute.filterableInDashboard,
                true
            ),
            filterableInStorefront: maybe(
                () => attribute.filterableInStorefront,
                true
            ),
            inputType: maybe(
                () => attribute.inputType,
                AttributeInputTypeEnum.DROPDOWN
            ),
            name: maybe(() => attribute.name, ""),
            slug: maybe(() => attribute.slug, ""),
            storefrontSearchPosition: maybe(
                () => attribute.storefrontSearchPosition.toString(),
                ""
            ),
            valueRequired: maybe(() => attribute.valueRequired, true),
            visibleInStorefront: maybe(() => attribute.visibleInStorefront, true)
          };

  const handleSubmit = (data: AttributePageFormData) =>
      onSubmit({
        ...data,
        slug: data.slug || slugify(data.name).toLowerCase()
      });

  const form = useFormik({
    initialValues: initialForm,
    enableReinitialize: true,
    validationSchema: createSchema(intl),
    onSubmit: values =>{
      handleSubmit(values);
    }
  })

  return (
      <form onSubmit={form.handleSubmit}>
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.attributes)}
          </AppHeader>
          <PageHeader
              title={
                attribute === null
                    ? intl.formatMessage({ id: 'create_new_attribute',
                      defaultMessage: "Create New Attribute",
                      description: "page title"
                    })
                    : maybe(() => attribute.name)
              }
          />
          <Grid>
            <div>
              <AttributeDetails
                  canChangeType={attribute === null}
                  data={form.values}
                  disabled={disabled}
                  errors={errors}
                  onChange={form.handleChange}
              />
              <CardSpacer />
              <AttributeValues
                  disabled={disabled}
                  values={values}
                  onValueAdd={onValueAdd}
                  onValueDelete={onValueDelete}
                  onValueReorder={onValueReorder}
                  onValueUpdate={onValueUpdate}
              />
            </div>
            <div>
              <AttributeProperties
                  data={form.values}
                  errors={errors}
                  disabled={disabled}
                  onChange={form.handleChange}
              />
            </div>
          </Grid>
          <SaveButtonBar
              disabled={disabled}
              state={saveButtonBarState}
              onCancel={onBack}
              onSave={form.handleSubmit}
              onDelete={attribute === null ? undefined : onDelete}
          />
        </Container>
      </form>
  );
};
AttributePage.displayName = "AttributePage";
export default AttributePage;
