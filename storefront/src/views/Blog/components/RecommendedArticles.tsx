import React from 'react'
import _ from 'lodash'
import Typography from '@material-ui/core/Typography'
import NextLink from 'next/link'
import IconButton from '@material-ui/core/IconButton'
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined'
import ThumbDownAltOutlinedIcon from '@material-ui/icons/ThumbDownAltOutlined'
import Tooltip from '@material-ui/core/Tooltip'
import Skeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/core/styles'
import { BlogArticleList_blogArticleList } from '@sdk/queries/types/BlogArticleList'
import { getBlogArticleUrl } from '@temp/app/routes'
import { dateToShortString } from '@temp/core/utils'
import { TablePagination } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
	items: {
		minHeight: 500
	},
	item: {
		display: 'flex',
		padding: '15px 0',
		borderBottom: '1px solid #DCDEDD',
		'&:first-of-type': {
			paddingTop: 0
		},
		'& > a': {
			marginRight: 24,
			flexBasis: 200,
			minWidth: 200
		},
		'&:hover $title': {
			textDecoration: 'underline',
			color: theme.palette.secondary.main
		},
		[theme.breakpoints.down('xs')]: {
			flexDirection: 'column',
			'& > a': {
				marginRight: 0
			}
		}
	},
	itemsImage: {
		width: '100%',
		[theme.breakpoints.down('xs')]: {
			marginBottom: 10
		}
	},
	itemContent: {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between'
	},
	title: {
		textDecoration: 'none',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		maxHeight: 24,
		lineHeight: '24px',
		lineClamp: 1,
		boxOrient: 'vertical',
		display: '-webkit-box'
	},
	author: {
		color: '#656969'
	},
	icons: {
		marginTop: 6,
		display: 'flex'
	},
	icon: {
		marginRight: 6,
		border: '1px solid #DCDEDD',
		// borderRadius: "100%",
		'& svg': {
			width: 14,
			height: 14
		},
		'&[data-active=true]': {
			color: '#F97B62'
		}
	},
	dateAdded: {
		color: '#656969',
		fontSize: 10
	}
}))

interface IProps {
	title: string
	page: number
	articlesData: BlogArticleList_blogArticleList
	paginateBy: number
	loading: boolean
	handleChangePage(
		event: React.MouseEvent<HTMLButtonElement> | null,
		page: number
	): void
}

const RecommendedArticles: React.FC<IProps> = ({
	title,
	page,
	articlesData,
	paginateBy,
	loading,
	handleChangePage
}) => {
	const classes = useStyles()

	const skeletonEdges = _.range(paginateBy)
	return (
		<div>
			<Typography variant='subtitle1' paragraph>
				{title}
			</Typography>
			<div className={classes.items}>
				{!articlesData?.edges.length &&
					loading &&
					skeletonEdges.map((i) => (
						<div key={i} className={classes.item}>
							<a>
								<Skeleton
									className={classes.itemsImage}
									variant='rect'
									height={110}
								/>
							</a>
							<div className={classes.itemContent}>
								<Skeleton variant='text' width='60%' />
								<Skeleton variant='text' width='50%' />
								<Skeleton variant='text' width='40%' />
							</div>
						</div>
					))}
				{articlesData?.edges.map((edge, i) => {
					const article = edge.node
					return (
						<div key={i} className={classes.item}>
							<NextLink
								href={getBlogArticleUrl(article.category.slug, article.slug)}
								passHref
							>
								<a>
									<img
										className={classes.itemsImage}
										src={article.thumbnail?.url}
										alt={article.title}
									/>
								</a>
							</NextLink>
							<div className={classes.itemContent}>
								<NextLink
									href={getBlogArticleUrl(article.category.slug, article.slug)}
									passHref
								>
									<Typography
										component={'a'}
										variant='body1'
										className={classes.title}
									>
										{article.title}
									</Typography>
								</NextLink>
								<div className={classes.dateAdded}>
									{dateToShortString(article.dateAdded)}
								</div>
								<div className={classes.author}>{article.authorName}</div>
								<div className={classes.icons}>
									<Tooltip title='More like this' enterDelay={300}>
										<IconButton
											size='small'
											className={classes.icon}
											onClick={(e) => {
												console.log('update measure like')
											}}
											data-active={false}
										>
											<ThumbUpOutlinedIcon />
										</IconButton>
									</Tooltip>

									<Tooltip title='Less like this' enterDelay={300}>
										<IconButton
											size='small'
											className={classes.icon}
											onClick={(e) => {
												console.log('update measure dislike')
											}}
											data-active={false}
										>
											<ThumbDownAltOutlinedIcon />
										</IconButton>
									</Tooltip>
								</div>
							</div>
						</div>
					)
				})}
			</div>
			<div className='paginator mt-2'>
				{!!articlesData && (
					<TablePagination
						component='div'
						count={articlesData.totalCount}
						page={page}
						onChangePage={handleChangePage}
						labelRowsPerPage={''}
						rowsPerPageOptions={[]}
						rowsPerPage={paginateBy}
					/>
				)}
			</div>
		</div>
	)
}

export default React.memo(RecommendedArticles)
