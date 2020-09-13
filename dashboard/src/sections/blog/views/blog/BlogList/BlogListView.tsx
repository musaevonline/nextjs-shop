import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ActionDialog from "@temp/components/ActionDialog";
import { configurationMenuUrl } from "@temp/configuration";
import useBulkActions from "@temp/hooks/useBulkActions";
import useListSettings from "@temp/hooks/useListSettings";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import usePaginator, {
    createPaginationState
} from "@temp/hooks/usePaginator";
import useUser from "@temp/hooks/useUser";
import { commonMessages } from "@temp/intl";
import { getStringOrPlaceholder, maybe } from "@temp/misc";
import { ListViews } from "@temp/types";
import createDialogActionHandlers from "@temp/utils/handlers/dialogActionHandlers";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import {
    useBlogBulkDelete,
    useBlogDelete
} from "../../../mutations";
import {useBlogList} from "../../../queries";
import {
    blogAddUrl,
    blogListUrl,
    BlogListUrlDialog,
    BlogListUrlQueryParams,
    blogUrl
} from "../../../urls/blog_urls";
import BlogListPage from "@temp/sections/blog/components/blog/BlogListPage";

interface BlogListViewProps {
    params: BlogListUrlQueryParams;
}

export const BlogListView: React.FC<BlogListViewProps> = ({params}) => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const paginate = usePaginator();
    const { user } = useUser();
    const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
        params.ids
    );
    const { updateListSettings, settings } = useListSettings(
        ListViews.BLOG_LIST
    );
    const intl = useIntl();

    const paginationState = createPaginationState(settings.rowNumber, params);

    const [openModal, closeModal] = createDialogActionHandlers<
        BlogListUrlDialog,
        BlogListUrlQueryParams
        >(navigate, blogListUrl, params);

    const { data, loading, refetch } = useBlogList({
        displayLoader: true,
        variables: paginationState
    });

    const [deleteBlog, deleteBlogOpts] = useBlogDelete({
        onCompleted: data => {
            if (data.blogDelete.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
                closeModal();
                refetch();
            }
        }
    });

    const [
        bulkDeleteBlog,
        bulkDeleteBlogOpts
    ] = useBlogBulkDelete({
        onCompleted: data => {
            if (data.blogBulkDelete.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
                closeModal();
                reset();
                refetch();
            }
        }
    });

    const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
        maybe(() => data.blogList.pageInfo),
        paginationState,
        params
    );
    return (
        <>
            <BlogListPage
                settings={settings}
                disabled={
                    loading ||
                    deleteBlogOpts.loading
                }
                blogList={maybe(() =>
                    data.blogList.edges.map(edge => edge.node)
                )}
                pageInfo={pageInfo}
                onAdd={() => navigate(blogAddUrl)}
                onBack={() => navigate(configurationMenuUrl)}
                onUpdateListSettings={updateListSettings}
                onNextPage={loadNextPage}
                onPreviousPage={loadPreviousPage}
                onRemove={id =>
                    openModal("remove", {
                        id
                    })
                }
                onRowClick={id => () => navigate(blogUrl(id))}
                isChecked={isSelected}
                selected={listElements.length}
                toggle={toggle}
                toggleAll={toggleAll}
                toolbar={
                    <IconButton
                        color="primary"
                        onClick={() =>
                            openModal("remove-many", {
                                ids: listElements
                            })
                        }
                    >
                        <DeleteIcon />
                    </IconButton>
                }
                userPermissions={user?.userPermissions || []}
            />

            <ActionDialog
                open={params.action === "remove"}
                confirmButtonState={deleteBlogOpts.status}
                variant="delete"
                title={intl.formatMessage({
                    id: "deleteBlog",
                    defaultMessage: "Delete Blog",
                    description: "dialog header"
                })}
                onClose={closeModal}
                onConfirm={() =>
                    deleteBlog({
                        variables: { id: params.id }
                    })
                }
            >
                <DialogContentText>
                    <FormattedMessage
                        id="sureDeleteBlog{blogName}"
                        defaultMessage="Are you sure you want to delete {blogName} blog?"
                        values={{
                            blogName: (
                                <strong>
                                    {maybe(
                                        () =>
                                            data.blogList.edges.find(
                                                edge => edge.node.id === params.id
                                            ).node.name,
                                        "..."
                                    )}
                                </strong>
                            )
                        }}
                    />
                </DialogContentText>
            </ActionDialog>
            <ActionDialog
                open={params.action === "remove-many"}
                confirmButtonState={bulkDeleteBlogOpts.status}
                variant="delete"
                title={intl.formatMessage({
                    id: "deleteBlogs",
                    defaultMessage: "Delete Blogs",
                    description: "dialog header"
                })}
                onClose={closeModal}
                onConfirm={() =>
                    bulkDeleteBlog({
                        variables: { ids: params.ids }
                    })
                }
            >
                <DialogContentText>
                    <FormattedMessage
                        id="{counter,plural,one}sureDeleteBlogText{displayQuantity}"
                        defaultMessage="{counter,plural,one{Are you sure you want to delete this blog?} other{Are you sure you want to delete {displayQuantity} blogs?}}"
                        description="dialog content"
                        values={{
                            counter: params.ids?.length,
                            displayQuantity: (
                                <strong>
                                    {getStringOrPlaceholder(params.ids?.length.toString())}
                                </strong>
                            )
                        }}
                    />
                </DialogContentText>
            </ActionDialog>
        </>
    );
};
BlogListView.displayName = "BlogListView";
export default BlogListView;
