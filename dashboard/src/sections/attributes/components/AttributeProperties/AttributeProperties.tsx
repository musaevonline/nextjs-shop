import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { ProductErrorFragment } from '@temp/sections/products/types/ProductErrorFragment'
import CardSpacer from '@temp/components/CardSpacer'
import CardTitle from '@temp/components/CardTitle'
import ControlledCheckbox from '@temp/components/ControlledCheckbox'
import FormSpacer from '@temp/components/FormSpacer'
import Hr from '@temp/components/Hr'
import { commonMessages } from '@temp/intl'
import { getFormErrors, getProductErrorMessage } from '@temp/utils/errors'
import React from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { AttributePageFormData } from '../AttributePage'

export interface AttributePropertiesProps {
	data: AttributePageFormData
	disabled: boolean
	errors: ProductErrorFragment[]
	onChange: (event: React.ChangeEvent<any>) => void
}

const AttributeProperties: React.FC<AttributePropertiesProps> = ({
	data,
	errors,
	disabled,
	onChange,
}) => {
	const intl = useIntl()

	const formErrors = getFormErrors(['storefrontSearchPosition'], errors)

	return (
		<Card>
			<CardTitle title={intl.formatMessage(commonMessages.properties)} />
			<CardContent>
				{/* <Typography variant="subtitle1">
          <FormattedMessage
            defaultMessage="General Properties"
            description="attribute general properties section"

          />
        </Typography>
        <Hr />
        <CardSpacer />
        <ControlledSwitch
          name={"" as keyof AttributePageFormData}
          checked={false}
          disabled={disabled}
          label={
            <>
              <FormattedMessage
                defaultMessage="Variant Attribute"
                description="attribute is variant-only"

              />
              <Typography variant="caption" component='div'>
                <FormattedMessage
                  defaultMessage="If enabled, you'll be able to use this attribute to create shop variants"

                />
              </Typography>
            </>
          }
          onChange={onChange}
        /> */}

				<Typography variant='subtitle1'>
					<FormattedMessage
						id='storefront_properties'
						defaultMessage='Storefront Properties'
						description='attribute properties regarding storefront'
					/>
				</Typography>
				<Hr />
				<ControlledCheckbox
					name={'filterableInStorefront' as keyof FormData}
					label={intl.formatMessage({
						id: 'used_faceted_navigation',
						defaultMessage: 'Use in Faceted Navigation',
						description: 'attribute is filterable in storefront',
					})}
					checked={data.filterableInStorefront}
					onChange={onChange}
					disabled={disabled}
				/>
				<FormSpacer />
				{data.filterableInStorefront && (
					<TextField
						disabled={disabled}
						error={!!formErrors.storefrontSearchPosition}
						fullWidth
						helperText={getProductErrorMessage(
							formErrors.storefrontSearchPosition,
							intl
						)}
						name={'storefrontSearchPosition' as keyof AttributePageFormData}
						label={intl.formatMessage({
							id: 'position_faceted_navigation',
							defaultMessage: 'Position in faceted navigation',
							description: 'attribute position in storefront filters',
						})}
						value={data.storefrontSearchPosition}
						onChange={onChange}
					/>
				)}
				<FormSpacer />
				<ControlledCheckbox
					name={'visibleInStorefront' as keyof FormData}
					label={intl.formatMessage({
						id: 'visible_in_storefront',
						defaultMessage: 'Visible on Product Page in Storefront',
						description: 'attribute',
					})}
					checked={data.visibleInStorefront}
					onChange={onChange}
					disabled={disabled}
				/>
				<CardSpacer />
				<Typography variant='subtitle1'>
					<FormattedMessage
						id='dashboard_properties'
						defaultMessage='Dashboard Properties'
						description='attribute properties regarding dashboard'
					/>
				</Typography>
				<Hr />
				<CardSpacer />
				<ControlledCheckbox
					name={'filterableInDashboard' as keyof FormData}
					label={
						<>
							<FormattedMessage
								id='use_in_filtering'
								defaultMessage='Use in Filtering'
								description='use attribute in filtering'
							/>
							<Typography variant='caption' component='div'>
								<FormattedMessage
									id='able_use_attribute_to_filter'
									defaultMessage='If enabled, you’ll be able to use this attribute to filter products in product list.'
								/>
							</Typography>
						</>
					}
					checked={data.filterableInDashboard}
					onChange={onChange}
					disabled={disabled}
				/>
				<FormSpacer />
				<ControlledCheckbox
					name={'availableInGrid' as keyof FormData}
					label={
						<>
							<FormattedMessage
								id='add_to_column_options'
								defaultMessage='Add to Column Options'
								description='add attribute as column in product list table'
							/>
							<Typography variant='caption' component='div'>
								<FormattedMessage
									id='attribute_can_be_used_as_column'
									defaultMessage='If enabled this attribute can be used as a column in product table.'
								/>
							</Typography>
						</>
					}
					checked={data.availableInGrid}
					onChange={onChange}
					disabled={disabled}
				/>
			</CardContent>
		</Card>
	)
}
AttributeProperties.displayName = 'AttributeProperties'
export default AttributeProperties
