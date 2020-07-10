/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductReviewFilterInput, ProductReviewOrder, ProductReviewRating, ProductReviewStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductReviews
// ====================================================

export interface ProductReviews_productReviews_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface ProductReviews_productReviews_edges_node {
  __typename: "ProductReview";
  /**
   * The ID of the object.
   */
  id: string;
  content: string;
  rating: ProductReviewRating;
  title: string;
  status: ProductReviewStatus;
  createdAt: any;
  updatedAt: any;
  advantages: any;
  flaws: any;
  userName: string | null;
  /**
   * The URL of the image.
   */
  userAvatar: string | null;
}

export interface ProductReviews_productReviews_edges {
  __typename: "ProductReviewCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductReviews_productReviews_edges_node;
}

export interface ProductReviews_productReviews {
  __typename: "ProductReviewCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductReviews_productReviews_pageInfo;
  edges: ProductReviews_productReviews_edges[];
}

export interface ProductReviews {
  /**
   * List of the shop's products.
   */
  productReviews: ProductReviews_productReviews | null;
}

export interface ProductReviewsVariables {
  first: number;
  after?: string | null;
  filter?: ProductReviewFilterInput | null;
  sortBy?: ProductReviewOrder | null;
}
