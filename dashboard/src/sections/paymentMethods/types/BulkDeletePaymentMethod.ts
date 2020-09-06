/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeletePaymentMethod
// ====================================================

export interface BulkDeletePaymentMethod_paymentMethodBulkDelete_errors {
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

export interface BulkDeletePaymentMethod_paymentMethodBulkDelete {
  __typename: "PaymentMethodBulkDelete";
  errors: BulkDeletePaymentMethod_paymentMethodBulkDelete_errors[];
}

export interface BulkDeletePaymentMethod {
  /**
   * Deletes payment prices.
   */
  paymentMethodBulkDelete: BulkDeletePaymentMethod_paymentMethodBulkDelete | null;
}

export interface BulkDeletePaymentMethodVariables {
  ids: (string | null)[];
}
