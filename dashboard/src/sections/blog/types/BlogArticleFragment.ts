/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogArticleStatus } from "./../../../types/globalTypes";

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

export interface BlogArticleFragment_category {
  __typename: "BlogCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface BlogArticleFragment {
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
  thumbnail: BlogArticleFragment_thumbnail | null;
  category: BlogArticleFragment_category;
}
