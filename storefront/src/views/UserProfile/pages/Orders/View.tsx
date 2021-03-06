import React, { useContext } from 'react'
import Page from './Page'
import { UserContext } from '@temp/components/User/context'
import { useMutation, useQuery } from '@apollo/client'
import {
	UserOrders,
	UserOrdersVariables
} from '@temp/views/UserProfile/types/UserOrders'
import { userOrdersQuery } from '@temp/views/UserProfile/queries'
import { OrderDirection, OrderSortField } from '@temp/types/globalTypes'
import _ from 'lodash'
import { TProductReviewFormData } from '@temp/components/Forms/ProductReviewForm/ProductReviewForm'
import { productReviewCreate } from '@sdk/mutations/product-review'
import { useSnackbar } from 'notistack'
import {
	ProductReviewCreate,
	ProductReviewCreateVariables
} from '@sdk/mutations/types/ProductReviewCreate'
import { getOperationName } from 'apollo-link'
import { productQuery } from '@sdk/queries/product'
import UserLayout from '@temp/views/UserProfile/UserLayout'
import { MetaWrapper } from '@temp/components'
import Loader from '@temp/components/Loader'

const PAGINATE_BY = 20

const View: React.FC = () => {
	const user = useContext(UserContext)
	const { enqueueSnackbar } = useSnackbar()
	const { data, fetchMore, refetch, loading: ordersLoading } = useQuery<
		UserOrders,
		UserOrdersVariables
	>(userOrdersQuery, {
		variables: {
			first: PAGINATE_BY,
			filter: {
				customer: user.user?.email
			},
			sortBy: {
				direction: OrderDirection.DESC,
				field: OrderSortField.CREATION_DATE
			}
		},
		fetchPolicy: 'cache-and-network',
		skip: !user.user
	})

	const [createReview] = useMutation<
		ProductReviewCreate,
		ProductReviewCreateVariables
	>(productReviewCreate)

	const loadMore = async (): Promise<void> => {
		await fetchMore({
			variables: {
				first: PAGINATE_BY,
				after: data.orders.pageInfo.endCursor
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) {
					return previousResult
				}
				const copy = _.cloneDeep(previousResult)
				return {
					orders: {
						...copy.orders,
						edges: [...copy.orders.edges, ...fetchMoreResult.orders.edges],
						pageInfo: fetchMoreResult.orders.pageInfo
					}
				}
			}
		})
	}

	const addReview = async (
		lineId: string,
		input: TProductReviewFormData,
		onSuccess
	) => {
		try {
			const res = await createReview({
				variables: {
					input: {
						orderLine: lineId,
						rating: input.rating,
						title: input.title,
						content: input.content,
						advantages: JSON.stringify({ advantages: input.advantages }),
						flaws: JSON.stringify({ flaws: input.flaws })
					}
				},
				refetchQueries: [getOperationName(productQuery)]
			})
			const errors = res.data.productReviewCreate?.productErrors
			if (!errors?.length) {
				await refetch()
				onSuccess()
			}
		} catch (e) {
			enqueueSnackbar(e.message, { variant: 'error' })
		}
	}

	return (
		<UserLayout>
			<MetaWrapper meta={{ title: 'Мои заказы' }}>
				{ordersLoading && <Loader full={!data} absolute={!!data} />}
				{!user.loading && (
					<Page
						user={user.user}
						ordersData={data}
						loadMore={loadMore}
						addReview={addReview}
					/>
				)}
			</MetaWrapper>
		</UserLayout>
	)
}

export default View
