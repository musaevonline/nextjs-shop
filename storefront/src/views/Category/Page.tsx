import React, { useState } from 'react'

import { Container, useTheme } from '@material-ui/core'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import NextLink from 'next/link'
import { baseUrl, getCategoryUrl } from '@temp/app/routes'
import { TUrlQuery } from '@temp/views/Category/View'
import { ProductsFilter } from '@temp/components/ProductsFilter'
import Card from '@material-ui/core/Card'
import { ProductsCardDetails_products } from '@sdk/queries/types/ProductsCardDetails'
import { Attributes_attributes } from '@sdk/queries/types/Attributes'
import { Category_category } from '@sdk/queries/types/Category'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import HomeIcon from '@material-ui/icons/Home'
import { ProductCard } from '@temp/components/ProductCard'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import SwapVertIcon from '@material-ui/icons/SwapVert'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import Popper from '@material-ui/core/Popper'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import MenuList from '@material-ui/core/MenuList'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import CheckIcon from '@material-ui/icons/Check'
import { BsFilter, BsGrid3X3Gap, BsListUl } from 'react-icons/bs'
import LinearProgress from '@material-ui/core/LinearProgress'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Divider from '@material-ui/core/Divider'
import { CategoryCard } from '@temp/components/CategoryCard'

const useStyles = makeStyles((theme) => ({
	filterBtn: {
		[theme.breakpoints.up('md')]: {
			display: 'none'
		},
		[theme.breakpoints.down('xs')]: {
			'& .MuiButton-startIcon': {
				marginRight: 0
			}
		}
	},
	sortByBtn: {
		[theme.breakpoints.down('xs')]: {
			'& .MuiButton-startIcon': {
				marginRight: 0
			}
		}
	}
}))

export enum PRODUCTS_SORT_BY_ENUM {
	DATE = 'most_recent',
	ORDER_COUNT = 'most_popular',
	BY_NAME = 'by_name'
}

const getSortByLabel = (sortBy: PRODUCTS_SORT_BY_ENUM | string): string => {
	switch (sortBy) {
		case PRODUCTS_SORT_BY_ENUM.ORDER_COUNT:
			return 'По рейтингу'
		case PRODUCTS_SORT_BY_ENUM.DATE:
			return 'Новинки'
		case PRODUCTS_SORT_BY_ENUM.BY_NAME:
			return 'По названию'
		default:
			return 'Новинки'
	}
}

