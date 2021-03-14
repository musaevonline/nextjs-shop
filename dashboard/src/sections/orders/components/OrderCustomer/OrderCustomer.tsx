import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CardTitle from '@temp/components/CardTitle'
import ExternalLink from '@temp/components/ExternalLink'
import Hr from '@temp/components/Hr'
import Link from '@temp/components/Link'
import RequirePermissions from '@temp/components/RequirePermissions'
import SingleAutocompleteSelectField from '@temp/components/SingleAutocompleteSelectField'
import Skeleton from '@temp/components/Skeleton'
import useStateFromProps from '@temp/hooks/useStateFromProps'
import { buttonMessages } from '@temp/intl'
import { SearchCustomers_search_edges_node } from '@temp/searches/types/SearchCustomers'
import { FetchMoreProps, UserPermissionProps } from '@temp/types'
import { PermissionEnum } from '@temp/types/globalTypes'
import createSingleAutocompleteSelectHandler from '@temp/utils/handlers/singleAutocompleteSelectChangeHandler'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { customerUrl } from '../../../customers/urls'
import { createHref, maybe } from '@temp/misc'
import { OrderDetails_order } from '../../types/OrderDetails'
import { useFormik } from 'formik'

const useStyles = makeStyles(
	(theme) => ({
		sectionHeader: {
			alignItems: 'center',
			display: 'flex',
			marginBottom: theme.spacing(3)
		},
		sectionHeaderTitle: {
			flex: 1,
			fontWeight: 600 as 600,
			lineHeight: 1,
			textTransform: 'uppercase'
		},
		sectionHeaderToolbar: {
			marginRight: -theme.spacing(2)
		},
		userEmail: {
			fontWeight: 600 as 600,
			marginBottom: theme.spacing(1)
		}
	}),
	{ name: 'OrderCustomer' }
)

export interface OrderCustomerProps
	extends Partial<FetchMoreProps>,
		UserPermissionProps {
	order: OrderDetails_order
	users?: SearchCustomers_search_edges_node[]
	loading?: boolean
	canEditAddresses: boolean
	canEditCustomer: boolean
	fetchUsers?: (query: string) => void
	onCustomerEdit?: (data: { user?: string; userEmail?: string }) => void
	onProfileView: () => void
	onShippingAddressEdit?: () => void
}

