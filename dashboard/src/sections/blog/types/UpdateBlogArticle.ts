/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogArticleInput, BlogErrorCode, BlogArticleStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateBlogArticle
// ====================================================

export interface UpdateBlogArticle_blogArticleUpdate_errors {
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

export interface UpdateBlogArticle_blogArticleUpdate_blogArticle_thumbnail {
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

export interface UpdateBlogArticle_blogArticleUpdate_blogArticle {
  __typename: "BlogArticleType";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  keywords: string;
  tags: string;
  status: BlogArticleStatus;
  body: string;
  isPublished: boolean;
  dateAdded: any;
  datePublished: any | null;
  /**
   * The main thumbnail for a blog article.
   */
  thumbnail: UpdateBlogArticle_blogArticleUpdate_blogArticle_thumbnail | null;
}

export interface UpdateBlogArticle_blogArticleUpdate {
  __typename: "BlogArticleUpdate";
  errors: UpdateBlogArticle_blogArticleUpdate_errors[];
  blogArticle: UpdateBlogArticle_blogArticleUpdate_blogArticle | null;
}

export interface UpdateBlogArticle {
  /**
   * Updates a blog article.
   */
  blogArticleUpdate: UpdateBlogArticle_blogArticleUpdate | null;
}

export interface UpdateBlogArticleVariables {
  id: string;
  input: BlogArticleInput;
}
