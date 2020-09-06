import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ControlledCheckbox from "@temp/components/ControlledCheckbox";
import FormSpacer from "@temp/components/FormSpacer";
import Hr from "@temp/components/Hr";
import Skeleton from "@temp/components/Skeleton";
import {commonMessages} from "@temp/intl";
import { ShippingErrorFragment } from "@temp/sections/shipping/types/ShippingErrorFragment";
import getShippingErrorMessage from "@temp/utils/errors/shipping";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { ShippingMethodTypeEnum } from "@temp/types/globalTypes";
import {
    getShippingPriceRateErrorMessage,
    getShippingWeightRateErrorMessage
} from "./errors";
import CardTitle from "@temp/components/CardTitle";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {getFormErrors} from "@temp/utils/errors";
import SingleAutocompleteSelectField from "@temp/components/SingleAutocompleteSelectField";

export interface ShippingMethodDetailsFormData {
    name: string;
    minValue: string;
    maxValue: string;
    price: string;
    description: string;
    type: ShippingMethodTypeEnum;
    noLimits: boolean;
    isFree: boolean;
}

export interface ShippingMethodDetailsFormProps {
    defaultCurrency: string;
    defaultWeightUnit: string;
    disabled: boolean;
    errors: ShippingErrorFragment[];
    data: ShippingMethodDetailsFormData;
    onChange: (event: React.ChangeEvent<any>) => void;
}

const useStyles = makeStyles(
    theme => ({
        grid: {
            display: "grid",
            gridColumnGap: theme.spacing(2),
            gridTemplateColumns: "1fr 1fr"
        },
        subheading: {
            marginBottom: theme.spacing(2),
            marginTop: theme.spacing(2)
        }
    }),
    {
        name: "ShippingMethodDetailsForm"
    }
);

const shippingTypeChoices = [
    {label: "Price", value: ShippingMethodTypeEnum.PRICE},
    {label: "Weight", value: ShippingMethodTypeEnum.WEIGHT},
]

