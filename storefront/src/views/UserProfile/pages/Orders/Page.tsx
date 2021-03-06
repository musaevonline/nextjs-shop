import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { User } from '@sdk/fragments/types/User'
import { UserOrders } from '@temp/views/UserProfile/types/UserOrders'
import { Typography } from '@material-ui/core'
import { OrderCard } from '@temp/components/OrderCard'
import Loader from '@temp/components/Loader'
import { ProductReviewForm } from '@temp/components/Forms/ProductReviewForm'
import { TProductReviewFormData } from '@temp/components/Forms/ProductReviewForm/ProductReviewForm'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
	container: {},
	ordersContainer: {
		display: 'grid',
		gridTemplateColumns: '1fr',
		rowGap: '10px'
	}
}))

interface PageProps {
	user: User | null
	ordersData: UserOrders | null
	loadMore(): Promise<void>
	addReview(lineId, input: TProductReviewFormData, onSuccess: () => void): void
}

const Page: React.FC<PageProps> = ({
	user,
	ordersData,
	loadMore,
	addReview
}) => {
	const classes = useStyles()
	const [isOpenReviewForm, setOpenReviewForm] = useState(false)
	const [reviewFormLineId, setReviewFormLineId] = useState<string | null>(null)

	const openReviewForm = (lineId: string) => {
		setReviewFormLineId(lineId)
		setOpenReviewForm(true)
	}

	const onSubmitReviewForm = (values: TProductReviewFormData) => {
		addReview(reviewFormLineId, values, onCloseReviewForm)
	}

	const onCloseReviewForm = () => {
		setOpenReviewForm(false)
		setReviewFormLineId(null)
	}

	return (
		<>
			<div className={classes.container}>
				<div className='mb-20'>
					<Typography variant='h4'>Мои заказы</Typography>
				</div>
				{!ordersData && <Loader />}
				{ordersData && (
					<div className={classes.ordersContainer}>
						{ordersData?.orders.edges.map((edge) => (
							<OrderCard
								key={edge.node.id}
								order={edge.node}
								addReview={openReviewForm}
							/>
						))}
					</div>
				)}
				{ordersData?.orders?.pageInfo.hasNextPage && (
					<div className='my-20 flex justify-center'>
						<div className='w-full sm:w-512 max-w-full'>
							<Button
								variant='contained'
								color='secondary'
								onClick={loadMore}
								size='small'
								fullWidth
							>
								Показать еще
							</Button>
						</div>
					</div>
				)}
			</div>
			<Dialog
				open={isOpenReviewForm}
				onClose={(e) => onCloseReviewForm()}
				maxWidth='lg'
				aria-labelledby='review-form'
				aria-describedby='product review form'
			>
				<DialogTitle>Отзыв</DialogTitle>
				<DialogContent dividers>
					<div className='w-640'>
						<ProductReviewForm loading={false} onSubmit={onSubmitReviewForm} />
					</div>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default Page
