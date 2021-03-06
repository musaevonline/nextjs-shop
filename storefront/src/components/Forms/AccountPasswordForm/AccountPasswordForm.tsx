import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { useFormik } from 'formik'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Alert } from '@material-ui/lab'
import { AccountPasswordChange_passwordChange_accountErrors } from '@sdk/mutations/types/AccountPasswordChange'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const IS_REQUIRED_TEXT = 'Обязательно для заполнения'

export type AccountPasswordFormData = {
	oldPassword: string
	newPassword: string
}

const schema = yup.object().shape({
	oldPassword: yup.string().required(IS_REQUIRED_TEXT),
	newPassword: yup.string().required(IS_REQUIRED_TEXT)
})

const AccountPasswordForm: React.FC<{
	onSubmit: (values: AccountPasswordFormData, resetForm: () => void) => void
	errors: AccountPasswordChange_passwordChange_accountErrors[] | null
	loading: boolean
}> = ({ onSubmit, errors, loading }) => {
	const [showPassword, setShowPassword] = useState(false)
	const [showPassword2, setShowPassword2] = useState(false)

	const form = useFormik({
		initialValues: {
			oldPassword: '',
			newPassword: ''
		},
		validationSchema: schema,
		onSubmit: (values) => {
			onSubmit(values, () => {
				form.resetForm()
			})
		}
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
				name='oldPassword'
				margin='dense'
				helperText={
					form.dirty && form.touched.oldPassword && form.errors.oldPassword
				}
				error={
					!!(form.touched.oldPassword && form.errors.oldPassword && form.dirty)
				}
				onChange={form.handleChange}
				value={form.values.oldPassword}
				onBlur={form.handleBlur}
				required={true}
				type={showPassword ? 'text' : 'password'}
				variant='outlined'
				label='Старый пароль'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={(e) => {
									setShowPassword((prev) => !prev)
								}}
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					)
				}}
				fullWidth
			/>
			<TextField
				name='newPassword'
				margin='dense'
				helperText={
					form.dirty && form.touched.newPassword && form.errors.newPassword
				}
				error={
					!!(form.touched.newPassword && form.errors.newPassword && form.dirty)
				}
				onChange={form.handleChange}
				value={form.values.newPassword}
				onBlur={form.handleBlur}
				required={true}
				type={showPassword2 ? 'text' : 'password'}
				variant='outlined'
				label='Новый пароль'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={(e) => {
									setShowPassword2((prev) => !prev)
								}}
							>
								{showPassword2 ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					)
				}}
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

export default AccountPasswordForm
