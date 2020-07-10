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
  baseUrl: string | null;
  description: string;
}

export interface PaymentMethods_paymentMethods_edges {
  __typename: "PaymentMethodCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: PaymentMethods_paymentMethods_edges_node;
}

export interface PaymentMethods_paymentMethods {
  __typename: "PaymentMethodCountableConnection";
  edges: PaymentMethods_paymentMethods_edges[];
}

export interface PaymentMethods {
  /**
   * List of payment methods.
   */
  paymentMethods: PaymentMethods_paymentMethods | null;
}

export interface PaymentMethodsVariables {
  first: number;
}
