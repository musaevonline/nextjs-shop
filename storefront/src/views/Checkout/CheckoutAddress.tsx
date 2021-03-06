import React, { useContext, useEffect, useState } from 'react'
import { ShippingAddressForm } from '@temp/components/Forms/ShippingAddressForm'
import { TCheckoutStep } from '@temp/views/Checkout/CheckoutLayout'
import { useMutation } from '@apollo/client'
import ContactsIcon from '@material-ui/icons/Contacts'
import {
	checkoutAddressUpdateMutation,
	checkoutCreateMutation,
	checkoutEmailUpdateMutation
} from '@sdk/mutations/checkout'
import { TCheckoutShippingAddressFormValues } from '@temp/components/Forms/ShippingAddressForm/ShippingAddressForm'
import { Typography } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import {
	CheckoutCreate,
	CheckoutCreateVariables
} from '@sdk/mutations/types/CheckoutCreate'
import {
	CheckoutAddressUpdate,
	CheckoutAddressUpdateVariables
} from '@sdk/mutations/types/CheckoutAddressUpdate'
import {
	CheckoutEmailUpdate,
	CheckoutEmailUpdateVariables
} from '@sdk/mutations/types/CheckoutEmailUpdate'
import { useSnackbar } from 'notistack'
import { UserContext } from '@temp/components/User/context'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { Address } from '@sdk/fragments/types/Address'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { CountryCode } from '@temp/types/globalTypes'
import { CheckoutContext } from '@temp/components/CheckoutProvider/context'
import { useRouter } from 'next/router'
import CheckoutLayout from '@temp/views/Checkout/CheckoutLayout'
import { MetaWrapper } from '@temp/components'
import { CHECKOUT_STEPS } from '@temp/core/config'
import { ssrMode } from '@temp/constants'

const useStyles = makeStyles((theme) => ({
	address: {
		color: theme.palette.grey['500'],
		fontSize: 13,
		marginLeft: 30,
		padding: 10,
		background: '#f8f8f8',
		borderLeft: '4px solid #c2c2c2',
		borderRadius: 5
	}
}))

