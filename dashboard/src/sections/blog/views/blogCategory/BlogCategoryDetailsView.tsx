import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import {commonMessages} from "@temp/intl";
import React from "react";
import {useIntl} from "react-intl";

import {useBlogCategoryDelete, useBlogCategoryUpdate} from "../../mutations";
import {blogCategoryListUrl, BlogCategoryUrlQueryParams} from "../../urls/blog_category_urls";
import {BlogCategoryDetailsFormData} from "@temp/sections/blog/components/blogCategory/BlogCategoryDetailsForm";
import {useBlogCategory} from "@temp/sections/blog/queries";
import BlogCategoryUpdatePage from "@temp/sections/blog/components/blogCategory/BlogCategoryUpdatePage";

export interface BlogCategoryDetailsProps {
    id: string;
    params: BlogCategoryUrlQueryParams;
}

const BlogCategoryDetailsView: React.FC<BlogCategoryDetailsProps> = ({
                                                                         id,
                                                                         params
                                                                     }) => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const intl = useIntl();

    const { data, loading } = useBlogCategory({
        displayLoader: true,
        variables: { id }
    });

    const [updateBlogCategory, updateBlogCategoryOpts] = useBlogCategoryUpdate({
        onCompleted: data => {
            if (data.blogCategoryUpdate.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
            }
        }
    });

    const [deleteBlogCategory, deleteBlogCategoryRateMethod] = useBlogCategoryDelete({
        onCompleted: data => {
            if (data.blogCategoryDelete.errors.length === 0) {
                notify({
                    text: intl.formatMessage({
                        id: "blogCategoryDeleted",
                        defaultMessage: "Blog Category deleted"
                    })
                });
                navigate(blogCategoryListUrl(), true);
            }
        }
    });

    const onSubmit = (formData: BlogCategoryDetailsFormData) => {
        updateBlogCategory({
            variables: {
                id,
                input: formData
            }
        })

    };

    return (
        <BlogCategoryUpdatePage blogCategory={data?.blogCategory}
                                disabled={updateBlogCategoryOpts.loading ||
                                deleteBlogCategoryRateMethod.loading ||
                                loading
                                }
                                errors={updateBlogCategoryOpts.data?.blogCategoryUpdate.errors || []}
                                onBack={() => navigate(blogCategoryListUrl())}
                                onSubmit={onSubmit}
                                saveButtonBarState={updateBlogCategoryOpts.status}
                                onDelete={() => deleteBlogCategory({variables: {id}})}

        />
    );
};
export default BlogCategoryDetailsView;
