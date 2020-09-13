/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteBlog
// ====================================================

export interface DeleteBlog_blogDelete_errors {
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

export interface DeleteBlog_blogDelete {
  __typename: "BlogDelete";
  errors: DeleteBlog_blogDelete_errors[];
}

export interface DeleteBlog {
  /**
   * Deletes a blog.
   */
  blogDelete: DeleteBlog_blogDelete | null;
}

export interface DeleteBlogVariables {
  id: string;
}
