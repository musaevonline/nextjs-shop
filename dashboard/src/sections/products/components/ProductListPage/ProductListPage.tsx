import React from "react";
import PageHeader from "@temp/components/PageHeader";
import {buttonMessages, commonMessages, sectionNames} from "@temp/intl";
import {FormattedMessage, useIntl} from "react-intl";
import {Button} from "@material-ui/core";
import FilterBar from "@temp/components/FilterBar";
import Card from "@material-ui/core/Card";
import {ProductListUrlQueryParams, ProductListUrlSortField, productUrl} from "@temp/sections/products/urls";
import useLocalStorage from "@temp/hooks/useLocalStorage";
import SaveFilterTabDialog, {SaveFilterTabDialogFormData} from "@temp/components/SaveFilterTabDialog";
import DeleteFilterTabDialog from "@temp/components/DeleteFilterTabDialog";
import {maybe} from "@temp/misc";
import ProductList from "@temp/sections/products/components/ProductList/ProductList";
import {ProductListColumns} from "@temp/config";
import useListSettings from "@temp/hooks/useListSettings";
import {ListViews} from "@temp/types";
import {AvailableInGridAttributesQuery, TypedProductListQuery} from "@temp/sections/products/queries";
import {ProductListVariables} from "@temp/sections/products/types/ProductList";
import usePaginator, {createPaginationState} from "@temp/hooks/usePaginator";
import {getSortQueryVariables} from "@temp/sections/products/views/ProductList/sort";
import {
    getAttributeIdFromColumnValue,
    isAttributeColumnValue
} from "@temp/sections/products/components/ProductListPage/utils";
import useNavigator from "@temp/hooks/useNavigator";
import useBulkActions from "@temp/hooks/useBulkActions";

const PRODUCT_LIST_TABS= 'productListTabs';

interface FilterItemData{
    sort?: ProductListUrlSortField;
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

const ProductListPage:React.FC<{
    params: ProductListUrlQueryParams,
    changeUrlParams(params: ProductListUrlQueryParams): void
}> = ({params, changeUrlParams}) => {
    const intl = useIntl();
    const paginate = usePaginator();
    const navigate = useNavigator();
    const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
        params.ids
    );
    const [productListTabs, setProductListTabs] = useLocalStorage<FilterItem[]>(PRODUCT_LIST_TABS, []);
    const { updateListSettings, settings } = useListSettings<ProductListColumns>(
        ListViews.PRODUCT_LIST
    );
    const paginationState = createPaginationState(settings.rowNumber, params);
    const sort = getSortQueryVariables(params);
    const queryVariables = React.useMemo<ProductListVariables>(
        () => ({
            ...paginationState,
            filter:{
                search: params.query
            },
            sort
        }),
        [params, settings.rowNumber]
    );

    const tabs = productListTabs;
    const currentTab = params.activeTab || 0;

    const onAll = () => {
        changeUrlParams({activeTab: 0, action: null, query: "", after: '', before: ''});
    }
    const onTabSave = () => {
        changeUrlParams({action: DIALOG_ACTIONS.saveSearch})
    };
    const onTabChange = (tab: number) => {
        changeUrlParams({activeTab: tab, ...productListTabs[tab-1].data, after: '', before: ''});
    };
    const onTabDelete = tab => {
        changeUrlParams({action: DIALOG_ACTIONS.deleteSearch, after: '', before: ''})
    };

    const onSearchChange = q => {
        if (!q){
            changeUrlParams({activeTab: 0, query: q});
        }else{
            const index = productListTabs.findIndex(tab => tab.data.query === q);
            const activeTab =  index !== -1 ? index+1 : productListTabs.length + 1;
            changeUrlParams({activeTab, query: q});
        }
    };

    const closeModal = () => {
        changeUrlParams({action: null});
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
        if (currentTab <= productListTabs.length) {
            setProductListTabs(productListTabs.filter((tab, i) => i !== currentTab - 1));
            changeUrlParams({activeTab: 0, action: null, query: ""});
        }
        closeModal();
    };

    function filterColumnIds(columns: ProductListColumns[]) {
        return columns
            .filter(isAttributeColumnValue)
            .map(getAttributeIdFromColumnValue);
    }

    const openModal = (action: string, data: any) => {
        console.log('open modal', action, data);
        changeUrlParams({action});
    }

    const onSort = (sort: ProductListUrlSortField) => {
        console.log(sort);
        const asc = params.sort === sort ? !params.asc : true;
        changeUrlParams({sort, asc});
    }

    return(
        <AvailableInGridAttributesQuery
            variables={{ first: 6, ids: filterColumnIds(settings.columns) }}
        >
            {attributes => (
                <TypedProductListQuery displayLoader variables={queryVariables}>
                    {({ data, loading, refetch }) => {
                        const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
                            maybe(() => data.products.pageInfo),
                            paginationState,
                            params
                        );
                        return (
                            <>
                                <PageHeader title={intl.formatMessage(sectionNames.products)}>
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        data-tc="add-product"
                                    >
                                        <FormattedMessage {...buttonMessages.createProduct} description="button"/>
                                    </Button>
                                </PageHeader>
                                <Card>
                                    <FilterBar
                                        currentTab={currentTab}
                                        initialSearch={params.query || ""}
                                        onAll={onAll}
                                        onSearchChange={onSearchChange}
                                        onTabChange={onTabChange}
                                        onTabDelete={onTabDelete}
                                        onTabSave={onTabSave}
                                        tabs={tabs.map(tab => tab.name)}
                                        allTabLabel={intl.formatMessage(commonMessages.allProducts)}
                                        searchPlaceholder={intl.formatMessage(commonMessages.searchProducts)}
                                    />
                                    <ProductList activeAttributeSortId=""
                                                 sort={{
                                                     asc: params.asc,
                                                     sort: params.sort
                                                 }}
                                                 onSort={onSort}
                                                 gridAttributes={maybe(
                                                     () =>
                                                         attributes.data.availableInGrid.edges.map(
                                                             edge => edge.node
                                                         ),
                                                     []
                                                 )}
                                                 disabled={loading}

                                                 products={maybe(() =>
                                                     data.products.edges.map(edge => edge.node)
                                                 )}
                                                 settings={settings}
                                                 onNextPage={loadNextPage}
                                                 onPreviousPage={loadPreviousPage}
                                                 onUpdateListSettings={updateListSettings}
                                                 pageInfo={pageInfo}
                                                 onRowClick={id => () => navigate(productUrl(id))}
                                                 toolbar={
                                                     <>
                                                         <Button
                                                             color="primary"
                                                             onClick={() =>
                                                                 openModal("unpublish", {
                                                                     ids: listElements
                                                                 })
                                                             }
                                                         >
                                                             <FormattedMessage {...commonMessages.unpublish}/>
                                                         </Button>
                                                     </>
                                                 }
                                                 isChecked={isSelected}
                                                 selected={listElements.length}
                                                 toggle={toggle}
                                                 toggleAll={toggleAll}
                                                 onListSettingsReset={reset}
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
                                        () => tabs[currentTab - 1].name,
                                        "..."
                                    )}
                                />
                            </>
                        );
                    }}
                </TypedProductListQuery>
            )}
        </AvailableInGridAttributesQuery>
    )
};

export default ProductListPage;