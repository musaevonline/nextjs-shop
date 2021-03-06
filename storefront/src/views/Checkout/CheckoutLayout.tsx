import './scss/Checkout.scss'

import React, { useContext, useEffect, useState } from 'react'
import Loader from '@temp/components/Loader'
import { Container } from '@material-ui/core'
import { CHECKOUT_STEPS, CheckoutStep } from '@temp/core/config'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepButton from '@material-ui/core/StepButton'
import { baseUrl } from '@temp/app/routes'
import Grid from '@material-ui/core/Grid'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import { CartItems } from '@temp/components/CartItems'
import { useQuery } from '@apollo/client'
import { productVariantsQuery } from '@sdk/queries/product-variant'
import Typography from '@material-ui/core/Typography'
import { priceToString } from '@temp/core/utils'
import Divider from '@material-ui/core/Divider'
import {
	ProductVariants,
	ProductVariantsVariables
} from '@sdk/queries/types/ProductVariants'
import { CheckoutContext } from '@temp/components/CheckoutProvider/context'
import { useRouter } from 'next/router'
import { ssrMode } from '@temp/constants'
import NextLink from 'next/link'

export type TCheckoutStep = {
	index: number
	link: string
	name: string
	nextActionName: string
	nextStepLink: string
	step: CheckoutStep
}

const useStyles = makeStyles((theme) => ({
	stepperRoot: {
		padding: 0
	}
}))

const CheckoutLayout: React.FC = ({ children }) => {
	const classes = useStyles()
	const [loading] = useState(false)
	const router = useRouter()
	const {
		checkout,
		calculateCheckoutTotal,
		quantity,
		getLastCompletedStep
	} = useContext(CheckoutContext)

	const [sumPrice, setSumPrice] = useState({ amount: 0, currency: 'BYN' })

	const { data: productVariantsData } = useQuery<
		ProductVariants,
		ProductVariantsVariables
	>(productVariantsQuery, {
		variables: { first: 100, ids: checkout.cart.map((line) => line.variant) }
	})

	useEffect(() => {
		setSumPrice((prev) => ({
			...prev,
			amount: calculateCheckoutTotal(productVariantsData?.productVariants)
		}))
	}, [productVariantsData, checkout])

	const isStepComplete = (step: TCheckoutStep) => {
		switch (step.step) {
			case CheckoutStep.Address:
				return !!checkout.address
			case CheckoutStep.Shipping:
				return !!checkout.shippingMethod
			case CheckoutStep.Payment:
				return !!checkout.paymentMethod
			case CheckoutStep.Review:
				return false
			default:
				return false
		}
	}

	if (!quantity) {
		if (!ssrMode) {
			router.push(baseUrl)
		}
		return null
	}
	const lastStepCompleted = getLastCompletedStep()

	return (
		<div className='checkout-page'>
			<Container maxWidth='lg'>
				{loading && <Loader full={true} />}
				<div className='mt-20 mb-10'>
					<Breadcrumbs separator='/' aria-label='breadcrumb'>
						<NextLink href={baseUrl} passHref>
							<a color='inherit'>Главная</a>
						</NextLink>
						<span>Оформление заказа</span>
					</Breadcrumbs>
				</div>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={7}>
						<div className='sticky top-0'>
							<div className='mb-10'>
								<Card>
									<CardContent>
										<Stepper
											alternativeLabel
											nonLinear
											classes={{ root: classes.stepperRoot }}
											activeStep={lastStepCompleted}
										>
											{CHECKOUT_STEPS.map((step, index) => {
												const stepProps: { completed?: boolean } = {}
												const buttonProps: { optional?: React.ReactNode } = {}
												return (
													<Step key={step.step} {...stepProps}>
														<StepButton
															completed={isStepComplete(step)}
															onClick={async () => {
																await router.push(step.link)
															}}
															{...buttonProps}
														>
															{step.name}
														</StepButton>
													</Step>
												)
											})}
										</Stepper>
									</CardContent>
								</Card>
							</div>
							<div className='mt-10'>
								<Card>
									<CardContent>{children}</CardContent>
								</Card>
							</div>
						</div>
					</Grid>
					<Grid item xs={12} sm={12} md={5}>
						<div className='sticky top-0'>
							<Card>
								<CardContent>
									<Typography variant='h5'>Ваши товары:</Typography>
									<CartItems items={productVariantsData?.productVariants} />
									{checkout.shippingMethod && (
										<>
											<Typography
												variant='subtitle1'
												className='flex justify-between'
											>
												<span>Сумма заказа::</span>
												<span>{priceToString(sumPrice)}</span>
											</Typography>
											<Typography
												variant='subtitle1'
												className='flex justify-between pb-5'
											>
												<span>Доставка:</span>
												<span>
													{priceToString(checkout.shippingMethod.price)}
												</span>
											</Typography>
											<Divider />
										</>
									)}
									{sumPrice.amount > 0 && (
										<Typography
											variant='h6'
											color='primary'
											className='cart-panel__footer-total mt-5 pb-10 font-medium'
										>
											<span>ИТОГО:</span>
											<span>
												{priceToString({
													...sumPrice,
													amount:
														sumPrice.amount +
														(checkout.shippingMethod?.price.amount || 0)
												})}
											</span>
										</Typography>
									)}
								</CardContent>
							</Card>
						</div>
					</Grid>
				</Grid>
			</Container>
		</div>
	)
}

export default CheckoutLayout
