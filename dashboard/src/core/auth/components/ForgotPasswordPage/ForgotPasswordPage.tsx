import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { commonMessages, formMessages } from '@temp/intl'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import * as yup from 'yup'
import { useFormik } from 'formik'

const useStyles = makeStyles(
	(theme) => ({
		errorText: {
			color: theme.palette.error.contrastText,
		},
		panel: {
			background: theme.palette.error.main,
			borderRadius: theme.spacing(),
			marginBottom: theme.spacing(3),
			padding: theme.spacing(1.5),
		},
		submit: {
			width: '100%',
		},
	}),
	{
		name: 'ForgotPasswordPage',
	}
)

export interface ForgotPasswordPageFormData {
	email: string
}
export interface ForgotPasswordPageProps {
	disabled: boolean
	error: string
	onSubmit: (data: ForgotPasswordPageFormData) => void
}

const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = (props) => {
	const { disabled, error, onSubmit } = props

	const classes = useStyles(props)
	const intl = useIntl()

	const schema = yup.object().shape({
		email: yup
			.string()
			.required(intl.formatMessage(formMessages.requiredField))
			.email(intl.formatMessage(formMessages.invalidEmail)),
	})

	const form = useFormik({
		initialValues: {
			email: '',
		},
		validationSchema: schema,
		onSubmit: onSubmit,
	})

	return (
		<form onSubmit={form.handleSubmit}>
			<Typography className='text-center pb-20'>
				<FormattedMessage
					id='forgot_password'
					defaultMessage='Forgot your password?'
				/>
			</Typography>
			{!!error && (
				<div className={classes.panel}>
					<Typography
						variant='caption'
						component='div'
						className={classes.errorText}
					>
						{error}
					</Typography>
				</div>
			)}
			<TextField
				autoFocus
				fullWidth
				helperText={form.touched.email && form.dirty && form.errors.email}
				error={!!(form.touched.email && form.errors.email && form.dirty)}
				onChange={form.handleChange}
				value={form.values.email}
				onBlur={form.handleBlur}
				disabled={disabled}
				margin='normal'
				variant='outlined'
				autoComplete='email'
				label={intl.formatMessage(commonMessages.email)}
				name='email'
				inputProps={{
					'data-tc': 'email',
				}}
			/>
			<div>
				<Button
					className={classes.submit}
					color='primary'
					disabled={!form.isValid || disabled}
					variant='contained'
					type='submit'
				>
					<FormattedMessage
						id='send_instructions'
						defaultMessage='Send Me Instructions'
						description='password forgot, button'
					/>
				</Button>
			</div>
		</form>
	)
}

ForgotPasswordPage.displayName = 'ForgotPasswordPage'
export default ForgotPasswordPage
