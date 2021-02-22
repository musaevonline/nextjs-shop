/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Category
// ====================================================

export interface Category_category_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Category_category_children_edges_node_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface Category_category_children_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  description: string;
  backgroundImage: Category_category_children_edges_node_backgroundImage | null;
}

export interface Category_category_children_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: Category_category_children_edges_node;
}

export interface Category_category_children {
  __typename: "CategoryCountableConnection";
  edges: Category_category_children_edges[];
}

export interface Category_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  description: string;
  backgroundImage: Category_category_backgroundImage | null;
  /**
   * List of children of the category.
   */
  children: Category_category_children | null;
}

export interface Category {
  /**
   * Look up a category by ID.
   */
  category: Category_category | null;
}

export interface CategoryVariables {
  id: string;
}
