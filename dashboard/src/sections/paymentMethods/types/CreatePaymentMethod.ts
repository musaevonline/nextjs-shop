/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentMethodInput, PaymentErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreatePaymentMethod
// ====================================================

export interface CreatePaymentMethod_paymentMethodCreate_errors {
  __typename: "PaymentError";
  /**
   * The error code.
   */
  code: PaymentErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
}

export interface CreatePaymentMethod_paymentMethodCreate_paymentMethod {
  __typename: "PaymentMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: string;
  baseUrl: string | null;
}

export interface CreatePaymentMethod_paymentMethodCreate {
  __typename: "PaymentMethodCreate";
  errors: CreatePaymentMethod_paymentMethodCreate_errors[];
  paymentMethod: CreatePaymentMethod_paymentMethodCreate_paymentMethod | null;
}

export interface CreatePaymentMethod {
  /**
   * Creates a new payment method.
   */
  paymentMethodCreate: CreatePaymentMethod_paymentMethodCreate | null;
}

export interface CreatePaymentMethodVariables {
  input: PaymentMethodInput;
}
