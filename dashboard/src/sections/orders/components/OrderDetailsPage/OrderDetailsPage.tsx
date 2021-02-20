import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import AppHeader from '@temp/components/AppHeader'
import CardMenu from '@temp/components/CardMenu'
import { CardSpacer } from '@temp/components/CardSpacer'
import { Container } from '@temp/components/Container'
import { DateTime } from '@temp/components/Date'
import Grid from '@temp/components/Grid'
import PageHeader from '@temp/components/PageHeader'
import Skeleton from '@temp/components/Skeleton'
import { sectionNames } from '@temp/intl'
import { UserPermissionProps } from '@temp/types'
import React from 'react'
import { useIntl } from 'react-intl'

import { maybe } from '@temp/misc'
import { OrderStatus } from '@temp/types/globalTypes'
import { OrderDetails_order } from '../../types/OrderDetails'
import OrderCustomer from '../OrderCustomer'
import OrderCustomerNote from '../OrderCustomerNote'
import OrderHistory, { FormData as HistoryFormData } from '../OrderHistory'
import OrderPayment from '../OrderPayment/OrderPayment'
import OrderLinesTable from '@temp/sections/orders/components/OrderLinesTable'

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
	{
		name: 'OrderDetailsPage',
	}
)

export interface OrderDetailsPageProps extends UserPermissionProps {
	order: OrderDetails_order
	shippingMethods?: Array<{
		id: string
		name: string
	}>
	countries?: Array<{
		code: string
		label: string
	}>
	onBack()
	onOrderFulfill()
	onProductClick?(id: string)
	onPaymentCapture()
	onPaymentPaid()
	onPaymentRefund()
	onPaymentVoid()
	onShippingAddressEdit()
	onOrderCancel()
	onNoteAdd(data: HistoryFormData)
	onProfileView()
	onFulfill: () => void
}

const OrderDetailsPage: React.FC<OrderDetailsPageProps> = (props) => {
	const {
		order,
		userPermissions,
		onBack,
		onNoteAdd,
		onOrderCancel,
		onPaymentCapture,
		onPaymentPaid,
		onPaymentRefund,
		onPaymentVoid,
		onShippingAddressEdit,
		onProfileView,
		onFulfill,
	} = props
	const classes = useStyles(props)

	const intl = useIntl()

	const canCancel = maybe(() => order.status) !== OrderStatus.CANCELED
	const canEditAddresses = maybe(() => order.status) !== OrderStatus.CANCELED

	return (
		<Container>
			<AppHeader onBack={onBack}>
				{intl.formatMessage(sectionNames.orders)}
			</AppHeader>
			<PageHeader
				className={classes.header}
				inline
				title={maybe(() => order.number) ? '#' + order.number : undefined}
			>
				{canCancel && (
					<CardMenu
						menuItems={[
							{
								label: intl.formatMessage({
									id: 'cancel_order',
									defaultMessage: 'Cancel order',
									description: 'button',
								}),
								onSelect: onOrderCancel,
							},
						]}
					/>
				)}
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
					<OrderLinesTable
						lines={maybe(() => order.lines, [])}
						order={maybe(() => order)}
						onFulfill={onFulfill}
					/>

					<CardSpacer />
					<OrderPayment
						order={order}
						onCapture={onPaymentCapture}
						onMarkAsPaid={onPaymentPaid}
						onRefund={onPaymentRefund}
						onVoid={onPaymentVoid}
					/>
					<OrderHistory
						history={maybe(() => order.events)}
						onNoteAdd={onNoteAdd}
					/>
				</div>
				<div>
					<OrderCustomer
						canEditAddresses={canEditAddresses}
						canEditCustomer={false}
						order={order}
						userPermissions={userPermissions}
						onShippingAddressEdit={onShippingAddressEdit}
						onProfileView={onProfileView}
					/>
					<CardSpacer />
					<OrderCustomerNote note={maybe(() => order.customerNote)} />
				</div>
			</Grid>
		</Container>
	)
}
OrderDetailsPage.displayName = 'OrderDetailsPage'
export default OrderDetailsPage
