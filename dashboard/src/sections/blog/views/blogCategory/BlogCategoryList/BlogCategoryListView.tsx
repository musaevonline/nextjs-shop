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
    useBlogCategoryBulkDelete,
    useBlogCategoryDelete
} from "../../../mutations";
import {useBlogCategoryList} from "../../../queries";
import {
    blogCategoryAddUrl,
    blogCategoryListUrl,
    BlogCategoryListUrlDialog,
    BlogCategoryListUrlQueryParams,
    blogCategoryUrl
} from "../../../urls/blog_category_urls";
import BlogCategoryListPage from "@temp/sections/blog/components/blogCategory/BlogCategoryListPage";

interface BlogCategoryListViewProps {
    params: BlogCategoryListUrlQueryParams;
}

export const BlogCategoryListView: React.FC<BlogCategoryListViewProps> = ({params}) => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const paginate = usePaginator();
    const { user } = useUser();
    const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
        params.ids
    );
    const { updateListSettings, settings } = useListSettings(
        ListViews.BLOG_CATEGORY_LIST
    );
    const intl = useIntl();

    const paginationState = createPaginationState(settings.rowNumber, params);

    const [openModal, closeModal] = createDialogActionHandlers<
        BlogCategoryListUrlDialog,
        BlogCategoryListUrlQueryParams
        >(navigate, blogCategoryListUrl, params);

    const { data, loading, refetch } = useBlogCategoryList({
        displayLoader: true,
        variables: paginationState
    });

    const [deleteBlog, deleteBlogOpts] = useBlogCategoryDelete({
        onCompleted: data => {
            if (data.blogCategoryDelete.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
                closeModal();
                refetch();
            }
        }
    });

    const [
        bulkDeleteBlogCategory,
        bulkDeleteBlogCategoryOpts
    ] = useBlogCategoryBulkDelete({
        onCompleted: data => {
            if (data.blogCategoryBulkDelete.errors.length === 0) {
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
        maybe(() => data.blogCategoryList.pageInfo),
        paginationState,
        params
    );
    return (
        <>
            <BlogCategoryListPage
                settings={settings}
                disabled={
                    loading ||
                    deleteBlogOpts.loading
                }
                blogCategoryList={maybe(() =>
                    data.blogCategoryList.edges.map(edge => edge.node)
                )}
                pageInfo={pageInfo}
                onAdd={() => navigate(blogCategoryAddUrl)}
                onBack={() => navigate(configurationMenuUrl)}
                onUpdateListSettings={updateListSettings}
                onNextPage={loadNextPage}
                onPreviousPage={loadPreviousPage}
                onRemove={id =>
                    openModal("remove", {
                        id
                    })
                }
                onRowClick={id => () => navigate(blogCategoryUrl(id))}
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
                    id: "deleteBlogCategory",
                    defaultMessage: "Delete Blog Category",
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
                        id="sureDeleteBlogCategory{blogCategoryName}"
                        defaultMessage="Are you sure you want to delete {blogCategoryName} blog category?"
                        values={{
                            blogCategoryName: (
                                <strong>
                                    {maybe(
                                        () =>
                                            data.blogCategoryList.edges.find(
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
                confirmButtonState={bulkDeleteBlogCategoryOpts.status}
                variant="delete"
                title={intl.formatMessage({
                    id: "deleteBlogCategories",
                    defaultMessage: "Delete Blog Categories",
                    description: "dialog header"
                })}
                onClose={closeModal}
                onConfirm={() =>
                    bulkDeleteBlogCategory({
                        variables: { ids: params.ids }
                    })
                }
            >
                <DialogContentText>
                    <FormattedMessage
                        id="{counter,plural,one}sureDeleteBlogCategoryText{displayQuantity}"
                        defaultMessage="{counter,plural,one{Are you sure you want to delete this blog category?} other{Are you sure you want to delete {displayQuantity} blog categories?}}"
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
BlogCategoryListView.displayName = "BlogCategoryListView";
export default BlogCategoryListView;
