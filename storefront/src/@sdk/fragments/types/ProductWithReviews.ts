/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum, ProductReviewRating, ProductReviewStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: ProductWithReviews
// ====================================================

export interface ProductWithReviews_rating {
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

export interface ProductWithReviews_thumbnail {
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

export interface ProductWithReviews_priceRange_start {
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

export interface ProductWithReviews_priceRange_stop {
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

export interface ProductWithReviews_priceRange {
  __typename: "MoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductWithReviews_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductWithReviews_priceRange_stop | null;
}

export interface ProductWithReviews_attributes_attribute_values {
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

export interface ProductWithReviews_attributes_attribute {
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
  values: (ProductWithReviews_attributes_attribute_values | null)[] | null;
}

export interface ProductWithReviews_attributes_values {
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

export interface ProductWithReviews_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductWithReviews_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductWithReviews_attributes_values | null)[];
}

export interface ProductWithReviews_reviews_edges_node {
  __typename: "ProductReview";
  /**
   * The ID of the object.
   */
  id: string;
  content: string;
  rating: ProductReviewRating;
  title: string;
  status: ProductReviewStatus;
  createdAt: any;
  updatedAt: any;
  advantages: any;
  flaws: any;
  userName: string | null;
  /**
   * The URL of the image.
   */
  userAvatar: string | null;
}

export interface ProductWithReviews_reviews_edges {
  __typename: "ProductReviewCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductWithReviews_reviews_edges_node;
}

export interface ProductWithReviews_reviews {
  __typename: "ProductReviewCountableConnection";
  edges: ProductWithReviews_reviews_edges[];
}

export interface ProductWithReviews {
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
  rating: ProductWithReviews_rating | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductWithReviews_thumbnail | null;
  /**
   * Product price range
   */
  priceRange: ProductWithReviews_priceRange | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductWithReviews_attributes[];
  /**
   * List of the shop's product reviews.
   */
  reviews: ProductWithReviews_reviews | null;
}