const OrderCustomer: React.FC<OrderCustomerProps> = (props) => {
	const {
		canEditAddresses,
		canEditCustomer,
		fetchUsers,
		hasMore: hasMoreUsers,
		loading,
		order,
		users,
		userPermissions,
		onCustomerEdit,
		onFetchMore: onFetchMoreUsers,
		onProfileView,
		onShippingAddressEdit
	} = props
	const classes = useStyles(props)

	const intl = useIntl()

	const user = maybe(() => order.user)
	const userEmail = maybe(() => order.userEmail)

	const [userDisplayName, setUserDisplayName] = useStateFromProps(
		maybe(() => user.email, '')
	)
	const [isInEditMode, setEditModeStatus] = React.useState(false)
	const toggleEditMode = () => setEditModeStatus(!isInEditMode)

	const shippingAddress = maybe(() => order.shippingAddress)

	const form = useFormik({
		enableReinitialize: true,
		initialValues: { query: '' },
		onSubmit: (values) => {
			console.log(values)
		}
	})

	const handleChange = (event: React.ChangeEvent<any>) => {
		form.handleChange(event)
		const value = event.target.value

		onCustomerEdit({
			[value.includes('@') ? 'userEmail' : 'user']: value
		})
		toggleEditMode()
	}
	const userChoices = maybe(() => users, []).map((user) => ({
		label: user.email,
		value: user.id
	}))
	const handleUserChange = createSingleAutocompleteSelectHandler(
		handleChange,
		setUserDisplayName,
		userChoices
	)

	return (
		<Card>
			<CardTitle
				title={intl.formatMessage({
					id: 'customer',
					defaultMessage: 'Customer',
					description: 'section header'
				})}
				toolbar={
					!!canEditCustomer && (
						<RequirePermissions
							userPermissions={userPermissions}
							requiredPermissions={[PermissionEnum.MANAGE_USERS]}
						>
							<Button
								color='primary'
								variant='text'
								disabled={!onCustomerEdit}
								onClick={toggleEditMode}
							>
								{intl.formatMessage(buttonMessages.edit)}
							</Button>
						</RequirePermissions>
					)
				}
			/>
			<CardContent>
				{user === undefined ? (
					<Skeleton />
				) : isInEditMode && canEditCustomer ? (
					<form onSubmit={form.handleSubmit}>
						<SingleAutocompleteSelectField
							allowCustomValues={true}
							choices={userChoices}
							displayValue={userDisplayName}
							fetchChoices={fetchUsers}
							hasMore={hasMoreUsers}
							loading={loading}
							placeholder={intl.formatMessage({
								id: 'search_customers',
								defaultMessage: 'Search Customers'
							})}
							onChange={handleUserChange}
							onFetchMore={onFetchMoreUsers}
							name='query'
							value={form.values.query}
						/>
					</form>
				) : user === null ? (
					userEmail === null ? (
						<Typography>
							<FormattedMessage
								id='anonymous_user'
								defaultMessage='Anonymous user'
							/>
						</Typography>
					) : (
						<Typography className={classes.userEmail}>{userEmail}</Typography>
					)
				) : (
					<>
						<Typography className={classes.userEmail}>{user.email}</Typography>
						<RequirePermissions
							userPermissions={userPermissions}
							requiredPermissions={[PermissionEnum.MANAGE_USERS]}
						>
							<div>
								<Link
									underline={false}
									href={createHref(customerUrl(user.id))}
									onClick={onProfileView}
								>
									<FormattedMessage
										id='view_profile'
										defaultMessage='View Profile'
										description='link'
									/>
								</Link>
							</div>
						</RequirePermissions>
						{/* TODO: Uncomment it after adding ability to filter
                    orders by customer */}
						{/* <div>
                <NextLink underline={false} href={}>
                  <FormattedMessage defaultMessage="View Orders"
                    description="link"
                     />
                </NextLink>
              </div> */}
					</>
				)}
			</CardContent>
			{!!user && (
				<>
					<Hr />
					<CardContent>
						<div className={classes.sectionHeader}>
							<Typography className={classes.sectionHeaderTitle}>
								<FormattedMessage
									id='contact_information'
									defaultMessage='Contact Information'
									description='subheader'
								/>
							</Typography>
						</div>

						{maybe(() => order.userEmail) === undefined ? (
							<Skeleton />
						) : order.userEmail === null ? (
							<Typography>
								<FormattedMessage
									defaultMessage='Not set'
									description='customer is not set in draft order'
									id='orderCustomerCustomerNotSet'
								/>
							</Typography>
						) : (
							<ExternalLink
								href={`mailto:${maybe(() => order.userEmail)}`}
								typographyProps={{ color: 'primary' }}
							>
								{maybe(() => order.userEmail)}
							</ExternalLink>
						)}
					</CardContent>
				</>
			)}
			<Hr />
			<CardContent>
				<div className={classes.sectionHeader}>
					<Typography className={classes.sectionHeaderTitle}>
						<FormattedMessage
							id='shipping_address'
							defaultMessage='Shipping Address'
						/>
					</Typography>
					{canEditAddresses && (
						<div className={classes.sectionHeaderToolbar}>
							<Button
								color='primary'
								variant='text'
								onClick={onShippingAddressEdit}
								disabled={!onShippingAddressEdit && user === undefined}
							>
								<FormattedMessage {...buttonMessages.edit} />
							</Button>
						</div>
					)}
				</div>
				{shippingAddress === undefined ? (
					<Skeleton />
				) : shippingAddress === null ? (
					<Typography>
						<FormattedMessage
							defaultMessage='Not set'
							description='shipping address is not set in draft order'
							id='orderCustomerShippingAddressNotSet'
						/>
					</Typography>
				) : (
					<>
						{shippingAddress.companyName && (
							<Typography>{shippingAddress.companyName}</Typography>
						)}
						<Typography>
							{shippingAddress.firstName} {shippingAddress.lastName}
						</Typography>
						<Typography>
							{shippingAddress.streetAddress1}
							<br />
							{shippingAddress.streetAddress2}
						</Typography>
						<Typography>
							{shippingAddress.postalCode} {shippingAddress.city}
							{shippingAddress.cityArea ? ', ' + shippingAddress.cityArea : ''}
						</Typography>
						<Typography>
							{shippingAddress.countryArea
								? shippingAddress.countryArea +
								  ', ' +
								  shippingAddress.country.country
								: shippingAddress.country.country}
						</Typography>
						<Typography>{shippingAddress.phone}</Typography>
					</>
				)}
			</CardContent>
		</Card>
	)
}

OrderCustomer.displayName = 'OrderCustomer'
export default OrderCustomer
