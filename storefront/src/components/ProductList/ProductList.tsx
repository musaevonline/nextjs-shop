import './scss/ProductList.scss'

import React from 'react'
import { ProductCard } from '@temp/components/ProductCard'
import { Typography } from '@material-ui/core'
import { ProductsCardDetails_products_edges } from '@sdk/queries/types/ProductsCardDetails'

interface ProductListProps {
	items: ProductsCardDetails_products_edges[]
}

const ProductList: React.FC<ProductListProps> = ({ items }) => {
	return (
		<div className='product-list'>
			<div className='flex-1 flex-wrap grid gap-10 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
				{items.map((item, i) => {
					return (
						<div key={i} className='flex flex-col'>
							<ProductCard item={item.node} />
						</div>
					)
				})}
			</div>
			{items.length === 0 && (
				<Typography variant='h5'>
					Товары по даному запросу не найдены
				</Typography>
			)}
		</div>
	)
}

export default ProductList
