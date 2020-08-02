import AppHeader from "@temp/components/AppHeader";
import CardSpacer from "@temp/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import ControlledSwitch from "@temp/components/ControlledSwitch";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import { sectionNames } from "@temp/intl";
import { maybe } from "@temp/misc";
import { ListActions, ReorderEvent, UserError } from "@temp/types";
import { AttributeTypeEnum, WeightUnitsEnum } from "@temp/types/globalTypes";
import React from "react";
import {IntlShape, useIntl} from "react-intl";

import {
  ProductTypeDetails_productType
} from "../../types/ProductTypeDetails";
import ProductTypeAttributes from "../ProductTypeAttributes/ProductTypeAttributes";
import ProductTypeDetails from "../ProductTypeDetails/ProductTypeDetails";
import ProductTypeShipping from "../ProductTypeShipping/ProductTypeShipping";
import {useFormik} from "formik";
import * as yup from 'yup';

const createSchema = (intl: IntlShape) => yup.object().shape({
  name: yup.string(),
  hasVariants: yup.boolean(),
  isShippingRequired: yup.boolean(),
  productAttributes: yup.array().of(yup.object().shape({
    label: yup.string(),
    value: yup.string()
  })),
  variantAttributes: yup.array().of(yup.object().shape({
    label: yup.string(),
    value: yup.string()
  })),
  weight: yup.number(),
})

interface ChoiceType {
  label: string;
  value: string;
}

export interface ProductTypeForm {
  name: string;
  hasVariants: boolean;
  isShippingRequired: boolean;
  productAttributes: ChoiceType[];
  variantAttributes: ChoiceType[];
  weight: number;
}

export interface ProductTypeDetailsPageProps {
  errors: UserError[];
  productType: ProductTypeDetails_productType;
  defaultWeightUnit: WeightUnitsEnum;
  disabled: boolean;
  pageTitle: string;
  productAttributeList: ListActions;
  saveButtonBarState: ConfirmButtonTransitionState;
  variantAttributeList: ListActions;
  onAttributeAdd: (type: AttributeTypeEnum) => void;
  onAttributeClick: (id: string) => void;
  onAttributeReorder: (event: ReorderEvent, type: AttributeTypeEnum) => void;
  onAttributeUnassign: (id: string) => void;
  onBack: () => void;
  onDelete: () => void;
  onHasVariantsToggle: (hasVariants: boolean) => void;
  onSubmit: (data: ProductTypeForm) => void;
}

const ProductTypeDetailsPage: React.FC<ProductTypeDetailsPageProps> = ({
  defaultWeightUnit,
  disabled,
  errors,
  pageTitle,
  productType,
  productAttributeList,
  saveButtonBarState,
  variantAttributeList,
  onAttributeAdd,
  onAttributeUnassign,
  onAttributeReorder,
  onAttributeClick,
  onBack,
  onDelete,
  onHasVariantsToggle,
  onSubmit
}) => {
  const intl = useIntl();
  const formInitialData: ProductTypeForm = {
    hasVariants:
      maybe(() => productType.hasVariants) !== undefined
        ? productType.hasVariants
        : false,
    isShippingRequired:
      maybe(() => productType.isShippingRequired) !== undefined
        ? productType.isShippingRequired
        : false,
    name: maybe(() => productType.name) !== undefined ? productType.name : "",
    productAttributes:
      maybe(() => productType.productAttributes) !== undefined
        ? productType.productAttributes.map(attribute => ({
            label: attribute.name,
            value: attribute.id
          }))
        : [],
    variantAttributes:
      maybe(() => productType.variantAttributes) !== undefined
        ? productType.variantAttributes.map(attribute => ({
            label: attribute.name,
            value: attribute.id
          }))
        : [],
    weight: maybe(() => productType.weight.value)
  };

  const form = useFormik({
    enableReinitialize: true,
    initialValues: formInitialData,
    validationSchema: createSchema(intl),
    onSubmit: values => {
      onSubmit(values);
    }
  })

  return (
    <form onSubmit={form.handleSubmit} >
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
              <ProductTypeAttributes
                attributes={maybe(() => productType.productAttributes)}
                disabled={disabled}
                type={AttributeTypeEnum.PRODUCT}
                onAttributeAssign={onAttributeAdd}
                onAttributeClick={onAttributeClick}
                onAttributeReorder={(event: ReorderEvent) =>
                  onAttributeReorder(event, AttributeTypeEnum.PRODUCT)
                }
                onAttributeUnassign={onAttributeUnassign}
                {...productAttributeList}
              />
              <CardSpacer />
              <ControlledSwitch
                checked={form.values.hasVariants}
                disabled={disabled}
                label={intl.formatMessage({id: 'product_type_uses_variant_attributes',
                  defaultMessage: "Product type uses Variant Attributes",
                  description: "switch button"
                })}
                name="hasVariants"
                onChange={event => onHasVariantsToggle(event.target.value)}
              />
              {form.values.hasVariants && (
                <>
                  <CardSpacer />
                  <ProductTypeAttributes
                    attributes={maybe(() => productType.variantAttributes)}
                    disabled={disabled}
                    type={AttributeTypeEnum.VARIANT}
                    onAttributeAssign={onAttributeAdd}
                    onAttributeClick={onAttributeClick}
                    onAttributeReorder={(event: ReorderEvent) =>
                      onAttributeReorder(event, AttributeTypeEnum.VARIANT)
                    }
                    onAttributeUnassign={onAttributeUnassign}
                    {...variantAttributeList}
                  />
                </>
              )}
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
            onDelete={onDelete}
            onSave={form.handleSubmit}
            disabled={disabled || !form.isValid || !form.dirty}
            state={saveButtonBarState}
          />
        </Container>
    </form>
  );
};
ProductTypeDetailsPage.displayName = "ProductTypeDetailsPage";
export default ProductTypeDetailsPage;
