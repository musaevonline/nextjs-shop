/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductVariants
// ====================================================

export interface ProductVariants_productVariants_pageInfo {
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

export interface ProductVariants_productVariants_edges_node_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product available for sale.
   */
  stockQuantity: number;
}

export interface ProductVariants_productVariants_edges_node_price {
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

export interface ProductVariants_productVariants_edges_node_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * The thumbnail image.
   */
  largeThumbnail: string | null;
  /**
   * The thumbnail image.
   */
  smallThumbnail: string | null;
}

export interface ProductVariants_productVariants_edges_node_weight {
  __typename: "Weight";
  /**
   * Weight value.
   */
  value: number;
  /**
   * Weight unit.
   */
  unit: string;
}

export interface ProductVariants_productVariants_edges_node_attributes_attribute_values {
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

export interface ProductVariants_productVariants_edges_node_attributes_attribute {
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
  values: (ProductVariants_productVariants_edges_node_attributes_attribute_values | null)[] | null;
}

export interface ProductVariants_productVariants_edges_node_attributes_values {
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

export interface ProductVariants_productVariants_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductVariants_productVariants_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductVariants_productVariants_edges_node_attributes_values | null)[];
}

export interface ProductVariants_productVariants_edges_node_product_thumbnail {
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

export interface ProductVariants_productVariants_edges_node_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductVariants_productVariants_edges_node_product_thumbnail | null;
}

export interface ProductVariants_productVariants_edges_node {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (ProductVariants_productVariants_edges_node_stocks | null)[] | null;
  /**
   * Override the base price of a product.
   */
  price: ProductVariants_productVariants_edges_node_price | null;
  /**
   * List of images for the product variant.
   */
  images: (ProductVariants_productVariants_edges_node_images | null)[] | null;
  weight: ProductVariants_productVariants_edges_node_weight | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductVariants_productVariants_edges_node_attributes[];
  product: ProductVariants_productVariants_edges_node_product;
}

export interface ProductVariants_productVariants_edges {
  __typename: "ProductVariantCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductVariants_productVariants_edges_node;
}

export interface ProductVariants_productVariants {
  __typename: "ProductVariantCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: ProductVariants_productVariants_pageInfo;
  edges: ProductVariants_productVariants_edges[];
}

export interface ProductVariants {
  /**
   * List of product variants.
   */
  productVariants: ProductVariants_productVariants | null;
}

export interface ProductVariantsVariables {
  first: number;
  after?: string | null;
  ids?: (string | null)[] | null;
}
