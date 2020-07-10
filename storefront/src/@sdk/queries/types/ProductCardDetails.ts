/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductCardDetails
// ====================================================

export interface ProductCardDetails_product_rating {
  __typename: "Rating";
  /**
   * Product avg rating
   */
  ratingAvg: number | null;
  /**
   * Product rating count
   */
  count: number | null;
}

export interface ProductCardDetails_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface ProductCardDetails_product_priceRange_start {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ProductCardDetails_product_priceRange_stop {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface ProductCardDetails_product_priceRange {
  __typename: "MoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductCardDetails_product_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductCardDetails_product_priceRange_stop | null;
}

export interface ProductCardDetails_product_attributes_attribute_values {
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

export interface ProductCardDetails_product_attributes_attribute {
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
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * List of attribute's values.
   */
  values: (ProductCardDetails_product_attributes_attribute_values | null)[] | null;
}

export interface ProductCardDetails_product_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface ProductCardDetails_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductCardDetails_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductCardDetails_product_attributes_values | null)[];
}

export interface ProductCardDetails_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Primary key
   */
  pk: string | null;
  name: string;
  slug: string;
  /**
   * Product variants stock status
   */
  stockStatus: string | null;
  unit: string | null;
  description: string;
  /**
   * Product rating
   */
  rating: ProductCardDetails_product_rating | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductCardDetails_product_thumbnail | null;
  /**
   * Product price range
   */
  priceRange: ProductCardDetails_product_priceRange | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductCardDetails_product_attributes[];
}

export interface ProductCardDetails {
  /**
   * Look up a product by ID.
   */
  product: ProductCardDetails_product | null;
}

export interface ProductCardDetailsVariables {
  id: string;
}
