/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput, ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CategoryUpdate
// ====================================================

export interface CategoryUpdate_categoryUpdate_category_backgroundImage {
  __typename: "Image";
  /**
   * Alt text for an image.
   */
  alt: string | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CategoryUpdate_categoryUpdate_category_parent {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CategoryUpdate_categoryUpdate_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  backgroundImage: CategoryUpdate_categoryUpdate_category_backgroundImage | null;
  name: string;
  descriptionJson: any;
  description: string;
  parent: CategoryUpdate_categoryUpdate_category_parent | null;
}

export interface CategoryUpdate_categoryUpdate_errors {
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

export interface CategoryUpdate_categoryUpdate {
  __typename: "CategoryUpdate";
  category: CategoryUpdate_categoryUpdate_category | null;
  errors: CategoryUpdate_categoryUpdate_errors[];
}

export interface CategoryUpdate {
  /**
   * Updates a category.
   */
  categoryUpdate: CategoryUpdate_categoryUpdate | null;
}

export interface CategoryUpdateVariables {
  id: string;
  input: CategoryInput;
}
