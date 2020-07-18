import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ActionDialog from "@temp/components/ActionDialog";
import NotFoundPage from "@temp/components/NotFound";
import { WindowTitle } from "@temp/components/WindowTitle";
import useBulkActions from "@temp/hooks/useBulkActions";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@temp/hooks/usePaginator";
import { commonMessages } from "@temp/intl";
import createDialogActionHandlers from "@temp/utils/handlers/dialogActionHandlers";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";


import { TypedProductBulkDeleteMutation } from "../../products/mutations";
import { productBulkDelete } from "../../products/types/productBulkDelete";
import { productAddUrl, productUrl } from "../../products/urls";
import { CategoryInput } from "@temp/types/globalTypes";
import {
  CategoryPageTab,
  CategoryUpdatePage
} from "../components/CategoryUpdatePage/CategoryUpdatePage";
import {
  useCategoryBulkDeleteMutation,
  useCategoryDeleteMutation,
  useCategoryUpdateMutation
} from "../mutations";
import { useCategoryDetailsQuery } from "../queries";
import { CategoryBulkDelete } from "../types/CategoryBulkDelete";
import { CategoryDelete } from "../types/CategoryDelete";
import { CategoryUpdate } from "../types/CategoryUpdate";
import {
  categoryAddUrl,
  categoryListUrl,
  categoryUrl,
  CategoryUrlDialog,
  CategoryUrlQueryParams
} from "../urls";
import {maybe} from "@temp/misc";
import {PAGINATE_BY} from "@temp/config";

export interface CategoryDetailsProps {
  params: CategoryUrlQueryParams;
  id: string;
}

export function getActiveTab(tabName: string): CategoryPageTab {
  return tabName === CategoryPageTab.products
      ? CategoryPageTab.products
      : CategoryPageTab.categories;
}

