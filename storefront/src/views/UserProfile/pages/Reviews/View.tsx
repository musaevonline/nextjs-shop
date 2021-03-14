import React from 'react'
import Page from '@temp/views/UserProfile/pages/Reviews/Page'
import { useQuery } from '@apollo/client'
import { userReviewsQuery } from '@sdk/queries/user'
import {
	UserReviews,
	UserReviewsVariables
} from '@sdk/queries/types/UserReviews'
import _ from 'lodash'
import UserLayout from '@temp/views/UserProfile/UserLayout'
import { MetaWrapper } from '@temp/components'

const PAGINATE_BY = 20

const View: React.FC = () => {
	const { data, loading, fetchMore } = useQuery<
		UserReviews,
		UserReviewsVariables
	>(userReviewsQuery, {
		variables: {
			first: PAGINATE_BY
		},
		fetchPolicy: 'cache-and-network'
	})

	const loadMore = async (): Promise<void> => {
		await fetchMore({
			variables: {
				first: PAGINATE_BY,
				after: data.me.reviews.pageInfo.endCursor
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) {
					return previousResult
				}
				const copy = _.cloneDeep(previousResult)
				return {
					me: {
						reviews: {
							...copy.me.reviews,
							edges: [
								...copy.me.reviews.edges,
								...fetchMoreResult.me.reviews.edges
							],
							pageInfo: fetchMoreResult.me.reviews.pageInfo
						}
					}
				}
			}
		})
	}
	return (
		<UserLayout>
			<MetaWrapper meta={{ title: 'Мои отзывы' }}>
				<Page
					reviews={data?.me.reviews}
					loading={loading}
					loadMore={loadMore}
				/>
			</MetaWrapper>
		</UserLayout>
	)
}

export default View
