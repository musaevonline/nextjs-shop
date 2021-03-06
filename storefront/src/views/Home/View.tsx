import './scss/Home.scss'

import * as React from 'react'

import { MetaWrapper } from '../../components'
import Page from './Page'
import { productsCardQuery } from '@sdk/queries/product'
import {
	BlogArticleOrderField,
	OrderDirection,
	ProductOrderField
} from '@temp/types/globalTypes'
import {
	ProductsCardDetails,
	ProductsCardDetailsVariables
} from '@sdk/queries/types/ProductsCardDetails'
import { useQuery } from '@apollo/client'
import { useBlogArticleListQuery } from '@sdk/queries/blog'
import useShop from '@temp/hooks/useShop'

const PAGINATE_BY = 12

const View: React.FC = () => {
	const shop = useShop()
	const { data: newProductsData } = useQuery<
		ProductsCardDetails,
		ProductsCardDetailsVariables
	>(productsCardQuery, {
		variables: {
			first: PAGINATE_BY,
			sortBy: { direction: OrderDirection.DESC, field: ProductOrderField.DATE },
			includeCategory: false
		},
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first'
		// ssr: false
	})
	const { data: popularProductsData } = useQuery<
		ProductsCardDetails,
		ProductsCardDetailsVariables
	>(productsCardQuery, {
		variables: {
			first: PAGINATE_BY,
			sortBy: {
				direction: OrderDirection.DESC,
				field: ProductOrderField.ORDER_COUNT
			},
			includeCategory: false
		},
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first'
		// ssr: false
	})
	const {
		data: articlesData,
		loading: articlesLoading
	} = useBlogArticleListQuery({
		variables: {
			first: PAGINATE_BY,
			filter: { isPublished: true },
			sortBy: {
				direction: OrderDirection.DESC,
				field: BlogArticleOrderField.DATE
			}
		}
	})
	return (
		<MetaWrapper meta={{}}>
			<Page
				loading={!newProductsData}
				newProducts={newProductsData?.products}
				popularProducts={popularProductsData?.products}
				articlesEdges={articlesData?.blogArticleList?.edges}
				articlesLoading={articlesLoading}
				shop={shop}
			/>
		</MetaWrapper>
	)
}

export default View
