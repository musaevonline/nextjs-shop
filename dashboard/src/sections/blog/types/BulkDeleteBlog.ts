/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteBlog
// ====================================================

export interface BulkDeleteBlog_blogBulkDelete_errors {
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

export interface BulkDeleteBlog_blogBulkDelete {
  __typename: "BlogBulkDelete";
  errors: BulkDeleteBlog_blogBulkDelete_errors[];
}

export interface BulkDeleteBlog {
  /**
   * Deletes blog.
   */
  blogBulkDelete: BulkDeleteBlog_blogBulkDelete | null;
}

export interface BulkDeleteBlogVariables {
  ids: (string | null)[];
}
