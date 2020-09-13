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

export interface BlogArticleDetailsFormData {
    title: string;
    body: string;
}

export interface BlogArticleDetailsFormProps {
    disabled: boolean;
    errors: BlogErrorFragment[];
    data: BlogArticleDetailsFormData;
    onChange: (event: React.ChangeEvent<any>) => void;
}

const BlogArticleDetailsForm: React.FC<BlogArticleDetailsFormProps> = props => {
    const {
        disabled,
        errors,
        data,
        onChange
    } = props;

    const intl = useIntl();

    const formFields = [
        "title",
        "body"
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
                    error={!!formErrors.title}
                    fullWidth
                    helperText={getBlogErrorMessage(formErrors.title, intl)}
                    label={intl.formatMessage({
                        id: "blogArticleTitle",
                        defaultMessage: "Blog Article Title",
                        description: "blog article title"
                    })}
                    name={"title" as keyof FormData}
                    value={data.title}
                    onChange={onChange}
                />
                <Hr />
                <TextField
                    disabled={disabled}
                    error={!!formErrors.body}
                    fullWidth
                    multiline
                    helperText={getBlogErrorMessage(formErrors.body, intl)}
                    label={intl.formatMessage({
                        id: "blogArticleBody",
                        defaultMessage: "Blog Article Body",
                        description: "blog article body"
                    })}
                    name={"body" as keyof FormData}
                    value={data.body}
                    onChange={onChange}
                />
            </CardContent>
        </Card>

    );
};
BlogArticleDetailsForm.displayName = "BlogArticleDetailsForm";
export default BlogArticleDetailsForm;
