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
import VisibilityCard from "@temp/components/VisibilityCard";
import useDateLocalize from "@temp/hooks/useDateLocalize";
import {SingleAutocompleteChoiceType} from "@temp/components/SingleAutocompleteSelectField";
import useStateFromProps from "@temp/hooks/useStateFromProps";
import createSingleAutocompleteSelectHandler from "@temp/utils/handlers/singleAutocompleteSelectChangeHandler";
import {FetchMoreProps} from "@temp/types";

export interface BlogArticleCreatePageProps {
    disabled: boolean;
    errors: BlogErrorFragment[];
    saveButtonBarState: ConfirmButtonTransitionState;
    onBack: () => void;
    onSubmit: (data: BlogArticleDetailsFormData) => void;
    categoryChoiceList: SingleAutocompleteChoiceType[],
    fetchCategories: (query: string) => void;
    fetchMoreCategories: FetchMoreProps;
}

const BlogArticleCreatePage: React.FC<BlogArticleCreatePageProps> = ({
                                                                         disabled,
                                                                         errors,
                                                                         onBack,
                                                                         onSubmit,
                                                                         saveButtonBarState,
                                                                         categoryChoiceList,
                                                                         fetchMoreCategories,
                                                                         fetchCategories
                                                                     }) => {
    const intl = useIntl();
    const localizeDate = useDateLocalize();
    const [selectedCategory, setSelectedCategory] = useStateFromProps("");
    const initialForm: BlogArticleDetailsFormData = {
        title: "",
        body: "",
        isPublished: false,
        image: null,
        publicationDate: "",
        category: ""
    };

    const form = useFormik({
        enableReinitialize: true,
        initialValues: initialForm,
        onSubmit
    });
    const onImageChange = (file: File) => {
        form.setFieldValue('image', file);
    };
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
                        id: "createNewBlogArticle",
                        defaultMessage: "Create New Blog Article",
                        description: "header"
                    })}
                />
                <Grid>
                    <BlogArticleDetailsForm data={form.values}
                                            disabled={disabled}
                                            errors={errors}
                                            onChange={form.handleChange}
                                            onImageChange={onImageChange}
                                            initialImgUrl=""
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
                />
            </Container>
        </form>
    );
};
BlogArticleCreatePage.displayName = "BlogArticleCreatePage";
export default BlogArticleCreatePage;
