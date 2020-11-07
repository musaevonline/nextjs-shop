/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductFilterInput, ProductOrder } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductList
// ====================================================

export interface ProductList_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductList_products_edges_node_minimalVariantPrice {
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

export interface ProductList_products_edges_node_priceRange_start {
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

export interface ProductList_products_edges_node_priceRange_stop {
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

export interface ProductList_products_edges_node_priceRange {
  __typename: "MoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductList_products_edges_node_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductList_products_edges_node_priceRange_stop | null;
}

export interface ProductList_products_edges_node_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductList_products_edges_node_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductList_products_edges_node_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
}

export interface ProductList_products_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductList_products_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductList_products_edges_node_attributes_values | null)[];
}

export interface ProductList_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  unit: string | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductList_products_edges_node_thumbnail | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  isPublished: boolean;
  minimalVariantPrice: ProductList_products_edges_node_minimalVariantPrice | null;
  /**
   * Product price range
   */
  priceRange: ProductList_products_edges_node_priceRange | null;
  productType: ProductList_products_edges_node_productType;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductList_products_edges_node_attributes[];
}

export interface ProductList_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductList_products_edges_node;
}

export interface ProductList_products_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface ProductList_products {
  __typename: "ProductCountableConnection";
  edges: ProductList_products_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductList_products_pageInfo;
}

export interface ProductList {
  /**
   * List of the shop's products.
   */
  products: ProductList_products | null;
}

export interface ProductListVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  filter?: ProductFilterInput | null;
  sort?: ProductOrder | null;
}
