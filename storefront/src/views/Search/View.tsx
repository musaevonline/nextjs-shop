import React from 'react'
import _ from 'lodash'
import Page from './Page'
import {
	ProductsCardDetails,
	ProductsCardDetailsVariables
} from '@sdk/queries/types/ProductsCardDetails'
import { productsCardQuery } from '@sdk/queries/product'
import { useQuery } from '@apollo/client'
import {
	useQueryParams,
	StringParam,
	JsonParam,
	DelimitedNumericArrayParam
} from 'use-query-params'
import { PRODUCTS_SORT_BY_ENUM } from '@temp/views/Category/Page'
import { OrderDirection, ProductOrderField } from '@temp/types/globalTypes'
import { TUrlQuery } from '@temp/views/Category/View'
import { Attributes, AttributesVariables } from '@sdk/queries/types/Attributes'
import { attributesQuery } from '@sdk/queries/attribute'
import { MetaWrapper } from '@temp/components'

const PAGINATE_BY = 20

const getSortBy = (
	sortBy: PRODUCTS_SORT_BY_ENUM | null
): { field: ProductOrderField; direction: OrderDirection } => {
	switch (sortBy) {
		case PRODUCTS_SORT_BY_ENUM.BY_NAME:
			return { field: ProductOrderField.NAME, direction: OrderDirection.ASC }
		case PRODUCTS_SORT_BY_ENUM.DATE:
			return { field: ProductOrderField.DATE, direction: OrderDirection.DESC }
		case PRODUCTS_SORT_BY_ENUM.ORDER_COUNT:
			return {
				field: ProductOrderField.ORDER_COUNT,
				direction: OrderDirection.DESC
			}
		default:
			return { field: ProductOrderField.DATE, direction: OrderDirection.DESC }
	}
}

const View: React.FC = () => {
	const [query, setQuery] = useQueryParams({
		q: StringParam,
		sortBy: StringParam as PRODUCTS_SORT_BY_ENUM | any,
		attributes: JsonParam,
		priceRange: DelimitedNumericArrayParam
	})

	const { data, fetchMore, loading } = useQuery<
		ProductsCardDetails,
		ProductsCardDetailsVariables
	>(productsCardQuery, {
		variables: {
			first: PAGINATE_BY,
			filter: {
				search: query.q,
				attributes: query.attributes,
				price: {
					lte: query.priceRange ? query.priceRange[0] : 0,
					gte: query.priceRange ? query.priceRange[1] : 99999
				}
			},
			sortBy: getSortBy(query.sortBy),
			includeCategory: true
		},
		skip: !query.q || query.q.length < 2
	})
	const { data: categoryAttributesData } = useQuery<
		Attributes,
		AttributesVariables
	>(attributesQuery, {
		variables: {
			first: 10,
			filter: {
				inCategories:
					_.uniq(data?.products?.edges.map((p) => p.node.category?.id)) || null
			}
		},
		skip: !data
	})
	const setFilters = (values: TUrlQuery): void => {
		setQuery({ ...query, ...values })
	}
	const loadMore = async (): Promise<void> => {
		await fetchMore({
			variables: {
				first: PAGINATE_BY,
				after: data.products.pageInfo.endCursor
			}
		})
	}

	return (
		<MetaWrapper meta={{ title: `Поиск - ${query.q || ''}` }}>
			<Page
				products={data?.products}
				loading={loading}
				loadMore={loadMore}
				filters={query as TUrlQuery}
				setFilters={setFilters}
				attributes={categoryAttributesData?.attributes}
			/>
		</MetaWrapper>
	)
}

export default View
