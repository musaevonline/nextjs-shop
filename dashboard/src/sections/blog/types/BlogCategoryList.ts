/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogCategoryList
// ====================================================

export interface BlogCategoryList_blogCategoryList_edges_node_thumbnail {
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

export interface BlogCategoryList_blogCategoryList_edges_node {
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
  thumbnail: BlogCategoryList_blogCategoryList_edges_node_thumbnail | null;
}

export interface BlogCategoryList_blogCategoryList_edges {
  __typename: "BlogCategoryTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: BlogCategoryList_blogCategoryList_edges_node;
}

export interface BlogCategoryList_blogCategoryList_pageInfo {
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

export interface BlogCategoryList_blogCategoryList {
  __typename: "BlogCategoryTypeCountableConnection";
  edges: BlogCategoryList_blogCategoryList_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: BlogCategoryList_blogCategoryList_pageInfo;
}

export interface BlogCategoryList {
  /**
   * List of the shop's blog category.
   */
  blogCategoryList: BlogCategoryList_blogCategoryList | null;
}

export interface BlogCategoryListVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
