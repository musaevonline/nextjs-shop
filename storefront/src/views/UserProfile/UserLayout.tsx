import React, { useContext } from 'react'
import {
	baseUrl,
	userProfileAddressesUrl,
	userProfileFavoritesUrl,
	userProfileOrdersUrl,
	userProfileReviewsUrl,
	userProfileSettingsUrl
} from '@temp/app/routes'
import { Container, Typography } from '@material-ui/core'
import Hidden from '@material-ui/core/Hidden'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { UserContext } from '@temp/components/User/context'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { ssrMode } from '@temp/constants'

enum BREADCRUMB_TITLE {
	SETTINGS = 'Личные данные',
	ADDRESSES = 'Список адресов',
	FAVORITES = 'Избранное',
	ORDERS = 'Мои заказы',
	REVIEWS = 'Мои отзывы'
}

const useStyles = makeStyles((theme) => ({
	link: {
		marginTop: 10,
		marginBottom: 10,
		'& a': {
			cursor: 'pointer',
			display: 'block',
			'&:hover': {
				color: theme.palette.primary.main
			}
		}
	},
	menu: {
		top: 20,
		marginRight: 24,
		height: 300,
		position: 'sticky'
	}
}))

const UserLayout: React.FC = ({ children }) => {
	const classes = useStyles()
	const router = useRouter()
	const user = useContext(UserContext)

	const getBreadcrumbName = (): string => {
		const pathName = router.pathname
		if (pathName.includes(userProfileSettingsUrl)) {
			return BREADCRUMB_TITLE.SETTINGS
		} else if (pathName.includes(userProfileAddressesUrl)) {
			return BREADCRUMB_TITLE.ADDRESSES
		} else if (pathName.includes(userProfileFavoritesUrl)) {
			return BREADCRUMB_TITLE.FAVORITES
		} else if (pathName.includes(userProfileOrdersUrl)) {
			return BREADCRUMB_TITLE.ORDERS
		} else if (pathName.includes(userProfileReviewsUrl)) {
			return BREADCRUMB_TITLE.REVIEWS
		}
		return BREADCRUMB_TITLE.SETTINGS
	}
	if (!user.user && !user.loading) {
		if (!ssrMode) {
			router.push(baseUrl)
		}
		return null
	}
	return (
		<>
			<Container maxWidth='lg'>
				<div className='my-20'>
					<Breadcrumbs separator='/' aria-label='breadcrumb'>
						<NextLink href={baseUrl} passHref>
							<a color='inherit'>Главная</a>
						</NextLink>
						<span>{getBreadcrumbName()}</span>
					</Breadcrumbs>
				</div>
				<div className='flex'>
					<Hidden smDown>
						<Card className={classes.menu}>
							<CardContent>
								<div className='w-200'>
									<div className={classes.link}>
										<NextLink href={userProfileSettingsUrl} passHref>
											<Typography
												variant='subtitle2'
												color={
													getBreadcrumbName() === BREADCRUMB_TITLE.SETTINGS
														? 'primary'
														: 'inherit'
												}
												component='a'
											>
												Личные данные
											</Typography>
										</NextLink>
									</div>
									<Divider variant='fullWidth' />
									<div className={classes.link}>
										<NextLink href={userProfileAddressesUrl} passHref>
											<Typography
												variant='subtitle2'
												color={
													getBreadcrumbName() === BREADCRUMB_TITLE.ADDRESSES
														? 'primary'
														: 'inherit'
												}
												component='a'
											>
												Мой список адресов
											</Typography>
										</NextLink>
									</div>
									<Divider variant='fullWidth' />
									<div className={classes.link}>
										<NextLink href={userProfileFavoritesUrl} passHref>
											<Typography
												variant='subtitle2'
												className={classes.link}
												color={
													getBreadcrumbName() === BREADCRUMB_TITLE.FAVORITES
														? 'primary'
														: 'inherit'
												}
												component='a'
											>
												Избранное
											</Typography>
										</NextLink>
									</div>
									<Divider variant='fullWidth' />
									<div className={classes.link}>
										<NextLink href={userProfileOrdersUrl} passHref>
											<Typography
												variant='subtitle2'
												className={classes.link}
												color={
													getBreadcrumbName() === BREADCRUMB_TITLE.ORDERS
														? 'primary'
														: 'inherit'
												}
												component='a'
											>
												Мои заказы
											</Typography>
										</NextLink>
									</div>
									<Divider variant='fullWidth' />
									<div className={classes.link}>
										<NextLink href={userProfileReviewsUrl} passHref>
											<Typography
												variant='subtitle2'
												className={classes.link}
												color={
													getBreadcrumbName() === BREADCRUMB_TITLE.REVIEWS
														? 'primary'
														: 'inherit'
												}
												component='a'
											>
												Мои отзывы
											</Typography>
										</NextLink>
									</div>
									<Divider variant='fullWidth' />
								</div>
							</CardContent>
						</Card>
					</Hidden>
					<div className='flex-1'>{children}</div>
				</div>
			</Container>
		</>
	)
}

export default UserLayout
