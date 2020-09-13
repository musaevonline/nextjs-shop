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
import BlogDetailsForm, {BlogDetailsFormData} from "@temp/sections/blog/components/blog/BlogDetailsForm";

export interface BlogCreatePageProps {
    disabled: boolean;
    errors: BlogErrorFragment[];
    saveButtonBarState: ConfirmButtonTransitionState;
    onBack: () => void;
    onSubmit: (data: BlogDetailsFormData) => void;
}

const BlogCreatePage: React.FC<BlogCreatePageProps> = ({
                                                           disabled,
                                                           errors,
                                                           onBack,
                                                           onSubmit,
                                                           saveButtonBarState
                                                       }) => {
    const intl = useIntl();
    const initialForm: BlogDetailsFormData = {
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
                    {intl.formatMessage(sectionNames.blog)}
                </AppHeader>
                <PageHeader
                    title={intl.formatMessage({
                        id: "createNewBlog",
                        defaultMessage: "Create New Blog",
                        description: "header"
                    })}
                />
                <Grid>
                    <BlogDetailsForm data={form.values}
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
BlogCreatePage.displayName = "BlogCreatePage";
export default BlogCreatePage;
