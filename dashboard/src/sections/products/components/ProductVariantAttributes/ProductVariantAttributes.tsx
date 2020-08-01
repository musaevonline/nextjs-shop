import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@temp/components/CardTitle";
import FormSpacer from "@temp/components/FormSpacer";
import Grid from "@temp/components/Grid";
import SingleAutocompleteSelectField, {
  SingleAutocompleteChoiceType
} from "@temp/components/SingleAutocompleteSelectField";
import Skeleton from "@temp/components/Skeleton";
import { FormsetAtomicData, FormsetChange } from "@temp/hooks/useFormset";
import { commonMessages } from "@temp/intl";
import { VariantCreate_productVariantCreate_errors } from "@temp/sections/products/types/VariantCreate";
import { ProductErrorCode } from "@temp/types/globalTypes";
import React from "react";
import { IntlShape, useIntl } from "react-intl";

import { ProductVariant_attributes_attribute_values } from "../../types/ProductVariant";

export interface VariantAttributeInputData {
  values: ProductVariant_attributes_attribute_values[];
}
export type VariantAttributeInput = FormsetAtomicData<
  VariantAttributeInputData,
  string
>;

interface ProductVariantAttributesProps {
  attributes: VariantAttributeInput[];
  disabled: boolean;
  errors: VariantCreate_productVariantCreate_errors[];
  onChange: FormsetChange<VariantAttributeInputData>;
}

function getAttributeDisplayValue(
  id: string,
  slug: string,
  attributes: VariantAttributeInput[]
): string {
  const attribute = attributes.find(attr => attr.id === id);
  const attributeValue = attribute.data.values.find(
    value => value.slug === slug
  );
  if (!!attributeValue) {
    return attributeValue.name;
  }

  return slug;
}

function getAttributeValue(
  id: string,
  attributes: VariantAttributeInput[]
): string {
  const attribute = attributes.find(attr => attr.id === id);
  return attribute.value;
}

function getAttributeValueChoices(
  id: string,
  attributes: VariantAttributeInput[]
): SingleAutocompleteChoiceType[] {
  const attribute = attributes.find(attr => attr.id === id);
  return attribute.data.values.map(attributeValue => ({
    label: attributeValue.name,
    value: attributeValue.slug
  }));
}

function translateErrors(intl: IntlShape) {
  return {
    [ProductErrorCode.REQUIRED]: intl.formatMessage({
      id: 'all_attributes_value',
      defaultMessage: "All attributes should have value",
      description: "product attribute error"
    }),
    [ProductErrorCode.UNIQUE]: intl.formatMessage({
      id: 'variant_exist',
      defaultMessage: "This variant already exists",
      description: "product attribute error"
    }),
    [ProductErrorCode.DUPLICATED_INPUT_ITEM]: intl.formatMessage({
      id: 'duplicated_input',
      defaultMessage: "Duplicated attribute values for product variant",
      description: "product attribute error"
    }),
    [ProductErrorCode.INVALID]: intl.formatMessage({
      id: 'duplicated_input',
      defaultMessage: "Duplicated attribute values for product variant",
      description: "product attribute error"
    })
  };
}

const ProductVariantAttributes: React.FC<ProductVariantAttributesProps> = ({
  attributes,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  const translatedErrors = translateErrors(intl);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformation)}
      />
      <CardContent>
        <Grid variant="uniform">
          {attributes === undefined ? (
            <Skeleton />
          ) : (
            attributes.map(attribute => (
              <SingleAutocompleteSelectField
                key={attribute.id}
                disabled={disabled}
                displayValue={getAttributeDisplayValue(
                  attribute.id,
                  attribute.value,
                  attributes
                )}
                label={attribute.label}
                name={`attribute:${attribute.id}`}
                onChange={event => onChange(attribute.id, event.target.value)}
                value={getAttributeValue(attribute.id, attributes)}
                choices={getAttributeValueChoices(attribute.id, attributes)}
                allowCustomValues
                data-tc="variant-attribute-input"
              />
            ))
          )}
        </Grid>
        {errors.length > 0 && (
          <>
            <FormSpacer />
            {errors
              .filter(error => error.field === "attributes")
              .map(error => (
                <Typography color="error" key={error.code}>
                  {translatedErrors[error.code]}
                </Typography>
              ))}
          </>
        )}
      </CardContent>
    </Card>
  );
};
ProductVariantAttributes.displayName = "ProductVariantAttributes";
export default ProductVariantAttributes;
