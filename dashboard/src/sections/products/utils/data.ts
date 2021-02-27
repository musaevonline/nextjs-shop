import { MultiAutocompleteChoiceType } from '@temp/components/MultiAutocompleteSelectField'
import { SingleAutocompleteChoiceType } from '@temp/components/SingleAutocompleteSelectField'
import { FormsetAtomicData } from '@temp/hooks/useFormset'
import { maybe } from '@temp/misc'
import {
	ProductDetails_product,
	ProductDetails_product_variants
} from '@temp/sections/products/types/ProductDetails'
import { SearchProductTypes_search_edges_node_productAttributes } from '@temp/searches/types/SearchProductTypes'
import { StockInput } from '@temp/types/globalTypes'

import { ProductAttributeInput } from '../components/ProductAttributes'
import { ProductStockInput } from '../components/ProductStocks'
import { VariantAttributeInput } from '../components/ProductVariantAttributes'
import { ProductVariant } from '../types/ProductVariant'
import { ProductVariantCreateData_product } from '../types/ProductVariantCreateData'

interface Node {
	id: string
	name: string
}

export interface ProductType {
	hasVariants: boolean
	id: string
	name: string
	productAttributes: SearchProductTypes_search_edges_node_productAttributes[]
}

export function getAttributeInputFromProduct(
	product: ProductDetails_product
): ProductAttributeInput[] {
	return maybe(
		(): ProductAttributeInput[] =>
			product.attributes.map((attribute) => ({
				data: {
					inputType: attribute.attribute.inputType,
					isRequired: attribute.attribute.valueRequired,
					values: attribute.attribute.values
				},
				id: attribute.attribute.id,
				label: attribute.attribute.name,
				value: attribute.values.map((value) => value.slug)
			})),
		[]
	)
}

export interface ProductAttributeValueChoices {
	id: string
	values: MultiAutocompleteChoiceType[]
}
export function getSelectedAttributesFromProduct(
	product: ProductDetails_product
): ProductAttributeValueChoices[] {
	return maybe(
		() =>
			product.attributes.map((attribute) => ({
				id: attribute.attribute.id,
				values: attribute.values.map((value) => ({
					label: value.name,
					value: value.slug
				}))
			})),
		[]
	)
}

export function getAttributeInputFromProductType(
	productType: ProductType
): ProductAttributeInput[] {
	return productType.productAttributes.map((attribute) => ({
		data: {
			inputType: attribute.inputType,
			isRequired: attribute.valueRequired,
			values: attribute.values
		},
		id: attribute.id,
		label: attribute.name,
		value: []
	}))
}

export function getAttributeInputFromVariant(
	variant: ProductVariant
): VariantAttributeInput[] {
	return maybe(
		(): VariantAttributeInput[] =>
			variant.attributes.map((attribute) => ({
				data: {
					values: attribute.attribute.values
				},
				id: attribute.attribute.id,
				label: attribute.attribute.name,
				value: maybe(() => attribute.values[0].slug, null)
			})),
		[]
	)
}

export function getStockInputFromVariant(
	variant: ProductVariant
): ProductStockInput[] {
	return (
		variant?.stocks.map((stock) => ({
			data: null,
			id: stock.id,
			label: stock.id,
			value: stock.quantity.toString()
		})) || []
	)
}

export function getVariantAttributeInputFromProduct(
	product: ProductVariantCreateData_product
): VariantAttributeInput[] {
	return maybe(() =>
		product.productType.variantAttributes.map((attribute) => ({
			data: {
				values: attribute.values
			},
			id: attribute.id,
			label: attribute.name,
			value: ''
		}))
	)
}

export function getStockInputFromProduct(
	product: ProductDetails_product
): ProductStockInput[] {
	return product?.variants[0]?.stocks.map((stock) => ({
		data: null,
		id: stock.id,
		label: stock.id,
		value: stock.quantity.toString()
	}))
}

export function getChoices(nodes: Node[]): SingleAutocompleteChoiceType[] {
	return maybe(
		() =>
			nodes.map((node) => ({
				label: node.name,
				value: node.id
			})),
		[]
	)
}

export interface ProductUpdatePageFormData {
	category: string | null
	description: string
	isPublished: boolean
	name: string
	slug: string
	unit: string
	publicationDate: string
	sku: string
}

export function getProductUpdatePageFormData(
	product: ProductDetails_product,
	variants: ProductDetails_product_variants[]
): ProductUpdatePageFormData {
	return {
		category: maybe(() => product.category.id, ''),
		description: maybe(() => product.description, ''),
		isPublished: maybe(() => product.isPublished, false),
		name: maybe(() => product.name, ''),
		slug: maybe(() => product.slug, ''),
		unit: maybe(() => product.unit, ''),
		publicationDate: '',
		sku: maybe(
			() =>
				product.productType.hasVariants
					? undefined
					: variants && variants[0]
					? variants[0].sku
					: undefined,
			''
		)
	}
}

export function mapFormsetStockToStockInput(
	stock: FormsetAtomicData<null, string>
): StockInput {
	return {
		quantity: parseInt(stock.value, 10),
		id: stock.id
	}
}
