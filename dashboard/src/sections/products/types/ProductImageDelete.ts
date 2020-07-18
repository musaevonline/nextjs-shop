/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductImageDelete
// ====================================================

export interface ProductImageDelete_productImageDelete_errors {
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

export interface ProductImageDelete_productImageDelete_product_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface ProductImageDelete_productImageDelete_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of images for the product.
   */
  images: (ProductImageDelete_productImageDelete_product_images | null)[] | null;
}

export interface ProductImageDelete_productImageDelete {
  __typename: "ProductImageDelete";
  errors: ProductImageDelete_productImageDelete_errors[];
  product: ProductImageDelete_productImageDelete_product | null;
}

export interface ProductImageDelete {
  /**
   * Deletes a product image.
   */
  productImageDelete: ProductImageDelete_productImageDelete | null;
}

export interface ProductImageDeleteVariables {
  id: string;
}
