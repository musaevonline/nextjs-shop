/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: VariantImageUnassign
// ====================================================

export interface VariantImageUnassign_variantImageUnassign_errors {
  __typename: "ProductError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * The error message.
   */
  message: string | null;
}

export interface VariantImageUnassign_variantImageUnassign_productVariant_attributes_attribute_values {
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

export interface VariantImageUnassign_variantImageUnassign_productVariant_attributes_attribute {
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
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * List of attribute's values.
   */
  values: (VariantImageUnassign_variantImageUnassign_productVariant_attributes_attribute_values | null)[] | null;
}

export interface VariantImageUnassign_variantImageUnassign_productVariant_attributes_values {
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

export interface VariantImageUnassign_variantImageUnassign_productVariant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: VariantImageUnassign_variantImageUnassign_productVariant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (VariantImageUnassign_variantImageUnassign_productVariant_attributes_values | null)[];
}

export interface VariantImageUnassign_variantImageUnassign_productVariant_costPrice {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface VariantImageUnassign_variantImageUnassign_productVariant_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface VariantImageUnassign_variantImageUnassign_productVariant_priceOverride {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface VariantImageUnassign_variantImageUnassign_productVariant_product_images {
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
}

export interface VariantImageUnassign_variantImageUnassign_productVariant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface VariantImageUnassign_variantImageUnassign_productVariant_product_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface VariantImageUnassign_variantImageUnassign_productVariant_product_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * List of images for the product variant.
   */
  images: (VariantImageUnassign_variantImageUnassign_productVariant_product_variants_images | null)[] | null;
}

export interface VariantImageUnassign_variantImageUnassign_productVariant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of images for the product.
   */
  images: (VariantImageUnassign_variantImageUnassign_productVariant_product_images | null)[] | null;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: VariantImageUnassign_variantImageUnassign_productVariant_product_thumbnail | null;
  /**
   * List of variants for the product.
   */
  variants: (VariantImageUnassign_variantImageUnassign_productVariant_product_variants | null)[] | null;
}

export interface VariantImageUnassign_variantImageUnassign_productVariant_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product in the warehouse's possession, including the allocated stock that is waiting for shipment.
   */
  quantity: number;
  /**
   * Quantity allocated for orders
   */
  quantityAllocated: number;
}

export interface VariantImageUnassign_variantImageUnassign_productVariant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: VariantImageUnassign_variantImageUnassign_productVariant_attributes[];
  /**
   * Cost price of the variant.
   */
  costPrice: VariantImageUnassign_variantImageUnassign_productVariant_costPrice | null;
  /**
   * List of images for the product variant.
   */
  images: (VariantImageUnassign_variantImageUnassign_productVariant_images | null)[] | null;
  name: string;
  /**
   * Override the base price of a product if necessary. A value of `null` indicates that the default product price is used.
   */
  priceOverride: VariantImageUnassign_variantImageUnassign_productVariant_priceOverride | null;
  product: VariantImageUnassign_variantImageUnassign_productVariant_product;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (VariantImageUnassign_variantImageUnassign_productVariant_stocks | null)[] | null;
}

export interface VariantImageUnassign_variantImageUnassign {
  __typename: "VariantImageUnassign";
  errors: VariantImageUnassign_variantImageUnassign_errors[];
  productVariant: VariantImageUnassign_variantImageUnassign_productVariant | null;
}

export interface VariantImageUnassign {
  /**
   * Unassign an image from a product variant.
   */
  variantImageUnassign: VariantImageUnassign_variantImageUnassign | null;
}

export interface VariantImageUnassignVariables {
  variantId: string;
  imageId: string;
}
