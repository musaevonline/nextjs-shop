import './scss/NewsCarousel.scss'

import React from 'react'
import { IArticleCard } from '@temp/components/ArticleCard/ArticleCard'
import { ArticleCard } from '@temp/components/ArticleCard'
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

const NewsCarousel: React.FC<{
	news: IArticleCard[]
}> = ({ news }) => {
	if (!news.length) return null

	return (
		<div className='swiper-articles'>
			<Swiper
				spaceBetween={5}
				slidesPerView={1}
				navigation
				breakpoints={breakPoints}
			>
				{news.map((node, i) => (
					<SwiperSlide key={i}>
						<div className='w-full'>
							<ArticleCard article={node} />
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}

export default NewsCarousel
