import { gql } from '@apollo/client'
import { productCardFragment } from '@sdk/fragments/product'
import { productVariantFragment } from '@sdk/fragments/product-variant'
import { productImageFragment } from '@sdk/fragments/product-image'

export const productQuery = gql`
	${productCardFragment}
	${productVariantFragment}
	${productImageFragment}
	query ProductDetails($id: ID!) {
		product(id: $id) {
			...ProductCardInfo
			description
			descriptionJson
			category {
				id
				name
				slug
			}
			reviews(first: 1) {
				totalCount
			}
			variants {
				...ProductVariant
			}
			images {
				...ProductImageFragment
			}
		}
	}
`
export const productCardQuery = gql`
	${productCardFragment}
	query ProductCardDetails($id: ID!) {
		product(id: $id) {
			...ProductCardInfo
		}
	}
`

export const productsCardQuery = gql`
	${productCardFragment}
	query ProductsCardDetails(
		$first: Int!
		$after: String
		$sortBy: ProductOrder
		$filter: ProductFilterInput
		$ids: [ID]
		$includeCategory: Boolean!
	) {
		products(
			first: $first
			after: $after
			sortBy: $sortBy
			filter: $filter
			ids: $ids
		) {
			pageInfo {
				endCursor
				hasNextPage
			}
			edges {
				node {
					...ProductCardInfo
					category @include(if: $includeCategory) {
						id
						name
					}
				}
			}
		}
	}
`
