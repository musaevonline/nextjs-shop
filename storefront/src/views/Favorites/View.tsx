import React, { useContext } from 'react'
import Page from './Page'
import { useQuery } from '@apollo/client'
import { productsCardQuery } from '@sdk/queries/product'
import {
	ProductsCardDetails,
	ProductsCardDetailsVariables
} from '@sdk/queries/types/ProductsCardDetails'
import { FavoritesContext } from '@temp/components/FavoritesProvider/context'
import Loader from '@temp/components/Loader'
import { MetaWrapper } from '@temp/components'
import _ from 'lodash'

const PAGINATE_BY = 10
const View: React.FC = () => {
	const { favorites } = useContext(FavoritesContext)
	const { data: products, loading, fetchMore } = useQuery<
		ProductsCardDetails,
		ProductsCardDetailsVariables
	>(productsCardQuery, {
		variables: {
			first: PAGINATE_BY,
			ids: favorites.slice(0, PAGINATE_BY),
			includeCategory: false
		},
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first',
		notifyOnNetworkStatusChange: true,
		skip: !favorites.length
	})

	const loadMore = async () => {
		await fetchMore({
			variables: {
				first: PAGINATE_BY,
				ids: favorites.slice(
					products.products.edges.length,
					products.products.edges.length + PAGINATE_BY
				)
			},
			updateQuery: (previousResult, { fetchMoreResult = {} }) => {
				if (!previousResult) {
					return fetchMoreResult
				}
				const copy = _.cloneDeep(previousResult)
				return {
					products: {
						...copy.products,
						edges: [...copy.products.edges, ...fetchMoreResult.products.edges],
						pageInfo: fetchMoreResult.products.pageInfo
					}
				}
			}
		})
	}

	return (
		<MetaWrapper meta={{ title: 'Избранное' }}>
			{(!products || loading) && (
				<Loader full={!products} absolute={!!products} />
			)}
			<Page
				products={products?.products}
				loading={loading}
				loadMore={loadMore}
				hasMore={favorites.length > products?.products.edges.length}
			/>
		</MetaWrapper>
	)
}

export default View
