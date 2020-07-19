import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { ProductErrorFragment } from "@temp/sections/products/types/ProductErrorFragment";
import CardTitle from "@temp/components/CardTitle";
import PriceField from "@temp/components/PriceField";
import { getFormErrors, getProductErrorMessage } from "@temp/utils/errors";
import React from "react";
import { useIntl } from "react-intl";
import {commonMessages} from "@temp/intl";

const useStyles = makeStyles(
  theme => ({
    root: {
      display: "grid",
      gridColumnGap: theme.spacing(2),
      gridTemplateColumns: "1fr 1fr"
    }
  }),
  { name: "ProductPricing" }
);

interface ProductPricingProps {
  currency?: string;
  data: {
    basePrice: number;
  };
  disabled: boolean;
  errors: ProductErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const ProductPricing: React.FC<ProductPricingProps> = props => {
  const { currency, data, disabled, errors, onChange } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(["basePrice"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({ id: 'pricing',
          defaultMessage: "Pricing",
          description: "product pricing"
        })}
      >
      </CardTitle>
      <CardContent>
        <div className={classes.root}>
          <PriceField
            disabled={disabled}
            label={intl.formatMessage(commonMessages.price)}
            error={!!formErrors.basePrice}
            hint={getProductErrorMessage(formErrors.basePrice, intl)}
            name="basePrice"
            value={data.basePrice}
            currencySymbol={currency}
            onChange={onChange}
            InputProps={{
              inputProps: {
                min: 0
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
ProductPricing.displayName = "ProductPricing";
export default ProductPricing;
