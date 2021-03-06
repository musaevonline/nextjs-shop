import './scss/CartItems.scss'

import React, { useContext } from 'react'
import Loader from '@temp/components/Loader'
import _ from 'lodash'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import NextLink from 'next/link'
import { getProductUrl } from '@temp/app/routes'
import { priceToString } from '@temp/core/utils'
import RemoveIcon from '@material-ui/icons/Remove'
import TextField from '@material-ui/core/TextField'
import { MAX_CHECKOUT_VARIANT_LINES } from '@temp/constants'
import AddIcon from '@material-ui/icons/Add'
import Divider from '@material-ui/core/Divider'
import { ProductVariant } from '@sdk/fragments/types/ProductVariant'
import { ProductVariants_productVariants } from '@sdk/queries/types/ProductVariants'
import { useSnackbar } from 'notistack'
import { CheckoutContext } from '@temp/components/CheckoutProvider/context'

type CartItemsProps = {
	items: ProductVariants_productVariants | null
	toggleCartDrawer?(isOpen: boolean): any
}

const CartItems: React.FC<CartItemsProps> = ({ items, toggleCartDrawer }) => {
	const { enqueueSnackbar } = useSnackbar()
	const {
		checkout,
		changeVariantQuantity,
		deleteCartLine,
		quantity
	} = useContext(CheckoutContext)

	const deleteItem = async (variantId) => {
		await deleteCartLine(variantId)
	}

	const increaseVariantQuantity = async (variant: ProductVariant) => {
		const line = checkout.cart.find((el) => el.variant === variant.id)
		await changeVariantQuantity(
			variant.id,
			validateAvailableVariantQuantity(line.quantity + 1, variant)
		)
	}
	const decreaseVariantQuantity = async (variant: ProductVariant) => {
		const line = checkout.cart.find((el) => el.variant === variant.id)
		await changeVariantQuantity(
			variant.id,
			validateAvailableVariantQuantity(line.quantity - 1, variant)
		)
	}
	const handleChangeVariantQuantity = async (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
		variant: ProductVariant
	) => {
		const val = e.target.value
		try {
			if (
				val &&
				parseInt(val) > 0 &&
				parseInt(val) <= MAX_CHECKOUT_VARIANT_LINES
			) {
				await changeVariantQuantity(
					variant.id,
					validateAvailableVariantQuantity(parseInt(val), variant)
				)
			}
		} catch (e) {
			console.error('Количество должно быть числом!!!')
		}
	}
	const validateAvailableVariantQuantity = (
		val: number,
		variant: ProductVariant
	): number => {
		const variantStockQuantity = _.sumBy(
			variant.stocks,
			(stock) => stock.stockQuantity
		)
		const newQuantity = Math.min(
			val,
			variantStockQuantity,
			MAX_CHECKOUT_VARIANT_LINES
		)
		if (newQuantity < val) {
			enqueueSnackbar(`Доступно ${variantStockQuantity}`, {
				variant: 'info'
			})
		}
		return newQuantity
	}

	const closeDialog = (e) => {
		if (toggleCartDrawer) toggleCartDrawer(false)(e)
	}

	return (
		<div className='cart flex-1 py-10'>
			{!items && quantity > 0 && <Loader absolute />}
			{quantity > 0 &&
				items?.edges.map((edge, i) => {
					const localLine = checkout.cart?.find(
						(line) => line?.variant === edge.node.id
					)
					if (!localLine) return null
					const node = edge.node
					const amount = node.price.amount * localLine.quantity
					return (
						<div key={i} className='py-10 cart__item relative'>
							<div className='cart__item-delete-icon'>
								<IconButton
									onClick={(e) => deleteItem(node.id)}
									size='small'
									color='primary'
									title='Удалить'
								>
									<CloseIcon fontSize='inherit' />
								</IconButton>
							</div>
							<div className='pb-10 flex flex-wrap'>
								<div className='mr-10'>
									<img
										className='rounded-sm border border-solid border-gray-300'
										src={node.product.thumbnail.url}
										alt={node.name}
									/>
								</div>
								<div className='flex-1'>
									<div className='cart__item-name'>
										<NextLink
											href={getProductUrl(node.product.slug, node.product.id)}
											passHref
										>
											<Typography
												variant='button'
												component={'a'}
												onClick={closeDialog}
											>
												{node.product.name}
											</Typography>
										</NextLink>
									</div>
									<div className='cart__item-variant-name'>
										<Typography variant='subtitle2' color='textSecondary'>
											Вариант: {node.name}
										</Typography>
									</div>
									<div className='cart__item-price'>
										<Typography variant='subtitle2' color='textSecondary'>
											Сумма:{' '}
											{priceToString({
												amount,
												currency: node.price.currency
											})}
										</Typography>
									</div>
									<div className='cart__item-quantity'>
										<span className='mr-6'>Кол-во:</span>
										<span className='flex'>
											<IconButton
												size='small'
												color='primary'
												disabled={localLine.quantity === 1}
												onClick={(e) => decreaseVariantQuantity(node)}
											>
												<RemoveIcon />
											</IconButton>
											<TextField
												id='id_quantity'
												name='quantity'
												size='small'
												value={localLine.quantity}
												onChange={(e) => handleChangeVariantQuantity(e, node)}
												inputProps={{
													min: 1,
													max: 10000,
													step: 1
												}}
												type='number'
											/>
											<IconButton
												size='small'
												color='primary'
												disabled={
													localLine.quantity >= MAX_CHECKOUT_VARIANT_LINES
												}
												onClick={(e) => increaseVariantQuantity(node)}
											>
												<AddIcon />
											</IconButton>
										</span>
									</div>
								</div>
							</div>
							<Divider light />
						</div>
					)
				})}
			{quantity === 0 && (
				<div className='mt-20'>
					<Typography variant='h6'>Корзина пустая</Typography>
					<div className='cart__subtitle mt-2'>
						Вы ничего не добавили в свою корзину. Мы уверены, что вы найдете
						что-то в нашем магазине
					</div>
				</div>
			)}
		</div>
	)
}

export default CartItems
