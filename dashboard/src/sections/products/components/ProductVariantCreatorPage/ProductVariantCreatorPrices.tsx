import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@temp/components/CardTitle";
import FormSpacer from "@temp/components/FormSpacer";
import Hr from "@temp/components/Hr";
import SingleSelectField from "@temp/components/SingleSelectField";
import { ProductDetails_product_productType_variantAttributes } from "@temp/sections/products/types/ProductDetails";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
    ProductVariantCreateFormData,
    VariantCreatorPricesAndSkuMode
} from "./form";
import { getPriceAttributeValues } from "./utils";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles(
    theme => ({
        hr: {
            marginBottom: theme.spacing(),
            marginTop: theme.spacing(0.5)
        },
        hrAttribute: {
            marginTop: theme.spacing(2)
        },
        label: {
            alignSelf: "center"
        }
    }),
    { name: "ProductVariantCreatorPrices" }
);

export interface ProductVariantCreatorPricesProps {
    attributes: ProductDetails_product_productType_variantAttributes[];
    currencySymbol: string;
    data: ProductVariantCreateFormData;
    onApplyToAllChange: (applyToAll: VariantCreatorPricesAndSkuMode) => void;
    onApplyToAllPriceChange: (value: string) => void;
    onAttributeSelect: (id: string) => void;
    onAttributeValueChange: (id: string, value: string) => void;
}

const ProductVariantCreatorPrices: React.FC<ProductVariantCreatorPricesProps> = props => {
    const {
        attributes,
        currencySymbol,
        data,
        onApplyToAllChange,
        onApplyToAllPriceChange,
        onAttributeSelect,
        onAttributeValueChange
    } = props;
    const classes = useStyles(props);
    const intl = useIntl();

    const attributeChoices = attributes.map(attribute => ({
        label: attribute.name,
        value: attribute.id
    }));
    const priceAttributeValues = getPriceAttributeValues(data, attributes);

    return (
        <Card>
            <CardTitle
                title={intl.formatMessage({ id: 'price',
                    defaultMessage: "Price",
                    description: "variant price, header"
                })}
            />
            <CardContent>
                <RadioGroup value={data.price.mode}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={8}>
                            <FormControlLabel
                                value="all"
                                control={<Radio color="primary" />}
                                label={intl.formatMessage({ id: 'apply',
                                    defaultMessage: "Apply single price to all SKUs"
                                })}
                                onChange={() => onApplyToAllChange("all")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {data.price.mode === "all" &&
                            <TextField
                                inputProps={{
                                    min: 0,
                                    type: "number"
                                }}
                                InputProps={{
                                    endAdornment: currencySymbol
                                }}
                                label={intl.formatMessage({
                                    defaultMessage: "Price",
                                    id: "productVariantCreatePricesPriceInputLabel"
                                })}
                                value={data.price.value}
                                onChange={event => onApplyToAllPriceChange(event.target.value)}
                            />
                            }
                        </Grid>
                    </Grid>
                    <FormSpacer />
                    <FormControlLabel
                        value="attribute"
                        control={<Radio color="primary" />}
                        label={intl.formatMessage({ id: 'apply_unique_prices',
                            defaultMessage: "Apply unique prices by attribute to each SKU"
                        })}
                        onChange={() => onApplyToAllChange("attribute")}
                    />
                </RadioGroup>
                {data.price.mode === "attribute" && (
                    <>
                        <FormSpacer />
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6} md={8}>
                                <div className={classes.label}>
                                    <Typography>
                                        <FormattedMessage id="choose_attribute"
                                                          defaultMessage="Choose attribute"
                                                          description="variant attribute"
                                        />
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <div>
                                    <SingleSelectField
                                        choices={attributeChoices}
                                        label={intl.formatMessage({ id: 'attribute',
                                            defaultMessage: "Attribute",
                                            description: "variant attribute"
                                        })}
                                        value={data.price.attribute}
                                        onChange={event => onAttributeSelect(event.target.value)}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                        {priceAttributeValues &&
                        priceAttributeValues.map(attributeValue => (
                            <React.Fragment key={attributeValue.id}>
                                <Hr className={classes.hrAttribute} />
                                <FormSpacer />
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6} md={8}>
                                        <div className={classes.label}>
                                            <Typography>{attributeValue.name}</Typography>
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div>
                                            <TextField
                                                label={intl.formatMessage({
                                                    defaultMessage: "Price",
                                                    description: "variant price",
                                                    id: "productVariantCreatePricesSetPricePlaceholder"
                                                })}
                                                inputProps={{
                                                    min: 0,
                                                    type: "number"
                                                }}
                                                InputProps={{
                                                    endAdornment: currencySymbol
                                                }}
                                                fullWidth
                                                value={
                                                    data.price.values.find(
                                                        value => value.slug === attributeValue.slug
                                                    ).value
                                                }
                                                onChange={event =>
                                                    onAttributeValueChange(
                                                        attributeValue.slug,
                                                        event.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

ProductVariantCreatorPrices.displayName = "ProductVariantCreatorPrices";
export default ProductVariantCreatorPrices;
