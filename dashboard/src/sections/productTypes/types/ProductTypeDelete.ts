/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductTypeDelete
// ====================================================

export interface ProductTypeDelete_productTypeDelete_productErrors {
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

export interface ProductTypeDelete_productTypeDelete_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductTypeDelete_productTypeDelete {
  __typename: "ProductTypeDelete";
  productErrors: ProductTypeDelete_productTypeDelete_productErrors[];
  productType: ProductTypeDelete_productTypeDelete_productType | null;
}

export interface ProductTypeDelete {
  /**
   * Deletes a product type.
   */
  productTypeDelete: ProductTypeDelete_productTypeDelete | null;
}

export interface ProductTypeDeleteVariables {
  id: string;
}
