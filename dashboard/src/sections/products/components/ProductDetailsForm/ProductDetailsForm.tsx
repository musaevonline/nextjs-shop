import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { ProductErrorFragment } from "@temp/sections/products/types/ProductErrorFragment";
import CardTitle from "@temp/components/CardTitle";
import FormSpacer from "@temp/components/FormSpacer";
import { commonMessages } from "@temp/intl";
import { getFormErrors, getProductErrorMessage } from "@temp/utils/errors";
import React from "react";
import { useIntl } from "react-intl";
import {RichCKEditor} from "@temp/components/RichCkeditor";

interface ProductDetailsFormProps {
    data: {
        description: string;
        name: string;
    };
    disabled?: boolean;
    errors: ProductErrorFragment[];
    // Draftail isn't controlled - it needs only initial input
    // because it's autosaving on its own.
    // Ref https://github.com/mirumee/saleor/issues/4470
    initialDescription: string;
    onChange(event: any);
}

export const ProductDetailsForm: React.FC<ProductDetailsFormProps> = ({
                                                                          data,
                                                                          disabled,
                                                                          errors,
                                                                          initialDescription,
                                                                          onChange
                                                                      }) => {
    const intl = useIntl();

    const formErrors = getFormErrors(["name", "description"], errors);

    return (
        <Card>
            <CardTitle
                title={intl.formatMessage(commonMessages.generalInformation)}
            />
            <CardContent>
                <TextField
                    error={!!formErrors.name}
                    helperText={getProductErrorMessage(formErrors.name, intl)}
                    disabled={disabled}
                    fullWidth
                    label={intl.formatMessage({id: 'name',
                        defaultMessage: "Name",
                        description: "product name"
                    })}
                    name="name"
                    value={data.name}
                    onChange={onChange}
                />
                <FormSpacer />
                <RichCKEditor disabled={disabled} data={initialDescription} name={"description"} onChange={onChange}/>
            </CardContent>
        </Card>
    );
};
export default ProductDetailsForm;
