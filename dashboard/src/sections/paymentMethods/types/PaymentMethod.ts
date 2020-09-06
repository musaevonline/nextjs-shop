/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PaymentMethod
// ====================================================

export interface PaymentMethod_paymentMethod {
  __typename: "PaymentMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: string;
  baseUrl: string | null;
}

export interface PaymentMethod {
  /**
   * Look up a payment method by ID.
   */
  paymentMethod: PaymentMethod_paymentMethod | null;
}

export interface PaymentMethodVariables {
  id: string;
}
