/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeValueInput, ProductVariantInput, StockInput, ProductErrorCode, AttributeInputTypeEnum, StockErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: SimpleProductUpdate
// ====================================================

export interface SimpleProductUpdate_productUpdate_errors {
  __typename: "ProductError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * The error message.
   */
  message: string | null;
}

export interface SimpleProductUpdate_productUpdate_product_attributes_attribute_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface SimpleProductUpdate_productUpdate_product_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * List of attribute's values.
   */
  values: (SimpleProductUpdate_productUpdate_product_attributes_attribute_values | null)[] | null;
}

export interface SimpleProductUpdate_productUpdate_product_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface SimpleProductUpdate_productUpdate_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productUpdate_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productUpdate_product_attributes_values | null)[];
}

export interface SimpleProductUpdate_productUpdate_product_productType_variantAttributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface SimpleProductUpdate_productUpdate_product_productType_variantAttributes {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * List of attribute's values.
   */
  values: (SimpleProductUpdate_productUpdate_product_productType_variantAttributes_values | null)[] | null;
}

export interface SimpleProductUpdate_productUpdate_product_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (SimpleProductUpdate_productUpdate_product_productType_variantAttributes | null)[] | null;
  name: string;
  hasVariants: boolean;
}

export interface SimpleProductUpdate_productUpdate_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SimpleProductUpdate_productUpdate_product_minimalVariantPrice {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SimpleProductUpdate_productUpdate_product_priceRange_start {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SimpleProductUpdate_productUpdate_product_priceRange_stop {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SimpleProductUpdate_productUpdate_product_priceRange {
  __typename: "MoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: SimpleProductUpdate_productUpdate_product_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: SimpleProductUpdate_productUpdate_product_priceRange_stop | null;
}

export interface SimpleProductUpdate_productUpdate_product_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productUpdate_product_variants_priceOverride {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SimpleProductUpdate_productUpdate_product_variants_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment.
   */
  quantity: number;
  /**
   * Quantity allocated for orders
   */
  quantityAllocated: number;
}

export interface SimpleProductUpdate_productUpdate_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Override the base price of a product if necessary. A value of `null` indicates that the default product price is used.
   */
  priceOverride: SimpleProductUpdate_productUpdate_product_variants_priceOverride | null;
  /**
   * Stocks for the product variant.
   */
  stocks: (SimpleProductUpdate_productUpdate_product_variants_stocks | null)[] | null;
}

export interface SimpleProductUpdate_productUpdate_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attributes assigned to this product.
   */
  attributes: SimpleProductUpdate_productUpdate_product_attributes[];
  productType: SimpleProductUpdate_productUpdate_product_productType;
  name: string;
  slug: string;
  unit: string | null;
  descriptionJson: any;
  description: string;
  category: SimpleProductUpdate_productUpdate_product_category | null;
  minimalVariantPrice: SimpleProductUpdate_productUpdate_product_minimalVariantPrice | null;
  /**
   * Product price range
   */
  priceRange: SimpleProductUpdate_productUpdate_product_priceRange | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  isPublished: boolean;
  /**
   * List of images for the product.
   */
  images: (SimpleProductUpdate_productUpdate_product_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (SimpleProductUpdate_productUpdate_product_variants | null)[] | null;
}

export interface SimpleProductUpdate_productUpdate {
  __typename: "ProductUpdate";
  errors: SimpleProductUpdate_productUpdate_errors[];
  product: SimpleProductUpdate_productUpdate_product | null;
}

export interface SimpleProductUpdate_productVariantUpdate_errors {
  __typename: "ProductError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * The error message.
   */
  message: string | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_attributes_attribute_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * List of attribute's values.
   */
  values: (SimpleProductUpdate_productVariantUpdate_productVariant_attributes_attribute_values | null)[] | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productVariantUpdate_productVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productVariantUpdate_productVariant_attributes_values | null)[];
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_costPrice {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_priceOverride {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * List of images for the product variant.
   */
  images: (SimpleProductUpdate_productVariantUpdate_productVariant_product_variants_images | null)[] | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of images for the product.
   */
  images: (SimpleProductUpdate_productVariantUpdate_productVariant_product_images | null)[] | null;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SimpleProductUpdate_productVariantUpdate_productVariant_product_thumbnail | null;
  /**
   * List of variants for the product.
   */
  variants: (SimpleProductUpdate_productVariantUpdate_productVariant_product_variants | null)[] | null;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment.
   */
  quantity: number;
  /**
   * Quantity allocated for orders
   */
  quantityAllocated: number;
}

export interface SimpleProductUpdate_productVariantUpdate_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: SimpleProductUpdate_productVariantUpdate_productVariant_attributes[];
  /**
   * Cost price of the variant.
   */
  costPrice: SimpleProductUpdate_productVariantUpdate_productVariant_costPrice | null;
  /**
   * List of images for the product variant.
   */
  images: (SimpleProductUpdate_productVariantUpdate_productVariant_images | null)[] | null;
  name: string;
  /**
   * Override the base price of a product if necessary. A value of `null` indicates that the default product price is used.
   */
  priceOverride: SimpleProductUpdate_productVariantUpdate_productVariant_priceOverride | null;
  product: SimpleProductUpdate_productVariantUpdate_productVariant_product;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (SimpleProductUpdate_productVariantUpdate_productVariant_stocks | null)[] | null;
}

export interface SimpleProductUpdate_productVariantUpdate {
  __typename: "ProductVariantUpdate";
  errors: SimpleProductUpdate_productVariantUpdate_errors[];
  productVariant: SimpleProductUpdate_productVariantUpdate_productVariant | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_errors {
  __typename: "BulkStockError";
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * Index of an input list item that caused the error.
   */
  index: number | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_attributes_attribute_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * List of attribute's values.
   */
  values: (SimpleProductUpdate_productVariantStocksCreate_productVariant_attributes_attribute_values | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productVariantStocksCreate_productVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productVariantStocksCreate_productVariant_attributes_values | null)[];
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_costPrice {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_priceOverride {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * List of images for the product variant.
   */
  images: (SimpleProductUpdate_productVariantStocksCreate_productVariant_product_variants_images | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of images for the product.
   */
  images: (SimpleProductUpdate_productVariantStocksCreate_productVariant_product_images | null)[] | null;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SimpleProductUpdate_productVariantStocksCreate_productVariant_product_thumbnail | null;
  /**
   * List of variants for the product.
   */
  variants: (SimpleProductUpdate_productVariantStocksCreate_productVariant_product_variants | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment.
   */
  quantity: number;
  /**
   * Quantity allocated for orders
   */
  quantityAllocated: number;
}

export interface SimpleProductUpdate_productVariantStocksCreate_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: SimpleProductUpdate_productVariantStocksCreate_productVariant_attributes[];
  /**
   * Cost price of the variant.
   */
  costPrice: SimpleProductUpdate_productVariantStocksCreate_productVariant_costPrice | null;
  /**
   * List of images for the product variant.
   */
  images: (SimpleProductUpdate_productVariantStocksCreate_productVariant_images | null)[] | null;
  name: string;
  /**
   * Override the base price of a product if necessary. A value of `null` indicates that the default product price is used.
   */
  priceOverride: SimpleProductUpdate_productVariantStocksCreate_productVariant_priceOverride | null;
  product: SimpleProductUpdate_productVariantStocksCreate_productVariant_product;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (SimpleProductUpdate_productVariantStocksCreate_productVariant_stocks | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksCreate {
  __typename: "ProductVariantStocksCreate";
  errors: SimpleProductUpdate_productVariantStocksCreate_errors[];
  /**
   * Updated product variant.
   */
  productVariant: SimpleProductUpdate_productVariantStocksCreate_productVariant | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_errors {
  __typename: "StockError";
  /**
   * The error code.
   */
  code: StockErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_attributes_attribute_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * List of attribute's values.
   */
  values: (SimpleProductUpdate_productVariantStocksDelete_productVariant_attributes_attribute_values | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productVariantStocksDelete_productVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productVariantStocksDelete_productVariant_attributes_values | null)[];
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_costPrice {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_priceOverride {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * List of images for the product variant.
   */
  images: (SimpleProductUpdate_productVariantStocksDelete_productVariant_product_variants_images | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of images for the product.
   */
  images: (SimpleProductUpdate_productVariantStocksDelete_productVariant_product_images | null)[] | null;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SimpleProductUpdate_productVariantStocksDelete_productVariant_product_thumbnail | null;
  /**
   * List of variants for the product.
   */
  variants: (SimpleProductUpdate_productVariantStocksDelete_productVariant_product_variants | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment.
   */
  quantity: number;
  /**
   * Quantity allocated for orders
   */
  quantityAllocated: number;
}

export interface SimpleProductUpdate_productVariantStocksDelete_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: SimpleProductUpdate_productVariantStocksDelete_productVariant_attributes[];
  /**
   * Cost price of the variant.
   */
  costPrice: SimpleProductUpdate_productVariantStocksDelete_productVariant_costPrice | null;
  /**
   * List of images for the product variant.
   */
  images: (SimpleProductUpdate_productVariantStocksDelete_productVariant_images | null)[] | null;
  name: string;
  /**
   * Override the base price of a product if necessary. A value of `null` indicates that the default product price is used.
   */
  priceOverride: SimpleProductUpdate_productVariantStocksDelete_productVariant_priceOverride | null;
  product: SimpleProductUpdate_productVariantStocksDelete_productVariant_product;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (SimpleProductUpdate_productVariantStocksDelete_productVariant_stocks | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksDelete {
  __typename: "ProductVariantStocksDelete";
  errors: SimpleProductUpdate_productVariantStocksDelete_errors[];
  /**
   * Updated product variant.
   */
  productVariant: SimpleProductUpdate_productVariantStocksDelete_productVariant | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_errors {
  __typename: "BulkStockError";
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * Index of an input list item that caused the error.
   */
  index: number | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_attributes_attribute_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * List of attribute's values.
   */
  values: (SimpleProductUpdate_productVariantStocksUpdate_productVariant_attributes_attribute_values | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: SimpleProductUpdate_productVariantStocksUpdate_productVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (SimpleProductUpdate_productVariantStocksUpdate_productVariant_attributes_values | null)[];
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_costPrice {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_priceOverride {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * List of images for the product variant.
   */
  images: (SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_variants_images | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of images for the product.
   */
  images: (SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_images | null)[] | null;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_thumbnail | null;
  /**
   * List of variants for the product.
   */
  variants: (SimpleProductUpdate_productVariantStocksUpdate_productVariant_product_variants | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment.
   */
  quantity: number;
  /**
   * Quantity allocated for orders
   */
  quantityAllocated: number;
}

export interface SimpleProductUpdate_productVariantStocksUpdate_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: SimpleProductUpdate_productVariantStocksUpdate_productVariant_attributes[];
  /**
   * Cost price of the variant.
   */
  costPrice: SimpleProductUpdate_productVariantStocksUpdate_productVariant_costPrice | null;
  /**
   * List of images for the product variant.
   */
  images: (SimpleProductUpdate_productVariantStocksUpdate_productVariant_images | null)[] | null;
  name: string;
  /**
   * Override the base price of a product if necessary. A value of `null` indicates that the default product price is used.
   */
  priceOverride: SimpleProductUpdate_productVariantStocksUpdate_productVariant_priceOverride | null;
  product: SimpleProductUpdate_productVariantStocksUpdate_productVariant_product;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (SimpleProductUpdate_productVariantStocksUpdate_productVariant_stocks | null)[] | null;
}

export interface SimpleProductUpdate_productVariantStocksUpdate {
  __typename: "ProductVariantStocksUpdate";
  errors: SimpleProductUpdate_productVariantStocksUpdate_errors[];
  /**
   * Updated product variant.
   */
  productVariant: SimpleProductUpdate_productVariantStocksUpdate_productVariant | null;
}

export interface SimpleProductUpdate {
  /**
   * Updates an existing product.
   */
  productUpdate: SimpleProductUpdate_productUpdate | null;
  /**
   * Updates an existing variant for product.
   */
  productVariantUpdate: SimpleProductUpdate_productVariantUpdate | null;
  /**
   * Creates stocks for product variant.
   */
  productVariantStocksCreate: SimpleProductUpdate_productVariantStocksCreate | null;
  /**
   * Delete stocks from product variant.
   */
  productVariantStocksDelete: SimpleProductUpdate_productVariantStocksDelete | null;
  /**
   * Update stocks for product variant.
   */
  productVariantStocksUpdate: SimpleProductUpdate_productVariantStocksUpdate | null;
}

export interface SimpleProductUpdateVariables {
  id: string;
  attributes?: (AttributeValueInput | null)[] | null;
  publicationDate?: any | null;
  category?: string | null;
  description?: string | null;
  isPublished: boolean;
  name?: string | null;
  productVariantId: string;
  productVariantInput: ProductVariantInput;
  addStocks: StockInput[];
  deleteStocks: string[];
  updateStocks: StockInput[];
}
