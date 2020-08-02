/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductTypeFilterInput, ProductTypeSortingInput } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductTypeList
// ====================================================

export interface ProductTypeList_productTypes_edges_node {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  hasVariants: boolean;
  isShippingRequired: boolean;
}

export interface ProductTypeList_productTypes_edges {
  __typename: "ProductTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductTypeList_productTypes_edges_node;
}

export interface ProductTypeList_productTypes_pageInfo {
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

export interface ProductTypeList_productTypes {
  __typename: "ProductTypeCountableConnection";
  edges: ProductTypeList_productTypes_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductTypeList_productTypes_pageInfo;
}

export interface ProductTypeList {
  /**
   * List of the shop's product types.
   */
  productTypes: ProductTypeList_productTypes | null;
}

export interface ProductTypeListVariables {
  after?: string | null;
  before?: string | null;
  first?: number | null;
  last?: number | null;
  filter?: ProductTypeFilterInput | null;
  sort?: ProductTypeSortingInput | null;
}
