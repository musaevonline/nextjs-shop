import React, { useContext } from 'react'
import { useMutation } from '@apollo/client'
import { resetPasswordMutation } from '@sdk/mutations/user'
import { useSnackbar } from 'notistack'
import {
	ResetPassword,
	ResetPasswordVariables
} from '@sdk/mutations/types/ResetPassword'
import { ResetPasswordFormData } from '@temp/components/Forms/ResetPasswordForm/ResetPasswordForm'
import { BASE_URL } from '@temp/core/config'
import {
	UserContext,
	UserContextInterface
} from '@temp/components/User/context'
import { ResetPasswordForm } from '@temp/components/Forms/ResetPasswordForm'
import { Container } from '@material-ui/core'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import { useRouter } from 'next/router'
import { MetaWrapper } from '@temp/components'

const ResetPasswordPage: React.FC = () => {
	const router = useRouter()
	const auth = useContext<UserContextInterface>(UserContext)
	const token = router.query?.token as string
	const email = router.query?.email as string
	const { enqueueSnackbar } = useSnackbar()
	const [resetPassword, resetPasswordData] = useMutation<
		ResetPassword,
		ResetPasswordVariables
	>(resetPasswordMutation)

	const onSubmit = async (values: ResetPasswordFormData) => {
		try {
			const response = await resetPassword({
				variables: {
					password: values.password,
					token,
					email
				}
			})
			const data = response.data.setPassword
			const errors = response.data?.setPassword.accountErrors || []
			if (errors.length == 0) {
				auth.login(data.token, data.user)
				enqueueSnackbar('Пароль успешно изменен!', {
					variant: 'success'
				})
				await router.push(BASE_URL)
			}
		} catch (e) {
			enqueueSnackbar(e.message, {
				variant: 'error'
			})
		}
	}
	return (
		<MetaWrapper meta={{ title: 'Сбросить пароль' }}>
			<div id='reset-password-page' className='mt-20'>
				<Container maxWidth='sm'>
					<Card>
						<CardContent>
							<ResetPasswordForm
								onSubmit={onSubmit}
								loading={resetPasswordData.loading}
								errors={resetPasswordData.data?.setPassword.accountErrors}
							/>
						</CardContent>
					</Card>
				</Container>
			</div>
		</MetaWrapper>
	)
}

export default ResetPasswordPage
