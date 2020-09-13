/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogCategoryInput, BlogErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateBlogCategory
// ====================================================

export interface CreateBlogCategory_blogCategoryCreate_errors {
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

export interface CreateBlogCategory_blogCategoryCreate_blogCategory_thumbnail {
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

export interface CreateBlogCategory_blogCategoryCreate_blogCategory {
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
  thumbnail: CreateBlogCategory_blogCategoryCreate_blogCategory_thumbnail | null;
}

export interface CreateBlogCategory_blogCategoryCreate {
  __typename: "BlogCategoryCreate";
  errors: CreateBlogCategory_blogCategoryCreate_errors[];
  blogCategory: CreateBlogCategory_blogCategoryCreate_blogCategory | null;
}

export interface CreateBlogCategory {
  /**
   * Creates a new blog category.
   */
  blogCategoryCreate: CreateBlogCategory_blogCategoryCreate | null;
}

export interface CreateBlogCategoryVariables {
  input: BlogCategoryInput;
}
