import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import BlogArticleCreatePage from "../../components/blogArticle/BlogArticleCreatePage";
import {useBlogArticleCreate} from "../../mutations";
import {blogArticleListUrl, blogArticleUrl} from "../../urls/blog_article_urls";
import {BlogArticleDetailsFormData} from "@temp/sections/blog/components/blogArticle/BlogArticleDetailsForm";
import {slugifyStr} from "@temp/core/utils";
import {getChoices} from "@temp/sections/products/utils/data";
import {maybe} from "@temp/misc";
import {DEFAULT_INITIAL_SEARCH_DATA} from "@temp/config";
import useBlogCategorySearch from "@temp/searches/useBlogCategorySearch";

const BlogArticleCreateView: React.FC<{}> = () => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const intl = useIntl();

    const [createBlogArticle, createBlogArticleOpts] = useBlogArticleCreate({
        onCompleted: data => {
            if (data.blogArticleCreate.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
                navigate(blogArticleUrl(data.blogArticleCreate.blogArticle.id));
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
    const onSubmit = (formData: BlogArticleDetailsFormData) => {
        const input = {
            title: formData.title,
            subtitle: formData.subtitle,
            body: formData.body,
            isPublished: formData.isPublished,
            slug: slugifyStr(formData.title),
            datePublished: formData.publicationDate,
            category: formData.category
        };
        if (!!formData.image) {
            input['image'] = formData.image;
        }
        createBlogArticle({
            variables: {
                input
            }
        })

    };
    const categoryChoiceList = getChoices(maybe(() => searchCategoriesOpts.data.search.edges.map(edge => edge.node), []));

    return (
        <BlogArticleCreatePage disabled={createBlogArticleOpts.loading}
                               errors={createBlogArticleOpts.data?.blogArticleCreate.errors || []}
                               onBack={() => navigate(blogArticleListUrl())}
                               onSubmit={onSubmit}
                               saveButtonBarState={createBlogArticleOpts.status}
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
export default BlogArticleCreateView;
