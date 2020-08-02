import DialogContentText from "@material-ui/core/DialogContentText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ActionDialog from "@temp/components/ActionDialog";
import DeleteFilterTabDialog from "@temp/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@temp/components/SaveFilterTabDialog";
import useBulkActions from "@temp/hooks/useBulkActions";
import useListSettings from "@temp/hooks/useListSettings";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@temp/hooks/usePaginator";
import { commonMessages } from "@temp/intl";
import { ListViews } from "@temp/types";
import createDialogActionHandlers from "@temp/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@temp/utils/handlers/filterHandlers";
import createSortHandler from "@temp/utils/handlers/sortHandler";
import { getSortParams } from "@temp/utils/sort";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { configurationMenuUrl } from "@temp/configuration";
import { maybe } from "@temp/misc";
import ProductTypeListPage from "../../components/ProductTypeListPage";
import { TypedProductTypeBulkDeleteMutation } from "../../mutations";
import { useProductTypeListQuery } from "../../queries";
import { ProductTypeBulkDelete } from "../../types/ProductTypeBulkDelete";
import {
  productTypeAddUrl,
  productTypeListUrl,
  ProductTypeListUrlDialog,
  ProductTypeListUrlQueryParams,
  productTypeUrl
} from "../../urls";
import {
  areFiltersApplied,
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterQueryParam,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab
} from "./filters";
import { getSortQueryVariables } from "./sort";

interface ProductTypeListProps {
  params: ProductTypeListUrlQueryParams;
}

export const ProductTypeList: React.FC<ProductTypeListProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const { settings } = useListSettings(ListViews.PRODUCT_LIST);
  const intl = useIntl();

  const paginationState = createPaginationState(settings.rowNumber, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params]
  );
  const { data, loading, refetch } = useProductTypeListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const tabs = getFilterTabs();

  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const [
    changeFilters,
    resetFilters,
    handleSearchChange
  ] = createFilterHandlers({
    cleanupFn: reset,
    createUrl: productTypeListUrl,
    getFilterQueryParam,
    navigate,
    params
  });

  const [openModal, closeModal] = createDialogActionHandlers<
    ProductTypeListUrlDialog,
    ProductTypeListUrlQueryParams
  >(navigate, productTypeListUrl, params);

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      productTypeListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    navigate(productTypeListUrl());
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.productTypes.pageInfo),
    paginationState,
    params
  );

  const handleProductTypeBulkDelete = (data: ProductTypeBulkDelete) => {
    if (data.productTypeBulkDelete.productErrors.length === 0) {
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      reset();
      refetch();
      navigate(
        productTypeListUrl({
          ...params,
          action: undefined,
          ids: undefined
        })
      );
    }
  };

  const handleSort = createSortHandler(navigate, productTypeListUrl, params);
  const currencySymbol = "BYN";

  return (
    <TypedProductTypeBulkDeleteMutation
      onCompleted={handleProductTypeBulkDelete}
    >
      {(productTypeBulkDelete, productTypeBulkDeleteOpts) => {
        const onProductTypeBulkDelete = () =>
          productTypeBulkDelete({
            variables: {
              ids: params.ids
            }
          });

        return (
          <>
            <ProductTypeListPage
              currencySymbol={currencySymbol}
              currentTab={currentTab}
              filterOpts={getFilterOpts(params)}
              initialSearch={params.query || ""}
              onSearchChange={handleSearchChange}
              onFilterChange={changeFilters}
              onAll={resetFilters}
              onTabChange={handleTabChange}
              onTabDelete={() => openModal("delete-search")}
              onTabSave={() => openModal("save-search")}
              tabs={tabs.map(tab => tab.name)}
              disabled={loading}
              productTypes={maybe(() =>
                data.productTypes.edges.map(edge => edge.node)
              )}
              pageInfo={pageInfo}
              onAdd={() => navigate(productTypeAddUrl)}
              onBack={() => navigate(configurationMenuUrl)}
              onNextPage={loadNextPage}
              onPreviousPage={loadPreviousPage}
              onRowClick={id => () => navigate(productTypeUrl(id))}
              onSort={handleSort}
              isChecked={isSelected}
              selected={listElements.length}
              sort={getSortParams(params)}
              toggle={toggle}
              toggleAll={toggleAll}
              toolbar={
                <IconButton
                  color="primary"
                  onClick={() =>
                    openModal("remove", {
                      ids: listElements
                    })
                  }
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
            <ActionDialog
              confirmButtonState={productTypeBulkDeleteOpts.status}
              onClose={closeModal}
              onConfirm={onProductTypeBulkDelete}
              open={params.action === "remove"}
              title={intl.formatMessage({ id: 'delete_product_types',
                defaultMessage: "Delete Product Types",
                description: "dialog header"
              })}
              variant="delete"
            >
              <DialogContentText>
                <FormattedMessage id="sure_delete_product_types_text"
                  defaultMessage="{counter,plural,one{Are you sure you want to delete this product type?} other{Are you sure you want to delete {displayQuantity} product types?}}"
                  description="dialog content"
                  values={{
                    counter: maybe(() => params.ids.length),
                    displayQuantity: (
                      <strong>{maybe(() => params.ids.length)}</strong>
                    )
                  }}
                />
              </DialogContentText>
            </ActionDialog>
            <SaveFilterTabDialog
              open={params.action === "save-search"}
              confirmButtonState="default"
              onClose={closeModal}
              onSubmit={handleTabSave}
            />
            <DeleteFilterTabDialog
              open={params.action === "delete-search"}
              confirmButtonState="default"
              onClose={closeModal}
              onSubmit={handleTabDelete}
              tabName={maybe(() => tabs[currentTab - 1].name, "...")}
            />
          </>
        );
      }}
    </TypedProductTypeBulkDeleteMutation>
  );
};
ProductTypeList.displayName = "ProductTypeList";
export default ProductTypeList;
