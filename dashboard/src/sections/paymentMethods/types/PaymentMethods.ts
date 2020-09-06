/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PaymentMethods
// ====================================================

export interface PaymentMethods_paymentMethods_edges_node {
  __typename: "PaymentMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: string;
  baseUrl: string | null;
}

export interface PaymentMethods_paymentMethods_edges {
  __typename: "PaymentMethodCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: PaymentMethods_paymentMethods_edges_node;
}

export interface PaymentMethods_paymentMethods_pageInfo {
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

export interface PaymentMethods_paymentMethods {
  __typename: "PaymentMethodCountableConnection";
  edges: PaymentMethods_paymentMethods_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: PaymentMethods_paymentMethods_pageInfo;
}

export interface PaymentMethods {
  /**
   * List of payment methods.
   */
  paymentMethods: PaymentMethods_paymentMethods | null;
}

export interface PaymentMethodsVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
