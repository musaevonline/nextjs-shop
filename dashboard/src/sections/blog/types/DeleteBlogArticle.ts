/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteBlogArticle
// ====================================================

export interface DeleteBlogArticle_blogArticleDelete_errors {
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

export interface DeleteBlogArticle_blogArticleDelete {
  __typename: "BlogArticleDelete";
  errors: DeleteBlogArticle_blogArticleDelete_errors[];
}

export interface DeleteBlogArticle {
  /**
   * Deletes a blog article.
   */
  blogArticleDelete: DeleteBlogArticle_blogArticleDelete | null;
}

export interface DeleteBlogArticleVariables {
  id: string;
}
