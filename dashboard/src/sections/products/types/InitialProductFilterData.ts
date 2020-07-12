/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: InitialProductFilterData
// ====================================================

export interface InitialProductFilterData_attributes_edges_node_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface InitialProductFilterData_attributes_edges_node {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * List of attribute's values.
   */
  values: (InitialProductFilterData_attributes_edges_node_values | null)[] | null;
}

export interface InitialProductFilterData_attributes_edges {
  __typename: "AttributeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: InitialProductFilterData_attributes_edges_node;
}

export interface InitialProductFilterData_attributes {
  __typename: "AttributeCountableConnection";
  edges: InitialProductFilterData_attributes_edges[];
}

export interface InitialProductFilterData_categories_edges_node {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface InitialProductFilterData_categories_edges {
  __typename: "CategoryCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: InitialProductFilterData_categories_edges_node;
}

export interface InitialProductFilterData_categories {
  __typename: "CategoryCountableConnection";
  edges: InitialProductFilterData_categories_edges[];
}

export interface InitialProductFilterData_productTypes_edges_node {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface InitialProductFilterData_productTypes_edges {
  __typename: "ProductTypeCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: InitialProductFilterData_productTypes_edges_node;
}

export interface InitialProductFilterData_productTypes {
  __typename: "ProductTypeCountableConnection";
  edges: InitialProductFilterData_productTypes_edges[];
}

export interface InitialProductFilterData {
  /**
   * List of the shop's attributes.
   */
  attributes: InitialProductFilterData_attributes | null;
  /**
   * List of the shop's categories.
   */
  categories: InitialProductFilterData_categories | null;
  /**
   * List of the shop's product types.
   */
  productTypes: InitialProductFilterData_productTypes | null;
}

export interface InitialProductFilterDataVariables {
  categories?: string[] | null;
  productTypes?: string[] | null;
}
