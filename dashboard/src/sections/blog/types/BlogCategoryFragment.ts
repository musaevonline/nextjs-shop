/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogCategoryFragment
// ====================================================

export interface BlogCategoryFragment_thumbnail {
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

export interface BlogCategoryFragment {
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
  thumbnail: BlogCategoryFragment_thumbnail | null;
}
