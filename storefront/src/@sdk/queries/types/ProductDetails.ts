/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum, ProductReviewRating, ProductReviewStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductDetails
// ====================================================

export interface ProductDetails_product_rating {
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

export interface ProductDetails_product_thumbnail {
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

export interface ProductDetails_product_priceRange_start {
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

export interface ProductDetails_product_priceRange_stop {
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

export interface ProductDetails_product_priceRange {
  __typename: "MoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetails_product_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetails_product_priceRange_stop | null;
}

export interface ProductDetails_product_attributes_attribute_values {
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

export interface ProductDetails_product_attributes_attribute {
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
  values: (ProductDetails_product_attributes_attribute_values | null)[] | null;
}

export interface ProductDetails_product_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface ProductDetails_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetails_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetails_product_attributes_values | null)[];
}

export interface ProductDetails_product_category_products_edges_node_rating {
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

export interface ProductDetails_product_category_products_edges_node_thumbnail {
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

export interface ProductDetails_product_category_products_edges_node_priceRange_start {
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

export interface ProductDetails_product_category_products_edges_node_priceRange_stop {
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

export interface ProductDetails_product_category_products_edges_node_priceRange {
  __typename: "MoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: ProductDetails_product_category_products_edges_node_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: ProductDetails_product_category_products_edges_node_priceRange_stop | null;
}

export interface ProductDetails_product_category_products_edges_node_attributes_attribute_values {
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

export interface ProductDetails_product_category_products_edges_node_attributes_attribute {
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
  values: (ProductDetails_product_category_products_edges_node_attributes_attribute_values | null)[] | null;
}

export interface ProductDetails_product_category_products_edges_node_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface ProductDetails_product_category_products_edges_node_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetails_product_category_products_edges_node_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetails_product_category_products_edges_node_attributes_values | null)[];
}

export interface ProductDetails_product_category_products_edges_node {
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
  rating: ProductDetails_product_category_products_edges_node_rating | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductDetails_product_category_products_edges_node_thumbnail | null;
  /**
   * Product price range
   */
  priceRange: ProductDetails_product_category_products_edges_node_priceRange | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductDetails_product_category_products_edges_node_attributes[];
}

export interface ProductDetails_product_category_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetails_product_category_products_edges_node;
}

export interface ProductDetails_product_category_products {
  __typename: "ProductCountableConnection";
  edges: ProductDetails_product_category_products_edges[];
}

export interface ProductDetails_product_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  /**
   * List of products in the category.
   */
  products: ProductDetails_product_category_products | null;
}

export interface ProductDetails_product_reviews_edges_node {
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

export interface ProductDetails_product_reviews_edges {
  __typename: "ProductReviewCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: ProductDetails_product_reviews_edges_node;
}

export interface ProductDetails_product_reviews {
  __typename: "ProductReviewCountableConnection";
  edges: ProductDetails_product_reviews_edges[];
}

export interface ProductDetails_product_variants_stocks {
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

export interface ProductDetails_product_variants_price {
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

export interface ProductDetails_product_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface ProductDetails_product_variants_weight {
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

export interface ProductDetails_product_variants_attributes_attribute_values {
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

export interface ProductDetails_product_variants_attributes_attribute {
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
  values: (ProductDetails_product_variants_attributes_attribute_values | null)[] | null;
}

export interface ProductDetails_product_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface ProductDetails_product_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: ProductDetails_product_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (ProductDetails_product_variants_attributes_values | null)[];
}

export interface ProductDetails_product_variants {
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
  stocks: (ProductDetails_product_variants_stocks | null)[] | null;
  /**
   * Override the base price of a product.
   */
  price: ProductDetails_product_variants_price | null;
  /**
   * List of images for the product variant.
   */
  images: (ProductDetails_product_variants_images | null)[] | null;
  weight: ProductDetails_product_variants_weight | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: ProductDetails_product_variants_attributes[];
}

export interface ProductDetails_product_images {
  __typename: "ProductImage";
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface ProductDetails_product {
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
  rating: ProductDetails_product_rating | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductDetails_product_thumbnail | null;
  /**
   * Product price range
   */
  priceRange: ProductDetails_product_priceRange | null;
  /**
   * List of attributes assigned to this product.
   */
  attributes: ProductDetails_product_attributes[];
  descriptionJson: any;
  category: ProductDetails_product_category | null;
  /**
   * List of the shop's product reviews.
   */
  reviews: ProductDetails_product_reviews | null;
  /**
   * List of variants for the product.
   */
  variants: (ProductDetails_product_variants | null)[] | null;
  /**
   * List of images for the product.
   */
  images: (ProductDetails_product_images | null)[] | null;
}

export interface ProductDetails {
  /**
   * Look up a product by ID.
   */
  product: ProductDetails_product | null;
}

export interface ProductDetailsVariables {
  id: string;
}
