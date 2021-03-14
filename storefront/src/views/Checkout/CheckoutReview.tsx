import './scss/Checkout.scss'

import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { checkoutQuery } from '@sdk/queries/checkout'
import Button from '@material-ui/core/Button'
import { checkoutCompleteMutation } from '@sdk/mutations/checkout'
import { getOrderUrl, ordersUrl } from '@temp/app/routes'
import { Divider, Typography } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import DoneOutlineIcon from '@material-ui/icons/DoneOutline'
import { Checkout, CheckoutVariables } from '@sdk/queries/types/Checkout'
import {
	CheckoutComplete,
	CheckoutCompleteVariables
} from '@sdk/mutations/types/CheckoutComplete'
import { useSnackbar } from 'notistack'
import { CheckoutContext } from '@temp/components/CheckoutProvider/context'
import { useRouter } from 'next/router'
import { CHECKOUT_STEPS } from '@temp/core/config'
import CheckoutLayout, {
	TCheckoutStep
} from '@temp/views/Checkout/CheckoutLayout'
import { ssrMode, STOREFRONT_URL } from '@temp/constants'
import { MetaWrapper } from '@temp/components'

const CheckoutReview: React.FC = ({}) => {
	const router = useRouter()
	const matchingStepIndex = CHECKOUT_STEPS.findIndex(
		({ link }) => link === router.pathname
	)
	const activeStepIndex = matchingStepIndex !== -1 ? matchingStepIndex : 3
	const [activeStep, setActiveStep] = useState<TCheckoutStep>(
		CHECKOUT_STEPS[activeStepIndex]
	)
	useEffect(() => {
		setActiveStep(CHECKOUT_STEPS[activeStepIndex])
	}, [router.pathname])
	const { enqueueSnackbar } = useSnackbar()
	const { checkout, clearCheckout } = useContext(CheckoutContext)

	/* GRAPHQL */
	const { data: checkoutResponse } = useQuery<Checkout, CheckoutVariables>(
		checkoutQuery,
		{
			variables: { token: checkout.token },
			skip: !checkout.token
		}
	)

	const [checkoutComplete] = useMutation<
		CheckoutComplete,
		CheckoutCompleteVariables
	>(checkoutCompleteMutation)

	/* METHODS */

	const submitOrder = async (e) => {
		e.preventDefault()
		const REDIRECT_URL = `${STOREFRONT_URL}${ordersUrl.slice(1)}`
		if (checkout && checkout.paymentMethod && checkout.shippingMethod) {
			try {
				const response = await checkoutComplete({
					variables: {
						checkoutId: checkout.id,
						paymentMethodId: checkout.paymentMethod.id,
						redirectUrl: REDIRECT_URL
					}
				})
				if (response.data.checkoutComplete.checkoutErrors[0]) {
					enqueueSnackbar(
						response.data.checkoutComplete.checkoutErrors[0].message,
						{
							variant: 'error'
						}
					)
				} else {
					router
						.push(getOrderUrl(response.data.checkoutComplete.order.token))
						.then(clearCheckout)
				}
			} catch (e) {
				enqueueSnackbar(e.message, {
					variant: 'error'
				})
			}
		} else {
			enqueueSnackbar('Ошибка при создании заказа. Все данные были верны?', {
				variant: 'error'
			})
		}
	}
	if (activeStep.step > 1) {
		let lastStepLink = null
		if (activeStep.step === 2 && !checkout.address) {
			lastStepLink = CHECKOUT_STEPS[0].link
		} else if (activeStep.step === 3 && !checkout.shippingMethod) {
			lastStepLink = CHECKOUT_STEPS[1].link
		} else if (activeStep.step === 4 && !checkout.paymentMethod) {
			lastStepLink = CHECKOUT_STEPS[2].link
		}
		if (lastStepLink) {
			if (!ssrMode) {
				router.push(lastStepLink)
			}
			return null
		}
	}
	const address = checkoutResponse?.checkout.shippingAddress
	const shippingMethod = checkoutResponse?.checkout.shippingMethod
	const paymentMethod = checkout.paymentMethod

	return (
		<MetaWrapper
			meta={{
				description: 'Оформление заказа - заказ',
				title: 'Оформление заказа - заказ'
			}}
		>
			<CheckoutLayout>
				<div>
					<div className='flex items-center justify-between mb-10'>
						<Divider className='flex-1' />
						<DoneOutlineIcon className='mx-10' fontSize='small' />
						<Typography variant='h5' className='pr-10'>
							Детали заказа
						</Typography>
						<Divider className='flex-1' />
					</div>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Typography variant='subtitle1' className='pb-10 text-gray-600'>
								Адрес доставки:
							</Typography>
							<Divider />
							{address && (
								<div className='text-14 mt-10 leading-relaxed'>
									<div className='font-medium'>
										{address.firstName} {address.lastName}
									</div>
									<div>{address.city}</div>
									<div>{address.streetAddress1}</div>
									<div>{address.phone}</div>
									<div>{checkoutResponse.checkout.email}</div>
								</div>
							)}
						</Grid>
						<Grid item xs={12} sm={6}>
							<Typography variant='subtitle1' className='pb-10 text-gray-600'>
								Способ доставки:
							</Typography>
							<Divider />
							{shippingMethod && (
								<div className='text-14 mt-10 mb-30 leading-relaxed font-medium'>
									{shippingMethod.name}
								</div>
							)}
							<Typography variant='subtitle1' className='pb-10 text-gray-600'>
								Метод оплаты:
							</Typography>
							<Divider />
							{paymentMethod && (
								<div className='text-14 my-10 leading-relaxed font-medium'>
									{paymentMethod.name}
								</div>
							)}
						</Grid>
					</Grid>
					<form className='shipping-method-form'>
						<div className='form-actions mt-20 flex justify-end'>
							<Button
								type='submit'
								color='secondary'
								variant='contained'
								onClick={submitOrder}
								size='large'
							>
								Оформить заказ
							</Button>
						</div>
					</form>
				</div>
			</CheckoutLayout>
		</MetaWrapper>
	)
}

export default CheckoutReview
