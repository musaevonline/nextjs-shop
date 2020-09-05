/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteShippingRate
// ====================================================

export interface BulkDeleteShippingRate_shippingPriceBulkDelete_errors {
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

export interface BulkDeleteShippingRate_shippingPriceBulkDelete {
  __typename: "ShippingPriceBulkDelete";
  errors: BulkDeleteShippingRate_shippingPriceBulkDelete_errors[];
}

export interface BulkDeleteShippingRate {
  /**
   * Deletes shipping prices.
   */
  shippingPriceBulkDelete: BulkDeleteShippingRate_shippingPriceBulkDelete | null;
}

export interface BulkDeleteShippingRateVariables {
  ids: (string | null)[];
}
