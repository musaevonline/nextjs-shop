import React from 'react'
import { Category_category_children_edges_node } from '@sdk/queries/types/Category'
import PlaceHolder from 'images/placeholder.svg'
import { makeStyles } from '@material-ui/core'
import { getCategoryUrl } from '@temp/app/routes'
import { Link } from 'react-router-dom'
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
				left: '-16px',
				right: '-16px',
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
	}
}))

interface CategoryCardProps {
	category: Category_category_children_edges_node
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
	const classes = useStyles()
	return (
		<div className={classes.wrapper}>
			<div className={classes.card}>
				<div>
					<Link to={getCategoryUrl(category.slug, category.id)}>
						<img
							className='max-w-full'
							src={category.backgroundImage?.url || PlaceHolder}
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
				{/*<div className='mt-10'>*/}
				{/*	<Button*/}
				{/*		type='button'*/}
				{/*		color='secondary'*/}
				{/*		variant='contained'*/}
				{/*		aria-label={'Посмотреть'}*/}
				{/*		component={Link}*/}
				{/*		to={getCategoryUrl(category.slug, category.id)}*/}
				{/*		fullWidth*/}
				{/*	>*/}
				{/*		<span className='normal-case'>Посмотреть товары</span>*/}
				{/*	</Button>*/}
				{/*</div>*/}
			</div>
		</div>
	)
}

export default CategoryCard