const ShippingMethodDetailsForm: React.FC<ShippingMethodDetailsFormProps> = props => {
    const {
        defaultCurrency,
        defaultWeightUnit,
        disabled,
        errors,
        data,
        onChange
    } = props;

    const classes = useStyles(props);
    const intl = useIntl();

    const formFields = [
        "name",
        "description",
        "price",
        "type",
        "minimumOrderPrice",
        "minimumOrderWeight",
        "maximumOrderPrice",
        "maximumOrderWeight"
    ];

    const formErrors = getFormErrors(formFields, errors);

    const getErrorMessage =
        data.type === ShippingMethodTypeEnum.PRICE
            ? getShippingPriceRateErrorMessage
            : getShippingWeightRateErrorMessage;

    return (
        <Card>
            <CardTitle
                title={intl.formatMessage(commonMessages.generalInformation)}
            />
            <CardContent>
                <TextField
                    disabled={disabled}
                    error={!!formErrors.name}
                    fullWidth
                    helperText={
                        getShippingErrorMessage(formErrors.name, intl) ||
                        intl.formatMessage({
                            id: "willBeShownCustomersAtCheckout",
                            defaultMessage:
                                "This will be shown to customers at checkout"
                        })
                    }
                    label={intl.formatMessage({
                        id: "shippingMethodName",
                        defaultMessage: "Shipping Method Name",
                        description: "shipping method name"
                    })}
                    name={"name" as keyof FormData}
                    value={data.name}
                    onChange={onChange}
                />
                <Hr />
                <TextField
                    disabled={disabled}
                    error={!!formErrors.description}
                    fullWidth
                    multiline
                    helperText={
                        getShippingErrorMessage(formErrors.description, intl) ||
                        intl.formatMessage({
                            id: "willBeShownCustomersAtCheckout",
                            defaultMessage:
                                "This will be shown to customers at checkout"
                        })
                    }
                    label={intl.formatMessage({
                        id: "shippingMethodDescription",
                        defaultMessage: "Shipping Method Description",
                        description: "shipping method description"
                    })}
                    name={"description" as keyof FormData}
                    value={data.description}
                    onChange={onChange}
                />
                <Hr />
                <SingleAutocompleteSelectField
                    allowCustomValues={false}
                    choices={shippingTypeChoices}
                    displayValue={data.type}
                    label={intl.formatMessage({id: "shippingType",
                        defaultMessage: "Shipping Type"
                    })}
                    onChange={onChange}
                    name="type"
                    value={data.type}
                />
                <FormSpacer/>
                {!!data.type ? (
                    <>
                        <Typography
                            className={classes.subheading}
                            variant="subtitle1"
                        >
                            {data.type === ShippingMethodTypeEnum.PRICE
                                ? intl.formatMessage({
                                    id: "valueRange",
                                    defaultMessage: "Value range",
                                    description: "order price range"
                                })
                                : intl.formatMessage({
                                    id: "weightRange",
                                    defaultMessage: "Weight range",
                                    description: "order weight range"
                                }) + ` (${defaultWeightUnit})`}
                        </Typography>
                        <ControlledCheckbox
                            name={"noLimits" as keyof FormData}
                            label={
                                <>
                                    <FormattedMessage id="noValueLimits"
                                                      defaultMessage="There are no value limits"
                                                      description="shipping method has no value limits"
                                    />
                                    <Typography variant="caption">
                                        {data.type === ShippingMethodTypeEnum.PRICE
                                            ? intl.formatMessage({
                                                id: "shippingMethodWillApplyToAllOrdersOfAllPrices",
                                                defaultMessage:
                                                    "This shipping method will apply to all orders of all prices"
                                            })
                                            : intl.formatMessage({
                                                id: "shippingMethodWillApplyToAllOrdersOfAllWeights",
                                                defaultMessage:
                                                    "This rate will apply to all orders of all weights"
                                            })}
                                    </Typography>
                                </>
                            }
                            checked={data.noLimits}
                            onChange={onChange}
                            disabled={disabled}
                        />
                        {!data.noLimits && (
                            <>
                                <FormSpacer />
                                <div className={classes.grid}>
                                    <TextField
                                        disabled={disabled}
                                        error={
                                            !!formErrors.minimumOrderPrice ||
                                            !!formErrors.minimumOrderWeight
                                        }
                                        fullWidth
                                        helperText={
                                            data.type === ShippingMethodTypeEnum.PRICE
                                                ? getErrorMessage(
                                                formErrors.minimumOrderPrice,
                                                intl
                                                )
                                                : getErrorMessage(
                                                formErrors.minimumOrderWeight,
                                                intl
                                                )
                                        }
                                        label={
                                            data.type === ShippingMethodTypeEnum.PRICE
                                                ? intl.formatMessage({
                                                    id: "minimalOrderValue",
                                                    defaultMessage: "Minimal Order Value"
                                                })
                                                : intl.formatMessage({
                                                    id: "minimalOrderWeight",
                                                    defaultMessage: "Minimal Order Weight"
                                                })
                                        }
                                        name={"minValue" as keyof FormData}
                                        type="number"
                                        value={data.minValue}
                                        onChange={onChange}
                                    />
                                    <TextField
                                        disabled={disabled}
                                        error={
                                            !!formErrors.maximumOrderPrice ||
                                            !!formErrors.maximumOrderWeight
                                        }
                                        fullWidth
                                        helperText={
                                            data.type === ShippingMethodTypeEnum.PRICE
                                                ? getErrorMessage(
                                                formErrors.maximumOrderPrice,
                                                intl
                                                )
                                                : getErrorMessage(
                                                formErrors.maximumOrderWeight,
                                                intl
                                                )
                                        }
                                        label={
                                            data.type === ShippingMethodTypeEnum.PRICE
                                                ? intl.formatMessage({
                                                    id: "maximalOrderValue",
                                                    defaultMessage: "Maximal Order Value"
                                                })
                                                : intl.formatMessage({
                                                    id: "maximalOrderWeight",
                                                    defaultMessage: "Maximal Order Weight"
                                                })
                                        }
                                        name={"maxValue" as keyof FormData}
                                        type="number"
                                        value={data.maxValue}
                                        onChange={onChange}
                                    />
                                </div>
                            </>
                        )}
                    </>
                ) : (
                    <Skeleton />
                )}
                <Hr />
                <Typography className={classes.subheading} variant="subtitle1">
                    <FormattedMessage id="shippingMethod"
                                      defaultMessage="Shipping method"
                                      description="shipping method"
                    />
                </Typography>
                <ControlledCheckbox
                    name={"isFree" as keyof FormData}
                    label={intl.formatMessage({
                        id: "freeShipping",
                        defaultMessage: "This is free shipping",
                        description: "shipping method, switch button"
                    })}
                    checked={data.isFree}
                    onChange={onChange}
                    disabled={disabled}
                />
                {!data.isFree && (
                    <>
                        <FormSpacer />
                        <div className={classes.grid}>
                            <TextField
                                disabled={disabled}
                                error={!!formErrors.price}
                                fullWidth
                                helperText={getErrorMessage(formErrors.price, intl)}
                                label={intl.formatMessage({
                                    id: "price",
                                    defaultMessage: "Price",
                                    description: "shipping method price"
                                })}
                                name={"price" as keyof FormData}
                                type="number"
                                value={data.price}
                                onChange={onChange}
                                InputProps={{
                                    endAdornment: defaultCurrency
                                }}
                            />
                        </div>
                    </>
                )}
            </CardContent>
        </Card>

    );
};
ShippingMethodDetailsForm.displayName = "ShippingMethodDetailsForm";
export default ShippingMethodDetailsForm;
