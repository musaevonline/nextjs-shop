/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: Product
// ====================================================

export interface Product_rating {
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

export interface Product_thumbnail {
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

export interface Product_priceRange_start {
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

export interface Product_priceRange_stop {
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
  values: (Product_attributes_attribute_values | null)[] | null;
}

export interface Product_attributes_values {
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

export interface Product {
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
  rating: Product_rating | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: Product_thumbnail | null;
  /**
   * Product price range
   */
  priceRange: Product_priceRange | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: Product_attributes[];
}
