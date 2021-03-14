import React, { useContext } from 'react'
import Page from './Page'
import { UserContext } from '@temp/components/User/context'
import { useMutation } from '@apollo/client'
import {
	accountAddressCreateMutation,
	accountAddressDeleteMutation,
	accountAddressUpdateMutation
} from '@sdk/mutations/account'
import {
	AccountAddressCreate,
	AccountAddressCreateVariables
} from '@sdk/mutations/types/AccountAddressCreate'
import { AccountAddressFormData } from '@temp/components/Forms/AccountAddressForm/AccountAddressForm'
import { CountryCode } from '@temp/types/globalTypes'
import {
	AccountAddressDelete,
	AccountAddressDeleteVariables
} from '@sdk/mutations/types/AccountAddressDelete'
import { useSnackbar } from 'notistack'
import {
	AccountAddressUpdate,
	AccountAddressUpdateVariables
} from '@sdk/mutations/types/AccountAddressUpdate'
import UserLayout from '@temp/views/UserProfile/UserLayout'
import { MetaWrapper } from '@temp/components'

const View: React.FC = () => {
	const user = useContext(UserContext)
	const { enqueueSnackbar } = useSnackbar()

	const [createAddress, responseCreateAddress] = useMutation<
		AccountAddressCreate,
		AccountAddressCreateVariables
	>(accountAddressCreateMutation)
	const [updateAddress, responseUpdateAddress] = useMutation<
		AccountAddressUpdate,
		AccountAddressUpdateVariables
	>(accountAddressUpdateMutation)
	const [deleteAddress, responseDeleteAddress] = useMutation<
		AccountAddressDelete,
		AccountAddressDeleteVariables
	>(accountAddressDeleteMutation)

	const onSubmitAddressCreate = async (values: AccountAddressFormData, cb) => {
		const response = await createAddress({
			variables: {
				input: {
					...values,
					country: CountryCode.BY
				}
			}
		})
		const errors = response.data.accountAddressCreate.accountErrors
		if (!errors.length) {
			user.updateUser(response.data.accountAddressCreate.user)
			cb()
		}
	}
	const onSubmitAddressUpdate = async (
		id: string,
		values: AccountAddressFormData,
		cb
	) => {
		const response = await updateAddress({
			variables: {
				id,
				input: {
					...values,
					country: CountryCode.BY
				}
			}
		})
		const errors = response.data.accountAddressUpdate.accountErrors
		if (!errors.length) {
			user.updateUser(response.data.accountAddressUpdate.user)
			cb()
		}
	}
	const onSubmitAddressDelete = async (id: string) => {
		const response = await deleteAddress({
			variables: { id }
		})
		const errors = response.data.accountAddressDelete.accountErrors
		if (!errors.length) {
			user.updateUser(response.data.accountAddressDelete.user)
		} else {
			enqueueSnackbar(errors[0].message, { variant: 'error' })
		}
	}

	return (
		<UserLayout>
			<MetaWrapper meta={{ title: 'Мой список адресов' }}>
				{!user.loading && (
					<Page
						user={user.user}
						onSubmitAddressCreate={onSubmitAddressCreate}
						errorsAddressCreate={
							responseCreateAddress.data?.accountAddressCreate.accountErrors
						}
						loadingAddressCreate={responseCreateAddress.loading}
						onSubmitAddressUpdate={onSubmitAddressUpdate}
						errorsAddressUpdate={
							responseUpdateAddress.data?.accountAddressUpdate.accountErrors
						}
						loadingAddressUpdate={responseUpdateAddress.loading}
						onSubmitAddressDelete={onSubmitAddressDelete}
						loadingAddressDelete={responseDeleteAddress.loading}
					/>
				)}
			</MetaWrapper>
		</UserLayout>
	)
}

export default View
