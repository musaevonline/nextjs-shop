/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum } from "./../../types/globalTypes";

// ====================================================
// GraphQL query operation: SearchProductTypes
// ====================================================

export interface SearchProductTypes_search_edges_node_productAttributes_values {
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

export interface SearchProductTypes_search_edges_node_productAttributes {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * List of attribute's values.
   */
  values: (SearchProductTypes_search_edges_node_productAttributes_values | null)[] | null;
}

export interface SearchProductTypes_search_edges_node {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  hasVariants: boolean;
  /**
   * Product attributes of that product type.
   */
  productAttributes: (SearchProductTypes_search_edges_node_productAttributes | null)[] | null;
}

export interface SearchProductTypes_search_edges {
  __typename: "ProductTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchProductTypes_search_edges_node;
}

export interface SearchProductTypes_search_pageInfo {
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

export interface SearchProductTypes_search {
  __typename: "ProductTypeCountableConnection";
  edges: SearchProductTypes_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchProductTypes_search_pageInfo;
}

export interface SearchProductTypes {
  /**
   * List of the shop's product types.
   */
  search: SearchProductTypes_search | null;
}

export interface SearchProductTypesVariables {
  after?: string | null;
  first: number;
  query: string;
}
