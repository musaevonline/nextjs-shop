import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  areFiltersApplied,
  deleteFilterTab,
  getActiveFilters,
  getFilterOpts,
  getFilterTabs,
  getFilterVariables,
  saveFilterTab
} from "./filters";
import DeleteFilterTabDialog from "@temp/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@temp/components/SaveFilterTabDialog";
import { configurationMenuUrl } from "@temp/configuration";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@temp/hooks/usePaginator";
import createDialogActionHandlers from "@temp/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@temp/utils/handlers/filterHandlers";
import createSortHandler from "@temp/utils/handlers/sortHandler";
import { getSortParams } from "@temp/utils/sort";
import React from "react";
import { useIntl } from "react-intl";

import useBulkActions from "@temp/hooks/useBulkActions";
import { maybe } from "@temp/misc";
import AttributeBulkDeleteDialog from "../../components/AttributeBulkDeleteDialog";
import AttributeListPage from "../../components/AttributeListPage";
import { AttributeBulkDeleteMutation } from "../../mutations";
import { useAttributeListQuery } from "../../queries";
import { AttributeBulkDelete } from "../../types/AttributeBulkDelete";
import {
  attributeAddUrl,
  attributeListUrl,
  AttributeListUrlDialog,
  AttributeListUrlQueryParams,
  attributeUrl
} from "../../urls";
import { getFilterQueryParam } from "./filters";
import { getSortQueryVariables } from "./sort";
import {PAGINATE_BY} from "@temp/config";

interface AttributeListProps {
  params: AttributeListUrlQueryParams;
}

const AttributeList: React.FC<AttributeListProps> = ({ params }) => {
  const navigate = useNavigator();
  const paginate = usePaginator();
  const notify = useNotifier();
  const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
    params.ids
  );
  const intl = useIntl();

  const paginationState = createPaginationState(PAGINATE_BY, params);
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params]
  );
  const { data, loading, refetch } = useAttributeListQuery({
    variables: queryVariables
  });

  const tabs = getFilterTabs();

  const currentTab =
    params.activeTab === undefined
      ? areFiltersApplied(params)
        ? tabs.length + 1
        : 0
      : parseInt(params.activeTab, 0);

  const [openModal, closeModal] = createDialogActionHandlers<
    AttributeListUrlDialog,
    AttributeListUrlQueryParams
  >(navigate, attributeListUrl, params);

  const [
    changeFilters,
    resetFilters,
    handleSearchChange
  ] = createFilterHandlers({
    cleanupFn: reset,
    createUrl: attributeListUrl,
    getFilterQueryParam,
    navigate,
    params
  });

  const handleTabChange = (tab: number) => {
    reset();
    navigate(
      attributeListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    reset();
    navigate(attributeListUrl());
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    maybe(() => data.attributes.pageInfo),
    paginationState,
    params
  );

  const handleBulkDelete = (data: AttributeBulkDelete) => {
    if (data.attributeBulkDelete.errors.length === 0) {
      closeModal();
      notify({
        text: intl.formatMessage({ id: 'attributes_successfully_deleted',
          defaultMessage: "Attributes successfully delete",
          description: "deleted multiple attributes"
        })
      });
      reset();
      refetch();
    }
  };

  const handleSort = createSortHandler(navigate, attributeListUrl, params);
  const currencySymbol = "BYN";

  return (
    <AttributeBulkDeleteMutation onCompleted={handleBulkDelete}>
      {(attributeBulkDelete, attributeBulkDeleteOpts) => (
        <>
          <AttributeListPage
            attributes={maybe(() =>
              data.attributes.edges.map(edge => edge.node)
            )}
            currencySymbol={currencySymbol}
            currentTab={currentTab}
            disabled={loading || attributeBulkDeleteOpts.loading}
            filterOpts={getFilterOpts(params)}
            initialSearch={params.query || ""}
            isChecked={isSelected}
            onAdd={() => navigate(attributeAddUrl())}
            onAll={resetFilters}
            onBack={() => navigate(configurationMenuUrl)}
            onFilterChange={changeFilters}
            onNextPage={loadNextPage}
            onPreviousPage={loadPreviousPage}
            onRowClick={id => () => navigate(attributeUrl(id))}
            onSearchChange={handleSearchChange}
            onSort={handleSort}
            onTabChange={handleTabChange}
            onTabDelete={() => openModal("delete-search")}
            onTabSave={() => openModal("save-search")}
            pageInfo={pageInfo}
            selected={listElements.length}
            sort={getSortParams(params)}
            tabs={tabs.map(tab => tab.name)}
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
          <AttributeBulkDeleteDialog
            confirmButtonState={attributeBulkDeleteOpts.status}
            open={
              params.action === "remove" && maybe(() => params.ids.length > 0)
            }
            onConfirm={() =>
              attributeBulkDelete({ variables: { ids: params.ids } })
            }
            onClose={closeModal}
            quantity={maybe(() => params.ids.length)}
          />
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
      )}
    </AttributeBulkDeleteMutation>
  );
};
AttributeList.displayName = "AttributeList";

export default AttributeList;
