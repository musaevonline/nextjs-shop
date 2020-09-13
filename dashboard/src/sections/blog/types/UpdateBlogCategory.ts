/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogCategoryInput, BlogErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateBlogCategory
// ====================================================

export interface UpdateBlogCategory_blogCategoryUpdate_errors {
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

export interface UpdateBlogCategory_blogCategoryUpdate_blogCategory_thumbnail {
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

export interface UpdateBlogCategory_blogCategoryUpdate_blogCategory {
  __typename: "BlogCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
  description: string;
  isPublished: boolean;
  /**
   * The main thumbnail for a blog category.
   */
  thumbnail: UpdateBlogCategory_blogCategoryUpdate_blogCategory_thumbnail | null;
}

export interface UpdateBlogCategory_blogCategoryUpdate {
  __typename: "BlogCategoryUpdate";
  errors: UpdateBlogCategory_blogCategoryUpdate_errors[];
  blogCategory: UpdateBlogCategory_blogCategoryUpdate_blogCategory | null;
}

export interface UpdateBlogCategory {
  /**
   * Updates a blog category.
   */
  blogCategoryUpdate: UpdateBlogCategory_blogCategoryUpdate | null;
}

export interface UpdateBlogCategoryVariables {
  id: string;
  input: BlogCategoryInput;
}
