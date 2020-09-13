import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import {useBlogDelete, useBlogUpdate} from "../../mutations";
import {blogListUrl, BlogUrlQueryParams} from "../../urls/blog_urls";
import {BlogDetailsFormData} from "@temp/sections/blog/components/blog/BlogDetailsForm";
import {useBlog} from "@temp/sections/blog/queries";
import BlogUpdatePage from "@temp/sections/blog/components/blog/BlogUpdatePage";

export interface BlogDetailsProps {
    id: string;
    params: BlogUrlQueryParams;
}

const BlogDetailsView: React.FC<BlogDetailsProps> = ({
                                                         id,
                                                         params
                                                     }) => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const intl = useIntl();

    const { data, loading } = useBlog({
        displayLoader: true,
        variables: { id }
    });

    const [updateBlog, updateBlogOpts] = useBlogUpdate({
        onCompleted: data => {
            if (data.blogUpdate.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
            }
        }
    });

    const [deleteBlog, deleteBlogRateMethod] = useBlogDelete({
        onCompleted: data => {
            if (data.blogDelete.errors.length === 0) {
                notify({
                    text: intl.formatMessage({
                        id: "blogDeleted",
                        defaultMessage: "Blog deleted"
                    })
                });
                navigate(blogListUrl(), true);
            }
        }
    });

    const onSubmit = (formData: BlogDetailsFormData) => {
        updateBlog({
            variables: {
                id,
                input: formData
            }
        })

    };

    return (
        <BlogUpdatePage blog={data?.blog}
                        disabled={updateBlogOpts.loading ||
                        deleteBlogRateMethod.loading ||
                        loading
                        }
                        errors={updateBlogOpts.data?.blogUpdate.errors || []}
                        onBack={() => navigate(blogListUrl())}
                        onSubmit={onSubmit}
                        saveButtonBarState={updateBlogOpts.status}
                        onDelete={() => deleteBlog({variables: {id}})}

        />
    );
};
export default BlogDetailsView;
