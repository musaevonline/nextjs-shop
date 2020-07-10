/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeSortingInput, AttributeFilterInput, AttributeInputTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: Attributes
// ====================================================

export interface Attributes_attributes_pageInfo {
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

export interface Attributes_attributes_edges_node_values {
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

export interface Attributes_attributes_edges_node {
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
  values: (Attributes_attributes_edges_node_values | null)[] | null;
}

export interface Attributes_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Attributes_attributes_edges_node;
}

export interface Attributes_attributes {
  __typename: "AttributeCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: Attributes_attributes_pageInfo;
  edges: Attributes_attributes_edges[];
}

export interface Attributes {
  /**
   * List of the shop's attributes.
   */
  attributes: Attributes_attributes | null;
}

export interface AttributesVariables {
  first: number;
  sortBy?: AttributeSortingInput | null;
  filter?: AttributeFilterInput | null;
}
