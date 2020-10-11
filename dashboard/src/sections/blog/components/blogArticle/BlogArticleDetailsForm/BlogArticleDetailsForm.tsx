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
import Button from "@material-ui/core/Button";
import ImageTile from "@temp/components/ImageTile";
import SingleAutocompleteSelectField, {SingleAutocompleteChoiceType} from "@temp/components/SingleAutocompleteSelectField";
import {FetchMoreProps} from "@temp/types";
import {ChangeEvent} from "@temp/hooks/useForm";
import {maybe} from "@temp/misc";
import {FormData} from "@temp/sections/pages/components/PageDetailsPage";
import {RichCKEditor} from "@temp/components/RichCkeditor";

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
    publicationDate: string;
    category: string;
}

export interface BlogArticleDetailsFormProps {
    disabled: boolean;
    errors: BlogErrorFragment[];
    data: BlogArticleDetailsFormData;
    onChange: (event: React.ChangeEvent<any>) => void;
    onImageChange: (file: File) => void;
    initialImgUrl: string,
    categories?: SingleAutocompleteChoiceType[];
    categoryInputDisplayValue: string;
    fetchCategories: (query: string) => void;
    fetchMoreCategories: FetchMoreProps;
    onCategoryChange: (event: ChangeEvent) => void;
}

const BlogArticleDetailsForm: React.FC<BlogArticleDetailsFormProps> = props => {
    const {
        disabled,
        errors,
        data,
        onChange,
        onImageChange,
        initialImgUrl,
        categories,
        categoryInputDisplayValue,
        fetchCategories,
        fetchMoreCategories,
        onCategoryChange
    } = props;

    const intl = useIntl();
    const classes = useStyles();
    const upload = React.useRef(null);

    const formFields = [
        "title",
        "body",
        "category"
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
                <SingleAutocompleteSelectField
                    displayValue={categoryInputDisplayValue}
                    error={!!formErrors.category}
                    helperText={getBlogErrorMessage(formErrors.category, intl)}
                    disabled={disabled}
                    label={intl.formatMessage({
                        id: 'category',
                        defaultMessage: "Category"
                    })}
                    choices={disabled ? [] : categories}
                    name="category"
                    value={data.category}
                    onChange={onCategoryChange}
                    fetchChoices={fetchCategories}
                    data-tc="category"
                    {...fetchMoreCategories}
                />
                <Hr />
                <RichCKEditor disabled={disabled} data={maybe(() => data.body)} name={"body" as keyof FormData} onChange={onChange}/>
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
