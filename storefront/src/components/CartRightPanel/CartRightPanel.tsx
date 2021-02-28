import './scss/CartRightPanel.scss'

import React, { useContext, useEffect, useState } from 'react'
import _ from 'lodash'
import { SwipeableDrawer } from '@material-ui/core'
import { Scrollbars } from 'react-custom-scrollbars'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import { checkoutUrl } from '@temp/app/routes'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroller'
import { useQuery } from '@apollo/client'
import { productVariantsQuery } from '@sdk/queries/product-variant'
import Loader from '@temp/components/Loader'
import { priceToString } from '@temp/core/utils'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { CartItems } from '@temp/components/CartItems'
import {
	ProductVariants,
	ProductVariantsVariables
} from '@sdk/queries/types/ProductVariants'
import { CheckoutContext } from '@temp/components/CheckoutProvider/context'
import { makeStyles } from '@material-ui/core/styles'

const PAGINATE_BY = 100

const useStyles = makeStyles((theme) => ({
	drawer: {
		maxWidth: 'calc(100% - 20px)'
	}
}))

const CartRightPanel: React.FC<{
	isOpen: boolean
	toggleCartDrawer(isOpen: boolean): any
}> = ({ isOpen, toggleCartDrawer }) => {
	const classes = useStyles()
	const [sumPrice, setSumPrice] = useState({ amount: 0, currency: 'BYN' })
	const { checkout, calculateCheckoutTotal, quantity } = useContext(
		CheckoutContext
	)
	const { data: productVariantsData, fetchMore } = useQuery<
		ProductVariants,
		ProductVariantsVariables
	>(productVariantsQuery, {
		variables: {
			first: PAGINATE_BY,
			ids: checkout.cart.map((line) => line.variant)
		},
		skip: !isOpen || checkout.cart.length == 0
	})

	useEffect(() => {
		setSumPrice((prev) => ({
			...prev,
			amount: calculateCheckoutTotal(productVariantsData?.productVariants)
		}))
	}, [productVariantsData, checkout.cart])
	const loadFunc = async () => {
		await fetchMore({
			variables: {
				first: PAGINATE_BY,
				after: productVariantsData.productVariants.pageInfo.endCursor
			},
			updateQuery: (previousResult, { fetchMoreResult = {} }) => {
				if (!previousResult) {
					return fetchMoreResult
				}
				const copy = _.cloneDeep(previousResult)
				return {
					productVariants: {
						...copy.productVariants,
						edges: [
							...copy.productVariants.edges,
							...fetchMoreResult.productVariants.edges
						],
						pageInfo: fetchMoreResult.productVariants.pageInfo
					}
				}
			}
		})
	}

	return (
		<div className='cart-panel'>
			<SwipeableDrawer
				anchor={'right'}
				open={isOpen}
				swipeAreaWidth={0}
				onClose={toggleCartDrawer(false)}
				onOpen={toggleCartDrawer(true)}
				classes={{ paper: classes.drawer }}
			>
				<div className='cart-panel__body'>
					<div className='cart-panel__header'>
						<div className='cart-panel__header-title'>
							Корзина{' '}
							<span>
								({quantity} товар{quantity > 1 && quantity < 5 ? 'а' : 'ов'})
							</span>
						</div>
						<div className='cart-panel__header-close-icon'>
							<IconButton onClick={toggleCartDrawer(false)} size='medium'>
								<CloseIcon fontSize='inherit' />
							</IconButton>
						</div>
					</div>
					<Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
						<InfiniteScroll
							pageStart={0}
							loadMore={loadFunc}
							hasMore={
								productVariantsData?.productVariants.pageInfo.hasNextPage
							}
							loader={<Loader key={0} />}
							useWindow={false}
						>
							<CartItems
								items={productVariantsData?.productVariants}
								toggleCartDrawer={toggleCartDrawer}
							/>
						</InfiniteScroll>
					</Scrollbars>
					<div className='cart-panel__footer'>
						{quantity > 0 ? (
							<>
								{sumPrice.amount > 0 && (
									<Typography
										variant='h6'
										className='cart-panel__footer-total pb-10'
									>
										<span>ИТОГО:</span>
										<span>{priceToString(sumPrice)}</span>
									</Typography>
								)}
								<Button
									type='button'
									component={Link}
									className='cart-panel__footer-btn mb-5'
									to={checkoutUrl}
									onClick={toggleCartDrawer(false)}
									color='primary'
									variant='contained'
									fullWidth
								>
									Оформить заказ
								</Button>
							</>
						) : (
							<Button
								type='button'
								component={Link}
								className='cart-panel__footer-btn mb-5'
								to='#'
								onClick={toggleCartDrawer(false)}
								color='primary'
								variant='contained'
								fullWidth
							>
								Продолжить покупки
							</Button>
						)}
					</div>
				</div>
			</SwipeableDrawer>
		</div>
	)
}

export default CartRightPanel
