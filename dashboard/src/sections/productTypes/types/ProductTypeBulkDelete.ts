/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductTypeBulkDelete
// ====================================================

export interface ProductTypeBulkDelete_productTypeBulkDelete_productErrors {
  __typename: "ProductError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * The error message.
   */
  message: string | null;
}

export interface ProductTypeBulkDelete_productTypeBulkDelete {
  __typename: "ProductTypeBulkDelete";
  productErrors: ProductTypeBulkDelete_productTypeBulkDelete_productErrors[];
}

export interface ProductTypeBulkDelete {
  /**
   * Deletes product types.
   */
  productTypeBulkDelete: ProductTypeBulkDelete_productTypeBulkDelete | null;
}

export interface ProductTypeBulkDeleteVariables {
  ids: (string | null)[];
}
