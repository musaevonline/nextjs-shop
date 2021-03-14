import React from 'react'
import { UserReviews_me_reviews } from '@sdk/queries/types/UserReviews'
import Loader from '@temp/components/Loader'
import { Typography } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import NextLink from 'next/link'
import { getProductUrl } from '@temp/app/routes'
import Rating from '@material-ui/lab/Rating'
import Button from '@material-ui/core/Button'

const RATING = {
	A_1: 1,
	A_2: 2,
	A_3: 3,
	A_4: 4,
	A_5: 5
}

const Page: React.FC<{
	reviews: UserReviews_me_reviews | null
	loading: boolean
	loadMore(): void
}> = ({ reviews, loading, loadMore }) => {
	return (
		<div>
			<div className='mb-20'>
				<Typography variant='h4'>Мои отзывы</Typography>
			</div>
			{!reviews && loading && <Loader />}
			{reviews && (
				<div>
					<Grid container spacing={1}>
						{reviews.edges.map((edge) => {
							const node = edge.node
							const product = node.orderLine.variant.product
							return (
								<Grid key={node.id} xs={12} item>
									<Card className='hover:shadow-lg'>
										<div className='flex item-center p-10'>
											<div>
												<NextLink
													href={getProductUrl(product.slug, product.id)}
													passHref
												>
													<a>
														<img
															src={node.orderLine.thumbnail.url}
															alt={node.orderLine.productName}
															className='max-w-64 rounded-sm border border-solid border-gray-300'
														/>
													</a>
												</NextLink>
											</div>
											<div className='flex-1 pl-10'>
												<div className='mb-5'>
													<NextLink
														href={getProductUrl(product.slug, product.id)}
													>
														<Typography
															component='a'
															variant='button'
															color='primary'
														>
															{node.orderLine.productName}
														</Typography>
													</NextLink>
												</div>
												<div className='text-lg font-medium mb-5'>
													{node.title}
												</div>
												<Rating
													size='small'
													name='review'
													readOnly
													value={RATING[node.rating]}
												/>
												<div>{node.content}</div>
											</div>
										</div>
									</Card>
								</Grid>
							)
						})}
					</Grid>
					{reviews?.pageInfo.hasNextPage && (
						<div className='my-20 flex justify-center'>
							<div className='w-full sm:w-512 max-w-full'>
								<Button
									variant='contained'
									color='secondary'
									onClick={loadMore}
									size='small'
									disabled={loading}
									fullWidth
								>
									Показать еще
								</Button>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Page
