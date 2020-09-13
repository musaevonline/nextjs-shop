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
import {BlogFragment} from "@temp/sections/blog/types/BlogFragment";
import {maybe} from "@temp/misc";

export interface BlogUpdatePageProps {
    blog: BlogFragment
    disabled: boolean;
    errors: BlogErrorFragment[];
    saveButtonBarState: ConfirmButtonTransitionState;
    onBack: () => void;
    onDelete: () => void;
    onSubmit: (data: BlogDetailsFormData) => void;
}

const BlogUpdatePage: React.FC<BlogUpdatePageProps> = ({
                                                           blog,
                                                           disabled,
                                                           errors,
                                                           onBack,
                                                           onDelete,
                                                           onSubmit,
                                                           saveButtonBarState
                                                       }) => {
    const intl = useIntl();
    const initialForm: BlogDetailsFormData = {
        name: maybe(() => blog.name, ""),
        description: maybe(() => blog.description, ""),

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
                    {intl.formatMessage(sectionNames.blog)}
                </AppHeader>
                <PageHeader
                    title={intl.formatMessage({
                        id: "updateBlog",
                        defaultMessage: "Update Blog",
                        description: "header"
                    })}
                />
                <Grid>
                    <BlogDetailsForm data={form.values}
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
BlogUpdatePage.displayName = "BlogUpdatePage";
export default BlogUpdatePage;
