import { newPasswordUrl } from "@temp/core/auth/urls";
import DeleteFilterTabDialog from "@temp/components/DeleteFilterTabDialog";
import SaveFilterTabDialog, {
  SaveFilterTabDialogFormData
} from "@temp/components/SaveFilterTabDialog";
import { APP_MOUNT_URI, DEFAULT_INITIAL_SEARCH_DATA } from "@temp/config";
import { configurationMenuUrl } from "@temp/configuration";
import useListSettings from "@temp/hooks/useListSettings";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import usePaginator, {
  createPaginationState
} from "@temp/hooks/usePaginator";
import { commonMessages } from "@temp/intl";
import { getStringOrPlaceholder } from "@temp/misc";
import usePermissionGroupSearch from "@temp/searches/usePermissionGroupSearch";
import { ListViews } from "@temp/types";
import createDialogActionHandlers from "@temp/utils/handlers/dialogActionHandlers";
import createFilterHandlers from "@temp/utils/handlers/filterHandlers";
import createSortHandler from "@temp/utils/handlers/sortHandler";
import { getSortParams } from "@temp/utils/sort";
import React from "react";
import { useIntl } from "react-intl";
import urlJoin from "url-join";

import StaffAddMemberDialog, {
  AddMemberFormData
} from "../../components/StaffAddMemberDialog";
import StaffListPage from "../../components/StaffListPage";
import { TypedStaffMemberAddMutation } from "../../mutations";
import { useStaffListQuery } from "../../queries";
import { StaffMemberAdd } from "../../types/StaffMemberAdd";
import {
  staffListUrl,
  StaffListUrlDialog,
  StaffListUrlQueryParams,
  staffMemberDetailsUrl
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

interface StaffListProps {
  params: StaffListUrlQueryParams;
}

export const StaffList: React.FC<StaffListProps> = ({ params }) => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const paginate = usePaginator();
  const { updateListSettings, settings } = useListSettings(
    ListViews.STAFF_MEMBERS_LIST
  );
  const intl = useIntl();

  const paginationState = createPaginationState(settings.rowNumber, params);
  const currencySymbol = "BYN";
  const queryVariables = React.useMemo(
    () => ({
      ...paginationState,
      filter: getFilterVariables(params),
      sort: getSortQueryVariables(params)
    }),
    [params]
  );
  const { data: staffQueryData, loading } = useStaffListQuery({
    displayLoader: true,
    variables: queryVariables
  });

  const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
    staffQueryData?.staffUsers.pageInfo,
    paginationState,
    params
  );

  const handleSort = createSortHandler(navigate, staffListUrl, params);

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
    createUrl: staffListUrl,
    getFilterQueryParam,
    navigate,
    params
  });

  const [openModal, closeModal] = createDialogActionHandlers<
    StaffListUrlDialog,
    StaffListUrlQueryParams
  >(navigate, staffListUrl, params);

  const handleTabChange = (tab: number) => {
    navigate(
      staffListUrl({
        activeTab: tab.toString(),
        ...getFilterTabs()[tab - 1].data
      })
    );
  };

  const handleTabDelete = () => {
    deleteFilterTab(currentTab);
    navigate(staffListUrl());
  };

  const handleTabSave = (data: SaveFilterTabDialogFormData) => {
    saveFilterTab(data.name, getActiveFilters(params));
    handleTabChange(tabs.length + 1);
  };

  const handleStaffMemberAddSuccess = (data: StaffMemberAdd) => {
    if (data.staffCreate.errors.length === 0) {
      notify({
        text: intl.formatMessage(commonMessages.savedChanges)
      });
      navigate(staffMemberDetailsUrl(data.staffCreate.user.id));
    }
  };

  const {
    loadMore: loadMorePermissionGroups,
    search: searchPermissionGroups,
    result: searchPermissionGroupsOpts
  } = usePermissionGroupSearch({
    variables: DEFAULT_INITIAL_SEARCH_DATA
  });

  return (
    <TypedStaffMemberAddMutation onCompleted={handleStaffMemberAddSuccess}>
      {(addStaffMember, addStaffMemberData) => {
        const handleStaffMemberAdd = (variables: AddMemberFormData) =>
          addStaffMember({
            variables: {
              input: {
                addGroups: variables.permissionGroups,
                email: variables.email,
                firstName: variables.firstName,
                lastName: variables.lastName,
                redirectUrl: urlJoin(
                  window.location.origin,
                  APP_MOUNT_URI === "/" ? "" : APP_MOUNT_URI,
                  newPasswordUrl().replace(/\?/, "")
                )
              }
            }
          });

        return (
          <>
            <StaffListPage
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
              disabled={loading || addStaffMemberData.loading}
              settings={settings}
              pageInfo={pageInfo}
              sort={getSortParams(params)}
              staffMembers={staffQueryData?.staffUsers.edges.map(
                edge => edge.node
              )}
              onAdd={() => openModal("add")}
              onBack={() => navigate(configurationMenuUrl)}
              onNextPage={loadNextPage}
              onPreviousPage={loadPreviousPage}
              onUpdateListSettings={updateListSettings}
              onRowClick={id => () => navigate(staffMemberDetailsUrl(id))}
              onSort={handleSort}
            />
            <StaffAddMemberDialog
              availablePermissionGroups={searchPermissionGroupsOpts.data?.search.edges.map(
                edge => edge.node
              )}
              confirmButtonState={addStaffMemberData.status}
              initialSearch=""
              disabled={loading}
              errors={addStaffMemberData.data?.staffCreate.errors || []}
              open={params.action === "add"}
              onClose={closeModal}
              onConfirm={handleStaffMemberAdd}
              fetchMorePermissionGroups={{
                hasMore:
                  searchPermissionGroupsOpts.data?.search.pageInfo.hasNextPage,
                loading: searchPermissionGroupsOpts.loading,
                onFetchMore: loadMorePermissionGroups
              }}
              onSearchChange={searchPermissionGroups}
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
              tabName={getStringOrPlaceholder(tabs[currentTab - 1]?.name)}
            />
          </>
        );
      }}
    </TypedStaffMemberAddMutation>
  );
};

export default StaffList;
