import React from 'react'
import PageHeader from '@temp/components/PageHeader'
import { buttonMessages, commonMessages, sectionNames } from '@temp/intl'
import { FormattedMessage, useIntl } from 'react-intl'
import { Button } from '@material-ui/core'
import FilterBar from '@temp/components/FilterBar'
import Card from '@material-ui/core/Card'
import DeleteIcon from '@material-ui/icons/Delete'
import {
	productAddUrl,
	productListUrl,
	ProductListUrlDialog,
	ProductListUrlQueryParams,
	ProductListUrlSortField,
	productUrl
} from '@temp/sections/products/urls'
import useLocalStorage from '@temp/hooks/useLocalStorage'
import SaveFilterTabDialog, {
	SaveFilterTabDialogFormData
} from '@temp/components/SaveFilterTabDialog'
import DeleteFilterTabDialog from '@temp/components/DeleteFilterTabDialog'
import { maybe } from '@temp/misc'
import ProductList from '@temp/sections/products/components/ProductList/ProductList'
import { ProductListColumns } from '@temp/config'
import useListSettings from '@temp/hooks/useListSettings'
import { ListViews } from '@temp/types'
import {
	AvailableInGridAttributesQuery,
	TypedProductListQuery
} from '@temp/sections/products/queries'
import { ProductListVariables } from '@temp/sections/products/types/ProductList'
import usePaginator, { createPaginationState } from '@temp/hooks/usePaginator'
import { getSortQueryVariables } from '@temp/sections/products/views/ProductList/sort'
import {
	getAttributeIdFromColumnValue,
	isAttributeColumnValue
} from '@temp/sections/products/components/ProductListPage/utils'
import useNavigator from '@temp/hooks/useNavigator'
import useBulkActions from '@temp/hooks/useBulkActions'
import createDialogActionHandlers from '@temp/utils/handlers/dialogActionHandlers'
import {
	TypedProductBulkDeleteMutation,
	TypedProductBulkPublishMutation
} from '@temp/sections/products/mutations'
import { productBulkDelete } from '@temp/sections/products/types/productBulkDelete'
import { productBulkPublish } from '@temp/sections/products/types/productBulkPublish'
import useNotifier from '@temp/hooks/useNotifier'
import IconButton from '@material-ui/core/IconButton'
import ActionDialog from '@temp/components/ActionDialog'
import DialogContentText from '@material-ui/core/DialogContentText'

const PRODUCT_LIST_TABS = 'productListTabs'

interface FilterItemData {
	sort?: ProductListUrlSortField
	asc?: boolean
	query?: string
}
interface FilterItem {
	data: FilterItemData
	name: string
}

const DIALOG_ACTIONS = {
	saveSearch: 'save-search',
	deleteSearch: 'delete-search'
}

