/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum, ProductReviewRating, ProductReviewStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: OrderLine
// ====================================================

export interface OrderLine_thumbnail {
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

export interface OrderLine_unitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface OrderLine_unitPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface OrderLine_unitPrice_tax {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface OrderLine_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderLine_unitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: OrderLine_unitPrice_net;
  /**
   * Amount of taxes.
   */
  tax: OrderLine_unitPrice_tax;
  /**
   * Currency code.
   */
  currency: string;
}

export interface OrderLine_variant_stocks {
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

export interface OrderLine_variant_price {
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

export interface OrderLine_variant_images {
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

export interface OrderLine_variant_weight {
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

export interface OrderLine_variant_attributes_attribute_values {
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

export interface OrderLine_variant_attributes_attribute {
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
  values: (OrderLine_variant_attributes_attribute_values | null)[] | null;
}

export interface OrderLine_variant_attributes_values {
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

export interface OrderLine_variant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: OrderLine_variant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (OrderLine_variant_attributes_values | null)[];
}

export interface OrderLine_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
}

export interface OrderLine_variant {
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
  stocks: (OrderLine_variant_stocks | null)[] | null;
  /**
   * Override the base price of a product.
   */
  price: OrderLine_variant_price | null;
  /**
   * List of images for the product variant.
   */
  images: (OrderLine_variant_images | null)[] | null;
  weight: OrderLine_variant_weight | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: OrderLine_variant_attributes[];
  product: OrderLine_variant_product;
}

export interface OrderLine_productreview {
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

export interface OrderLine {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  isShippingRequired: boolean;
  productName: string;
  productSku: string;
  quantity: number;
  quantityFulfilled: number;
  variantName: string;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: OrderLine_thumbnail | null;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: OrderLine_unitPrice | null;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: OrderLine_variant | null;
  productreview: OrderLine_productreview | null;
}