const Page: React.FC<{
	products: ProductsCardDetails_products
	category: Category_category
	attributes: Attributes_attributes | null
	loadMore(): Promise<void>
	filters: TUrlQuery
	setFilters(values: TUrlQuery): void
	loading: boolean
}> = ({
	products,
	category,
	attributes,
	loadMore,
	filters,
	setFilters,
	loading
}) => {
	const classes = useStyles()
	const theme = useTheme()
	const sm = useMediaQuery(theme.breakpoints.down('sm'))
	const xsDown = useMediaQuery(theme.breakpoints.down('xs'))
	const smUp = useMediaQuery(theme.breakpoints.up('sm'))
	const mdUp = useMediaQuery(theme.breakpoints.up('md'))
	const [anchorElSort, setAnchorElSort] = useState<HTMLButtonElement | null>(
		null
	)
	const [isOpenFilterDrawer, setOpenFilterDrawer] = useState(false)
	const handleChangeSortBy = (key: PRODUCTS_SORT_BY_ENUM | string) => (e) => {
		setFilters({ sortBy: key as PRODUCTS_SORT_BY_ENUM })
		setAnchorElSort(null)
	}
	const showCategories = !!category?.children?.edges.length
	return (
		<div className='category-page'>
			<Container maxWidth='lg' disableGutters={sm}>
				<div className='my-10 px-10 md:px-0'>
					<Breadcrumbs separator='/' aria-label='breadcrumb'>
						<NextLink href={baseUrl} passHref>
							<a className='flex items-center' color='inherit'>
								<HomeIcon fontSize='small' />
							</a>
						</NextLink>
						{category.parent?.parent && (
							<NextLink
								href={getCategoryUrl(
									category.parent.parent.slug,
									category.parent.parent.id
								)}
								passHref
							>
								<a className='flex items-center' color='inherit'>
									{category.parent.parent.name}
								</a>
							</NextLink>
						)}
						{category.parent && (
							<NextLink
								href={getCategoryUrl(category.parent.slug, category.parent.id)}
								passHref
							>
								<a className='flex items-center' color='inherit'>
									{category.parent.name}
								</a>
							</NextLink>
						)}

						<span>{category.name}</span>
					</Breadcrumbs>
				</div>
				<div className='mb-10 px-10 md:px-0'>
					<Typography variant='h2'>{category.name}</Typography>
				</div>
				{showCategories && (
					<div className='py-20 mb-20'>
						<div>
							<Typography variant='h3' paragraph>
								Подкатегории
							</Typography>
							{category.children.edges.map(({ node }, idx) => {
								return (
									<div
										key={idx}
										className='float-none inline-block xs:w-full sm:w-1/2 md:w-1/4 lg:w-1/5'
									>
										<CategoryCard category={node} />
									</div>
								)
							})}
						</div>
					</div>
				)}
				<div className='inline-block w-full'>
					{!sm && (
						<div className='xs:w-full sm:w-1/2 md:w-1/4 lg:w-1/5 pr-20 float-left clear-both'>
							<ProductsFilter
								initialCollapsed={true}
								attributes={attributes}
								filters={filters}
								setFilters={setFilters}
							/>
						</div>
					)}
					<div className='float-none inline-block xs:w-full sm:w-full md:w-3/4 lg:w-4/5'>
						<LinearProgress
							color='secondary'
							className={!loading ? 'opacity-0' : ''}
							variant='indeterminate'
						/>
						<Card>
							<div className='p-20 flex justify-end items-center'>
								<div className='flex w-full xs:justify-between md:justify-end items-center'>
									<Button
										variant='outlined'
										className={classes.filterBtn}
										onClick={(e) => setOpenFilterDrawer(true)}
										size='medium'
									>
										<BsFilter className='text-2xl' />
									</Button>
									<div className='flex justify-end items-center'>
										{products && !xsDown && (
											<span className='mr-10 font-semibold'>
												Найдено: {products.totalCount}
											</span>
										)}
										<div className='relative mr-20'>
											<Button
												variant='outlined'
												className={classes.sortByBtn}
												startIcon={<SwapVertIcon />}
												endIcon={<ArrowDropDownIcon />}
												size='medium'
												onClick={(e) => setAnchorElSort(e.currentTarget)}
											>
												<span className='normal-case sm:block xs:hidden leading-5'>
													<span>{getSortByLabel(filters.sortBy)} </span>
												</span>
											</Button>
											<Popper
												open={Boolean(anchorElSort)}
												anchorEl={anchorElSort}
												className='w-full z-10 min-w-224'
												style={{ width: 174 }}
												role={undefined}
												transition
											>
												<ClickAwayListener
													onClickAway={(e) => setAnchorElSort(null)}
												>
													<Paper>
														<MenuList autoFocusItem={Boolean(anchorElSort)}>
															{Object.values(PRODUCTS_SORT_BY_ENUM).map(
																(el, i) => {
																	return (
																		<MenuItem
																			key={i}
																			onClick={handleChangeSortBy(el)}
																		>
																			<span className='flex-1'>
																				{getSortByLabel(el)}
																			</span>
																			{(filters.sortBy ||
																				PRODUCTS_SORT_BY_ENUM.DATE) === el && (
																				<CheckIcon fontSize='small' />
																			)}
																		</MenuItem>
																	)
																}
															)}
														</MenuList>
													</Paper>
												</ClickAwayListener>
											</Popper>
										</div>

										<ButtonGroup variant='outlined' size='medium'>
											<Button
												variant='contained'
												title='Плитка'
												color='secondary'
											>
												<BsGrid3X3Gap className='text-2xl' />
											</Button>
											<Button title='Список'>
												<BsListUl className='text-2xl' />
											</Button>
										</ButtonGroup>
									</div>
								</div>
							</div>
							{products && (
								<div className='text-center'>
									<Divider />
									{!smUp && (
										<div className='py-10 font-semibold'>
											Найдено: {products.totalCount}
										</div>
									)}
								</div>
							)}
						</Card>
					</div>

					{!loading && !products?.edges.length && (
						<Card>
							<div className='p-20'>
								<Typography variant='h3' className='text-center'>
									Список товаров пуст
								</Typography>
							</div>
						</Card>
					)}
					{products?.edges.map((item, i) => {
						return (
							<div
								key={i}
								className='float-none inline-block xs:w-full sm:w-1/2 md:w-1/4 lg:w-1/5'
							>
								<ProductCard item={item.node} />
							</div>
						)
					})}
					{products?.pageInfo.hasNextPage && (
						<div className='my-20 flex justify-center'>
							<div className='w-full sm:w-512 max-w-full'>
								<Button
									variant='contained'
									color='secondary'
									onClick={loadMore}
									size='large'
									fullWidth
									disabled={loading}
								>
									Показать еще
								</Button>
							</div>
						</div>
					)}
				</div>
			</Container>
			{!mdUp && (
				<SwipeableDrawer
					open={isOpenFilterDrawer}
					elevation={0}
					anchor='bottom'
					onClose={(e) => setOpenFilterDrawer(false)}
					onOpen={(e) => setOpenFilterDrawer(true)}
				>
					<div>
						<div className='flex items-center justify-between py-10 pl-20 pr-10'>
							<Typography variant='h5'>Фильтры</Typography>
							<IconButton
								color='inherit'
								aria-label='open drawer'
								size='small'
								edge='start'
								title='Закрыть'
								onClick={(e) => setOpenFilterDrawer(false)}
							>
								<CloseIcon />
							</IconButton>
						</div>
						<Divider />
					</div>

					<div className='px-30 pt-10 flex-1 overflow-auto'>
						<ProductsFilter
							attributes={attributes}
							filters={filters}
							setFilters={setFilters}
						/>
					</div>
					<div className='p-10'>
						<Divider />
						<div className='mb-10' />
						<Button
							color='secondary'
							variant='contained'
							onClick={(e) => setOpenFilterDrawer(false)}
							fullWidth
						>
							Показать
						</Button>
					</div>
				</SwipeableDrawer>
			)}
		</div>
	)
}

export default Page
