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
import { getStockAttributeValues } from "./utils";
import {Grid} from "@material-ui/core";

const useStyles = makeStyles(
    theme => ({
        attributeStockContainer: {
            columnGap: theme.spacing(3) + "px",
            display: "grid",
            gridTemplateColumns: ({ data }: ProductVariantCreatorStockProps) =>
                `150px repeat(${0}, 288px)`,
            rowGap: theme.spacing(2) + "px"
        },
        attributeStockScroll: {
            overflowX: "auto",
            width: "100%"
        },
        hr: {
            marginBottom: theme.spacing(),
            marginTop: theme.spacing(0.5)
        },
        hrAttribute: {
            marginTop: theme.spacing(2)
        },
        label: {
            alignSelf: "center"
        },
        shortInput: {
            width: "33%"
        },
        stockContainer: {
            columnGap: theme.spacing(3) + "px",
            display: "grid",
            gridTemplateColumns: "repeat(3, 288px)",
            marginTop: theme.spacing(2),
            rowGap: theme.spacing(2) + "px"
        },
        stockHeader: {
            marginBottom: theme.spacing()
        },
        warehouseContainer: {
            columnGap: theme.spacing(3) + "px",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            rowGap: theme.spacing(2) + "px"
        },
        warehouseHeader: {
            marginBottom: theme.spacing()
        },
        warehouseName: {
            marginBottom: theme.spacing()
        },
        warehouseSubheader: {
            marginBottom: theme.spacing(2)
        }
    }),
    { name: "ProductVariantCreatorStock" }
);

export interface ProductVariantCreatorStockProps {
    attributes: ProductDetails_product_productType_variantAttributes[];
    data: ProductVariantCreateFormData;
    onApplyToAllChange: (mode: VariantCreatorPricesAndSkuMode) => void;
    onApplyToAllStockChange: (quantity: number, stockIndex: number) => void;
    onAttributeSelect: (id: string) => void;
    onAttributeValueChange: (
        id: string,
        quantity: number,
        warehouseIndex: number
    ) => void;
}

const ProductVariantCreatorStock: React.FC<ProductVariantCreatorStockProps> = props => {
    const {
        attributes,
        data,
        onApplyToAllChange,
        onApplyToAllStockChange,
        onAttributeSelect,
        onAttributeValueChange
    } = props;
    const classes = useStyles(props);
    const intl = useIntl();

    const attributeChoices = attributes.map(attribute => ({
        label: attribute.name,
        value: attribute.id
    }));
    const stockAttributeValues = getStockAttributeValues(data, attributes);

    return (
        <Card>
            <CardTitle
                title={intl.formatMessage({ id: 'stock',
                    defaultMessage: "Stock",
                    description: "variant stock, header"
                })}
            />
            <CardContent>
                <Typography className={classes.stockHeader} variant="h5">
                    <FormattedMessage
                        defaultMessage="Stock"
                        description="variant stock, header"
                        id="productVariantCreatorStockSectionHeader"
                    />
                </Typography>
                <RadioGroup value={data.stock.mode}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={8}>
                            <FormControlLabel
                                value="all"
                                control={<Radio color="primary" />}
                                label={intl.formatMessage({ id: 'apply_single_quantity',
                                    defaultMessage: "Apply single quantity to all SKUs"
                                })}
                                onChange={() => onApplyToAllChange("all")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {data.stock.mode === "all" && (
                                <TextField
                                    fullWidth
                                    inputProps={{
                                        min: 0,
                                        type: "number"
                                    }}
                                    label={intl.formatMessage({
                                        defaultMessage: "Quantity",
                                        id: "productVariantCreatePricesQuantityInputLabel"
                                    })}
                                    value={data.stock.value}
                                    onChange={event =>
                                        onApplyToAllStockChange(
                                            parseInt(event.target.value, 10),
                                            0
                                        )
                                    }
                                />
                            )}
                        </Grid>

                    </Grid>
                    <FormSpacer />
                    <Grid container spacing={1}>
                        <Grid item xs={12} sm={6} md={8}>
                            <FormControlLabel
                                value="attribute"
                                control={<Radio color="primary" />}
                                label={intl.formatMessage({ id: 'apply_unique_stock',
                                    defaultMessage: "Apply unique stock by attribute to each SKU"
                                })}
                                onChange={() => onApplyToAllChange("attribute")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            {data.stock.mode === "attribute" && (
                                <SingleSelectField
                                    choices={attributeChoices}
                                    label={intl.formatMessage({ id: 'select_attribute',
                                        defaultMessage: "Select Attribute",
                                        description: "variant attribute"
                                    })}
                                    value={data.stock.attribute}
                                    onChange={event => onAttributeSelect(event.target.value)}
                                />
                            )}
                        </Grid>
                    </Grid>
                    {data.stock.mode === "attribute" && stockAttributeValues.map(attributeValue => (
                            <React.Fragment key={attributeValue.id}>
                                <Hr className={classes.hrAttribute} />
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={6} md={8}>
                                        <Typography>{attributeValue.name}</Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4}>
                                        <div className={classes.attributeStockScroll}>
                                            <div className={classes.attributeStockContainer}>
                                                <TextField
                                                    fullWidth
                                                    inputProps={{
                                                        min: 0,
                                                        type: "number"
                                                    }}
                                                    label={intl.formatMessage({
                                                        defaultMessage: "Quantity",
                                                        id:
                                                            "productVariantCreatePricesStockInputLabel"
                                                    })}
                                                    value={
                                                        data.stock.values.find(
                                                            value => value.slug === attributeValue.slug
                                                        ).value[0]
                                                    }
                                                    onChange={event =>
                                                        onAttributeValueChange(
                                                            attributeValue.slug,
                                                            parseInt(event.target.value, 10),
                                                            0
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        )
                    )}
                    {data.stock.mode === "attribute" && !!data.stock.attribute && (
                        <>
                            <FormSpacer />
                            <Hr />
                        </>
                    )}
                    <FormSpacer />
                    <FormControlLabel
                        value="skip"
                        control={<Radio color="primary" />}
                        label={intl.formatMessage({ id:'skip_stock',
                            defaultMessage: "Skip stock for now"
                        })}
                        onChange={() => onApplyToAllChange("skip")}
                    />
                </RadioGroup>
            </CardContent>
        </Card>
    );
};

ProductVariantCreatorStock.displayName = "ProductVariantCreatorStock";
export default ProductVariantCreatorStock;
