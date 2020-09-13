import Container from "@temp/components/Container";
import PageHeader from "@temp/components/PageHeader";
import { ListActions, PageListProps, UserPermissionProps } from "@temp/types";
import React from "react";
import { useIntl } from "react-intl";

import { BlogArticleFragment } from "../../../types/BlogArticleFragment";
import BlogArticleList from "../BlogArticleList";

export interface BlogArticleListPageProps
    extends PageListProps,
        ListActions,
        UserPermissionProps {
    blogArticleList: BlogArticleFragment[];
    onBack: () => void;
    onRemove: (id: string) => void;
}

const BlogArticleListPage: React.FC<BlogArticleListPageProps> = ({
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
                    id: "blogArticle",
                    defaultMessage: "Blog Article",
                    description: "header"
                })}
            />
            <BlogArticleList disabled={disabled} {...listProps} />
        </Container>
    );
};
BlogArticleListPage.displayName = "BlogArticleListPage";
export default BlogArticleListPage;
