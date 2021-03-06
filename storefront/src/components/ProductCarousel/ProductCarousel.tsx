import './scss/ProductCarousel.scss'

import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Thumbs, Navigation, Lazy } from 'swiper'
import { ProductDetails_product_images } from '@sdk/queries/types/ProductDetails'
import { ProductVariant_images } from '@sdk/fragments/types/ProductVariant'
import PlaceHolder from 'images/placeholder.svg'
import { Hidden } from '@material-ui/core'
import Viewer from '@temp/components/ProductCarousel/Viewer'

SwiperCore.use([Thumbs, Navigation, Lazy])

type ProductCarouselProps = {
	images: ProductDetails_product_images[] | ProductVariant_images[] | null
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ images }) => {
	const [thumbsSwiper, setThumbsSwiper] = useState(null)
	const [currImg, setCurrImg] = useState(0)
	const [isOpenViewer, setIsOpenViewer] = useState(false)
	if (!images) return null
	const onOpenViewer = (e, index) => {
		e.preventDefault()
		setCurrImg(index)
		setIsOpenViewer(true)
	}
	const isEmpty = !images.length
	const galleryImages = !!images.length
		? images.map((img) => ({
				original: img.url,
				thumbnail: img.url,
				originalAlt: img.alt,
				smallThumb: img.smallThumbnail,
				largeThumb: img.largeThumbnail,
				thumbnailClass: 'gallery-thumb',
				originalClass: 'gallery-img'
		  }))
		: [
				{
					original: PlaceHolder,
					thumbnail: PlaceHolder,
					originalAlt: 'Продукт',
					smallThumb: PlaceHolder,
					largeThumb: PlaceHolder,
					thumbnailClass: 'gallery-thumb',
					originalClass: 'gallery-img'
				}
		  ]

	return (
		<div className='product-carousel'>
			<Swiper
				thumbs={{ swiper: thumbsSwiper }}
				spaceBetween={0}
				slidesPerView={1}
				lazy={true}
				preloadImages={false}
				watchSlidesVisibility
				// navigation
			>
				{galleryImages.map((img, i) => {
					return (
						<SwiperSlide key={i}>
							<img
								src={img.largeThumb}
								alt={img.originalAlt}
								height={isEmpty ? 400 : 'auto'}
								onClick={(e) => {
									onOpenViewer(e, i)
								}}
								className='swiper-lazy'
							/>
						</SwiperSlide>
					)
				})}
			</Swiper>
			{!isEmpty && (
				<Swiper
					watchSlidesVisibility
					watchSlidesProgress
					onSwiper={setThumbsSwiper}
					spaceBetween={10}
					slidesPerView={10}
					slidesPerGroup={5}
					draggable={false}
					touchRatio={0}
					breakpoints={{
						0: {
							slidesPerView: 5,
							slidesPerGroup: 5
						},
						640: {
							slidesPerView: 10,
							slidesPerGroup: 5
						}
					}}
					freeMode
					navigation
				>
					{galleryImages.map((img, i) => {
						return (
							<SwiperSlide key={i}>
								<img
									className='h-50'
									src={img.smallThumb}
									alt={img.originalAlt}
								/>
							</SwiperSlide>
						)
					})}
				</Swiper>
			)}
			<Hidden xsDown>
				{galleryImages.length > 0 && !isEmpty && (
					<Viewer
						isOpenViewer={isOpenViewer}
						setIsOpenViewer={setIsOpenViewer}
						galleryImages={galleryImages}
						currImg={currImg}
					/>
				)}
			</Hidden>
		</div>
	)
}

export default ProductCarousel
