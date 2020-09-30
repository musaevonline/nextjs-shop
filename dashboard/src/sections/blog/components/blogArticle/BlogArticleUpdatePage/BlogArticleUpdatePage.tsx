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
import {SingleAutocompleteChoiceType} from "@temp/components/SingleAutocompleteSelectField";
import {FetchMoreProps} from "@temp/types";
import createSingleAutocompleteSelectHandler from "@temp/utils/handlers/singleAutocompleteSelectChangeHandler";
import useStateFromProps from "@temp/hooks/useStateFromProps";
import VisibilityCard from "@temp/components/VisibilityCard";
import useDateLocalize from "@temp/hooks/useDateLocalize";

export interface BlogArticleUpdatePageProps {
    blogArticle: BlogArticleFragment
    disabled: boolean;
    errors: BlogErrorFragment[];
    saveButtonBarState: ConfirmButtonTransitionState;
    onBack: () => void;
    onDelete: () => void;
    onSubmit: (data: BlogArticleDetailsFormData) => void;
    categoryChoiceList: SingleAutocompleteChoiceType[],
    fetchCategories: (query: string) => void;
    fetchMoreCategories: FetchMoreProps;
}

const BlogArticleUpdatePage: React.FC<BlogArticleUpdatePageProps> = ({
                                                                         blogArticle,
                                                                         disabled,
                                                                         errors,
                                                                         onBack,
                                                                         onDelete,
                                                                         onSubmit,
                                                                         saveButtonBarState,
                                                                         categoryChoiceList,
                                                                         fetchCategories,
                                                                         fetchMoreCategories
                                                                     }) => {
    const intl = useIntl();
    const localizeDate = useDateLocalize();
    const [selectedCategory, setSelectedCategory] = useStateFromProps(maybe(() => blogArticle.category.name, ''));
    const initialForm: BlogArticleDetailsFormData = {
        title: maybe(() => blogArticle.title, ""),
        body: maybe(() => blogArticle.body, ""),
        isPublished: maybe(() => blogArticle.isPublished, false),
        image: null,
        publicationDate: maybe(() => blogArticle.datePublished, ''),
        category: maybe(() => blogArticle.category.id, ''),

    };
    const form = useFormik({
        enableReinitialize: true,
        initialValues: initialForm,
        onSubmit
    });
    const onImageChange = (file: File) => {
        form.setFieldValue('image', file ? file: null);
    }
    const handleCategorySelect = createSingleAutocompleteSelectHandler(
        (e) => {form.handleChange(e as any)},
        setSelectedCategory,
        categoryChoiceList
    );
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
                                            onImageChange={onImageChange}
                                            initialImgUrl={maybe(() => blogArticle.thumbnail.url, "")}
                                            categories={categoryChoiceList}
                                            categoryInputDisplayValue={selectedCategory}
                                            onCategoryChange={handleCategorySelect}
                                            fetchCategories={fetchCategories}
                                            fetchMoreCategories={fetchMoreCategories}
                    />
                    <VisibilityCard
                        data={form.values}
                        errors={errors}
                        disabled={disabled}
                        hiddenMessage={intl.formatMessage(
                            {
                                id: "will_be_visible_from{date}",
                                defaultMessage: "will be visible from {date}",
                                description: "article"
                            },
                            {
                                date: localizeDate(form.values.publicationDate)
                            }
                        )}
                        onChange={form.handleChange}
                        visibleMessage={intl.formatMessage(
                            {
                                id: "since{date}",
                                defaultMessage: "since {date}",
                                description: "article"
                            },
                            {
                                date: localizeDate(form.values.publicationDate)
                            }
                        )}
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