const CheckoutAddress: React.FC = ({}) => {
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
	const classes = useStyles()
	const { enqueueSnackbar } = useSnackbar()
	const user = useContext(UserContext)
	const { checkout, resetCheckout, updateCheckout } = useContext(
		CheckoutContext
	)

	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null)

	const [checkoutCreate] = useMutation<CheckoutCreate, CheckoutCreateVariables>(
		checkoutCreateMutation
	)
	const [checkoutAddressUpdate] = useMutation<
		CheckoutAddressUpdate,
		CheckoutAddressUpdateVariables
	>(checkoutAddressUpdateMutation)
	const [checkoutEmailUpdate] = useMutation<
		CheckoutEmailUpdate,
		CheckoutEmailUpdateVariables
	>(checkoutEmailUpdateMutation)

	/* METHODS */
	const handleChangeAddress = (address: Address) => {
		setSelectedAddress(address)
	}

	const createCheckoutSubmit = async (
		values: TCheckoutShippingAddressFormValues
	) => {
		try {
			const response = await checkoutCreate({
				variables: {
					input: {
						email: values.email,
						shippingAddress: {
							firstName: values.firstName,
							lastName: values.lastName,
							country: values.country,
							city: values.city,
							streetAddress1: values.streetAddress1,
							phone: values.phone
						},
						lines: checkout.cart.map((line) => ({
							quantity: line.quantity,
							variantId: line.variant
						}))
					}
				}
			})
			const errors = response.data.checkoutCreate.checkoutErrors
			if (!errors?.length) {
				updateCheckout(response.data.checkoutCreate.checkout)
				await router.push(activeStep.nextStepLink)
			} else {
				enqueueSnackbar(errors[0].message, {
					variant: 'error'
				})
				resetCheckout()
			}
		} catch (e) {
			enqueueSnackbar(e.message, {
				variant: 'error'
			})
			resetCheckout()
		}
	}
	const updateAddressCheckoutSubmit = async (
		values: TCheckoutShippingAddressFormValues
	) => {
		try {
			const responseEmailUpdate = await checkoutEmailUpdate({
				variables: {
					checkoutId: checkout.id,
					email: values.email
				}
			})
			const response = await checkoutAddressUpdate({
				variables: {
					checkoutId: checkout.id,
					shippingAddress: {
						firstName: values.firstName,
						lastName: values.lastName,
						country: values.country,
						city: values.city,
						streetAddress1: values.streetAddress1,
						phone: values.phone
					}
				}
			})
			const errors = [
				...response.data.checkoutShippingAddressUpdate.checkoutErrors,
				...responseEmailUpdate.data.checkoutEmailUpdate.checkoutErrors
			]
			if (!errors?.length) {
				updateCheckout(
					response.data.checkoutShippingAddressUpdate.checkout,
					responseEmailUpdate.data.checkoutEmailUpdate.checkout.email
				)
				await router.push(activeStep.nextStepLink)
			} else {
				enqueueSnackbar(errors[0].message, {
					variant: 'error'
				})
				resetCheckout()
			}
		} catch (e) {
			enqueueSnackbar(e.message, {
				variant: 'error'
			})
			resetCheckout()
		}
	}

	const submitAddress = async (values: TCheckoutShippingAddressFormValues) => {
		if (!checkout.id) {
			await createCheckoutSubmit(values)
		} else {
			await updateAddressCheckoutSubmit(values)
		}
	}
	const submitUserAddress = async (e) => {
		if (selectedAddress) {
			await submitAddress({
				firstName: selectedAddress.firstName,
				lastName: selectedAddress.lastName,
				city: selectedAddress.city,
				country: CountryCode.BY,
				email: user.user.email,
				phone: selectedAddress.phone,
				streetAddress1: selectedAddress.streetAddress1
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
				description: 'Оформление заказа - адрес',
				title: 'Оформление заказа - адрес'
			}}
		>
			<CheckoutLayout>
				<div>
					<div className='flex items-center justify-between mb-10'>
						<Divider className='flex-1' />
						<ContactsIcon className='mx-10' fontSize='small' />
						<Typography variant='h5' className='pr-10'>
							Контактные данные
						</Typography>
						<Divider className='flex-1' />
					</div>
					{!user.loading && (
						<>
							{user.user?.addresses.length > 0 && (
								<>
									{user.user.addresses.map((address, i) => {
										const isLast = i === user.user.addresses.length - 1
										return (
											<div key={address.id}>
												<FormControlLabel
													className='w-full'
													aria-label='Acknowledge'
													onClick={(event) => event.stopPropagation()}
													onFocus={(event) => event.stopPropagation()}
													control={
														<Checkbox
															onChange={(e) => handleChangeAddress(address)}
															checked={selectedAddress?.id === address.id}
														/>
													}
													label={`${address.firstName} ${address.lastName}`}
												/>
												<div className={classes.address}>
													<p>{address.city}</p>
													<p>{address.streetAddress1}</p>
													<p>{address.companyName}</p>
													<p>{address.phone}</p>
												</div>
												{!isLast && <Divider />}
											</div>
										)
									})}
									<div className='mt-20 flex justify-end w-full'>
										<Button
											type='submit'
											color='secondary'
											variant='contained'
											disabled={!selectedAddress}
											onClick={submitUserAddress}
											size='large'
										>
											Подтвердить
										</Button>
									</div>
								</>
							)}
							{!user.user?.addresses.length && (
								<ShippingAddressForm
									initialAddressData={checkout.address}
									submitAddress={submitAddress}
									email={checkout.email}
								/>
							)}
						</>
					)}
				</div>
			</CheckoutLayout>
		</MetaWrapper>
	)
}

export default CheckoutAddress
