/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: Product
// ====================================================

export interface Product_attributes_attribute_values {
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

export interface Product_attributes_attribute {
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
  values: (Product_attributes_attribute_values | null)[] | null;
}

export interface Product_attributes_values {
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

export interface Product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: Product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (Product_attributes_values | null)[];
}

export interface Product_productType_variantAttributes_values {
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

export interface Product_productType_variantAttributes {
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
  values: (Product_productType_variantAttributes_values | null)[] | null;
}

export interface Product_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (Product_productType_variantAttributes | null)[] | null;
  name: string;
  hasVariants: boolean;
}

export interface Product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface Product_minimalVariantPrice {
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

export interface Product_priceRange_start {
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

export interface Product_priceRange_stop {
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

export interface Product_priceRange {
  __typename: "MoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: Product_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: Product_priceRange_stop | null;
}

export interface Product_images {
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

export interface Product_variants_priceOverride {
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

export interface Product_variants_stocks {
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

export interface Product_variants {
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
  priceOverride: Product_variants_priceOverride | null;
  /**
   * Stocks for the product variant.
   */
  stocks: (Product_variants_stocks | null)[] | null;
}

export interface Product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attributes assigned to this product.
   */
  attributes: Product_attributes[];
  productType: Product_productType;
  name: string;
  descriptionJson: any;
  category: Product_category | null;
  minimalVariantPrice: Product_minimalVariantPrice | null;
  /**
   * Product price range
   */
  priceRange: Product_priceRange | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  isPublished: boolean;
  /**
   * List of images for the product.
   */
  images: (Product_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (Product_variants | null)[] | null;
}
