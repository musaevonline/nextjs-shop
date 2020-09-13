import Container from "@temp/components/Container";
import PageHeader from "@temp/components/PageHeader";
import { ListActions, PageListProps, UserPermissionProps } from "@temp/types";
import React from "react";
import { useIntl } from "react-intl";

import { BlogCategoryFragment } from "../../../types/BlogCategoryFragment";
import BlogCategoryList from "../BlogCategoryList";

export interface BlogCategoryListPageProps
    extends PageListProps,
        ListActions,
        UserPermissionProps {
    blogCategoryList: BlogCategoryFragment[];
    onBack: () => void;
    onRemove: (id: string) => void;
}

const BlogCategoryListPage: React.FC<BlogCategoryListPageProps> = ({
                                                                         disabled,
                                                                         userPermissions,
                                                                         onBack,
                                                                         ...listProps
                                                                     }) => {
    const intl = useIntl();

    return (
        <Container>
            <PageHeader
                title={intl.formatMessage({
                    id: "blogCategory",
                    defaultMessage: "Blog Category",
                    description: "header"
                })}
            />
            <BlogCategoryList disabled={disabled} {...listProps} />
        </Container>
    );
};
BlogCategoryListPage.displayName = "BlogCategoryListPage";
export default BlogCategoryListPage;
