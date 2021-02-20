import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import TableRow from '@material-ui/core/TableRow'
import DeleteIcon from '@material-ui/icons/Delete'
import CardTitle from '@temp/components/CardTitle'
import Checkbox from '@temp/components/Checkbox'
import ResponsiveTable from '@temp/components/ResponsiveTable'
import Skeleton from '@temp/components/Skeleton'
import TableHead from '@temp/components/TableHead'
import TablePagination from '@temp/components/TablePagination'
import { maybe, renderCollection } from '@temp/misc'
import { ICON_BUTTON_SIZE } from '@temp/theme'
import { ListActions, ListProps } from '@temp/types'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { BlogCategoryFragment } from '../../../types/BlogCategoryFragment'
import TableCellAvatar from '@temp/components/TableCellAvatar'

export interface BlogCategoryListProps extends ListProps, ListActions {
	blogCategoryList: BlogCategoryFragment[]
	onAdd: () => void
	onRemove: (id: string) => void
}

const useStyles = makeStyles(
	(theme) => ({
		alignRight: {
			'&:last-child': {
				paddingRight: theme.spacing(1)
			},
			width: ICON_BUTTON_SIZE + theme.spacing(0.5)
		},
		colType: {
			maxWidth: 0
		},
		colName: {},
		row: {
			cursor: 'pointer'
		}
	}),
	{ name: 'BlogCategoryList' }
)

const numberOfColumns = 6

const BlogCategoryList: React.FC<BlogCategoryListProps> = (props) => {
	const {
		disabled,
		settings,
		onAdd,
		onNextPage,
		onPreviousPage,
		onRemove,
		onUpdateListSettings,
		onRowClick,
		pageInfo,
		blogCategoryList,
		isChecked,
		selected,
		toggle,
		toggleAll,
		toolbar
	} = props

	const classes = useStyles(props)
	const intl = useIntl()

	return (
		<Card>
			<CardTitle
				height='const'
				title={intl.formatMessage({
					id: 'blogCategories',
					defaultMessage: 'Blog Categories',
					description: 'sort blog category list, section header'
				})}
				toolbar={
					<Button color='primary' onClick={onAdd}>
						<FormattedMessage
							id='createBlogCategory'
							defaultMessage='Create blog category'
							description='button'
						/>
					</Button>
				}
			/>
			<ResponsiveTable>
				<colgroup>
					<col width='50' />
					<col width='50' />
					<col width='250' />
					<col width='auto' />
					<col width='100' />
					<col width='50' />
				</colgroup>
				<TableHead
					colSpan={numberOfColumns}
					selected={selected}
					disabled={disabled}
					items={blogCategoryList}
					toggleAll={toggleAll}
					toolbar={toolbar}
				>
					<TableCell />
					<TableCell className={classes.colName}>
						<FormattedMessage
							id='blogCategoryName'
							defaultMessage='Name'
							description='blog'
						/>
					</TableCell>
					<TableCell className={classes.colType}>
						<FormattedMessage id='description' defaultMessage='Description' />
					</TableCell>
					<TableCell>
						<FormattedMessage
							id='published'
							defaultMessage='Publish'
							description='blog category publish'
						/>
					</TableCell>
					<TableCell />
				</TableHead>
				<TableFooter>
					<TableRow>
						<TablePagination
							colSpan={numberOfColumns}
							settings={settings}
							hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
							onNextPage={onNextPage}
							onUpdateListSettings={onUpdateListSettings}
							hasPreviousPage={
								pageInfo && !disabled ? pageInfo.hasPreviousPage : false
							}
							onPreviousPage={onPreviousPage}
						/>
					</TableRow>
				</TableFooter>
				<TableBody>
					{renderCollection(
						blogCategoryList,
						(blogCategory) => {
							const isSelected = blogCategory
								? isChecked(blogCategory.id)
								: false

							return (
								<TableRow
									className={classes.row}
									hover={!!blogCategory}
									key={blogCategory ? blogCategory.id : 'skeleton'}
									onClick={blogCategory && onRowClick(blogCategory.id)}
									selected={isSelected}
								>
									<TableCell padding='checkbox'>
										<Checkbox
											checked={isSelected}
											disabled={disabled}
											disableClickPropagation
											onChange={() => toggle(blogCategory.id)}
										/>
									</TableCell>
									<TableCellAvatar
										className={classes.colName}
										thumbnail={maybe(() => blogCategory.thumbnail.url)}
										data-tc='name'
									/>
									<TableCell>
										{maybe<React.ReactNode>(
											() => blogCategory.name,
											<Skeleton />
										)}
									</TableCell>
									<TableCell className={`${classes.colType} truncate`}>
										<span>
											{maybe<React.ReactNode>(
												() => blogCategory.description,
												<Skeleton />
											)}
										</span>
									</TableCell>
									<TableCell>
										{maybe<React.ReactNode>(
											() => (
												<FormattedMessage
													id={
														blogCategory.isPublished ? 'published' : 'unpublish'
													}
													defaultMessage={
														blogCategory.isPublished
															? 'Published'
															: 'Unpublished'
													}
												/>
											),
											<Skeleton />
										)}
									</TableCell>
									<TableCell className={classes.alignRight}>
										<IconButton
											color='primary'
											disabled={disabled}
											onClick={(event) => {
												event.stopPropagation()
												onRemove(blogCategory.id)
											}}
										>
											<DeleteIcon />
										</IconButton>
									</TableCell>
								</TableRow>
							)
						},
						() => (
							<TableRow>
								<TableCell colSpan={numberOfColumns}>
									<FormattedMessage
										id='noBlogCategoriesFound'
										defaultMessage='No blog categories found'
									/>
								</TableCell>
							</TableRow>
						)
					)}
				</TableBody>
			</ResponsiveTable>
		</Card>
	)
}
BlogCategoryList.displayName = 'BlogCategoryList'
export default BlogCategoryList
