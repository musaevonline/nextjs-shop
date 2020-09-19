/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Blog
// ====================================================

export interface Blog_blog_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface Blog_blog {
  __typename: "BlogType";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
  description: string;
  /**
   * The main thumbnail for a blog.
   */
  thumbnail: Blog_blog_thumbnail | null;
}

export interface Blog {
  /**
   * Look up a blog by ID or slug.
   */
  blog: Blog_blog | null;
}

export interface BlogVariables {
  slug?: string | null;
  id?: string | null;
}
