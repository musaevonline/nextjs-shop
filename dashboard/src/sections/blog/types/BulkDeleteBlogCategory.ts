/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteBlogCategory
// ====================================================

export interface BulkDeleteBlogCategory_blogCategoryBulkDelete_errors {
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

export interface BulkDeleteBlogCategory_blogCategoryBulkDelete {
  __typename: "BlogCategoryBulkDelete";
  errors: BulkDeleteBlogCategory_blogCategoryBulkDelete_errors[];
}

export interface BulkDeleteBlogCategory {
  /**
   * Deletes blog categories.
   */
  blogCategoryBulkDelete: BulkDeleteBlogCategory_blogCategoryBulkDelete | null;
}

export interface BulkDeleteBlogCategoryVariables {
  ids: (string | null)[];
}
