import Container from "@temp/components/Container";
import PageHeader from "@temp/components/PageHeader";
import { ListActions, PageListProps, UserPermissionProps } from "@temp/types";
import React from "react";
import { useIntl } from "react-intl";

import { BlogFragment } from "../../../types/BlogFragment";
import BlogList from "../BlogList";

export interface BlogListPageProps
    extends PageListProps,
        ListActions,
        UserPermissionProps {
    blogList: BlogFragment[];
    onBack: () => void;
    onRemove: (id: string) => void;
}

const BlogListPage: React.FC<BlogListPageProps> = ({
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
                    id: "payment",
                    defaultMessage: "Blog",
                    description: "header"
                })}
            />
            <BlogList disabled={disabled} {...listProps} />
        </Container>
    );
};
BlogListPage.displayName = "BlogListPage";
export default BlogListPage;
