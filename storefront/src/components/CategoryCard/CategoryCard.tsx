import React from 'react'
import { Category_category_children_edges_node } from '@sdk/queries/types/Category'
import PlaceHolder from 'images/placeholder.svg'
import { makeStyles, Theme, withStyles } from '@material-ui/core'
import { getCategoryUrl } from '@temp/app/routes'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import Tooltip from '@material-ui/core/Tooltip'
// import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
	wrapper: {
		boxShadow: '0 2px 5px rgb(48 48 48 / 5%)',
		borderRadius: '2px',
		backgroundColor: '#fff',
		marginRight: '4px',
		marginBottom: '3px',
		fontSize: 0,
		position: 'relative',
		width: '100%',
		'&:hover': {
			zIndex: 2,
			'&:before': {
				content: "''",
				display: 'block',
				position: 'absolute',
				top: '-8px',
				left: '-5px',
				right: '-5px',
				bottom: 0,
				background: '#fff',
				borderRadius: '3px 3px 0 0',
				boxShadow: '0 8px 25px rgb(48 48 48 / 20%)'
			}
		}
	},
	card: {
		position: 'relative',
		padding: '27px 16px 21px 15px'
	},
	title: {
		display: '-webkit-box',
		width: '100%',
		height: '36px',
		marginBottom: '5px',
		color: '#595959',
		fontSize: '16px',
		fontWeight: 600,
		letterSpacing: '.56px',
		textTransform: 'inherit',
		lineHeight: '18px',
		'-webkit-line-clamp': 2,
		'-webkit-box-orient': 'vertical',
		overflow: 'hidden',
		transition: 'all .3s',
		'&:hover': {
			color: '#5285cc'
		}
	},
	categoryDescription: {
		color: '#595959',
		fontSize: '14px',
		lineHeight: '14px',
		textAlign: 'center'
	},
	imgWrapper: {
		'& img': {
			width: '100%',
			objectFit: 'contain',
			objectPosition: 'center',
			height: '200px'
		}
	}
}))

const HtmlTooltip = withStyles((theme: Theme) => ({
	tooltip: {
		backgroundColor: '#f5f5f9',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: theme.breakpoints.width('lg'),
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9'
	}
}))(Tooltip)

interface CategoryCardProps {
	category: Category_category_children_edges_node
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
	const classes = useStyles()
	return (
		<div className={classes.wrapper}>
			<HtmlTooltip
				title={
					<React.Fragment>
						<div
							className={classes.categoryDescription}
							dangerouslySetInnerHTML={{
								__html: DOMPurify.sanitize(category.description)
							}}
						/>
					</React.Fragment>
				}
				placement='bottom'
				arrow
				enterDelay={1000}
				enterNextDelay={500}
				disableHoverListener={!category.description}
			>
				<div className={classes.card}>
					<div className={classes.imgWrapper}>
						<Link to={getCategoryUrl(category.slug, category.id)}>
							<img
								className='max-w-full'
								src={category.thumbnailSm?.url || PlaceHolder}
								alt={category.name}
							/>
						</Link>
					</div>

					<div className='text-center'>
						<Link
							to={getCategoryUrl(category.slug, category.id)}
							className={classes.title}
						>
							{category.name}
						</Link>
					</div>
				</div>
			</HtmlTooltip>
		</div>
	)
}

export default CategoryCard
