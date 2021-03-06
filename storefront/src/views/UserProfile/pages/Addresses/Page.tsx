import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AccountAddressForm } from '@temp/components/Forms/AccountAddressForm'
import { AccountAddressFormData } from '@temp/components/Forms/AccountAddressForm/AccountAddressForm'
import { AccountAddressCreate_accountAddressCreate_accountErrors } from '@sdk/mutations/types/AccountAddressCreate'
import { User } from '@sdk/fragments/types/User'
import { Typography } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import { Address } from '@sdk/fragments/types/Address'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { AccountAddressUpdate_accountAddressUpdate_accountErrors } from '@sdk/mutations/types/AccountAddressUpdate'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'

const MAX_ADDRESSES = 5

const useStyles = makeStyles((theme) => ({
	container: {
		'& > div': {
			marginRight: 24
		},
		[theme.breakpoints.down('sm')]: {
			justifyContent: 'center',
			'& > div': {
				width: '100%',
				marginRight: 0
			}
		}
	},
	addresses: {
		display: 'grid',
		columnGap: '10px',
		rowGap: '10px',
		gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 500px))'
	},
	address: {},
	addressDivider: {
		margin: '10px 0'
	}
}))

interface PageProps {
	user: User | null
	onSubmitAddressCreate: (
		values: AccountAddressFormData,
		cb: () => void
	) => void
	errorsAddressCreate:
		| AccountAddressCreate_accountAddressCreate_accountErrors[]
		| null
	loadingAddressCreate: boolean

	onSubmitAddressUpdate: (
		id: string,
		values: AccountAddressFormData,
		cb: () => void
	) => void
	errorsAddressUpdate:
		| AccountAddressUpdate_accountAddressUpdate_accountErrors[]
		| null
	loadingAddressUpdate: boolean

	loadingAddressDelete: boolean
	onSubmitAddressDelete: (id: string) => void
}

const Page: React.FC<PageProps> = ({
	user,
	onSubmitAddressCreate,
	errorsAddressCreate,
	loadingAddressCreate,
	onSubmitAddressDelete,
	loadingAddressDelete,
	onSubmitAddressUpdate,
	errorsAddressUpdate,
	loadingAddressUpdate
}) => {
	const classes = useStyles()

	const [isOpen, setOpen] = useState(false)
	const [activeAddress, setActiveAddress] = useState<Address | null>(null)
	const [
		addressInitialData,
		setAddressInitialData
	] = useState<AccountAddressFormData | null>(null)

	const handleChangeAddress = (address: Address) => (e) => {
		setActiveAddress(address)
		setAddressInitialData({
			firstName: address.firstName,
			lastName: address.lastName,
			city: address.city,
			companyName: address.companyName,
			postalCode: address.postalCode,
			streetAddress1: address.streetAddress1,
			phone: address.phone
		})
		setOpen(true)
	}

	const handleAddAddress = (e) => {
		setAddressInitialData(null)
		setOpen(true)
	}
	const handleSubmitAddressCreate = (values: AccountAddressFormData) => {
		onSubmitAddressCreate(values, handleCloseDialog)
	}

	const handleSubmitAddressUpdate = (values: AccountAddressFormData) => {
		onSubmitAddressUpdate(activeAddress.id, values, handleCloseDialog)
	}

	const handleCloseDialog = () => {
		setOpen(false)
		setAddressInitialData(null)
		setActiveAddress(null)
	}

	return (
		<div>
			<div className='mb-20'>
				<Typography variant='h4'>Мой список адресов</Typography>
			</div>
			<div className={classes.container}>
				{user && (
					<div className={classes.addresses}>
						{user.addresses.map((address) => {
							return (
								<div key={address.id} className={classes.address}>
									<Card className='h-full flex justify-between flex-col'>
										<CardContent>
											<p className='font-medium'>
												{address.firstName} {address.lastName}
											</p>
											<p>
												<span className='font-medium'>Город: </span>
												{address.city}
											</p>
											<p>
												<span className='font-medium'>Адрес: </span>
												{address.streetAddress1}
											</p>
											{address.postalCode && (
												<p>
													{' '}
													<span className='font-medium'>Поштовый индекс: </span>
													{address.postalCode}
												</p>
											)}
											{address.companyName && (
												<p>
													<span className='font-medium'>Компания: </span>
													{address.companyName}
												</p>
											)}
											<p>
												<span className='font-medium'>Номер телефона: </span>
												{address.phone}
											</p>
										</CardContent>
										<CardActions>
											<ButtonGroup size='small' aria-label='address actions'>
												<Button
													variant='outlined'
													type='button'
													size='small'
													onClick={handleChangeAddress(address)}
												>
													Изменить
												</Button>
												<Button
													variant='outlined'
													type='button'
													size='small'
													disabled={loadingAddressDelete}
													onClick={(e) => onSubmitAddressDelete(address.id)}
												>
													{loadingAddressDelete ? 'Удаление...' : 'Удалить'}
												</Button>
											</ButtonGroup>
										</CardActions>
									</Card>
								</div>
							)
						})}
						{user.addresses.length === 0 && (
							<Typography variant='h6'>Список пуст</Typography>
						)}
					</div>
				)}
				{user?.addresses.length <= MAX_ADDRESSES && (
					<div>
						<div className='flex my-10'>
							<ButtonGroup size='small' aria-label='address actions'>
								<Button
									variant='contained'
									color='secondary'
									type='button'
									size='large'
									onClick={handleAddAddress}
								>
									Добавить адрес
								</Button>
							</ButtonGroup>
						</div>
					</div>
				)}
				<div>
					<Dialog
						open={isOpen}
						onClose={(e) => handleCloseDialog()}
						aria-labelledby='address-form'
						aria-describedby='user address form'
					>
						<DialogTitle id='address-form'>
							{addressInitialData ? 'Изменить адрес' : 'Добавить адрес'}
						</DialogTitle>
						<DialogContent dividers>
							<AccountAddressForm
								onSubmit={
									addressInitialData
										? handleSubmitAddressUpdate
										: handleSubmitAddressCreate
								}
								errors={
									addressInitialData ? errorsAddressUpdate : errorsAddressCreate
								}
								loading={
									addressInitialData
										? loadingAddressUpdate
										: loadingAddressCreate
								}
								initialData={addressInitialData}
							/>
						</DialogContent>
					</Dialog>
				</div>
			</div>
		</div>
	)
}

export default Page
