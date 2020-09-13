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

export interface BlogCategoryDetailsFormData {
    name: string;
    description: string;
    isPublished: boolean;
    image: File | null;
}

export interface BlogDetailsFormProps {
    disabled: boolean;
    errors: BlogErrorFragment[];
    data: BlogCategoryDetailsFormData;
    onChange: (event: React.ChangeEvent<any>) => void;
    onImageChange: (file: File) => void;
    initialImgUrl: string
}

const BlogCategoryDetailsForm: React.FC<BlogDetailsFormProps> = props => {
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
        "name",
        "description",
        "isPublished"
    ];

    const formErrors = getFormErrors(formFields, errors);

    const handleImageChange = (files: FileList) => {
        onImageChange(files[0])
    }
    const image = {
        url: data.image ? URL.createObjectURL(data.image) : initialImgUrl,
        alt: ""
    }
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
                 <Hr />
                <ControlledCheckbox
                    name={"isPublished" as keyof FormData}
                    label={intl.formatMessage({id: 'isPublished',
                        defaultMessage: "Is Published",
                        description: "blog category form field"
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
BlogCategoryDetailsForm.displayName = "BlogCategoryDetailsForm";
export default BlogCategoryDetailsForm;
