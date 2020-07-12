/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductFragment
// ====================================================

export interface ProductFragment_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface ProductFragment_minimalVariantPrice {
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

export interface ProductFragment_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface ProductFragment {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: ProductFragment_thumbnail | null;
  /**
   * Whether the product is in stock and visible or not.
   */
  isAvailable: boolean | null;
  isPublished: boolean;
  minimalVariantPrice: ProductFragment_minimalVariantPrice | null;
  productType: ProductFragment_productType;
}
