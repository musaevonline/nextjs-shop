/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PageFilterInput, PageSortingInput } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: Pages
// ====================================================

export interface Pages_pages_pageInfo {
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

export interface Pages_pages_edges_node {
  __typename: "Page";
  /**
   * The ID of the object.
   */
  id: string;
  contentJson: any;
  content: string;
  isPublished: boolean;
  created: any;
  publicationDate: any | null;
  slug: string;
  title: string;
}

export interface Pages_pages_edges {
  __typename: "PageCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Pages_pages_edges_node;
}

export interface Pages_pages {
  __typename: "PageCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: Pages_pages_pageInfo;
  edges: Pages_pages_edges[];
}

export interface Pages {
  /**
   * List of the shop's pages.
   */
  pages: Pages_pages | null;
}

export interface PagesVariables {
  first: number;
  filter?: PageFilterInput | null;
  after?: string | null;
  sortBy?: PageSortingInput | null;
}
