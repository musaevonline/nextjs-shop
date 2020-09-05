/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: ProductCardInfo
// ====================================================

export interface ProductCardInfo_rating {
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

export interface ProductCardInfo_thumbnail {
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

export interface ProductCardInfo_priceRange_start {
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

export interface ProductCardInfo_priceRange_stop {
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

export interface ProductCardInfo_priceRange {
  __typename: "MoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductCardInfo_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductCardInfo_priceRange_stop | null;
}

export interface ProductCardInfo_attributes_attribute_values {
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

export interface ProductCardInfo_attributes_attribute {
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
  values: (ProductCardInfo_attributes_attribute_values | null)[] | null;
}

export interface ProductCardInfo_attributes_values {
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

export interface ProductCardInfo_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductCardInfo_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductCardInfo_attributes_values | null)[];
}

export interface ProductCardInfo {
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
  rating: ProductCardInfo_rating | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductCardInfo_thumbnail | null;
  /**
   * Product price range
   */
  priceRange: ProductCardInfo_priceRange | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductCardInfo_attributes[];
}
