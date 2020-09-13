/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogInput, BlogErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateBlog
// ====================================================

export interface UpdateBlog_blogUpdate_errors {
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

export interface UpdateBlog_blogUpdate_blog_thumbnail {
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

export interface UpdateBlog_blogUpdate_blog {
  __typename: "BlogType";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
  description: string;
  isPublished: boolean;
  /**
   * The main thumbnail for a blog.
   */
  thumbnail: UpdateBlog_blogUpdate_blog_thumbnail | null;
}

export interface UpdateBlog_blogUpdate {
  __typename: "BlogUpdate";
  errors: UpdateBlog_blogUpdate_errors[];
  blog: UpdateBlog_blogUpdate_blog | null;
}

export interface UpdateBlog {
  /**
   * Updates a blog.
   */
  blogUpdate: UpdateBlog_blogUpdate | null;
}

export interface UpdateBlogVariables {
  id: string;
  input: BlogInput;
}