export const CategoryDetailsView: React.FC<CategoryDetailsProps> = ({
                                                                      id,
                                                                      params
                                                                    }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
      params.ids
  );
  const intl = useIntl();

  const paginationState = createPaginationState(PAGINATE_BY, params);
  const { data, loading, refetch } = useCategoryDetailsQuery({
    displayLoader: true,
    variables: { ...paginationState, id }
  });

  const category = data?.category;

  if (category === null) {
    return <NotFoundPage />;
  }

  const handleCategoryDelete = (data: CategoryDelete) => {
    if (data.categoryDelete.errors.length === 0) {
      notify({
        text: intl.formatMessage(commonMessages.categoryDeleted)
      });
      navigate(categoryListUrl());
    }
  };

  const [deleteCategory, deleteResult] = useCategoryDeleteMutation({
    onCompleted: handleCategoryDelete
  });

  const handleCategoryUpdate = (data: CategoryUpdate) => {
    if (data.categoryUpdate.errors.length > 0) {
      const backgroundImageError = data.categoryUpdate.errors.find(
          error => error.field === ("backgroundImage" as keyof CategoryInput)
      );
      if (backgroundImageError) {
        notify({
          text: intl.formatMessage(commonMessages.somethingWentWrong)
        });
      }
    }
  };

  const [updateCategory, updateResult] = useCategoryUpdateMutation({
    onCompleted: handleCategoryUpdate
  });

  const handleBulkCategoryDelete = (data: CategoryBulkDelete) => {
    if (data.categoryBulkDelete.errors.length === 0) {
      closeModal();
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      reset();
    }
  };

  const [
    categoryBulkDelete,
    categoryBulkDeleteOpts
  ] = useCategoryBulkDeleteMutation({
    onCompleted: handleBulkCategoryDelete
  });

  const changeTab = (tabName: CategoryPageTab) => {
    reset();
    navigate(
        categoryUrl(id, {
          activeTab: tabName
        })
    );
  };

  const [openModal, closeModal] = createDialogActionHandlers<
      CategoryUrlDialog,
      CategoryUrlQueryParams
      >(navigate, params => categoryUrl(id, params), params);

  const handleBulkProductDelete = (data: productBulkDelete) => {
    if (data.productBulkDelete.errors.length === 0) {
      closeModal();
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      refetch();
      reset();
    }
  };

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
      params.activeTab === CategoryPageTab.categories
          ? maybe(() => data.category.children.pageInfo)
          : maybe(() => data.category.products.pageInfo),
      paginationState,
      params
  );

  return (
      <>
        <WindowTitle title={maybe(() => data.category.name)} />
        <TypedProductBulkDeleteMutation onCompleted={handleBulkProductDelete}>
          {(productBulkDelete, productBulkDeleteOpts) => (
              <>
                <CategoryUpdatePage
                    changeTab={changeTab}
                    currentTab={params.activeTab}
                    category={maybe(() => data.category)}
                    disabled={loading}
                    errors={updateResult.data?.categoryUpdate.errors || []}
                    onAddCategory={() => navigate(categoryAddUrl(id))}
                    onAddProduct={() => navigate(productAddUrl)}
                    onBack={() =>
                        navigate(
                            maybe(
                                () => categoryUrl(data.category.parent.id),
                                categoryListUrl()
                            )
                        )
                    }
                    onCategoryClick={id => () => navigate(categoryUrl(id))}
                    onDelete={() => openModal("delete")}
                    onImageDelete={() =>
                        updateCategory({
                          variables: {
                            id,
                            input: {
                              backgroundImage: null
                            }
                          }
                        })
                    }
                    onImageUpload={file =>
                        updateCategory({
                          variables: {
                            id,
                            input: {
                              backgroundImage: file
                            }
                          }
                        })
                    }
                    onNextPage={loadNextPage}
                    onPreviousPage={loadPreviousPage}
                    pageInfo={pageInfo}
                    onProductClick={id => () => navigate(productUrl(id))}
                    onSubmit={formData =>
                        updateCategory({
                          variables: {
                            id,
                            input: {
                              backgroundImageAlt: formData.backgroundImageAlt,
                              description: formData.description,
                              name: formData.name,
                            }
                          }
                        })
                    }
                    products={maybe(() =>
                        data.category.products.edges.map(edge => edge.node)
                    )}
                    saveButtonBarState={updateResult.status}
                    subcategories={maybe(() =>
                        data.category.children.edges.map(edge => edge.node)
                    )}
                    subcategoryListToolbar={
                      <IconButton
                          color="primary"
                          onClick={() =>
                              openModal("delete-categories", {
                                ids: listElements
                              })
                          }
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    productListToolbar={
                      <IconButton
                          color="primary"
                          onClick={() =>
                              openModal("delete-products", {
                                ids: listElements
                              })
                          }
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                    isChecked={isSelected}
                    selected={listElements.length}
                    toggle={toggle}
                    toggleAll={toggleAll}
                />
                <ActionDialog
                    confirmButtonState={deleteResult.status}
                    onClose={closeModal}
                    onConfirm={() => deleteCategory({ variables: { id } })}
                    open={params.action === "delete"}
                    title={intl.formatMessage(commonMessages.delete)}
                    variant="delete"
                >
                  <DialogContentText>
                    <FormattedMessage
                        {...commonMessages.sureDeleteCategory}
                        values={{
                          categoryName: (
                              <strong>{maybe(() => data.category.name, "...")}</strong>
                          )
                        }}
                    />
                  </DialogContentText>
                  <DialogContentText>
                    <FormattedMessage {...commonMessages.rememberDeleteAssignedProducts} />
                  </DialogContentText>
                </ActionDialog>
                <ActionDialog
                    open={
                      params.action === "delete-categories" &&
                      maybe(() => params.ids.length > 0)
                    }
                    confirmButtonState={categoryBulkDeleteOpts.status}
                    onClose={closeModal}
                    onConfirm={() =>
                        categoryBulkDelete({
                          variables: { ids: params.ids }
                        }).then(() => refetch())
                    }
                    title={intl.formatMessage(commonMessages.deleteCategoriesTitle)}
                    variant="delete"
                >
                  <DialogContentText>
                    <FormattedMessage {...commonMessages.deleteCategories}
                                      values={{
                                        counter: maybe(() => params.ids.length),
                                        displayQuantity: (
                                            <strong>{maybe(() => params.ids.length)}</strong>
                                        )
                                      }}
                    />
                  </DialogContentText>
                  <DialogContentText>
                    <FormattedMessage {...commonMessages.rememberDeleteAssignedProducts} />
                  </DialogContentText>
                </ActionDialog>
                <ActionDialog
                    open={params.action === "delete-products"}
                    confirmButtonState={productBulkDeleteOpts.status}
                    onClose={closeModal}
                    onConfirm={() =>
                        productBulkDelete({
                          variables: { ids: params.ids }
                        }).then(() => refetch())
                    }
                    title={intl.formatMessage(commonMessages.deleteProductsTitle)}
                    variant="delete"
                >
                  <DialogContentText>
                    <FormattedMessage
                        {...commonMessages.deleteProducts}
                        values={{
                          counter: maybe(() => params.ids.length),
                          displayQuantity: (
                              <strong>{maybe(() => params.ids.length)}</strong>
                          )
                        }}
                    />
                  </DialogContentText>
                </ActionDialog>
              </>
          )}
        </TypedProductBulkDeleteMutation>
      </>
  );
};
export default CategoryDetailsView;
