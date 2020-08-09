/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchOrderVariant
// ====================================================

export interface SearchOrderVariant_search_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SearchOrderVariant_search_edges_node_variants_price {
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

export interface SearchOrderVariant_search_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * Override the base price of a product.
   */
  price: SearchOrderVariant_search_edges_node_variants_price | null;
}

export interface SearchOrderVariant_search_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: SearchOrderVariant_search_edges_node_thumbnail | null;
  /**
   * List of variants for the product.
   */
  variants: (SearchOrderVariant_search_edges_node_variants | null)[] | null;
}

export interface SearchOrderVariant_search_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchOrderVariant_search_edges_node;
}

export interface SearchOrderVariant_search_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface SearchOrderVariant_search {
  __typename: "ProductCountableConnection";
  edges: SearchOrderVariant_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchOrderVariant_search_pageInfo;
}

export interface SearchOrderVariant {
  /**
   * List of the shop's products.
   */
  search: SearchOrderVariant_search | null;
}

export interface SearchOrderVariantVariables {
  first: number;
  query: string;
  after?: string | null;
}
