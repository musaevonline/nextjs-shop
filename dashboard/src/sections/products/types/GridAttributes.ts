/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GridAttributes
// ====================================================

export interface GridAttributes_availableInGrid_edges_node {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface GridAttributes_availableInGrid_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GridAttributes_availableInGrid_edges_node;
}

export interface GridAttributes_availableInGrid_pageInfo {
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

export interface GridAttributes_availableInGrid {
  __typename: "AttributeCountableConnection";
  edges: GridAttributes_availableInGrid_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: GridAttributes_availableInGrid_pageInfo;
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface GridAttributes_grid_edges_node {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface GridAttributes_grid_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: GridAttributes_grid_edges_node;
}

export interface GridAttributes_grid {
  __typename: "AttributeCountableConnection";
  edges: GridAttributes_grid_edges[];
}

export interface GridAttributes {
  /**
   * List of the shop's attributes.
   */
  availableInGrid: GridAttributes_availableInGrid | null;
  /**
   * List of the shop's attributes.
   */
  grid: GridAttributes_grid | null;
}

export interface GridAttributesVariables {
  first: number;
  after?: string | null;
  ids: string[];
}
