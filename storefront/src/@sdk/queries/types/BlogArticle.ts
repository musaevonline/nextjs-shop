/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogArticleStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: BlogArticle
// ====================================================

export interface BlogArticle_blogArticle_category {
  __typename: "BlogCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
}

export interface BlogArticle_blogArticle_thumbnail {
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
  dateAdded: any;
  datePublished: any | null;
  authorName: string | null;
  category: BlogArticle_blogArticle_category;
  /**
   * The main thumbnail for a blog article.
   */
  thumbnail: BlogArticle_blogArticle_thumbnail | null;
}

export interface BlogArticle {
  /**
   * Look up a blog article by ID or slug.
   */
  blogArticle: BlogArticle_blogArticle | null;
}

export interface BlogArticleVariables {
  slug?: string | null;
  id?: string | null;
}
