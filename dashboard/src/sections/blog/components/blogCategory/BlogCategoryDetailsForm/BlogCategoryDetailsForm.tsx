import TextField from "@material-ui/core/TextField";
import Hr from "@temp/components/Hr";
import {commonMessages} from "@temp/intl";
import { BlogErrorFragment } from "@temp/sections/blog/types/BlogErrorFragment";
import getBlogErrorMessage from "@temp/utils/errors/blog";
import React from "react";
import { useIntl } from "react-intl";
import CardTitle from "@temp/components/CardTitle";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {getFormErrors} from "@temp/utils/errors";

export interface BlogCategoryDetailsFormData {
    name: string;
    description: string;
}

export interface BlogDetailsFormProps {
    disabled: boolean;
    errors: BlogErrorFragment[];
    data: BlogCategoryDetailsFormData;
    onChange: (event: React.ChangeEvent<any>) => void;
}

const BlogCategoryDetailsForm: React.FC<BlogDetailsFormProps> = props => {
    const {
        disabled,
        errors,
        data,
        onChange
    } = props;

    const intl = useIntl();

    const formFields = [
        "name",
        "description"
    ];

    const formErrors = getFormErrors(formFields, errors);
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
                    helperText={getBlogErrorMessage(formErrors.name, intl)}
                    label={intl.formatMessage({
                        id: "blogName",
                        defaultMessage: "Blog Category Name",
                        description: "blog category name"
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
                    helperText={getBlogErrorMessage(formErrors.description, intl)}
                    label={intl.formatMessage({
                        id: "blogDescription",
                        defaultMessage: "Blog Category Description",
                        description: "blog category description"
                    })}
                    name={"description" as keyof FormData}
                    value={data.description}
                    onChange={onChange}
                />
            </CardContent>
        </Card>

    );
};
BlogCategoryDetailsForm.displayName = "BlogCategoryDetailsForm";
export default BlogCategoryDetailsForm;
