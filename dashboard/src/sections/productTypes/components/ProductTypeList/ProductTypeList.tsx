import { makeStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import Checkbox from '@temp/components/Checkbox'
import ResponsiveTable from '@temp/components/ResponsiveTable'
import Skeleton from '@temp/components/Skeleton'
import TableCellHeader from '@temp/components/TableCellHeader'
import TableHead from '@temp/components/TableHead'
import TablePagination from '@temp/components/TablePagination'
import { ProductTypeListUrlSortField } from '@temp/sections/productTypes/urls'
import { getArrowDirection } from '@temp/utils/sort'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { maybe, renderCollection } from '@temp/misc'
import { ListActions, ListProps, SortPage } from '@temp/types'
import { ProductTypeList_productTypes_edges_node } from '../../types/ProductTypeList'

const useStyles = makeStyles(
	(theme) => ({
		[theme.breakpoints.up('lg')]: {
			colName: {},
			colTax: {
				width: 300,
			},
			colType: {
				width: 300,
			},
		},
		colName: {
			paddingLeft: 0,
		},
		colTax: {},
		colType: {},
		link: {
			cursor: 'pointer',
		},
	}),
	{ name: 'ProductTypeList' }
)

interface ProductTypeListProps
	extends ListProps,
		ListActions,
		SortPage<ProductTypeListUrlSortField> {
	productTypes: ProductTypeList_productTypes_edges_node[]
}

const numberOfColumns = 4

const ProductTypeList: React.FC<ProductTypeListProps> = (props) => {
	const {
		disabled,
		productTypes,
		pageInfo,
		onNextPage,
		onPreviousPage,
		onRowClick,
		onSort,
		isChecked,
		selected,
		sort,
		toggle,
		toggleAll,
		toolbar,
	} = props
	const classes = useStyles(props)

	const intl = useIntl()

	return (
		<ResponsiveTable>
			<TableHead
				colSpan={numberOfColumns}
				selected={selected}
				disabled={disabled}
				items={productTypes}
				toggleAll={toggleAll}
				toolbar={toolbar}
			>
				<TableCellHeader
					direction={
						sort.sort === ProductTypeListUrlSortField.name
							? getArrowDirection(sort.asc)
							: undefined
					}
					arrowPosition='right'
					onClick={() => onSort(ProductTypeListUrlSortField.name)}
					className={classes.colName}
				>
					<FormattedMessage
						id='type_name'
						defaultMessage='Type Name'
						description='product type name'
					/>
				</TableCellHeader>
				<TableCellHeader
					direction={
						sort.sort === ProductTypeListUrlSortField.digital
							? getArrowDirection(sort.asc)
							: undefined
					}
					onClick={() => onSort(ProductTypeListUrlSortField.digital)}
					className={classes.colType}
				>
					<FormattedMessage
						id='type'
						defaultMessage='Type'
						description='product type is either simple or configurable'
					/>
				</TableCellHeader>
			</TableHead>
			<TableFooter>
				<TableRow>
					<TablePagination
						colSpan={numberOfColumns}
						hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
						onNextPage={onNextPage}
						hasPreviousPage={
							pageInfo && !disabled ? pageInfo.hasPreviousPage : false
						}
						onPreviousPage={onPreviousPage}
					/>
				</TableRow>
			</TableFooter>
			<TableBody>
				{renderCollection(
					productTypes,
					(productType) => {
						const isSelected = productType ? isChecked(productType.id) : false
						return (
							<TableRow
								className={!!productType ? classes.link : undefined}
								hover={!!productType}
								key={productType ? productType.id : 'skeleton'}
								onClick={productType ? onRowClick(productType.id) : undefined}
								selected={isSelected}
								data-tc='id'
								data-tc-id={maybe(() => productType.id)}
							>
								<TableCell padding='checkbox'>
									<Checkbox
										checked={isSelected}
										disabled={disabled}
										disableClickPropagation
										onChange={() => toggle(productType.id)}
									/>
								</TableCell>
								<TableCell className={classes.colName}>
									{productType ? (
										<>
											<span data-tc='name'>{productType.name}</span>
											<Typography variant='caption' component='div'>
												{maybe(() => productType.hasVariants)
													? intl.formatMessage({
															id: 'configurable',
															defaultMessage: 'Configurable',
															description: 'product type',
													  })
													: intl.formatMessage({
															id: 'simple_product',
															defaultMessage: 'Simple product',
															description: 'product type',
													  })}
											</Typography>
										</>
									) : (
										<Skeleton />
									)}
								</TableCell>
								<TableCell className={classes.colType}>
									{maybe(() => productType.isShippingRequired) !== undefined ? (
										productType.isShippingRequired ? (
											<>
												<FormattedMessage
													id='physical'
													defaultMessage='Physical'
													description='product type'
												/>
											</>
										) : (
											<>
												<FormattedMessage
													id='digital'
													defaultMessage='Digital'
													description='product type'
												/>
											</>
										)
									) : (
										<Skeleton />
									)}
								</TableCell>
							</TableRow>
						)
					},
					() => (
						<TableRow>
							<TableCell colSpan={numberOfColumns}>
								<FormattedMessage
									id='no_product_types_found'
									defaultMessage='No product types found'
								/>
							</TableCell>
						</TableRow>
					)
				)}
			</TableBody>
		</ResponsiveTable>
	)
}
ProductTypeList.displayName = 'ProductTypeList'
export default ProductTypeList
