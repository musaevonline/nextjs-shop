/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: CategoryProducts
// ====================================================

export interface CategoryProducts_category_products_edges_node_rating {
  __typename: "Rating";
  /**
   * Product avg rating
   */
  ratingAvg: number | null;
  /**
   * Product rating count
   */
  count: number | null;
}

export interface CategoryProducts_category_products_edges_node_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface CategoryProducts_category_products_edges_node_priceRange_start {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface CategoryProducts_category_products_edges_node_priceRange_stop {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface CategoryProducts_category_products_edges_node_priceRange {
  __typename: "MoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: CategoryProducts_category_products_edges_node_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: CategoryProducts_category_products_edges_node_priceRange_stop | null;
}

export interface CategoryProducts_category_products_edges_node_attributes_attribute_values {
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

export interface CategoryProducts_category_products_edges_node_attributes_attribute {
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
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * List of attribute's values.
   */
  values: (CategoryProducts_category_products_edges_node_attributes_attribute_values | null)[] | null;
}

export interface CategoryProducts_category_products_edges_node_attributes_values {
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

export interface CategoryProducts_category_products_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: CategoryProducts_category_products_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (CategoryProducts_category_products_edges_node_attributes_values | null)[];
}

export interface CategoryProducts_category_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Primary key
   */
  pk: string | null;
  name: string;
  slug: string;
  /**
   * Product variants stock status
   */
  stockStatus: string | null;
  unit: string | null;
  description: string;
  /**
   * Product rating
   */
  rating: CategoryProducts_category_products_edges_node_rating | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: CategoryProducts_category_products_edges_node_thumbnail | null;
  /**
   * Product price range
   */
  priceRange: CategoryProducts_category_products_edges_node_priceRange | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: CategoryProducts_category_products_edges_node_attributes[];
}

export interface CategoryProducts_category_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: CategoryProducts_category_products_edges_node;
}

export interface CategoryProducts_category_products {
  __typename: "ProductCountableConnection";
  edges: CategoryProducts_category_products_edges[];
}

export interface CategoryProducts_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * List of products in the category.
   */
  products: CategoryProducts_category_products | null;
}

export interface CategoryProducts {
  /**
   * Look up a category by ID.
   */
  category: CategoryProducts_category | null;
}

export interface CategoryProductsVariables {
  categoryId: string;
  firstProducts: number;
}
