import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AppHeader from '@temp/components/AppHeader'
import CardMenu from '@temp/components/CardMenu'
import { ConfirmButtonTransitionState } from '@temp/components/ConfirmButton'
import { Container } from '@temp/components/Container'
import { DateTime } from '@temp/components/Date'
import Grid from '@temp/components/Grid'
import PageHeader from '@temp/components/PageHeader'
import SaveButtonBar from '@temp/components/SaveButtonBar'
import Skeleton from '@temp/components/Skeleton'
import { sectionNames } from '@temp/intl'
import { SearchCustomers_search_edges_node } from '@temp/searches/types/SearchCustomers'
import { FetchMoreProps, UserPermissionProps } from '@temp/types'
import React from 'react'
import { useIntl } from 'react-intl'

import { maybe } from '@temp/misc'
import { DraftOrderInput } from '@temp/types/globalTypes'
import { OrderDetails_order } from '../../types/OrderDetails'
import OrderCustomer from '../OrderCustomer'
import OrderDraftDetails from '../OrderDraftDetails/OrderDraftDetails'
import { FormData as OrderDraftDetailsProductsFormData } from '../OrderDraftDetailsProducts'
import OrderHistory, { FormData as HistoryFormData } from '../OrderHistory'

const useStyles = makeStyles(
	(theme) => ({
		date: {
			marginBottom: theme.spacing(3),
		},
		header: {
			display: 'flex',
			marginBottom: 0,
		},
	}),
	{ name: 'OrderDraftPage' }
)

export interface OrderDraftPageProps
	extends FetchMoreProps,
		UserPermissionProps {
	disabled: boolean
	order: OrderDetails_order
	users: SearchCustomers_search_edges_node[]
	usersLoading: boolean
	countries: Array<{
		code: string
		label: string
	}>
	saveButtonBarState: ConfirmButtonTransitionState
	fetchUsers: (query: string) => void
	onBack: () => void
	onCustomerEdit: (data: DraftOrderInput) => void
	onDraftFinalize: () => void
	onDraftRemove: () => void
	onNoteAdd: (data: HistoryFormData) => void
	onOrderLineAdd: () => void
	onOrderLineChange: (
		id: string,
		data: OrderDraftDetailsProductsFormData
	) => void
	onOrderLineRemove: (id: string) => void
	onProductClick: (id: string) => void
	onShippingAddressEdit: () => void
	onShippingMethodEdit: () => void
	onProfileView: () => void
}

const OrderDraftPage: React.FC<OrderDraftPageProps> = (props) => {
	const {
		disabled,
		fetchUsers,
		hasMore,
		saveButtonBarState,
		onBack,
		onCustomerEdit,
		onDraftFinalize,
		onDraftRemove,
		onFetchMore,
		onNoteAdd,
		onOrderLineAdd,
		onOrderLineChange,
		onOrderLineRemove,
		onShippingAddressEdit,
		onShippingMethodEdit,
		onProfileView,
		order,
		users,
		usersLoading,
		userPermissions,
	} = props
	const classes = useStyles(props)

	const intl = useIntl()

	return (
		<Container>
			<AppHeader onBack={onBack}>
				{intl.formatMessage(sectionNames.draftOrders)}
			</AppHeader>
			<PageHeader
				className={classes.header}
				inline
				title={maybe(() => order.number) ? '#' + order.number : undefined}
			>
				<CardMenu
					menuItems={[
						{
							label: intl.formatMessage({
								id: 'cancel_order',
								defaultMessage: 'Cancel order',
								description: 'button',
							}),
							onSelect: onDraftRemove,
						},
					]}
				/>
			</PageHeader>
			<div className={classes.date}>
				{order && order.created ? (
					<Typography variant='caption' component='div'>
						<DateTime date={order.created} />
					</Typography>
				) : (
					<Skeleton style={{ width: '10em' }} />
				)}
			</div>
			<Grid>
				<div>
					<OrderDraftDetails
						order={order}
						onOrderLineAdd={onOrderLineAdd}
						onOrderLineChange={onOrderLineChange}
						onOrderLineRemove={onOrderLineRemove}
						onShippingMethodEdit={onShippingMethodEdit}
					/>
					<OrderHistory
						history={maybe(() => order.events)}
						onNoteAdd={onNoteAdd}
					/>
				</div>
				<div>
					<OrderCustomer
						canEditAddresses={true}
						canEditCustomer={true}
						fetchUsers={fetchUsers}
						hasMore={hasMore}
						loading={usersLoading}
						order={order}
						users={users}
						userPermissions={userPermissions}
						onCustomerEdit={onCustomerEdit}
						onFetchMore={onFetchMore}
						onProfileView={onProfileView}
						onShippingAddressEdit={onShippingAddressEdit}
					/>
				</div>
			</Grid>
			<SaveButtonBar
				state={saveButtonBarState}
				disabled={disabled || !maybe(() => order.canFinalize)}
				onCancel={onBack}
				onSave={onDraftFinalize}
				labels={{
					save: intl.formatMessage({
						id: 'finalize',
						defaultMessage: 'Finalize',
						description: 'button',
					}),
				}}
			/>
		</Container>
	)
}
OrderDraftPage.displayName = 'OrderDraftPage'
export default OrderDraftPage
