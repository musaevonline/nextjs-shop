import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import {useBlogArticleDelete, useBlogArticleUpdate} from "../../mutations";
import {blogArticleListUrl, BlogArticleUrlQueryParams} from "../../urls/blog_article_urls";
import {BlogArticleDetailsFormData} from "@temp/sections/blog/components/blogArticle/BlogArticleDetailsForm";
import {useBlogArticle} from "@temp/sections/blog/queries";
import BlogArticleUpdatePage from "@temp/sections/blog/components/blogArticle/BlogArticleUpdatePage";
import {slugifyStr} from "@temp/core/utils";
import useBlogCategorySearch from "@temp/searches/useBlogCategorySearch";
import {DEFAULT_INITIAL_SEARCH_DATA} from "@temp/config";
import {getChoices} from "@temp/sections/products/utils/data";
import {maybe} from "@temp/misc";

export interface BlogArticleDetailsProps {
    id: string;
    params: BlogArticleUrlQueryParams;
}

const BlogArticleDetailsView: React.FC<BlogArticleDetailsProps> = ({
                                                                       id,
                                                                       params
                                                                   }) => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const intl = useIntl();

    const { data, loading } = useBlogArticle({
        displayLoader: true,
        variables: { id }
    });

    const [updateBlogArticle, updateBlogArticleOpts] = useBlogArticleUpdate({
        onCompleted: data => {
            if (data.blogArticleUpdate.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
            }
        }
    });

    const [deleteBlogArticle, deleteBlogArticleRateMethod] = useBlogArticleDelete({
        onCompleted: data => {
            if (data.blogArticleDelete.errors.length === 0) {
                notify({
                    text: intl.formatMessage({
                        id: "blogArticleDeleted",
                        defaultMessage: "Blog Article deleted"
                    })
                });
                navigate(blogArticleListUrl(), true);
            }
        }
    });
    const {
        loadMore: loadMoreCategories,
        search: searchCategories,
        result: searchCategoriesOpts
    } = useBlogCategorySearch({
        variables: DEFAULT_INITIAL_SEARCH_DATA
    });
    const categoryChoiceList = getChoices(maybe(() => searchCategoriesOpts.data.search.edges.map(edge => edge.node), []));

    const onSubmit = (formData: BlogArticleDetailsFormData) => {
        const input = {
            title: formData.title,
            body: formData.body,
            isPublished: formData.isPublished,
            slug: slugifyStr(formData.title),
            datePublished: formData.publicationDate,
            category: formData.category
        };
        if (!!formData.image) {
            input['image'] = formData.image;
        }
        updateBlogArticle({
            variables: {
                id,
                input
            }
        })

    };

    return (
        <BlogArticleUpdatePage blogArticle={data?.blogArticle}
                               disabled={updateBlogArticleOpts.loading ||
                               deleteBlogArticleRateMethod.loading ||
                               loading
                               }
                               errors={updateBlogArticleOpts.data?.blogArticleUpdate.errors || []}
                               onBack={() => navigate(blogArticleListUrl())}
                               onSubmit={onSubmit}
                               saveButtonBarState={updateBlogArticleOpts.status}
                               onDelete={() => deleteBlogArticle({variables: {id}})}
                               categoryChoiceList={categoryChoiceList}
                               fetchCategories={searchCategories}
                               fetchMoreCategories={{
                                   hasMore: maybe(
                                       () =>
                                           searchCategoriesOpts.data.search.pageInfo.hasNextPage
                                   ),
                                   loading: searchCategoriesOpts.loading,
                                   onFetchMore: loadMoreCategories
                               }}

        />
    );
};
export default BlogArticleDetailsView;
