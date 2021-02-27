/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryBase
// ====================================================

export interface CategoryBase_backgroundImage {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface CategoryBase_thumbnailSm {
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

export interface CategoryBase_thumbnailXs {
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

export interface CategoryBase {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  slug: string;
  description: string;
  backgroundImage: CategoryBase_backgroundImage | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnailSm: CategoryBase_thumbnailSm | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnailXs: CategoryBase_thumbnailXs | null;
}
