import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import BlogArticleCreatePage from "../../components/blogArticle/BlogArticleCreatePage";
import {useBlogArticleCreate} from "../../mutations";
import {blogArticleListUrl, blogArticleUrl} from "../../urls/blog_article_urls";
import {BlogArticleDetailsFormData} from "@temp/sections/blog/components/blogArticle/BlogArticleDetailsForm";
import {slugify} from "@temp/core/utils";

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

    const onSubmit = (formData: BlogArticleDetailsFormData) => {
        const input = {
            title: formData.title,
            body: formData.body,
            isPublished: formData.isPublished,
            slug: slugify(formData.title)
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

    return (
        <BlogArticleCreatePage disabled={createBlogArticleOpts.loading}
                                 errors={createBlogArticleOpts.data?.blogArticleCreate.errors || []}
                                 onBack={() => navigate(blogArticleListUrl())}
                                 onSubmit={onSubmit}
                                 saveButtonBarState={createBlogArticleOpts.status}
        />
    );
};
export default BlogArticleCreateView;
