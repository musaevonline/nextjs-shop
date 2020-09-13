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
import {makeStyles} from "@material-ui/core/styles";
import ControlledCheckbox from "@temp/components/ControlledCheckbox";
import Button from "@material-ui/core/Button";
import ImageTile from "@temp/components/ImageTile";

const useStyles = makeStyles(
    theme => ({
        fileField: {
            display: "none"
        }
    })
);
export interface BlogArticleDetailsFormData {
    title: string;
    body: string;
    isPublished: boolean;
    image: File | null;
}

export interface BlogArticleDetailsFormProps {
    disabled: boolean;
    errors: BlogErrorFragment[];
    data: BlogArticleDetailsFormData;
    onChange: (event: React.ChangeEvent<any>) => void;
    onImageChange: (file: File) => void;
    initialImgUrl: string
}

const BlogArticleDetailsForm: React.FC<BlogArticleDetailsFormProps> = props => {
    const {
        disabled,
        errors,
        data,
        onChange,
        onImageChange,
        initialImgUrl
    } = props;

    const intl = useIntl();
    const classes = useStyles();
    const upload = React.useRef(null);

    const formFields = [
        "title",
        "body",
        "isPublished"
    ];
    const handleImageChange = (files: FileList) => {
        onImageChange(files[0])
    }
    const image = {
        url: data.image ? URL.createObjectURL(data.image) : initialImgUrl,
        alt: ""
    }

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
                <Hr />
                <ControlledCheckbox
                    name={"isPublished" as keyof FormData}
                    label={intl.formatMessage({id: 'isPublished',
                        defaultMessage: "Is Published",
                        description: "blog form field"
                    })}
                    checked={data.isPublished}
                    onChange={onChange}
                    disabled={disabled}
                />
                <Hr/>
                <>
                    <Button
                        onClick={() => upload.current.click()}
                        disabled={disabled}
                        variant="text"
                        color="primary"
                        data-tc="button-upload-image"
                    >
                        {intl.formatMessage(commonMessages.uploadImage)}
                    </Button>
                    <input
                        className={classes.fileField}
                        id="fileUpload"
                        onChange={event => handleImageChange(event.target.files)}
                        multiple={false}
                        type="file"
                        ref={upload}
                        accept="image/*"
                    />
                    <ImageTile image={image} onImageEdit={() => upload.current.click()}/>
                </>
            </CardContent>
        </Card>

    );
};
BlogArticleDetailsForm.displayName = "BlogArticleDetailsForm";
export default BlogArticleDetailsForm;
