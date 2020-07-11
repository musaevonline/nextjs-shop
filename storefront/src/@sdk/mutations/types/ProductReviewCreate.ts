/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductReviewCreateInput, ProductErrorCode, ProductReviewRating, ProductReviewStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductReviewCreate
// ====================================================

export interface ProductReviewCreate_productReviewCreate_productErrors {
  __typename: "ProductError";
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface ProductReviewCreate_productReviewCreate_productReview {
  __typename: "ProductReview";
  /**
   * The ID of the object.
   */
  id: string;
  content: string;
  rating: ProductReviewRating;
  title: string;
  status: ProductReviewStatus;
  createdAt: any;
  updatedAt: any;
  advantages: any;
  flaws: any;
  userName: string | null;
  /**
   * The URL of the image.
   */
  userAvatar: string | null;
}

export interface ProductReviewCreate_productReviewCreate {
  __typename: "ProductReviewCreate";
  productErrors: ProductReviewCreate_productReviewCreate_productErrors[];
  productReview: ProductReviewCreate_productReviewCreate_productReview | null;
}

export interface ProductReviewCreate {
  /**
   * Creates a new review for a product.
   */
  productReviewCreate: ProductReviewCreate_productReviewCreate | null;
}

export interface ProductReviewCreateVariables {
  input: ProductReviewCreateInput;
}
