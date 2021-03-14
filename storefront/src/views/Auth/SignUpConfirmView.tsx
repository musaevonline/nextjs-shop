import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import {
	ConfirmAccount,
	ConfirmAccountVariables
} from '@sdk/mutations/types/ConfirmAccount'
import { confirmAccountMutation } from '@sdk/mutations/user'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/router'
import { baseUrl } from '@temp/app/routes'
import { MetaWrapper } from '@temp/components'

const SignUpConfirmView: React.FC = () => {
	const { enqueueSnackbar } = useSnackbar()
	const router = useRouter()
	const token = router.query?.token as string
	const email = router.query?.email as string
	const [confirmAccount] = useMutation<ConfirmAccount, ConfirmAccountVariables>(
		confirmAccountMutation
	)

	useEffect(() => {
		handleConfirmAccount()
	}, [token])

	const handleConfirmAccount = async () => {
		try {
			const res = await confirmAccount({
				variables: {
					email,
					token
				}
			})
			const data = res.data.confirmAccount
			const errors = data.accountErrors
			if (!errors?.length) {
				enqueueSnackbar('Ваш аккаунт успешно подтвержден!', {
					variant: 'success'
				})
			} else {
				enqueueSnackbar('Токен недействителен или истек срок действия', {
					variant: 'error'
				})
			}
		} catch (e) {
			enqueueSnackbar('Токен недействителен или истек срок действия', {
				variant: 'error'
			})
		}
		await router.push(baseUrl)
	}
	return (
		<MetaWrapper meta={{ title: 'Подтвердить аккаунт' }}>{null}</MetaWrapper>
	)
}

export default SignUpConfirmView
