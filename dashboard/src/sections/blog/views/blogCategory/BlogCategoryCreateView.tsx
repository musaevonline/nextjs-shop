import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import BlogCategoryCreatePage from "../../components/blogCategory/BlogCategoryCreatePage";
import {useBlogCategoryCreate} from "../../mutations";
import {blogCategoryListUrl, blogCategoryUrl} from "../../urls/blog_category_urls";
import {BlogCategoryDetailsFormData} from "@temp/sections/blog/components/blogCategory/BlogCategoryDetailsForm";

const BlogCategoryCreateView: React.FC<{}> = () => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const intl = useIntl();

    const [createBlog, createBlogOpts] = useBlogCategoryCreate({
        onCompleted: data => {
            if (data.blogCategoryCreate.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
                navigate(blogCategoryUrl(data.blogCategoryCreate.blogCategory.id));
            }
        }
    });

    const onSubmit = (formData: BlogCategoryDetailsFormData) => {
        createBlog({
            variables: {
                input: formData
            }
        })

    };

    return (
        <BlogCategoryCreatePage disabled={createBlogOpts.loading}
                                 errors={createBlogOpts.data?.blogCategoryCreate.errors || []}
                                 onBack={() => navigate(blogCategoryListUrl())}
                                 onSubmit={onSubmit}
                                 saveButtonBarState={createBlogOpts.status}
        />
    );
};
export default BlogCategoryCreateView;
