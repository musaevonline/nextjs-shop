/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductVariantBulkCreateInput, ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductVariantBulkCreate
// ====================================================

export interface ProductVariantBulkCreate_productVariantBulkCreate_errors {
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

export interface ProductVariantBulkCreate_productVariantBulkCreate {
  __typename: "ProductVariantBulkCreate";
  errors: ProductVariantBulkCreate_productVariantBulkCreate_errors[];
}

export interface ProductVariantBulkCreate {
  /**
   * Creates product variants for a given product.
   */
  productVariantBulkCreate: ProductVariantBulkCreate_productVariantBulkCreate | null;
}

export interface ProductVariantBulkCreateVariables {
  id: string;
  inputs: (ProductVariantBulkCreateInput | null)[];
}
