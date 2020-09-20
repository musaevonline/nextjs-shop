/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlogArticleFilterInput, BlogArticleOrder, BlogArticleStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: BlogArticleList
// ====================================================

export interface BlogArticleList_blogArticleList_pageInfo {
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

export interface BlogArticleList_blogArticleList_edges_node_category {
  __typename: "BlogCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
}

export interface BlogArticleList_blogArticleList_edges_node_thumbnail {
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

export interface BlogArticleList_blogArticleList_edges_node {
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
  category: BlogArticleList_blogArticleList_edges_node_category;
  /**
   * The main thumbnail for a blog article.
   */
  thumbnail: BlogArticleList_blogArticleList_edges_node_thumbnail | null;
}

export interface BlogArticleList_blogArticleList_edges {
  __typename: "BlogArticleTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: BlogArticleList_blogArticleList_edges_node;
}

export interface BlogArticleList_blogArticleList {
  __typename: "BlogArticleTypeCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  /**
   * Pagination data for this connection.
   */
  pageInfo: BlogArticleList_blogArticleList_pageInfo;
  edges: BlogArticleList_blogArticleList_edges[];
}

export interface BlogArticleList {
  /**
   * List of the shop's blog article.
   */
  blogArticleList: BlogArticleList_blogArticleList | null;
}

export interface BlogArticleListVariables {
  first?: number | null;
  last?: number | null;
  filter?: BlogArticleFilterInput | null;
  sortBy?: BlogArticleOrder | null;
  after?: string | null;
  before?: string | null;
}
