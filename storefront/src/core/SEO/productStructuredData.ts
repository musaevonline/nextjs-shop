import {
	ProductDetails_product,
	ProductDetails_product_variants
} from '@sdk/queries/types/ProductDetails'
import { getProductUrl } from '@temp/app/routes'
import { ProductReviews_productReviews } from '@sdk/queries/types/ProductReviews'
import { STOREFRONT_URL } from '@temp/constants'
import { cleanTextForMeta } from '@temp/misc'

type TSchemaAvailability =
	| 'https://schema.org/Discontinued'
	| 'https://schema.org/InStock'
	| 'https://schema.org/InStoreOnly'
	| 'https://schema.org/LimitedAvailability'
	| 'https://schema.org/OnlineOnly'
	| 'https://schema.org/OutOfStock'
	| 'https://schema.org/PreOrder'
	| 'https://schema.org/PreSale'
	| 'https://schema.org/SoldOut'

interface ISchemaOffer {
	'@type': 'Offer'
	url: string
	price: number | string
	priceCurrency: string
	sku: string
	itemCondition: string
	priceValidUntil: Date | string
	availability: TSchemaAvailability
}
interface ISchemaAggregateOffer {
	'@type': 'AggregateOffer'
	highPrice: number
	lowPrice: number
	offerCount: number
	priceCurrency: string
	offers: ISchemaOffer[]
}

interface ISchemaReview {
	'@type': 'Review'
	datePublished: Date | string
	reviewBody: string
	name: string
	reviewRating: {
		'@type': 'Rating'
		ratingValue: number
		bestRating: number
		worstRating: number
	}
	author: {
		'@type': 'Person'
		name: string
	}
}
interface ISchemaBrand {
	'@type': 'Brand'
	name: string
}
interface ISchemaAggregateRating {
	'@type': 'AggregateRating'
	ratingValue: number
	reviewCount: number
}

export interface ISchemaProductStructuredData {
	'@context': 'https://schema.org/'
	'@type': 'Product'
	name: string
	image: string[]
	description: string
	url: string
	sku: number | string
	isbn?: string | number
	upc?: string | number
	ean?: string | number
	brand: ISchemaBrand
	review?: ISchemaReview[] | ISchemaReview
	aggregateRating?: ISchemaAggregateRating
	offers: ISchemaAggregateOffer
}

const RATING = {
	A_1: 1,
	A_2: 2,
	A_3: 3,
	A_4: 4,
	A_5: 5
}

const getReviewList = (
	review: ProductReviews_productReviews
): ISchemaReview[] => {
	if (!review) return []

	return review.edges.map((edge) => {
		const node = edge.node
		return {
			'@type': 'Review',
			name: node.title || node.userName,
			reviewBody: node.content,
			datePublished: node.createdAt
				? new Date(node.createdAt).toISOString()
				: '',
			author: {
				'@type': 'Person',
				name: node.userName
			},
			reviewRating: {
				'@type': 'Rating',
				bestRating: 5,
				worstRating: 1,
				ratingValue: RATING[node.rating]
			}
		}
	})
}

const getOffers = (
	product: ProductDetails_product,
	variants: ProductDetails_product_variants[]
): ISchemaAggregateOffer => {
	if (!variants) return null
	return {
		'@type': 'AggregateOffer',
		highPrice: product.priceRange.stop.amount,
		lowPrice: product.priceRange.start.amount,
		offerCount: variants.length,
		priceCurrency: product.priceRange.start.currency,
		offers: variants.map((variant) => ({
			'@type': 'Offer',
			availability: variant.stocks.find((stock) => stock.stockQuantity > 0)
				? 'https://schema.org/InStock'
				: 'https://schema.org/OutOfStock',
			itemCondition: 'https://schema.org/NewCondition',
			price: variant.price.amount,
			priceCurrency: variant.price.currency,
			priceValidUntil: '2029-12-31',
			sku: variant.sku,
			url: STOREFRONT_URL + getProductUrl(product.slug, product.id).slice(1)
		}))
	}
}
export const productStructuredData = (
	product: ProductDetails_product | null,
	review: ProductReviews_productReviews | null
) => {
	if (!product || !review) return null

	const data: ISchemaProductStructuredData = {
		'@context': 'https://schema.org/',
		'@type': 'Product',
		name: product.name,
		image: product.images.map((img) => img.url),
		description: cleanTextForMeta(product.description, null, true),
		url: STOREFRONT_URL + getProductUrl(product.slug, product.id).slice(1),
		sku: product.pk,
		brand: {
			'@type': 'Brand',
			name: 'СтройЛюкс'
		},
		offers: getOffers(product, product.variants)
	}

	if (review.edges.length > 0) {
		data.aggregateRating = {
			'@type': 'AggregateRating',
			ratingValue: product.rating.ratingAvg || 5,
			reviewCount: product.reviews.totalCount
		}
		data.review = getReviewList(review)
	}
	return JSON.stringify(data)
}
