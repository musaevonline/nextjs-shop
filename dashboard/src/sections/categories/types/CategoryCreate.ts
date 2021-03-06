/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryInput, ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CategoryCreate
// ====================================================

export interface CategoryCreate_categoryCreate_category_backgroundImage {
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

export interface CategoryCreate_categoryCreate_category_parent {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CategoryCreate_categoryCreate_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  backgroundImage: CategoryCreate_categoryCreate_category_backgroundImage | null;
  name: string;
  descriptionJson: any;
  description: string;
  parent: CategoryCreate_categoryCreate_category_parent | null;
}

export interface CategoryCreate_categoryCreate_errors {
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

export interface CategoryCreate_categoryCreate {
  __typename: "CategoryCreate";
  category: CategoryCreate_categoryCreate_category | null;
  errors: CategoryCreate_categoryCreate_errors[];
}

export interface CategoryCreate {
  /**
   * Creates a new category.
   */
  categoryCreate: CategoryCreate_categoryCreate | null;
}

export interface CategoryCreateVariables {
  parent?: string | null;
  input: CategoryInput;
}
