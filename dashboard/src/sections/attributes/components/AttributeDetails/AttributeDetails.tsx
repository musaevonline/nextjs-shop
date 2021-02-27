import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import { ProductErrorFragment } from '@temp/sections/products/types/ProductErrorFragment'
import CardTitle from '@temp/components/CardTitle'
import ControlledCheckbox from '@temp/components/ControlledCheckbox'
import FormSpacer from '@temp/components/FormSpacer'
import SingleSelectField from '@temp/components/SingleSelectField'
import { commonMessages } from '@temp/intl'
import { AttributeInputTypeEnum } from '@temp/types/globalTypes'
import { getFormErrors, getProductErrorMessage } from '@temp/utils/errors'
import React from 'react'
import { useIntl } from 'react-intl'

import { getAttributeSlugErrorMessage } from '../../errors'
import { AttributePageFormData } from '../AttributePage'
import { slugifyStr } from '@temp/core/utils'

export interface AttributeDetailsProps {
	canChangeType: boolean
	data: AttributePageFormData
	disabled: boolean
	errors: ProductErrorFragment[]
	onChange: (event: React.ChangeEvent<any>) => void
}

const AttributeDetails: React.FC<AttributeDetailsProps> = ({
	canChangeType,
	data,
	disabled,
	errors,
	onChange,
}) => {
	const intl = useIntl()
	const inputTypeChoices = [
		{
			label: intl.formatMessage({
				id: 'dropdown',
				defaultMessage: 'Dropdown',
				description: 'shop attribute type',
			}),
			value: AttributeInputTypeEnum.DROPDOWN,
		},
		{
			label: intl.formatMessage({
				id: 'multiple_select',
				defaultMessage: 'Multiple Select',
				description: 'shop attribute type',
			}),
			value: AttributeInputTypeEnum.MULTISELECT,
		},
	]

	const formErrors = getFormErrors(['name', 'slug', 'inputType'], errors)

	const handleChangeName = (e) => {
		onChange(e)
		onChange({
			target: {
				name: 'slug',
				value: slugifyStr(e.target.value).toLowerCase(),
			},
		} as any)
	}

	return (
		<Card>
			<CardTitle
				title={intl.formatMessage(commonMessages.generalInformation)}
			/>
			<CardContent>
				<TextField
					disabled={disabled}
					error={!!formErrors.name}
					label={intl.formatMessage({
						id: 'default_label',
						defaultMessage: 'Default Label',
						description: "attribute's label",
					})}
					name={'name' as keyof AttributePageFormData}
					fullWidth
					helperText={getProductErrorMessage(formErrors.name, intl)}
					value={data.name}
					onChange={handleChangeName}
				/>
				<FormSpacer />
				<TextField
					disabled={disabled}
					error={!!formErrors.slug}
					label={intl.formatMessage({
						id: 'attribute_code',
						defaultMessage: 'Attribute Code',
						description: "attribute's slug short code label",
					})}
					name={'slug' as keyof AttributePageFormData}
					placeholder={slugifyStr(data.name).toLowerCase()}
					fullWidth
					helperText={
						getAttributeSlugErrorMessage(formErrors.slug, intl) ||
						intl.formatMessage({
							id: 'used_internally',
							defaultMessage:
								'This is used internally. Make sure you don’t use spaces',
							description: 'attribute slug input field helper text',
						})
					}
					value={data.slug}
					onChange={onChange}
				/>
				<FormSpacer />
				<SingleSelectField
					choices={inputTypeChoices}
					disabled={disabled || !canChangeType}
					error={!!formErrors.inputType}
					hint={getProductErrorMessage(formErrors.inputType, intl)}
					label={intl.formatMessage({
						id: 'catalog_input_type',
						defaultMessage: 'Catalog Input type for Store Owner',
						description: "attribute's editor component",
					})}
					name='inputType'
					onChange={onChange}
					value={data.inputType}
				/>
				<FormSpacer />
				<ControlledCheckbox
					name={'valueRequired' as keyof AttributePageFormData}
					label={intl.formatMessage({
						id: 'value_required',
						defaultMessage: 'Value Required',
						description: 'check to require attribute to have value',
					})}
					checked={data.valueRequired}
					onChange={onChange}
					disabled={disabled}
				/>
			</CardContent>
		</Card>
	)
}
AttributeDetails.displayName = 'AttributeDetails'
export default AttributeDetails
