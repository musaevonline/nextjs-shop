/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: productBulkPublish
// ====================================================

export interface productBulkPublish_productBulkPublish_errors {
  __typename: "ProductError";
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
   * The error message.
   */
  message: string | null;
}

export interface productBulkPublish_productBulkPublish {
  __typename: "ProductBulkPublish";
  errors: productBulkPublish_productBulkPublish_errors[];
}

export interface productBulkPublish {
  /**
   * Publish products.
   */
  productBulkPublish: productBulkPublish_productBulkPublish | null;
}

export interface productBulkPublishVariables {
  ids: string[];
  isPublished: boolean;
}
