/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentMethodInput, PaymentErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdatePaymentMethod
// ====================================================

export interface UpdatePaymentMethod_paymentMethodUpdate_errors {
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

export interface UpdatePaymentMethod_paymentMethodUpdate_paymentMethod {
  __typename: "PaymentMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: string;
  baseUrl: string | null;
}

export interface UpdatePaymentMethod_paymentMethodUpdate {
  __typename: "PaymentMethodUpdate";
  errors: UpdatePaymentMethod_paymentMethodUpdate_errors[];
  paymentMethod: UpdatePaymentMethod_paymentMethodUpdate_paymentMethod | null;
}

export interface UpdatePaymentMethod {
  /**
   * Updates a new payment method.
   */
  paymentMethodUpdate: UpdatePaymentMethod_paymentMethodUpdate | null;
}

export interface UpdatePaymentMethodVariables {
  id: string;
  input: PaymentMethodInput;
}
