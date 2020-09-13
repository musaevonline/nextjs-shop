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
import {BlogCategoryFragment} from "@temp/sections/blog/types/BlogCategoryFragment";
import {maybe} from "@temp/misc";

export interface BlogCategoryUpdatePageProps {
    blogCategory: BlogCategoryFragment
    disabled: boolean;
    errors: BlogErrorFragment[];
    saveButtonBarState: ConfirmButtonTransitionState;
    onBack: () => void;
    onDelete: () => void;
    onSubmit: (data: BlogCategoryDetailsFormData) => void;
}

const BlogCategoryUpdatePage: React.FC<BlogCategoryUpdatePageProps> = ({
                                                           blogCategory,
                                                           disabled,
                                                           errors,
                                                           onBack,
                                                           onDelete,
                                                           onSubmit,
                                                           saveButtonBarState
                                                       }) => {
    const intl = useIntl();
    const initialForm: BlogCategoryDetailsFormData = {
        name: maybe(() => blogCategory.name, ""),
        description: maybe(() => blogCategory.description, ""),

    };
    const form = useFormik({
        enableReinitialize: true,
        initialValues: initialForm,
        onSubmit
    })
    return (
        <form onSubmit={form.handleSubmit}>
            <Container>
                <AppHeader onBack={onBack}>
                    {intl.formatMessage(sectionNames.blogCategories)}
                </AppHeader>
                <PageHeader
                    title={intl.formatMessage({
                        id: "updateBlogCategory",
                        defaultMessage: "Update Blog Category",
                        description: "header"
                    })}
                />
                <Grid>
                    <BlogCategoryDetailsForm data={form.values}
                                     disabled={disabled}
                                     errors={errors}
                                     onChange={form.handleChange}
                    />
                </Grid>
                <SaveButtonBar
                    disabled={disabled || !form.dirty || !form.isValid}
                    onCancel={onBack}
                    state={saveButtonBarState}
                    onSave={form.handleSubmit}
                    onDelete={onDelete}
                />
            </Container>
        </form>
    );
};
BlogCategoryUpdatePage.displayName = "BlogCategoryUpdatePage";
export default BlogCategoryUpdatePage;
