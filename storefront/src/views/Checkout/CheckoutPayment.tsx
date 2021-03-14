import './scss/Checkout.scss'

import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { TCheckoutStep } from '@temp/views/Checkout/CheckoutLayout'
import Button from '@material-ui/core/Button'
import { PaymentMethod } from '@sdk/fragments/types/PaymentMethod'
import { paymentMethodsQuery } from '@sdk/queries/payment-method'
import { Divider, Typography } from '@material-ui/core'
import PaymentIcon from '@material-ui/icons/Payment'
import {
	PaymentMethods,
	PaymentMethodsVariables
} from '@sdk/queries/types/PaymentMethods'
import { useSnackbar } from 'notistack'
import { CheckoutContext } from '@temp/components/CheckoutProvider/context'
import { useRouter } from 'next/router'
import CheckoutLayout from '@temp/views/Checkout/CheckoutLayout'
import { MetaWrapper } from '@temp/components'
import { CHECKOUT_STEPS } from '@temp/core/config'
import { ssrMode } from '@temp/constants'

const CheckoutPayment: React.FC = ({}) => {
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
	const { checkout, updatePaymentMethod } = useContext(CheckoutContext)
	const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
		checkout.paymentMethod
	)

	/* GRAPHQL */
	const { data: paymentMethodsResponse } = useQuery<
		PaymentMethods,
		PaymentMethodsVariables
	>(paymentMethodsQuery, {
		variables: {
			first: 100
		},
		skip: !checkout.token
	})

	useEffect(() => {
		setSelectedMethod(checkout.paymentMethod)
	}, [checkout.paymentMethod])

	/* METHODS */
	const handleChangePaymentMethod = (method: PaymentMethod) => {
		setSelectedMethod(method)
	}

	const submitPaymentMethod = async (e) => {
		e.preventDefault()
		if (selectedMethod) {
			updatePaymentMethod(selectedMethod)
			await router.push(activeStep.nextStepLink)
		} else {
			enqueueSnackbar('Выберите метод оплаты!', {
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
				description: 'Оформление заказа - метод оплаты',
				title: 'Оформление заказа - метод оплаты'
			}}
		>
			<CheckoutLayout>
				<div>
					<div className='flex items-center justify-between mb-10'>
						<Divider className='flex-1' />
						<PaymentIcon className='mx-10' fontSize='small' />
						<Typography variant='h5' className='pr-10'>
							Методы оплаты
						</Typography>
						<Divider className='flex-1' />
					</div>
					<form className='payment-method-form'>
						{paymentMethodsResponse?.paymentMethods?.edges.map((edge, i) => {
							const method = edge.node
							return (
								<div key={i}>
									<FormControlLabel
										className='w-full'
										aria-label='Acknowledge'
										onClick={(event) => event.stopPropagation()}
										onFocus={(event) => event.stopPropagation()}
										control={
											<Checkbox
												onChange={(e) => handleChangePaymentMethod(method)}
												checked={selectedMethod?.id === method.id}
											/>
										}
										label={`${method.name}`}
									/>
									<div className='payment-method-form__description mb-20 flex flex-1'>
										{method.description}
									</div>
								</div>
							)
						})}
						<div className='form-actions mt-4 flex justify-end'>
							<Button
								type='submit'
								color='secondary'
								variant='contained'
								onClick={submitPaymentMethod}
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

export default CheckoutPayment
