/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategoryFilterInput, CategorySortingInput } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: CategoryList
// ====================================================

export interface CategoryList_categories_edges_node_children {
  __typename: "CategoryCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
}

export interface CategoryList_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  /**
   * List of children of the category.
   */
  children: CategoryList_categories_edges_node_children | null;
}

export interface CategoryList_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryList_categories_edges_node;
}

export interface CategoryList_categories {
  __typename: "CategoryCountableConnection";
  edges: CategoryList_categories_edges[];
}

export interface CategoryList {
  /**
   * List of the shop's categories.
   */
  categories: CategoryList_categories | null;
}

export interface CategoryListVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  filter?: CategoryFilterInput | null;
  sort?: CategorySortingInput | null;
}
