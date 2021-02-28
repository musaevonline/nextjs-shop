import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Rating from '@material-ui/lab/Rating'
import ModeCommentOutlinedIcon from '@material-ui/icons/ModeCommentOutlined'
import { Product } from '@sdk/fragments/types/Product'
import { getProductUrl } from '@temp/app/routes'
import { showPriceRange } from '@temp/core/utils'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import { FavoritesContext } from '@temp/components/FavoritesProvider/context'
import Tooltip from '@material-ui/core/Tooltip'
import { BsHeart, BsHeartFill } from 'react-icons/bs'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import { SvgIcon } from '@material-ui/core'
import NextLink from 'next/link'

const useStyles = makeStyles((theme) => ({
	favoritesIcon: {
		display: 'flex',
		marginLeft: 5,
		transition: 'transform .2s ease-in-out',
		'& svg': {
			fill: '#666',
			fontSize: '2rem'
		},
		'&[data-active=true] svg': {
			fill: theme.palette.secondary.main
		},
		'&:hover': {
			transform: 'scale(1.1)'
		}
	},
	productLayout: {
		boxShadow: '0 2px 5px rgba(48,48,48,.05)',
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
				boxShadow: '0 8px 25px rgba(48, 48, 48, .2)'
			}
		}
	},
	productCard: {
		position: 'relative',
		padding: '27px 16px 21px 15px',
		'&:hover $productCardSKU': {
			display: 'block'
		}
	},
	productCardSKU: {
		display: 'none',
		position: 'absolute',
		top: 0,
		left: '15px',
		right: '15px',
		color: 'grey',
		fontSize: '11px',
		textAlign: 'center'
	},
	pictures: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		overflow: 'hidden',
		width: '100%',
		height: '185px',
		userSelect: 'none',
		marginBottom: '10px',
		'& img': {
			height: '100%',
			width: '100%',
			objectFit: 'contain'
		}
	},
	labelNew: {
		width: '145px',
		top: '20px',
		left: '-35px',
		background: theme.palette.primary.main,
		fontSize: '11px',
		color: '#fff',
		padding: '10px',
		textTransform: 'uppercase',
		fontWeight: 500,
		textAlign: 'center',
		position: 'absolute',
		transform: 'rotate(-45deg)'
	},
	labelDiscount: {
		width: '145px',
		top: '20px',
		left: '-35px',
		background: theme.palette.primary.main,
		fontSize: '11px',
		color: '#fff',
		padding: '10px',
		textTransform: 'uppercase',
		fontWeight: 500,
		textAlign: 'center',
		position: 'absolute',
		transform: 'rotate(-45deg)',
		backgroundColor: theme.palette.error.main
	},
	title: {
		display: '-webkit-box',
		width: '100%',
		height: '36px',
		marginBottom: '5px',
		color: '#595959',
		fontSize: '14px',
		fontWeight: 400,
		letterSpacing: '.56px',
		textTransform: 'inherit',
		lineHeight: '18px',
		'-webkit-line-clamp': 2,
		'-webkit-box-orient': 'vertical',
		overflow: 'hidden',
		transition: 'all .3s',
		'&:hover': {
			color: ' #5285cc'
		}
	},
	additionalInfo: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'wrap'
	},
	price: {
		fontSize: '18px',
		fontWeight: 600,
		whiteSpace: 'nowrap',
		marginBottom: '10px'
	}
}))

interface ProductCardProps {
	item: Product
	isNew?: false
	isDiscount?: false
}

const ProductCard: React.FC<ProductCardProps> = ({
	item,
	isNew,
	isDiscount
}) => {
	const classes = useStyles()
	const { favorites, setFavorites } = useContext(FavoritesContext)
	const { id, name, thumbnail, priceRange, slug, pk } = item
	const toggleFavorites = (e) => {
		e.preventDefault()
		if (favorites.includes(id)) {
			const newData = favorites.filter((product) => product !== id)
			setFavorites(newData)
		} else {
			setFavorites([...favorites, id])
		}
	}
	return (
		<div className={classes.productLayout}>
			<div className={classes.productCard}>
				<div className={classes.productCardSKU}>
					<span className='product-sku__title'>Код товара: </span>
					<span className='product-sku__value'>{pk}</span>
				</div>

				<NextLink href={'/product/[slug]/[id]'} as={getProductUrl(slug, id)}>
					<Link to={getProductUrl(slug, id)}>
						<div className={classes.pictures}>
							{isNew && !isDiscount && (
								<div className={classes.labelNew}>Новинка</div>
							)}
							{isDiscount && (
								<div className={classes.labelDiscount}>Скидка 15%</div>
							)}
							<img src={thumbnail.url} alt={thumbnail.alt} />
						</div>
					</Link>
				</NextLink>

				<div>
					<Link className={classes.title} to={getProductUrl(slug, id)}>
						{name}
					</Link>
					<div className={classes.price}>{showPriceRange(priceRange)}</div>
					<div className='flex items-center justify-between'>
						<div className='flex items-center'>
							{item.rating.count > 0 && (
								<Rating
									size='small'
									name='simple-controlled'
									value={item.rating.ratingAvg}
									className='mr-5'
									readOnly
								/>
							)}
							<Tooltip title='Отзывы' enterDelay={1000}>
								<SvgIcon fontSize='small' className='mr-5'>
									<ModeCommentOutlinedIcon />
								</SvgIcon>
							</Tooltip>
							<Typography variant='caption' color='textSecondary'>
								{!!item.rating.count ? item.rating.count : 'Нет отзывов'}
							</Typography>
						</div>
						<div
							className={classNames('cursor-pointer', classes.favoritesIcon)}
							data-active={favorites.includes(id)}
							onClick={toggleFavorites}
						>
							{favorites.includes(id) ? <BsHeartFill /> : <BsHeart />}
						</div>
					</div>

					<div className='mt-10'>
						<Button
							type='button'
							color='secondary'
							variant='contained'
							aria-label={'Купить'}
							component={Link}
							to={getProductUrl(slug, id)}
							startIcon={<ShoppingCartOutlinedIcon />}
							fullWidth
						>
							<span className='normal-case'>Купить</span>
						</Button>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ProductCard
