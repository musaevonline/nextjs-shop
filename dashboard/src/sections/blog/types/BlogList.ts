/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: BlogList
// ====================================================

export interface BlogList_blogList_edges_node_thumbnail {
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

export interface BlogList_blogList_edges_node {
  __typename: "BlogType";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
  name: string;
  description: string;
  isPublished: boolean;
  /**
   * The main thumbnail for a blog.
   */
  thumbnail: BlogList_blogList_edges_node_thumbnail | null;
}

export interface BlogList_blogList_edges {
  __typename: "BlogTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: BlogList_blogList_edges_node;
}

export interface BlogList_blogList_pageInfo {
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

export interface BlogList_blogList {
  __typename: "BlogTypeCountableConnection";
  edges: BlogList_blogList_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: BlogList_blogList_pageInfo;
}

export interface BlogList {
  /**
   * List of the shop's blog.
   */
  blogList: BlogList_blogList | null;
}

export interface BlogListVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
}
