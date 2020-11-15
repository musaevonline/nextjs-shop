import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { ProductErrorFragment } from "@temp/sections/products/types/ProductErrorFragment";
import CardTitle from "@temp/components/CardTitle";
import FormSpacer from "@temp/components/FormSpacer";
import {commonMessages, formMessages} from "@temp/intl";
import { getFormErrors, getProductErrorMessage } from "@temp/utils/errors";
import { RawDraftContentState } from "draft-js";
import React from "react";
import { useIntl } from "react-intl";

import { maybe } from "@temp/misc";
import { CategoryDetails_category } from "../../types/CategoryDetails";
import {FormData} from "@temp/sections/pages/components/PageDetailsPage";
import {RichCKEditor} from "@temp/components/RichCkeditor";

interface CategoryDetailsFormProps {
  category?: CategoryDetails_category;
  data: {
    name: string;
    description: RawDraftContentState;
  };
  disabled: boolean;
  errors: ProductErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

export const CategoryDetailsForm: React.FC<CategoryDetailsFormProps> = ({
  category,
  disabled,
  data,
  onChange,
  errors
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["name", "description"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformation)}
      />
      <CardContent>
        <div>
          <TextField
            label={intl.formatMessage(formMessages.categoryName)}
            name="name"
            disabled={disabled}
            value={data && data.name}
            onChange={onChange}
            error={!!formErrors.name}
            helperText={getProductErrorMessage(formErrors.name, intl)}
            fullWidth
          />
        </div>
        <FormSpacer />
        <RichCKEditor disabled={disabled}
                      data={maybe(() => data.description)}
                      name={"description" as keyof FormData}
                      onChange={onChange}/>
      </CardContent>
    </Card>
  );
};
export default CategoryDetailsForm;
