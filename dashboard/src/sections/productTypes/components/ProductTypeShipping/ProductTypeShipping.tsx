import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import CardTitle from '@temp/components/CardTitle'
import { ControlledCheckbox } from '@temp/components/ControlledCheckbox'
import React from 'react'
import { useIntl } from 'react-intl'

import { WeightUnitsEnum } from '@temp/types/globalTypes'

interface ProductTypeShippingProps {
	data: {
		isShippingRequired: boolean
		weight: number | null
	}
	defaultWeightUnit: WeightUnitsEnum
	disabled: boolean
	onChange: (event: React.ChangeEvent<any>) => void
}

const ProductTypeShipping: React.FC<ProductTypeShippingProps> = ({
	data,
	defaultWeightUnit,
	disabled,
	onChange
}) => {
	const intl = useIntl()

	return (
		<Card>
			<CardTitle
				title={intl.formatMessage({
					id: 'shipping',
					defaultMessage: 'Shipping',
					description: 'product type shipping settings, section header'
				})}
			/>
			<CardContent>
				<ControlledCheckbox
					checked={data.isShippingRequired}
					disabled={disabled}
					label={intl.formatMessage({
						id: 'is_product_shippable',
						defaultMessage: 'Is this product shippable?',
						description: 'switch button'
					})}
					name='isShippingRequired'
					onChange={onChange}
				/>
				{data.isShippingRequired && (
					<TextField
						disabled={disabled}
						InputProps={{ endAdornment: <span>{defaultWeightUnit}</span> }}
						label={intl.formatMessage({
							id: 'weight',
							defaultMessage: 'Weight'
						})}
						name='weight'
						helperText={intl.formatMessage({
							id: 'used_calculate_rates_shipping',
							defaultMessage:
								'Used to calculate rates for shipping for products of this product type, when specific weight is not given'
						})}
						type='number'
						value={data.weight}
						onChange={onChange}
					/>
				)}
			</CardContent>
		</Card>
	)
}

ProductTypeShipping.displayName = 'ProductTypeShipping'
export default ProductTypeShipping
