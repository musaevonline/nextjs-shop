/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductImageReorder
// ====================================================

export interface ProductImageReorder_productImageReorder_errors {
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

export interface ProductImageReorder_productImageReorder_product_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductImageReorder_productImageReorder_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of images for the product.
   */
  images: (ProductImageReorder_productImageReorder_product_images | null)[] | null;
}

export interface ProductImageReorder_productImageReorder {
  __typename: "ProductImageReorder";
  errors: ProductImageReorder_productImageReorder_errors[];
  product: ProductImageReorder_productImageReorder_product | null;
}

export interface ProductImageReorder {
  /**
   * Changes ordering of the product image.
   */
  productImageReorder: ProductImageReorder_productImageReorder | null;
}

export interface ProductImageReorderVariables {
  productId: string;
  imagesIds: (string | null)[];
}