const ProductListPage: React.FC<{
	params: ProductListUrlQueryParams
	changeUrlParams(params: ProductListUrlQueryParams): void
}> = ({ params, changeUrlParams }) => {
	const intl = useIntl()
	const paginate = usePaginator()
	const navigate = useNavigator()
	const notify = useNotifier()
	const { isSelected, listElements, reset, toggle, toggleAll } = useBulkActions(
		params.ids
	)
	const [productListTabs, setProductListTabs] = useLocalStorage<FilterItem[]>(
		PRODUCT_LIST_TABS,
		[]
	)
	const { updateListSettings, settings } = useListSettings<ProductListColumns>(
		ListViews.PRODUCT_LIST
	)
	const paginationState = createPaginationState(settings.rowNumber, params)
	const sort = getSortQueryVariables(params)
	const queryVariables = React.useMemo<ProductListVariables>(
		() => ({
			...paginationState,
			filter: {
				search: params.query
			},
			sort
		}),
		[params, settings.rowNumber]
	)
	const [openModal, closeModal] = createDialogActionHandlers<
		ProductListUrlDialog,
		ProductListUrlQueryParams
	>(navigate, productListUrl, params)

	const tabs = productListTabs
	const currentTab = params.activeTab || '0'

	const onAll = () => {
		changeUrlParams({
			activeTab: '0',
			action: null,
			query: '',
			after: '',
			before: ''
		})
	}
	const onTabSave = () => {
		changeUrlParams({ action: 'save-search' })
	}
	const onTabChange = (tab: number) => {
		reset()
		changeUrlParams({
			activeTab: tab.toString(),
			...productListTabs[tab - 1].data,
			after: '',
			before: ''
		})
	}
	const onTabDelete = (tab) => {
		changeUrlParams({ action: 'delete-search', after: '', before: '' })
	}

	const onSearchChange = (q) => {
		if (!q) {
			changeUrlParams({ activeTab: '0', query: q })
		} else {
			const index = productListTabs.findIndex((tab) => tab.data.query === q)
			const activeTab = index !== -1 ? index + 1 : productListTabs.length + 1
			changeUrlParams({ activeTab: activeTab.toString(), query: q })
		}
	}

	const handleFilterTabSave = ({ name }: SaveFilterTabDialogFormData) => {
		if (!!name) {
			const data: FilterItemData = {
				query: params.query,
				asc: params.asc,
				sort: params.sort
			}
			setProductListTabs([...productListTabs, { name, data }])
			closeModal()
		}
	}
	const handleFilterTabDelete = () => {
		if (parseInt(currentTab) <= productListTabs.length) {
			setProductListTabs(
				productListTabs.filter((tab, i) => i !== parseInt(currentTab) - 1)
			)
			changeUrlParams({ activeTab: '0', action: null, query: '' })
		}
		closeModal()
	}

	function filterColumnIds(columns: ProductListColumns[]) {
		return columns
			.filter(isAttributeColumnValue)
			.map(getAttributeIdFromColumnValue)
	}

	const onSort = (sort: ProductListUrlSortField) => {
		const asc = params.sort === sort ? !params.asc : true
		changeUrlParams({ sort, asc })
	}
	return (
		<AvailableInGridAttributesQuery
			variables={{ first: 6, ids: filterColumnIds(settings.columns) }}
		>
			{(attributes) => (
				<TypedProductListQuery displayLoader variables={queryVariables}>
					{({ data, loading, refetch }) => {
						const { loadNextPage, loadPreviousPage, pageInfo } = paginate(
							maybe(() => data.products.pageInfo),
							paginationState,
							params
						)

						const handleBulkDelete = (data: productBulkDelete) => {
							if (data.productBulkDelete.errors.length === 0) {
								closeModal()
								notify({
									text: intl.formatMessage(commonMessages.savedChanges)
								})
								reset()
								refetch()
							}
						}

						const handleBulkPublish = (data: productBulkPublish) => {
							if (data.productBulkPublish.errors.length === 0) {
								closeModal()
								notify({
									text: intl.formatMessage(commonMessages.savedChanges)
								})
								reset()
								refetch()
							}
						}
						return (
							<TypedProductBulkDeleteMutation onCompleted={handleBulkDelete}>
								{(productBulkDelete, productBulkDeleteOpts) => (
									<TypedProductBulkPublishMutation
										onCompleted={handleBulkPublish}
									>
										{(productBulkPublish, productBulkPublishOpts) => (
											<>
												<PageHeader
													title={intl.formatMessage(sectionNames.products)}
												>
													<Button
														onClick={() => navigate(productAddUrl)}
														color='primary'
														variant='contained'
														data-tc='add-product'
													>
														<FormattedMessage
															{...buttonMessages.createProduct}
															description='button'
														/>
													</Button>
												</PageHeader>
												<Card>
													<FilterBar
														currentTab={parseInt(currentTab)}
														initialSearch={params.query || ''}
														onAll={onAll}
														onSearchChange={onSearchChange}
														onTabChange={onTabChange}
														onTabDelete={onTabDelete}
														onTabSave={onTabSave}
														tabs={tabs.map((tab) => tab.name)}
														allTabLabel={intl.formatMessage(
															commonMessages.allProducts
														)}
														searchPlaceholder={intl.formatMessage(
															commonMessages.searchProducts
														)}
													/>
													<ProductList
														activeAttributeSortId=''
														sort={{
															asc: params.asc,
															sort: params.sort
														}}
														onSort={onSort}
														gridAttributes={maybe(
															() =>
																attributes.data.availableInGrid.edges.map(
																	(edge) => edge.node
																),
															[]
														)}
														disabled={loading}
														products={maybe(() =>
															data.products.edges.map((edge) => edge.node)
														)}
														settings={settings}
														onNextPage={loadNextPage}
														onPreviousPage={loadPreviousPage}
														onUpdateListSettings={updateListSettings}
														pageInfo={pageInfo}
														onRowClick={(id) => () => navigate(productUrl(id))}
														toolbar={
															<>
																<Button
																	color='primary'
																	onClick={() =>
																		openModal('unpublish', {
																			ids: listElements
																		})
																	}
																>
																	<FormattedMessage
																		{...commonMessages.unpublish}
																	/>
																</Button>
																<Button
																	color='primary'
																	onClick={() =>
																		openModal('publish', {
																			ids: listElements
																		})
																	}
																>
																	<FormattedMessage
																		{...commonMessages.published}
																	/>
																</Button>
																<IconButton
																	color='primary'
																	onClick={() =>
																		openModal('delete', {
																			ids: listElements
																		})
																	}
																>
																	<DeleteIcon />
																</IconButton>
															</>
														}
														isChecked={isSelected}
														selected={listElements.length}
														toggle={toggle}
														toggleAll={toggleAll}
														onListSettingsReset={reset}
													/>
												</Card>
												<ActionDialog
													open={params.action === 'delete'}
													confirmButtonState={productBulkDeleteOpts.status}
													onClose={closeModal}
													onConfirm={() =>
														productBulkDelete({
															variables: { ids: listElements }
														})
													}
													title={intl.formatMessage(
														commonMessages.deleteProductsTitle
													)}
													variant='delete'
												>
													<DialogContentText>
														<FormattedMessage
															{...commonMessages.deleteProducts}
															values={{
																counter: maybe(() => params.ids.length),
																displayQuantity: (
																	<strong>
																		{maybe(() => params.ids.length)}
																	</strong>
																)
															}}
														/>
													</DialogContentText>
												</ActionDialog>
												<ActionDialog
													open={params.action === 'publish'}
													confirmButtonState={productBulkPublishOpts.status}
													onClose={closeModal}
													onConfirm={() =>
														productBulkPublish({
															variables: {
																ids: listElements,
																isPublished: true
															}
														})
													}
													title={intl.formatMessage(commonMessages.published)}
												>
													<DialogContentText>
														<FormattedMessage
															id='publish_this_products'
															defaultMessage='{counter,plural,one{Are you sure you want to publish this product?} other{Are you sure you want to publish {displayQuantity} products?}}'
															description='dialog content'
															values={{
																counter: maybe(() => listElements.length),
																displayQuantity: (
																	<strong>
																		{maybe(() => listElements.length)}
																	</strong>
																)
															}}
														/>
													</DialogContentText>
												</ActionDialog>
												<ActionDialog
													open={params.action === 'unpublish'}
													confirmButtonState={productBulkPublishOpts.status}
													onClose={closeModal}
													onConfirm={() =>
														productBulkPublish({
															variables: {
																ids: listElements,
																isPublished: false
															}
														})
													}
													title={intl.formatMessage(
														commonMessages.unpublishProductsTitle
													)}
												>
													<DialogContentText>
														<FormattedMessage
															id='sure_unpublish_products'
															defaultMessage='{counter,plural,one{Are you sure you want to unpublish this product?} other{Are you sure you want to unpublish {displayQuantity} products?}}'
															description='dialog content'
															values={{
																counter: maybe(() => listElements.length),
																displayQuantity: (
																	<strong>
																		{maybe(() => listElements.length)}
																	</strong>
																)
															}}
														/>
													</DialogContentText>
												</ActionDialog>
												<SaveFilterTabDialog
													open={params.action === DIALOG_ACTIONS.saveSearch}
													confirmButtonState='default'
													onClose={closeModal}
													onSubmit={handleFilterTabSave}
												/>
												<DeleteFilterTabDialog
													open={params.action === DIALOG_ACTIONS.deleteSearch}
													confirmButtonState='default'
													onClose={closeModal}
													onSubmit={handleFilterTabDelete}
													tabName={maybe(
														() => tabs[parseInt(currentTab) - 1].name,
														'...'
													)}
												/>
											</>
										)}
									</TypedProductBulkPublishMutation>
								)}
							</TypedProductBulkDeleteMutation>
						)
					}}
				</TypedProductListQuery>
			)}
		</AvailableInGridAttributesQuery>
	)
}

export default ProductListPage
