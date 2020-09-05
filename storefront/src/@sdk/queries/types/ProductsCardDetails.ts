/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductOrder, ProductFilterInput, AttributeInputTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductsCardDetails
// ====================================================

export interface ProductsCardDetails_products_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface ProductsCardDetails_products_edges_node_rating {
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

export interface ProductsCardDetails_products_edges_node_thumbnail {
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

export interface ProductsCardDetails_products_edges_node_priceRange_start {
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

export interface ProductsCardDetails_products_edges_node_priceRange_stop {
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

export interface ProductsCardDetails_products_edges_node_priceRange {
  __typename: "MoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductsCardDetails_products_edges_node_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductsCardDetails_products_edges_node_priceRange_stop | null;
}

export interface ProductsCardDetails_products_edges_node_attributes_attribute_values {
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

export interface ProductsCardDetails_products_edges_node_attributes_attribute {
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
  values: (ProductsCardDetails_products_edges_node_attributes_attribute_values | null)[] | null;
}

export interface ProductsCardDetails_products_edges_node_attributes_values {
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

export interface ProductsCardDetails_products_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductsCardDetails_products_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductsCardDetails_products_edges_node_attributes_values | null)[];
}

export interface ProductsCardDetails_products_edges_node {
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
  rating: ProductsCardDetails_products_edges_node_rating | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductsCardDetails_products_edges_node_thumbnail | null;
  /**
   * Product price range
   */
  priceRange: ProductsCardDetails_products_edges_node_priceRange | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductsCardDetails_products_edges_node_attributes[];
}

export interface ProductsCardDetails_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductsCardDetails_products_edges_node;
}

export interface ProductsCardDetails_products {
  __typename: "ProductCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductsCardDetails_products_pageInfo;
  edges: ProductsCardDetails_products_edges[];
}

export interface ProductsCardDetails {
  /**
   * List of the shop's products.
   */
  products: ProductsCardDetails_products | null;
}

export interface ProductsCardDetailsVariables {
  first: number;
  after?: string | null;
  sortBy?: ProductOrder | null;
  filter?: ProductFilterInput | null;
  ids?: (string | null)[] | null;
}
