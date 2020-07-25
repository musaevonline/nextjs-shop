import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ProductErrorFragment } from "@temp/sections/products/types/ProductErrorFragment";
import CardSpacer from "@temp/components/CardSpacer";
import CardTitle from "@temp/components/CardTitle";
import { FormSpacer } from "@temp/components/FormSpacer";
import Hr from "@temp/components/Hr";
import SingleAutocompleteSelectField, {
  SingleAutocompleteChoiceType
} from "@temp/components/SingleAutocompleteSelectField";
import { ChangeEvent } from "@temp/hooks/useForm";
import { maybe } from "@temp/misc";
import { FetchMoreProps } from "@temp/types";
import { getFormErrors, getProductErrorMessage } from "@temp/utils/errors";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {commonMessages} from "@temp/intl";

interface ProductType {
  hasVariants: boolean;
  id: string;
  name: string;
}

const useStyles = makeStyles(
  theme => ({
    card: {
      overflow: "visible"
    },
    cardSubtitle: {
      fontSize: "1rem",
      marginBottom: theme.spacing(0.5)
    },
    label: {
      marginBottom: theme.spacing(0.5)
    }
  }),
  { name: "ProductOrganization" }
);

interface ProductOrganizationProps {
  canChangeType: boolean;
  categories?: SingleAutocompleteChoiceType[];
  categoryInputDisplayValue: string;
  data: {
    category: string;
    productType?: string;
  };
  disabled: boolean;
  errors: ProductErrorFragment[];
  productType?: ProductType;
  productTypeInputDisplayValue?: string;
  productTypes?: SingleAutocompleteChoiceType[];
  fetchCategories: (query: string) => void;
  fetchMoreCategories: FetchMoreProps;
  fetchMoreProductTypes?: FetchMoreProps;
  fetchProductTypes?: (data: string) => void;
  onCategoryChange: (event: ChangeEvent) => void;
  onProductTypeChange?: (event: ChangeEvent) => void;
}

const ProductOrganization: React.FC<ProductOrganizationProps> = props => {
  const {
    canChangeType,
    categories,
    categoryInputDisplayValue,
    data,
    disabled,
    errors,
    fetchCategories,
    fetchMoreCategories,
    fetchMoreProductTypes,
    fetchProductTypes,
    productType,
    productTypeInputDisplayValue,
    productTypes,
    onCategoryChange,
    onProductTypeChange
  } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(
    ["productType", "category"],
    errors
  );

  return (
    <Card className={classes.card}>
      <CardTitle
        title={intl.formatMessage({ id: 'organize_product',
          defaultMessage: "Organize Product",
          description: "section header"
        })}
      />
      <CardContent>
        {canChangeType ? (
          <SingleAutocompleteSelectField
            displayValue={productTypeInputDisplayValue}
            error={!!formErrors.productType}
            helperText={getProductErrorMessage(formErrors.productType, intl)}
            name="productType"
            disabled={disabled}
            label={intl.formatMessage(commonMessages.productType)}
            choices={productTypes}
            value={data.productType}
            onChange={onProductTypeChange}
            fetchChoices={fetchProductTypes}
            data-tc="product-type"
            {...fetchMoreProductTypes}
          />
        ) : (
          <>
            <Typography className={classes.label} variant="caption">
              <FormattedMessage {...commonMessages.productType} />
            </Typography>
            <Typography>{maybe(() => productType.name, "...")}</Typography>
            <CardSpacer />
            <Typography className={classes.label} variant="caption">
              <FormattedMessage {...commonMessages.productType} />
            </Typography>
            <Typography>
              {maybe(
                () =>
                  productType.hasVariants
                    ? intl.formatMessage({ id: 'configurable',
                        defaultMessage: "Configurable",
                        description: "product is configurable"
                      })
                    : intl.formatMessage({ id: 'simple',
                        defaultMessage: "Simple",
                        description: "product is not configurable"
                      }),
                "..."
              )}
            </Typography>
          </>
        )}
        <FormSpacer />
        <Hr />
        <FormSpacer />
        <SingleAutocompleteSelectField
          displayValue={categoryInputDisplayValue}
          error={!!formErrors.category}
          helperText={getProductErrorMessage(formErrors.category, intl)}
          disabled={disabled}
          label={intl.formatMessage({ id: 'category',
            defaultMessage: "Category"
          })}
          choices={disabled ? [] : categories}
          name="category"
          value={data.category}
          onChange={onCategoryChange}
          fetchChoices={fetchCategories}
          data-tc="category"
          {...fetchMoreCategories}
        />
        <FormSpacer />
        <Hr />
      </CardContent>
    </Card>
  );
};
ProductOrganization.displayName = "ProductOrganization";
export default ProductOrganization;
