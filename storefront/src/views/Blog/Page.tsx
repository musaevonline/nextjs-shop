import React from 'react'
import { Container } from '@material-ui/core'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import NextLink from 'next/link'
import { baseUrl } from '@temp/app/routes'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import {
	BlogArticleList_blogArticleList,
	BlogArticleList_blogArticleList_edges_node
} from '@sdk/queries/types/BlogArticleList'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import RecommendedArticles from '@temp/views/Blog/components/RecommendedArticles'
import MainArticleCard from '@temp/views/Blog/components/MainArticle'
import { BlogCategoryListWithArticles_blogCategoryList } from '@sdk/queries/types/BlogCategoryListWithArticles'
import Divider from '@material-ui/core/Divider'
import ArticleCarousel from '@temp/views/Blog/components/ArticleCarousel'
import HomeIcon from '@material-ui/icons/Home'

const useStyles = makeStyles((theme) => ({
	mainArticle: {
		paddingTop: 30,
		[theme.breakpoints.up('md')]: {
			paddingRight: 60,
			borderRight: '1px solid #E8E8E8'
		}
	},
	recommendedArticles: {
		[theme.breakpoints.up('md')]: {
			paddingLeft: 60
		},
		paddingTop: 30
	}
}))

interface IProps {
	articlesData: BlogArticleList_blogArticleList
	mainArticleData: BlogArticleList_blogArticleList_edges_node | null
	loading: boolean
	articlePage: number
	setArticlePage(page: number): void
	blogCategoriesData: BlogCategoryListWithArticles_blogCategoryList
}

const PAGINATE_BY_RECOMMENDED = 4

const Page: React.FC<IProps> = ({
	articlesData,
	loading,
	articlePage,
	setArticlePage,
	mainArticleData,
	blogCategoriesData
}) => {
	const classes = useStyles()

	const setPage = (e, page: number) => {
		setArticlePage(page)
	}

	return (
		<Container maxWidth='lg'>
			<div className='my-20'>
				<Breadcrumbs separator='/' aria-label='breadcrumb'>
					<NextLink href={baseUrl} passHref>
						<a className='flex items-center' color='inherit'>
							<HomeIcon fontSize='small' />
						</a>
					</NextLink>
					<span>Блог</span>
				</Breadcrumbs>
			</div>
			<div>
				<Card>
					<CardContent>
						<Typography variant='h4'>Блог</Typography>
						{!loading && !articlesData?.edges.length && (
							<Typography variant='h5'>Список пуст</Typography>
						)}
						{(loading || !!articlesData?.edges.length) && (
							<>
								<Grid container spacing={0}>
									<Grid
										className={classes.mainArticle}
										item
										xs={12}
										sm={12}
										md={6}
									>
										<Typography variant='subtitle1' paragraph>
											Новая
										</Typography>
										<MainArticleCard
											article={mainArticleData}
											loading={loading}
										/>
									</Grid>
									<Grid
										className={classes.recommendedArticles}
										item
										xs={12}
										sm={12}
										md={6}
									>
										<RecommendedArticles
											title='Рекомендованные'
											page={articlePage}
											handleChangePage={setPage}
											articlesData={articlesData}
											paginateBy={PAGINATE_BY_RECOMMENDED}
											loading={loading}
										/>
									</Grid>
								</Grid>
								{blogCategoriesData?.edges.map((categoryEdge, i) => {
									if (!categoryEdge.node.articles.edges.length) return null
									return (
										<React.Fragment key={i}>
											<div className='pb-10' />
											<Divider />
											<div className='pt-10' />
											<Container maxWidth='lg'>
												<ArticleCarousel category={categoryEdge.node} />
											</Container>
										</React.Fragment>
									)
								})}
							</>
						)}
					</CardContent>
				</Card>
			</div>
		</Container>
	)
}

export default Page
