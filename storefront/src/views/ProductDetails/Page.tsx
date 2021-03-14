import './scss/ProductDetails.scss'

import React, { useState } from 'react'
import { Container } from '@material-ui/core'
import Link from 'next/link'
import { Element } from 'react-scroll'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { baseUrl, getCategoryUrl } from '@temp/app/routes'
import Grid from '@material-ui/core/Grid'
import { ProductCarousel } from '@temp/components/ProductCarousel'
import { ProductDetails } from '@temp/components/ProductDetails'
import { TFormProductVariantData } from '@temp/components/Forms/ProductVariantForm/ProductVariantForm'
import { ProductCard } from '@temp/components/ProductCard'
import { ProductTabs } from '@temp/components/ProductTabs'
import { ProductVariant } from '@sdk/fragments/types/ProductVariant'
import { ProductDetails_product } from '@sdk/queries/types/ProductDetails'
import CardContent from '@material-ui/core/CardContent'
import Card from '@material-ui/core/Card'
import { ProductReviews_productReviews } from '@sdk/queries/types/ProductReviews'
import Typography from '@material-ui/core/Typography'
import { CategoryProducts_category_products } from '@sdk/queries/types/CategoryProducts'
import HomeIcon from '@material-ui/icons/Home'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

SwiperCore.use([Navigation])

const breakPoints = {
	0: {
		slidesPerView: 1,
		slidesPerGroup: 1
	},
	500: {
		slidesPerView: 2,
		slidesPerGroup: 1
	},
	1024: {
		slidesPerView: 4,
		slidesPerGroup: 1
	},
	1376: {
		slidesPerView: 5,
		slidesPerGroup: 1
	}
}

const Page: React.FC<{
	product: ProductDetails_product
	addVariantToCheckoutSubmit(values: TFormProductVariantData): void
	checkoutVariantQuantity: (selectedVariantId: string) => number
	reviews: ProductReviews_productReviews | null
	reviewsLoading: boolean
	loadMoreReviews(): void
	categoryProducts: CategoryProducts_category_products
}> = ({
	product,
	addVariantToCheckoutSubmit,
	checkoutVariantQuantity,
	reviews,
	reviewsLoading,
	loadMoreReviews,
	categoryProducts
}) => {
	const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
		null
	)
	const [selectedQuantity, setSelectedQuantity] = useState<number>(1)

	const relatedProducts = categoryProducts?.edges.filter(
		(edge) => edge.node.id !== product?.id
	)

	return (
		<div className='product-page'>
			<Container maxWidth='lg'>
				<div className='mt-20 mb-10'>
					<Breadcrumbs separator='/' aria-label='breadcrumb'>
						<Link href={baseUrl} passHref>
							<a className='flex items-center' color='inherit'>
								<HomeIcon fontSize='small' />
							</a>
						</Link>
						<Link
							href={getCategoryUrl(product.category.slug, product.category.id)}
							passHref
						>
							<a color='inherit'>{product.category.name}</a>
						</Link>
						<span>{product.name}</span>
					</Breadcrumbs>
				</div>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={12} md={7}>
						<Card className='sticky top-70'>
							<CardContent>
								<div className='product-carousel'>
									<ProductCarousel
										images={
											!!selectedVariant?.images.length
												? selectedVariant?.images
												: product?.images
										}
									/>
								</div>
							</CardContent>
						</Card>
					</Grid>
					<Grid item xs={12} sm={12} md={5}>
						<Card className='sticky top-70'>
							<CardContent>
								<ProductDetails
									product={product}
									addVariantToCheckoutSubmit={addVariantToCheckoutSubmit}
									selectedVariant={selectedVariant}
									setSelectedVariant={setSelectedVariant}
									selectedQuantity={selectedQuantity}
									setSelectedQuantity={setSelectedQuantity}
									checkoutVariantQuantity={checkoutVariantQuantity}
								/>
							</CardContent>
						</Card>
					</Grid>
				</Grid>
				<Element name='reviews' className='reviews my-10'>
					<ProductTabs
						product={product}
						reviews={reviews}
						reviewsLoading={reviewsLoading}
						loadMoreReviews={loadMoreReviews}
					/>
				</Element>

				{relatedProducts?.length > 0 && (
					<Card className='mt-20'>
						<CardContent>
							<Typography variant='h1' className='text-center' gutterBottom>
								Похожие товары
							</Typography>
							<div className='separator max-w-300' />
							<div className='swiper-products'>
								<Swiper
									spaceBetween={0}
									slidesPerView={1}
									navigation
									breakpoints={breakPoints}
								>
									{relatedProducts.map((edge, i) => {
										return (
											<SwiperSlide key={i}>
												<ProductCard key={i} item={edge.node} />
											</SwiperSlide>
										)
									})}
								</Swiper>
							</div>
						</CardContent>
					</Card>
				)}
			</Container>
		</div>
	)
}

export default Page
