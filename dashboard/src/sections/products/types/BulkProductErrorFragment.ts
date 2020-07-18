/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: BulkProductErrorFragment
// ====================================================

export interface BulkProductErrorFragment {
  __typename: "BulkProductError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * Index of an input list item that caused the error.
   */
  index: number | null;
}
