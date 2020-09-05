/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingMethodTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ShippingMethods
// ====================================================

export interface ShippingMethods_shippingMethods_edges_node_minimumOrderPrice {
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

export interface ShippingMethods_shippingMethods_edges_node_minimumOrderWeight {
  __typename: "Weight";
  /**
   * Weight unit.
   */
  unit: string;
  /**
   * Weight value.
   */
  value: number;
}

export interface ShippingMethods_shippingMethods_edges_node_maximumOrderPrice {
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

export interface ShippingMethods_shippingMethods_edges_node_maximumOrderWeight {
  __typename: "Weight";
  /**
   * Weight unit.
   */
  unit: string;
  /**
   * Weight value.
   */
  value: number;
}

export interface ShippingMethods_shippingMethods_edges_node_price {
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

export interface ShippingMethods_shippingMethods_edges_node {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  minimumOrderPrice: ShippingMethods_shippingMethods_edges_node_minimumOrderPrice | null;
  minimumOrderWeight: ShippingMethods_shippingMethods_edges_node_minimumOrderWeight | null;
  maximumOrderPrice: ShippingMethods_shippingMethods_edges_node_maximumOrderPrice | null;
  maximumOrderWeight: ShippingMethods_shippingMethods_edges_node_maximumOrderWeight | null;
  name: string;
  price: ShippingMethods_shippingMethods_edges_node_price | null;
  /**
   * Type of the shipping method.
   */
  type: ShippingMethodTypeEnum | null;
}

export interface ShippingMethods_shippingMethods_edges {
  __typename: "ShippingMethodCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ShippingMethods_shippingMethods_edges_node;
}

export interface ShippingMethods_shippingMethods_pageInfo {
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

export interface ShippingMethods_shippingMethods {
  __typename: "ShippingMethodCountableConnection";
  edges: ShippingMethods_shippingMethods_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: ShippingMethods_shippingMethods_pageInfo;
}

export interface ShippingMethods {
  /**
   * List of the shop's shipping zones.
   */
  shippingMethods: ShippingMethods_shippingMethods | null;
}

export interface ShippingMethodsVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
