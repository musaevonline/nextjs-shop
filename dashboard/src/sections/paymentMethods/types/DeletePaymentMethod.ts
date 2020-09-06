/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: DeletePaymentMethod
// ====================================================

export interface DeletePaymentMethod_paymentMethodDelete_errors {
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

export interface DeletePaymentMethod_paymentMethodDelete {
  __typename: "PaymentMethodDelete";
  errors: DeletePaymentMethod_paymentMethodDelete_errors[];
}

export interface DeletePaymentMethod {
  /**
   * Deletes a payment method.
   */
  paymentMethodDelete: DeletePaymentMethod_paymentMethodDelete | null;
}

export interface DeletePaymentMethodVariables {
  id: string;
}
