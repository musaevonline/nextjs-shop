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
    useBlogArticleBulkDelete,
    useBlogArticleDelete
} from "../../../mutations";
import {useBlogArticleList} from "../../../queries";
import {
    blogArticleAddUrl,
    blogArticleListUrl,
    BlogArticleListUrlDialog,
    BlogArticleListUrlQueryParams,
    blogArticleUrl
} from "../../../urls/blog_article_urls";
import BlogArticleListPage from "@temp/sections/blog/components/blogArticle/BlogArticleListPage";

interface BlogArticleListViewProps {
    params: BlogArticleListUrlQueryParams;
}

export const BlogArticleListView: React.FC<BlogArticleListViewProps> = ({params}) => {
    const navigate = useNavigator();
    const notify = useNotifier();
    const paginate = usePaginator();
    const { user } = useUser();
    const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
        params.ids
    );
    const { updateListSettings, settings } = useListSettings(
        ListViews.BLOG_ARTICLE_LIST
    );
    const intl = useIntl();

    const paginationState = createPaginationState(settings.rowNumber, params);

    const [openModal, closeModal] = createDialogActionHandlers<
        BlogArticleListUrlDialog,
        BlogArticleListUrlQueryParams
        >(navigate, blogArticleListUrl, params);

    const { data, loading, refetch } = useBlogArticleList({
        displayLoader: true,
        variables: paginationState
    });

    const [deleteBlog, deleteBlogOpts] = useBlogArticleDelete({
        onCompleted: data => {
            if (data.blogArticleDelete.errors.length === 0) {
                notify({
                    text: intl.formatMessage(commonMessages.savedChanges)
                });
                closeModal();
                refetch();
            }
        }
    });

    const [
        bulkDeleteBlogArticle,
        bulkDeleteBlogArticleOpts
    ] = useBlogArticleBulkDelete({
        onCompleted: data => {
            if (data.blogArticleBulkDelete.errors.length === 0) {
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
        maybe(() => data.blogArticleList.pageInfo),
        paginationState,
        params
    );
    return (
        <>
            <BlogArticleListPage
                settings={settings}
                disabled={
                    loading ||
                    deleteBlogOpts.loading
                }
                blogArticleList={maybe(() =>
                    data.blogArticleList.edges.map(edge => edge.node)
                )}
                pageInfo={pageInfo}
                onAdd={() => navigate(blogArticleAddUrl)}
                onBack={() => navigate(configurationMenuUrl)}
                onUpdateListSettings={updateListSettings}
                onNextPage={loadNextPage}
                onPreviousPage={loadPreviousPage}
                onRemove={id =>
                    openModal("remove", {
                        id
                    })
                }
                onRowClick={id => () => navigate(blogArticleUrl(id))}
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
                    id: "deleteBlogArticle",
                    defaultMessage: "Delete Blog Article",
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
                        id="sureDeleteBlogArticle{blogArticleName}"
                        defaultMessage="Are you sure you want to delete {blogArticleName} blog article?"
                        values={{
                            blogArticleName: (
                                <strong>
                                    {maybe(
                                        () =>
                                            data.blogArticleList.edges.find(
                                                edge => edge.node.id === params.id
                                            ).node.title,
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
                confirmButtonState={bulkDeleteBlogArticleOpts.status}
                variant="delete"
                title={intl.formatMessage({
                    id: "deleteBlogArticles",
                    defaultMessage: "Delete Blog Articles",
                    description: "dialog header"
                })}
                onClose={closeModal}
                onConfirm={() =>
                    bulkDeleteBlogArticle({
                        variables: { ids: params.ids }
                    })
                }
            >
                <DialogContentText>
                    <FormattedMessage
                        id="{counter,plural,one}sureDeleteBlogArticleText{displayQuantity}"
                        defaultMessage="{counter,plural,one{Are you sure you want to delete this blog article?} other{Are you sure you want to delete {displayQuantity} blog articles?}}"
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
BlogArticleListView.displayName = "BlogArticleListView";
export default BlogArticleListView;
