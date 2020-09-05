/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: ShippingErrorFragment
// ====================================================

export interface ShippingErrorFragment {
  __typename: "ShippingError";
  /**
   * The error code.
   */
  code: ShippingErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
}
