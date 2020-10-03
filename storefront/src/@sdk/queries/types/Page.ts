/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Page
// ====================================================

export interface Page_page {
  __typename: "Page";
  /**
   * The ID of the object.
   */
  id: string;
  contentJson: any;
  content: string;
  isPublished: boolean;
  created: any;
  publicationDate: any | null;
  slug: string;
  title: string;
}

export interface Page {
  /**
   * Look up a page by ID or slug.
   */
  page: Page_page | null;
}

export interface PageVariables {
  id?: string | null;
  slug?: string | null;
}
