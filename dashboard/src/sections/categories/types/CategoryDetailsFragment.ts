/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: CategoryDetailsFragment
// ====================================================

export interface CategoryDetailsFragment_backgroundImage {
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

export interface CategoryDetailsFragment_parent {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CategoryDetailsFragment {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  backgroundImage: CategoryDetailsFragment_backgroundImage | null;
  name: string;
  descriptionJson: any;
  description: string;
  parent: CategoryDetailsFragment_parent | null;
}
