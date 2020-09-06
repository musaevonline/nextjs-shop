/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PaymentErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: PaymentErrorFragment
// ====================================================

export interface PaymentErrorFragment {
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
