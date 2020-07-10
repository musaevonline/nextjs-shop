/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductReviewRating, ProductReviewStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: UserReviews
// ====================================================

export interface UserReviews_me_reviews_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface UserReviews_me_reviews_edges_node_orderLine_thumbnail {
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

export interface UserReviews_me_reviews_edges_node_orderLine_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
}

export interface UserReviews_me_reviews_edges_node_orderLine_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  product: UserReviews_me_reviews_edges_node_orderLine_variant_product;
}

export interface UserReviews_me_reviews_edges_node_orderLine {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  variantName: string;
  productName: string;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: UserReviews_me_reviews_edges_node_orderLine_thumbnail | null;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: UserReviews_me_reviews_edges_node_orderLine_variant | null;
}

export interface UserReviews_me_reviews_edges_node {
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
  orderLine: UserReviews_me_reviews_edges_node_orderLine | null;
}

export interface UserReviews_me_reviews_edges {
  __typename: "ProductReviewCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: UserReviews_me_reviews_edges_node;
}

export interface UserReviews_me_reviews {
  __typename: "ProductReviewCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: UserReviews_me_reviews_pageInfo;
  edges: UserReviews_me_reviews_edges[];
}

export interface UserReviews_me {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  reviews: UserReviews_me_reviews;
}

export interface UserReviews {
  /**
   * Return the currently authenticated user.
   */
  me: UserReviews_me | null;
}

export interface UserReviewsVariables {
  first: number;
  after?: string | null;
}
