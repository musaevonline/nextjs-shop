import AppHeader from "@temp/components/AppHeader";
import {ConfirmButtonTransitionState} from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import {sectionNames} from "@temp/intl";
import {BlogErrorFragment} from "@temp/sections/blog/types/BlogErrorFragment";
import React from "react";
import {useIntl} from "react-intl";
import {useFormik} from "formik";
import BlogCategoryDetailsForm, {BlogCategoryDetailsFormData} from "@temp/sections/blog/components/blogCategory/BlogCategoryDetailsForm";

export interface BlogCreatePageProps {
    disabled: boolean;
    errors: BlogErrorFragment[];
    saveButtonBarState: ConfirmButtonTransitionState;
    onBack: () => void;
    onSubmit: (data: BlogCategoryDetailsFormData) => void;
}

const BlogCategoryCreatePage: React.FC<BlogCreatePageProps> = ({
                                                                   disabled,
                                                                   errors,
                                                                   onBack,
                                                                   onSubmit,
                                                                   saveButtonBarState
                                                               }) => {
    const intl = useIntl();
    const initialForm: BlogCategoryDetailsFormData = {
        name: "",
        description: "",
        isPublished: false,
        image: null
    };

    const form = useFormik({
        enableReinitialize: true,
        initialValues: initialForm,
        onSubmit
    });
    const onImageChange = (file: File) => {
        form.setFieldValue('image', file);
    }
    return (
        <form onSubmit={form.handleSubmit}>
            <Container>
                <AppHeader onBack={onBack}>
                    {intl.formatMessage(sectionNames.blogCategories)}
                </AppHeader>
                <PageHeader
                    title={intl.formatMessage({
                        id: "createNewBlogCategory",
                        defaultMessage: "Create New Blog Category",
                        description: "header"
                    })}
                />
                <Grid>
                    <BlogCategoryDetailsForm data={form.values}
                                             disabled={disabled}
                                             errors={errors}
                                             onChange={form.handleChange}
                                             onImageChange={onImageChange}
                                             initialImgUrl=""
                    />
                </Grid>
                <SaveButtonBar
                    disabled={disabled || !form.dirty || !form.isValid}
                    onCancel={onBack}
                    state={saveButtonBarState}
                    onSave={form.handleSubmit}
                />
            </Container>
        </form>
    );
};
BlogCategoryCreatePage.displayName = "BlogCategoryCreatePage";
export default BlogCategoryCreatePage;
