/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchBlogCategories
// ====================================================

export interface SearchBlogCategories_search_edges_node {
  __typename: "BlogCategoryType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface SearchBlogCategories_search_edges {
  __typename: "BlogCategoryTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchBlogCategories_search_edges_node;
}

export interface SearchBlogCategories_search_pageInfo {
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

export interface SearchBlogCategories_search {
  __typename: "BlogCategoryTypeCountableConnection";
  edges: SearchBlogCategories_search_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: SearchBlogCategories_search_pageInfo;
}

export interface SearchBlogCategories {
  /**
   * List of the shop's blog category.
   */
  search: SearchBlogCategories_search | null;
}

export interface SearchBlogCategoriesVariables {
  after?: string | null;
  first: number;
  query: string;
}
