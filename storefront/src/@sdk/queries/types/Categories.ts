/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CategorySortingInput, CategoryFilterInput } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: Categories
// ====================================================

export interface Categories_categories_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Categories_categories_edges_node_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Categories_categories_edges_node_children_edges_node_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Categories_categories_edges_node_children_edges_node_children_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  backgroundImage: Categories_categories_edges_node_children_edges_node_children_edges_node_backgroundImage | null;
}

export interface Categories_categories_edges_node_children_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Categories_categories_edges_node_children_edges_node_children_edges_node;
}

export interface Categories_categories_edges_node_children_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: Categories_categories_edges_node_children_edges_node_children_edges[];
}

export interface Categories_categories_edges_node_children_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  backgroundImage: Categories_categories_edges_node_children_edges_node_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: Categories_categories_edges_node_children_edges_node_children | null;
}

export interface Categories_categories_edges_node_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Categories_categories_edges_node_children_edges_node;
}

export interface Categories_categories_edges_node_children {
  __typename: "CategoryCountableConnection";
  edges: Categories_categories_edges_node_children_edges[];
}

export interface Categories_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  backgroundImage: Categories_categories_edges_node_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: Categories_categories_edges_node_children | null;
}

export interface Categories_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Categories_categories_edges_node;
}

export interface Categories_categories {
  __typename: "CategoryCountableConnection";
  edges: Categories_categories_edges[];
}

export interface Categories {
  /**
   * List of the shop's categories.
   */
  categories: Categories_categories | null;
}

export interface CategoriesVariables {
  level?: number | null;
  after?: string | null;
  sortBy?: CategorySortingInput | null;
  filter?: CategoryFilterInput | null;
}
