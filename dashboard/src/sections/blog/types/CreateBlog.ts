/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogInput, BlogErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateBlog
// ====================================================

export interface CreateBlog_blogCreate_errors {
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

export interface CreateBlog_blogCreate_blog_thumbnail {
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

export interface CreateBlog_blogCreate_blog {
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
  thumbnail: CreateBlog_blogCreate_blog_thumbnail | null;
}

export interface CreateBlog_blogCreate {
  __typename: "BlogCreate";
  errors: CreateBlog_blogCreate_errors[];
  blog: CreateBlog_blogCreate_blog | null;
}

export interface CreateBlog {
  /**
   * Creates a new blog.
   */
  blogCreate: CreateBlog_blogCreate | null;
}

export interface CreateBlogVariables {
  input: BlogInput;
}
