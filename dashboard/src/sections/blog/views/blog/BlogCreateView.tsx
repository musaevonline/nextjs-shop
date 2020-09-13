import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import BlogCreatePage from "../../components/blog/BlogCreatePage";
import {useBlogCreate} from "../../mutations";
import {blogListUrl, blogUrl} from "../../urls/blog_urls";
import {BlogDetailsFormData} from "@temp/sections/blog/components/blog/BlogDetailsForm";

const BlogCreateView: React.FC<{}> = () => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const intl = useIntl();

    const [createBlog, createBlogOpts] = useBlogCreate({
        onCompleted: data => {
            if (data.blogCreate.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
                navigate(blogUrl(data.blogCreate.blog.id));
            }
        }
    });

    const onSubmit = (formData: BlogDetailsFormData) => {
        createBlog({
            variables: {
                input: formData
            }
        })

    };

    return (
        <BlogCreatePage disabled={createBlogOpts.loading}
                                 errors={createBlogOpts.data?.blogCreate.errors || []}
                                 onBack={() => navigate(blogListUrl())}
                                 onSubmit={onSubmit}
                                 saveButtonBarState={createBlogOpts.status}
        />
    );
};
export default BlogCreateView;
