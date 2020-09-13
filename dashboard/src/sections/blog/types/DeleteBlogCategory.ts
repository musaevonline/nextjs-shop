/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteBlogCategory
// ====================================================

export interface DeleteBlogCategory_blogCategoryDelete_errors {
  __typename: "BlogError";
  /**
   * The error code.
   */
  code: BlogErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
}

export interface DeleteBlogCategory_blogCategoryDelete {
  __typename: "BlogCategoryDelete";
  errors: DeleteBlogCategory_blogCategoryDelete_errors[];
}

export interface DeleteBlogCategory {
  /**
   * Deletes a blog category.
   */
  blogCategoryDelete: DeleteBlogCategory_blogCategoryDelete | null;
}

export interface DeleteBlogCategoryVariables {
  id: string;
}
