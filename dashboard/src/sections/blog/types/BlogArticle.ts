/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogArticleStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: BlogArticle
// ====================================================

export interface BlogArticle_blogArticle_thumbnail {
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

export interface BlogArticle_blogArticle_category {
  __typename: "BlogCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface BlogArticle_blogArticle {
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
  thumbnail: BlogArticle_blogArticle_thumbnail | null;
  category: BlogArticle_blogArticle_category;
}

export interface BlogArticle {
  /**
   * Look up a blog article by ID or slug.
   */
  blogArticle: BlogArticle_blogArticle | null;
}

export interface BlogArticleVariables {
  id: string;
}
