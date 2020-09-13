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
import BlogArticleDetailsForm, {BlogArticleDetailsFormData} from "@temp/sections/blog/components/blogArticle/BlogArticleDetailsForm";
import {BlogArticleFragment} from "@temp/sections/blog/types/BlogArticleFragment";
import {maybe} from "@temp/misc";

export interface BlogArticleUpdatePageProps {
    blogArticle: BlogArticleFragment
    disabled: boolean;
    errors: BlogErrorFragment[];
    saveButtonBarState: ConfirmButtonTransitionState;
    onBack: () => void;
    onDelete: () => void;
    onSubmit: (data: BlogArticleDetailsFormData) => void;
}

const BlogArticleUpdatePage: React.FC<BlogArticleUpdatePageProps> = ({
                                                           blogArticle,
                                                           disabled,
                                                           errors,
                                                           onBack,
                                                           onDelete,
                                                           onSubmit,
                                                           saveButtonBarState
                                                       }) => {
    const intl = useIntl();
    const initialForm: BlogArticleDetailsFormData = {
        title: maybe(() => blogArticle.title, ""),
        body: maybe(() => blogArticle.body, ""),

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
                    {intl.formatMessage(sectionNames.blogArticles)}
                </AppHeader>
                <PageHeader
                    title={intl.formatMessage({
                        id: "updateBlogArticle",
                        defaultMessage: "Update Blog Article",
                        description: "header"
                    })}
                />
                <Grid>
                    <BlogArticleDetailsForm data={form.values}
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
BlogArticleUpdatePage.displayName = "BlogArticleUpdatePage";
export default BlogArticleUpdatePage;
