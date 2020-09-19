/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogCategory
// ====================================================

export interface BlogCategory_blogCategory_thumbnail {
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

export interface BlogCategory_blogCategory {
  __typename: "BlogCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
  description: string;
  /**
   * The main thumbnail for a blog category.
   */
  thumbnail: BlogCategory_blogCategory_thumbnail | null;
}

export interface BlogCategory {
  /**
   * Look up a blog category by ID or slug.
   */
  blogCategory: BlogCategory_blogCategory | null;
}

export interface BlogCategoryVariables {
  slug?: string | null;
  id?: string | null;
}
