/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: BlogArticleFragment
// ====================================================

export interface BlogArticleFragment_thumbnail {
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

export interface BlogArticleFragment {
  __typename: "BlogArticleType";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  title: string;
  body: string;
  isPublished: boolean;
  /**
   * The main thumbnail for a blog article.
   */
  thumbnail: BlogArticleFragment_thumbnail | null;
}
