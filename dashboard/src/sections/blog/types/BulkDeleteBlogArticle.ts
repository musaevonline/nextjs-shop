/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: BulkDeleteBlogArticle
// ====================================================

export interface BulkDeleteBlogArticle_blogArticleBulkDelete_errors {
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

export interface BulkDeleteBlogArticle_blogArticleBulkDelete {
  __typename: "BlogArticleBulkDelete";
  errors: BulkDeleteBlogArticle_blogArticleBulkDelete_errors[];
}

export interface BulkDeleteBlogArticle {
  /**
   * Deletes blog articles.
   */
  blogArticleBulkDelete: BulkDeleteBlogArticle_blogArticleBulkDelete | null;
}

export interface BulkDeleteBlogArticleVariables {
  ids: (string | null)[];
}
