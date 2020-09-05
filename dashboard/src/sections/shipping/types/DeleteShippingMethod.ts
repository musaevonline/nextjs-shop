/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteShippingMethod
// ====================================================

export interface DeleteShippingMethod_shippingMethodDelete_errors {
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

export interface DeleteShippingMethod_shippingMethodDelete {
  __typename: "ShippingMethodDelete";
  errors: DeleteShippingMethod_shippingMethodDelete_errors[];
}

export interface DeleteShippingMethod {
  /**
   * Deletes a shipping method.
   */
  shippingMethodDelete: DeleteShippingMethod_shippingMethodDelete | null;
}

export interface DeleteShippingMethodVariables {
  id: string;
}
