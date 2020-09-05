/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteShippingMethod
// ====================================================

export interface BulkDeleteShippingMethod_shippingMethodBulkDelete_errors {
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

export interface BulkDeleteShippingMethod_shippingMethodBulkDelete {
  __typename: "ShippingMethodBulkDelete";
  errors: BulkDeleteShippingMethod_shippingMethodBulkDelete_errors[];
}

export interface BulkDeleteShippingMethod {
  /**
   * Deletes shipping prices.
   */
  shippingMethodBulkDelete: BulkDeleteShippingMethod_shippingMethodBulkDelete | null;
}

export interface BulkDeleteShippingMethodVariables {
  ids: (string | null)[];
}
