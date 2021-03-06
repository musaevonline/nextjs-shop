import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import NextLink from 'next/link'
import { BlogCategoryListWithArticles_blogCategoryList_edges_node } from '@sdk/queries/types/BlogCategoryListWithArticles'
import { getBlogCategoryUrl } from '@temp/app/routes'
import { ArticleCard } from '@temp/components/ArticleCard'
import { IArticleCard } from '@temp/components/ArticleCard/ArticleCard'
import { dateToShortString } from '@temp/core/utils'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

SwiperCore.use([Navigation])

const useStyles = makeStyles((theme) => ({
	root: {
		position: 'relative',
		paddingTop: 20
	},
	item: {
		position: 'relative',
		padding: '0 5px',
		'& a': {
			textDecoration: 'none'
		},
		'&:hover $icons': {
			opacity: 1
		}
	},
	image: {
		maxWidth: '100%',
		// objectFit: "cover",
		// height: 160,
		width: '100%',
		marginBottom: 15
	},
	author: {
		color: '#656969'
	},
	icons: {
		opacity: 0,
		position: 'absolute',
		marginTop: 6,
		display: 'flex',
		flexDirection: 'column',
		width: 28,
		right: 15,
		top: 0,
		transition: 'opacity .3s ease',
		[theme.breakpoints.down('sm')]: {
			position: 'relative',
			opacity: 1,
			flexDirection: 'row',
			width: '100%',
			marginRight: 6,
			justifyContent: 'flex-end',
			right: 0
		}
	},
	icon: {
		marginBottom: 6,
		border: '1px solid #DCDEDD',
		backgroundColor: '#fff',
		transition: 'transform .1s ease',
		'&:hover': {
			backgroundColor: '#fff',
			transform: 'scale(1.05)'
		},
		'& svg': {
			width: 14,
			height: 14
		},
		[theme.breakpoints.down('sm')]: {
			marginRight: 6,
			'&:last-of-type': {
				marginRight: 0
			},
			'& svg': {
				width: 24,
				height: 24
			}
		},
		'&[data-active=true]': {
			color: '#F97B62'
		}
	},
	title: {
		margin: '20px 0',
		height: '70px',
		display: '-webkit-box',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		'-moz-box-orient': 'vertical',
		'-moz-line-clamp': 3,
		'-webkit-box-orient': 'vertical',
		'-webkit-line-clamp': 3
	},
	dateAdded: {
		color: '#656969',
		fontSize: 10
	},
	subtitle: {
		color: '#9B9E9E',
		height: 60,
		display: '-webkit-box',
		overflow: 'hidden',
		fontSize: '14px',
		marginTop: '10px',
		lineHeight: '20px',
		marginBottom: '24px',
		textOverflow: 'ellipsis',
		'-moz-box-orient': 'vertical',
		'-moz-line-clamp': 3,
		'-webkit-box-orient': 'vertical',
		'-webkit-line-clamp': 3
	},
	header: {
		display: 'flex',
		flexWrap: 'wrap',
		alignItems: 'center',
		padding: '0 10px 10px 10px',
		width: 'calc(100% - 100px)',
		'& h6': {
			marginRight: 10,
			fontWeight: 600,
			textTransform: 'uppercase'
		},
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			alignItems: 'flex-start',
			width: '100%'
		}
	}
}))

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

interface IArticleCarouselProps {
	category: BlogCategoryListWithArticles_blogCategoryList_edges_node
}

const ArticleCarousel: React.FC<IArticleCarouselProps> = ({ category }) => {
	const classes = useStyles()

	const edges = category.articles.edges
	return (
		<div className={classes.root}>
			<div className={classes.header}>
				<Typography variant='h6'>{category.name}</Typography>
				<NextLink href={getBlogCategoryUrl(category.slug)} passHref>
					<a className='mt-5'>Еще {'>'}</a>
				</NextLink>
			</div>

			<div className='swiper-articles'>
				<Swiper
					spaceBetween={5}
					slidesPerView={1}
					navigation
					breakpoints={breakPoints}
				>
					{edges.map((edge, i) => {
						const node = edge.node
						const article: IArticleCard = {
							articleSlug: node.slug,
							id: node.id,
							categorySlug: node.category.slug,
							created: dateToShortString(node.dateAdded),
							img: node.thumbnail?.url,
							keywords: node.keywords,
							status: node.status,
							subtitle: node.subtitle,
							tags: node.tags,
							text: node.body,
							title: node.title
						}
						return (
							<SwiperSlide key={i}>
								<div className='w-full'>
									<ArticleCard article={article} />
								</div>
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>
		</div>
	)
}

export default ArticleCarousel
