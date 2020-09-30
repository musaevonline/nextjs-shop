/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PageInput, PageErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: PageCreate
// ====================================================

export interface PageCreate_pageCreate_errors {
  __typename: "PageError";
  /**
   * The error code.
   */
  code: PageErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
}

export interface PageCreate_pageCreate_page {
  __typename: "Page";
  /**
   * The ID of the object.
   */
  id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  contentJson: any;
  publicationDate: any | null;
}

export interface PageCreate_pageCreate {
  __typename: "PageCreate";
  errors: PageCreate_pageCreate_errors[];
  page: PageCreate_pageCreate_page | null;
}

export interface PageCreate {
  /**
   * Creates a new page.
   */
  pageCreate: PageCreate_pageCreate | null;
}

export interface PageCreateVariables {
  input: PageInput;
}
