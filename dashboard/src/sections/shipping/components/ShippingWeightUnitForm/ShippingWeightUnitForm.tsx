import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardTitle from "@temp/components/CardTitle";
import Hr from "@temp/components/Hr";
import SingleSelectField from "@temp/components/SingleSelectField";
import { buttonMessages, sectionNames } from "@temp/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { WeightUnitsEnum } from "@temp/types/globalTypes";
import {useFormik} from "formik";

export interface FormData {
  unit: WeightUnitsEnum;
}

export interface ShippingWeightUnitFormProps {
  defaultWeightUnit: WeightUnitsEnum;
  disabled: boolean;
  onSubmit: (unit: WeightUnitsEnum) => void;
}

const ShippingWeightUnitForm: React.FC<ShippingWeightUnitFormProps> = ({
  defaultWeightUnit,
  disabled,
  onSubmit
}) => {
  const intl = useIntl();
  const initialForm: FormData = {
    unit: defaultWeightUnit
  };

  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialForm,
    onSubmit: values => {
      onSubmit(values.unit)
    }
  })

  return (
    <form onSubmit={form.handleSubmit}>
        <Card>
          <CardTitle title={intl.formatMessage(sectionNames.configuration)} />
          <CardContent>
            <SingleSelectField
              disabled={disabled}
              choices={Object.keys(WeightUnitsEnum).map(unit => ({
                label: WeightUnitsEnum[unit],
                value: WeightUnitsEnum[unit]
              }))}
              label={intl.formatMessage({
                id: "shippingWeightUnit",
                defaultMessage: "Shipping Weight Unit"
              })}
              hint={intl.formatMessage({
                id: "unitWillBeUsedAsDefault",
                defaultMessage:
                  "This unit will be used as default shipping weight"
              })}
              name={"unit" as keyof FormData}
              value={form.values.unit}
              onChange={form.handleChange}
            />
          </CardContent>
          <Hr />
          <CardActions>
            <Button color="primary" type="submit">
              <FormattedMessage {...buttonMessages.save} />
            </Button>
          </CardActions>
        </Card>
    </form>
  );
};
ShippingWeightUnitForm.displayName = "ShippingWeightUnitForm";
export default ShippingWeightUnitForm;
