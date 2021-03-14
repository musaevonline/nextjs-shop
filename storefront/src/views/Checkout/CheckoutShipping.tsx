import './scss/Checkout.scss'

import React, { useContext, useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { checkoutQuery } from '@sdk/queries/checkout'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { ShippingMethod } from '@sdk/fragments/types/ShippingMethod'
import Button from '@material-ui/core/Button'
import { checkoutShippingMethodUpdateMutation } from '@sdk/mutations/checkout'
import { priceToString } from '@temp/core/utils'
import { Divider, Typography } from '@material-ui/core'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import { Checkout, CheckoutVariables } from '@sdk/queries/types/Checkout'
import {
	CheckoutShippingMethodUpdate,
	CheckoutShippingMethodUpdateVariables
} from '@sdk/mutations/types/CheckoutShippingMethodUpdate'
import { useSnackbar } from 'notistack'
import { CheckoutContext } from '@temp/components/CheckoutProvider/context'
import { useRouter } from 'next/router'
import CheckoutLayout, {
	TCheckoutStep
} from '@temp/views/Checkout/CheckoutLayout'
import { MetaWrapper } from '@temp/components'
import { CHECKOUT_STEPS } from '@temp/core/config'
import { ssrMode } from '@temp/constants'

const CheckoutShipping: React.FC = ({}) => {
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
	const { checkout, updateCheckout } = useContext(CheckoutContext)
	const [selectedMethod, setSelectedMethod] = useState<ShippingMethod | null>(
		checkout.shippingMethod
	)

	/* GRAPHQL */
	const { data: checkoutData } = useQuery<Checkout, CheckoutVariables>(
		checkoutQuery,
		{
			variables: { token: checkout.token },
			skip: !checkout.token
		}
	)
	const [checkoutShippingMethodUpdate] = useMutation<
		CheckoutShippingMethodUpdate,
		CheckoutShippingMethodUpdateVariables
	>(checkoutShippingMethodUpdateMutation)

	/* USE EFFECT */
	useEffect(() => {
		if (!selectedMethod) {
			setSelectedMethod(
				checkoutData?.checkout?.availableShippingMethods[0] || null
			)
		}
	}, [checkoutData])

	useEffect(() => {
		setSelectedMethod(checkout.shippingMethod)
	}, [checkout])

	/* METHODS */
	const handleChangeShippingMethod = (method: ShippingMethod) => {
		setSelectedMethod(method)
	}

	const submitShippingMethod = async (e) => {
		e.preventDefault()
		if (selectedMethod) {
			try {
				const response = await checkoutShippingMethodUpdate({
					variables: {
						checkoutId: checkout.id,
						shippingMethodId: selectedMethod.id
					}
				})
				if (response.data.checkoutShippingMethodUpdate.checkoutErrors[0]) {
					enqueueSnackbar(
						response.data.checkoutShippingMethodUpdate.checkoutErrors[0]
							.message,
						{
							variant: 'error'
						}
					)
				} else {
					updateCheckout(response.data.checkoutShippingMethodUpdate.checkout)
					await router.push(activeStep.nextStepLink)
				}
			} catch (e) {
				console.error(e)
				enqueueSnackbar(e.message, {
					variant: 'error'
				})
			}
		} else {
			enqueueSnackbar('Выберите способ доставки!', {
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

	return (
		<MetaWrapper
			meta={{
				description: 'Оформление заказа - способ доставки',
				title: 'Оформление заказа - способ доставки'
			}}
		>
			<CheckoutLayout>
				<div>
					<div className='flex items-center justify-between mb-10'>
						<Divider className='flex-1' />
						<LocalShippingIcon className='mx-10' fontSize='small' />
						<Typography variant='h5' className='pr-10'>
							Способы доставки
						</Typography>
						<Divider className='flex-1' />
					</div>
					<form className='shipping-method-form'>
						{checkoutData?.checkout?.availableShippingMethods?.map(
							(method, i) => {
								const isLast =
									i ===
									checkoutData.checkout.availableShippingMethods.length - 1
								return (
									<div key={i}>
										<FormControlLabel
											className='w-full'
											aria-label='Acknowledge'
											onClick={(event) => event.stopPropagation()}
											onFocus={(event) => event.stopPropagation()}
											control={
												<Checkbox
													onChange={(e) => handleChangeShippingMethod(method)}
													checked={selectedMethod?.id === method.id}
												/>
											}
											label={`${method.name} (${priceToString(method.price)})`}
										/>
										<div className='shipping-method-form__description mb-20 flex flex-1'>
											{method.description}
										</div>
										{!isLast && <Divider />}
									</div>
								)
							}
						)}
						<div className='form-actions mt-20 flex justify-end'>
							<Button
								type='submit'
								color='secondary'
								variant='contained'
								onClick={submitShippingMethod}
								size='large'
							>
								Подтвердить
							</Button>
						</div>
					</form>
				</div>
			</CheckoutLayout>
		</MetaWrapper>
	)
}

export default CheckoutShipping
