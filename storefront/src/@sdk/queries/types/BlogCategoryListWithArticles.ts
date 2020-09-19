/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogCategoryFilterInput, BlogCategoryOrder, BlogArticleStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: BlogCategoryListWithArticles
// ====================================================

export interface BlogCategoryListWithArticles_blogCategoryList_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
}

export interface BlogCategoryListWithArticles_blogCategoryList_edges_node_thumbnail {
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

export interface BlogCategoryListWithArticles_blogCategoryList_edges_node_articles_edges_node_category {
  __typename: "BlogCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
}

export interface BlogCategoryListWithArticles_blogCategoryList_edges_node_articles_edges_node_thumbnail {
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

export interface BlogCategoryListWithArticles_blogCategoryList_edges_node_articles_edges_node {
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
  category: BlogCategoryListWithArticles_blogCategoryList_edges_node_articles_edges_node_category;
  /**
   * The main thumbnail for a blog article.
   */
  thumbnail: BlogCategoryListWithArticles_blogCategoryList_edges_node_articles_edges_node_thumbnail | null;
}

export interface BlogCategoryListWithArticles_blogCategoryList_edges_node_articles_edges {
  __typename: "BlogArticleTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: BlogCategoryListWithArticles_blogCategoryList_edges_node_articles_edges_node;
}

export interface BlogCategoryListWithArticles_blogCategoryList_edges_node_articles {
  __typename: "BlogArticleTypeCountableConnection";
  edges: BlogCategoryListWithArticles_blogCategoryList_edges_node_articles_edges[];
}

export interface BlogCategoryListWithArticles_blogCategoryList_edges_node {
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
  thumbnail: BlogCategoryListWithArticles_blogCategoryList_edges_node_thumbnail | null;
  articles: BlogCategoryListWithArticles_blogCategoryList_edges_node_articles;
}

export interface BlogCategoryListWithArticles_blogCategoryList_edges {
  __typename: "BlogCategoryTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: BlogCategoryListWithArticles_blogCategoryList_edges_node;
}

export interface BlogCategoryListWithArticles_blogCategoryList {
  __typename: "BlogCategoryTypeCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: BlogCategoryListWithArticles_blogCategoryList_pageInfo;
  edges: BlogCategoryListWithArticles_blogCategoryList_edges[];
}

export interface BlogCategoryListWithArticles {
  /**
   * List of the shop's blog category.
   */
  blogCategoryList: BlogCategoryListWithArticles_blogCategoryList | null;
}

export interface BlogCategoryListWithArticlesVariables {
  first: number;
  filter?: BlogCategoryFilterInput | null;
  sortBy?: BlogCategoryOrder | null;
  after?: string | null;
}
