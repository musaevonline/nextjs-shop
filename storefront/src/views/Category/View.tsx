import React, { useMemo } from 'react'
import Loader from '@temp/components/Loader'
import { MetaWrapper } from '@temp/components'
import { getGraphqlIdFromDBId } from '@temp/core/utils'
import { useQuery } from '@apollo/client'
import { productsCardQuery } from '@sdk/queries/product'
import Page, { PRODUCTS_SORT_BY_ENUM } from '@temp/views/Category/Page'
import { categoryQuery } from '@sdk/queries/category'
import { attributesQuery } from '@sdk/queries/attribute'
import { Attributes, AttributesVariables } from '@sdk/queries/types/Attributes'
import { Category, CategoryVariables } from '@sdk/queries/types/Category'
import {
	ProductsCardDetails,
	ProductsCardDetailsVariables
} from '@sdk/queries/types/ProductsCardDetails'
import {
	DelimitedNumericArrayParam,
	JsonParam,
	StringParam,
	useQueryParams
} from 'use-query-params'
import { OrderDirection, ProductOrderField } from '@temp/types/globalTypes'
import { cleanTextForMeta } from '@temp/misc'
import { useRouter } from 'next/router'
import { STOREFRONT_URL } from '@temp/constants'
import { getCategoryUrl } from '@temp/app/routes'

const PAGINATE_BY = 20

export type TUrlQuery = {
	attributes?: stateAttribute[] | null
	priceRange?: number[]
	sortBy?: PRODUCTS_SORT_BY_ENUM
}

export type stateAttribute = {
	slug: string
	values: string[]
}

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
	const router = useRouter()
	const pk = router.query?.id as string
	const id = useMemo(() => getGraphqlIdFromDBId(pk, 'Category'), [
		router.query?.id
	])
	const [query, setQuery] = useQueryParams({
		sortBy: StringParam as PRODUCTS_SORT_BY_ENUM | any,
		attributes: JsonParam,
		priceRange: DelimitedNumericArrayParam
	})
	const { data: categoryResponse, loading: categoryLoading } = useQuery<
		Category,
		CategoryVariables
	>(categoryQuery, { variables: { id } })

	const { data: productsResponse, fetchMore, loading } = useQuery<
		ProductsCardDetails,
		ProductsCardDetailsVariables
	>(productsCardQuery, {
		variables: {
			first: PAGINATE_BY,
			filter: {
				categories: [id],
				attributes: query.attributes,
				price: {
					lte: query.priceRange ? query.priceRange[0] : 0,
					gte: query.priceRange ? query.priceRange[1] : 99999
				}
			},
			sortBy: getSortBy(query.sortBy),
			includeCategory: false
		},
		fetchPolicy: 'cache-first',
		nextFetchPolicy: 'cache-first',
		notifyOnNetworkStatusChange: true
		// skip:
		// 	!!categoryLoading || !!categoryResponse?.category?.children?.edges.length
	})
	const { data: categoryAttributesData } = useQuery<
		Attributes,
		AttributesVariables
	>(attributesQuery, {
		variables: {
			first: 15,
			filter: { inCategory: id }
		},
		fetchPolicy: 'cache-first',
		nextFetchPolicy: 'cache-first'
		// skip:
		// 	!!categoryLoading || !!categoryResponse?.category?.children?.edges.length
	})
	const setFilters = (values: TUrlQuery): void => {
		setQuery({ ...query, ...values })
	}

	const loadMore = async (): Promise<void> => {
		await fetchMore({
			variables: {
				first: PAGINATE_BY,
				after: productsResponse.products.pageInfo.endCursor
			}
		})
	}
	return (
		<MetaWrapper
			meta={{
				description: cleanTextForMeta(
					categoryResponse?.category?.description,
					null,
					true
				),
				title: categoryResponse?.category?.name,
				type: 'product.category',
				custom: [
					<link
						key='canonical'
						rel='canonical'
						href={
							STOREFRONT_URL +
							getCategoryUrl(router.query?.slug as string, id).slice(1)
						}
					/>
				]
			}}
		>
			{!categoryResponse && <Loader full={true} />}
			{categoryResponse && (
				<Page
					products={productsResponse?.products}
					category={categoryResponse.category}
					attributes={categoryAttributesData?.attributes}
					loadMore={loadMore}
					filters={query as TUrlQuery}
					setFilters={setFilters}
					loading={loading || categoryLoading}
				/>
			)}
		</MetaWrapper>
	)
}

export default View
