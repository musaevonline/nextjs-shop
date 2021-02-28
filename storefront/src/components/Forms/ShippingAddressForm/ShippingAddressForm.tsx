import './scss/ShippingAddressForm.scss'

import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Grid from '@material-ui/core/Grid'
import { FormControl } from '@material-ui/core'
import FormTextField from '@temp/components/Forms/FormTextField'
import Button from '@material-ui/core/Button'
import { CountryCode } from '@temp/types/globalTypes'
import { Address } from '@sdk/fragments/types/Address'

const IS_REQUIRED_TEXT = 'Обязательно для заполнения'

const schema = Yup.object().shape({
	firstName: Yup.string().required(IS_REQUIRED_TEXT),
	lastName: Yup.string(),
	city: Yup.string().required(IS_REQUIRED_TEXT),
	streetAddress1: Yup.string().required(IS_REQUIRED_TEXT),
	phone: Yup.string().required(IS_REQUIRED_TEXT),
	email: Yup.string().email('E-mail не валидный').required(IS_REQUIRED_TEXT)
})
export type TCheckoutShippingAddressFormValues = {
	firstName: string
	lastName: string
	city: string
	streetAddress1: string
	country: CountryCode
	phone: string
	email: string
}

const initialValues = {
	firstName: '',
	lastName: '',
	city: '',
	streetAddress1: '',
	country: CountryCode.BY,
	phone: '',
	email: ''
}

interface ShippingAddressFormProps {
	initialAddressData: Address | null
	email: string
	submitAddress(values: TCheckoutShippingAddressFormValues): void
}

const ShippingAddressForm: React.FC<ShippingAddressFormProps> = ({
	initialAddressData,
	email,
	submitAddress
}) => {
	const form = useFormik({
		initialValues: {
			...initialValues,
			...initialAddressData,
			country: CountryCode.BY,
			email
		},
		validationSchema: schema,
		onSubmit: (values: TCheckoutShippingAddressFormValues) => {
			submitAddress(values)
		}
	})

	return (
		<div className='address-form'>
			<form onSubmit={form.handleSubmit}>
				<Grid container spacing={1}>
					<Grid item xs={12} sm={6}>
						<div className='address-form__firstName'>
							<FormControl margin='none' fullWidth>
								<FormTextField
									form={form}
									id='id_firstName'
									name='firstName'
									label='Имя*'
								/>
							</FormControl>
						</div>
					</Grid>
					<Grid item xs={12} sm={6}>
						<div className='address-form__lastName'>
							<FormControl margin='none' fullWidth>
								<FormTextField
									form={form}
									id='id_lastName'
									name='lastName'
									label='Фамилия'
								/>
							</FormControl>
						</div>
					</Grid>

					<Grid item xs={12} sm={6}>
						<div className='address-form__city'>
							<FormControl margin='none' fullWidth>
								<FormTextField
									form={form}
									id='id_city'
									name='city'
									label='Город*'
								/>
							</FormControl>
						</div>
					</Grid>
					<Grid item xs={12} sm={6}>
						<div className='address-form__streetAddress1'>
							<FormControl margin='none' fullWidth>
								<FormTextField
									form={form}
									id='id_streetAddress1'
									name='streetAddress1'
									label='Адрес*'
								/>
							</FormControl>
						</div>
					</Grid>
					<Grid item xs={12} sm={6}>
						<div className='address-form__phone'>
							<FormControl margin='none' fullWidth>
								<FormTextField
									form={form}
									id='id_phone'
									name='phone'
									label='Номер телефона*'
								/>
							</FormControl>
						</div>
					</Grid>
					<Grid item xs={12} sm={6}>
						<div className='address-form__email'>
							<FormControl margin='none' fullWidth>
								<FormTextField
									form={form}
									id='id_email'
									name='email'
									label='E-mail*'
								/>
							</FormControl>
						</div>
					</Grid>
				</Grid>
				<div className='form-actions mt-20 flex justify-end'>
					<Button
						type='submit'
						color='primary'
						variant='contained'
						size='large'
					>
						Подтвердить
					</Button>
				</div>
			</form>
		</div>
	)
}

export default ShippingAddressForm
