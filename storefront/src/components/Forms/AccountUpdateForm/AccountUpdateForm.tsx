import React, { useEffect } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Alert } from '@material-ui/lab'
import { AccountUpdate_accountUpdate_accountErrors } from '@sdk/mutations/types/AccountUpdate'

const IS_REQUIRED_TEXT = 'Обязательно для заполнения'

export type AccountUpdateFormData = {
	firstName: string
	lastName: string
}

const schema = yup.object().shape({
	firstName: yup.string().required(IS_REQUIRED_TEXT),
	lastName: yup.string().required(IS_REQUIRED_TEXT)
})

const AccountUpdateForm: React.FC<{
	onSubmit: (values: AccountUpdateFormData) => void
	errors: AccountUpdate_accountUpdate_accountErrors[] | null
	loading: boolean
	initialData: AccountUpdateFormData
}> = ({ onSubmit, errors, loading, initialData }) => {
	const form = useFormik({
		initialValues: initialData,
		validationSchema: schema,
		onSubmit: onSubmit
	})
	useEffect(() => {
		if (errors && errors.length > 0) {
			const formErrors = {}
			errors.forEach((err) => {
				formErrors[err.field] = err.message
			})
			form.setErrors(formErrors)
		}
	}, [errors])

	const formError = errors?.find((err) => err.field === null)
	return (
		<form onSubmit={form.handleSubmit} className='flex flex-col'>
			{formError && (
				<Alert severity='error' className='my-5'>
					{formError.message}
				</Alert>
			)}
			<TextField
				name='firstName'
				helperText={form.touched.firstName && form.errors.firstName}
				error={!!(form.touched.firstName && form.errors.firstName)}
				onChange={form.handleChange}
				value={form.values.firstName}
				onBlur={form.handleBlur}
				required={true}
				variant='outlined'
				margin='dense'
				label='Имя'
				fullWidth
			/>
			<TextField
				name='lastName'
				margin='dense'
				helperText={form.touched.lastName && form.errors.lastName}
				error={!!(form.touched.lastName && form.errors.lastName)}
				onChange={form.handleChange}
				value={form.values.lastName}
				onBlur={form.handleBlur}
				required={true}
				variant='outlined'
				label='Фамилия'
				fullWidth
			/>
			<div className='mt-10'>
				<Button
					disabled={!form.isValid || !form.dirty || loading}
					variant='contained'
					color='secondary'
					type='submit'
					fullWidth
				>
					Сохранить
				</Button>
			</div>
		</form>
	)
}

export default AccountUpdateForm
