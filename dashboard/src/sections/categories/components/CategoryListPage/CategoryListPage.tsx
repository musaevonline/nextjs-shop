import React from "react";
import PageHeader from "@temp/components/PageHeader";
import {buttonMessages, commonMessages, sectionNames} from "@temp/intl";
import {FormattedMessage, useIntl} from "react-intl";
import {Button} from "@material-ui/core";
import FilterBar from "@temp/components/FilterBar";
import Card from "@material-ui/core/Card";
import useLocalStorage from "@temp/hooks/useLocalStorage";
import SaveFilterTabDialog, {SaveFilterTabDialogFormData} from "@temp/components/SaveFilterTabDialog";
import DeleteFilterTabDialog from "@temp/components/DeleteFilterTabDialog";
import {maybe} from "@temp/misc";
import useListSettings from "@temp/hooks/useListSettings";
import {ListViews} from "@temp/types";
import usePaginator, {createPaginationState} from "@temp/hooks/usePaginator";
import useNavigator from "@temp/hooks/useNavigator";
import useBulkActions from "@temp/hooks/useBulkActions";
import {
    categoryListUrl, CategoryListUrlDialog,
    CategoryListUrlQueryParams,
    CategoryListUrlSortField,
    categoryUrl
} from "@temp/sections/categories/urls";
import {CategoryListVariables} from "@temp/sections/categories/types/CategoryList";
import {getCategorySortQueryVariables} from "@temp/sections/categories/views/CategoryList/sort";
import {useRootCategoriesQuery} from "@temp/sections/categories/queries";
import CategoryList from "@temp/sections/categories/components/CategoryList";
import createDialogActionHandlers from "@temp/utils/handlers/dialogActionHandlers";

const CATEGORY_LIST_TABS= 'categoryListTabs';

interface FilterItemData{
    sort?: CategoryListUrlSortField;
    asc?: boolean;
    query?: string;
}
interface FilterItem {
    data: FilterItemData,
    name: string
}

const DIALOG_ACTIONS = {
    saveSearch: "save-search",
    deleteSearch: "delete-search",
}

const CategoryListPage:React.FC<{
    params: CategoryListUrlQueryParams,
    changeUrlParams(params: CategoryListUrlQueryParams): void
}> = ({params, changeUrlParams}) => {
    const intl = useIntl();
    const paginate = usePaginator();
    const navigate = useNavigator();
    const [openModal, closeModal] = createDialogActionHandlers<
        CategoryListUrlDialog,
        CategoryListUrlQueryParams
        >(navigate, categoryListUrl, params);
    const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
        params.ids
    );
    const [productListTabs, setProductListTabs] = useLocalStorage<FilterItem[]>(CATEGORY_LIST_TABS, []);
    const { updateListSettings, settings } = useListSettings(
        ListViews.CATEGORY_LIST
    );
    const paginationState = createPaginationState(settings.rowNumber, params);
    const sort = getCategorySortQueryVariables(params);
    const queryVariables = React.useMemo<CategoryListVariables>(
        () => ({
            ...paginationState,
            filter:{
                search: params.query
            },
            sort
        }),
        [params, settings.rowNumber]
    );
    const { data, loading } = useRootCategoriesQuery({
        displayLoader: true,
        variables: queryVariables
    });
    const tabs = productListTabs;
    const currentTab = params.activeTab || "0";

    const onAll = () => {
        changeUrlParams({activeTab: '0', action: null, query: "", after: '', before: ''});
    }
    const onTabSave = () => {
        openModal('save-search');
    };
    const onTabChange = (tab: number) => {
        changeUrlParams({activeTab: tab.toString(), ...productListTabs[tab-1].data, after: '', before: ''});
    };
    const onTabDelete = tab => {
        openModal('delete-search');
    };

    const onSearchChange = q => {
        if (!q){
            changeUrlParams({activeTab: '0', query: q});
        }else{
            const index = productListTabs.findIndex(tab => tab.data.query === q);
            const activeTab =  index !== -1 ? index+1 : productListTabs.length + 1;
            changeUrlParams({activeTab:activeTab.toString(), query: q});
        }
    };

    const handleFilterTabSave = ({name}:SaveFilterTabDialogFormData) => {
        if (!!name) {
            const data:FilterItemData = {
                query: params.query,
                asc: params.asc,
                sort: params.sort
            }
            setProductListTabs([...productListTabs, {name, data}]);
            closeModal();
        }
    };
    const handleFilterTabDelete = () => {
        if (parseInt(currentTab) <= productListTabs.length) {
            setProductListTabs(productListTabs.filter((tab, i) => i !== parseInt(currentTab) - 1));
            changeUrlParams({activeTab: "0", action: null, query: ""});
        }
        closeModal();
    };

    const onSort = (sort: CategoryListUrlSortField) => {
        console.log(sort);
        const asc = params.sort === sort ? !params.asc : true;
        changeUrlParams({sort, asc});
    }
    const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
        maybe(() => data.categories.pageInfo),
        paginationState,
        params
    );
    return (
        <>
            <PageHeader title={intl.formatMessage(sectionNames.categories)}>
                <Button
                    color="primary"
                    variant="contained"
                    data-tc="add-product"
                >
                    <FormattedMessage {...buttonMessages.createCategory} description="button"/>
                </Button>
            </PageHeader>
            <Card>
                <FilterBar
                    currentTab={parseInt(currentTab)}
                    initialSearch={params.query || ""}
                    onAll={onAll}
                    onSearchChange={onSearchChange}
                    onTabChange={onTabChange}
                    onTabDelete={onTabDelete}
                    onTabSave={onTabSave}
                    tabs={tabs.map(tab => tab.name)}
                    allTabLabel={intl.formatMessage(commonMessages.all)}
                    searchPlaceholder={intl.formatMessage(commonMessages.search)}
                />
                <CategoryList disabled={loading}
                              sort={{
                                  asc: params.asc,
                                  sort: params.sort
                              }}
                              onSort={onSort}

                              categories={maybe(() =>
                                  data.categories.edges.map(edge => edge.node)
                              )}
                              settings={settings}
                              onNextPage={loadNextPage}
                              onPreviousPage={loadPreviousPage}
                              onUpdateListSettings={updateListSettings}
                              pageInfo={pageInfo}
                              onRowClick={id => () => navigate(categoryUrl(id))}
                              toolbar={
                                  <>
                                      <Button
                                          color="primary"
                                          onClick={() =>
                                              openModal("delete", {
                                                  ids: listElements
                                              })
                                          }
                                      >
                                          <FormattedMessage {...commonMessages.delete}/>
                                      </Button>
                                  </>
                              }
                              isChecked={isSelected}
                              selected={listElements.length}
                              toggle={toggle}
                              toggleAll={toggleAll}
                              onListSettingsReset={reset}
                              isRoot={true}
                />
            </Card>
            <SaveFilterTabDialog
                open={params.action === DIALOG_ACTIONS.saveSearch}
                confirmButtonState="default"
                onClose={closeModal}
                onSubmit={handleFilterTabSave}
            />
            <DeleteFilterTabDialog
                open={params.action === DIALOG_ACTIONS.deleteSearch}
                confirmButtonState="default"
                onClose={closeModal}
                onSubmit={handleFilterTabDelete}
                tabName={maybe(
                    () => tabs[parseInt(currentTab) - 1].name,
                    "..."
                )}
            />
        </>
    );
};

export default CategoryListPage;