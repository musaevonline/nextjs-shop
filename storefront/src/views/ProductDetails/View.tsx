import React, { useContext } from 'react'
import { MetaWrapper } from '@temp/components'
import Page from '@temp/views/ProductDetails/Page'
import { useQuery } from '@apollo/client'
import { productQuery } from '@sdk/queries/product'
import { getGraphqlIdFromDBId } from '@temp/core/utils'
import { TFormProductVariantData } from '@temp/components/Forms/ProductVariantForm/ProductVariantForm'
import Loader from '@temp/components/Loader'
import {
	ProductDetails,
	ProductDetailsVariables
} from '@sdk/queries/types/ProductDetails'
import { useSnackbar } from 'notistack'
import { CheckoutContext } from '@temp/components/CheckoutProvider/context'
import {
	ProductReviews,
	ProductReviewsVariables
} from '@sdk/queries/types/ProductReviews'
import { productReviewsQuery } from '@sdk/queries/product-review'
import _ from 'lodash'
import { productStructuredData } from '@temp/core/SEO/productStructuredData'
import { categoryProducts } from '@sdk/queries/category'
import {
	CategoryProducts,
	CategoryProductsVariables
} from '@sdk/queries/types/CategoryProducts'
import { cleanTextForMeta } from '@temp/misc'
import { useRouter } from 'next/router'

const PAGINATE_BY_REVIEWS = 5

const View: React.FC = () => {
	const { enqueueSnackbar } = useSnackbar()
	const router = useRouter()
	// const { pk } = useParams<{ pk: string }>()
	const checkout = useContext(CheckoutContext)
	const id = getGraphqlIdFromDBId(router.query?.id as string, 'Product')
	const { data, loading } = useQuery<ProductDetails, ProductDetailsVariables>(
		productQuery,
		{
			variables: {
				id
			},
			fetchPolicy: 'cache-and-network',
			nextFetchPolicy: 'cache-first'
		}
	)
	const { data: reviews, loading: reviewsLoading, fetchMore } = useQuery<
		ProductReviews,
		ProductReviewsVariables
	>(productReviewsQuery, {
		variables: {
			first: PAGINATE_BY_REVIEWS,
			filter: {
				product: id
			}
		},
		skip: !data,
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first'
	})
	const { data: categoryProductsData } = useQuery<
		CategoryProducts,
		CategoryProductsVariables
	>(categoryProducts, {
		variables: {
			categoryId: data?.product.category.id,
			firstProducts: 10
		},
		skip: !data,
		fetchPolicy: 'cache-and-network',
		nextFetchPolicy: 'cache-first'
	})
	const loadMoreReviews = async (): Promise<void> => {
		await fetchMore({
			variables: {
				first: PAGINATE_BY_REVIEWS,
				after: reviews.productReviews.pageInfo.endCursor
			},
			updateQuery: (previousResult, { fetchMoreResult }) => {
				if (!fetchMoreResult) {
					return previousResult
				}
				const copy = _.cloneDeep(previousResult)
				return {
					productReviews: {
						...copy.productReviews,
						edges: [
							...copy.productReviews.edges,
							...fetchMoreResult.productReviews.edges
						],
						pageInfo: fetchMoreResult.productReviews.pageInfo
					}
				}
			}
		})
	}

	const addVariantToCheckoutSubmit = (values: TFormProductVariantData) => {
		checkout.addVariant(values)
		enqueueSnackbar(`Товар добавлен в корзину (${values.quantity}шт)`, {
			variant: 'success'
		})
	}

	const checkoutVariantQuantity = (selectedVariantId: string): number => {
		const variantInCart = checkout.checkout?.cart.find(
			(el) => el.variant === selectedVariantId
		)
		return variantInCart ? variantInCart.quantity : 0
	}
	const cleanTextFromDescription = cleanTextForMeta(
		data?.product.description,
		150,
		true
	)
	return (
		<MetaWrapper
			meta={{
				description: cleanTextFromDescription,
				title: data?.product.name || ''
			}}
		>
			{(!data || loading) && <Loader full={!data} absolute={!!data} />}
			{data?.product && (
				<>
					<script className='structured-data-list' type='application/ld+json'>
						{productStructuredData(data?.product, reviews?.productReviews)}
					</script>
					<Page
						product={data.product}
						addVariantToCheckoutSubmit={addVariantToCheckoutSubmit}
						checkoutVariantQuantity={checkoutVariantQuantity}
						reviews={reviews?.productReviews}
						reviewsLoading={reviewsLoading}
						loadMoreReviews={loadMoreReviews}
						categoryProducts={categoryProductsData?.category?.products}
					/>
				</>
			)}
		</MetaWrapper>
	)
}

export default View
