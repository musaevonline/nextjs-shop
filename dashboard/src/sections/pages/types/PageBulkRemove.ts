/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PageErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: PageBulkRemove
// ====================================================

export interface PageBulkRemove_pageBulkDelete_pageErrors {
  __typename: "PageError";
  /**
   * The error code.
   */
  code: PageErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface PageBulkRemove_pageBulkDelete {
  __typename: "PageBulkDelete";
  pageErrors: PageBulkRemove_pageBulkDelete_pageErrors[];
  /**
   * Returns how many objects were affected.
   */
  count: number;
}

export interface PageBulkRemove {
  /**
   * Deletes pages.
   */
  pageBulkDelete: PageBulkRemove_pageBulkDelete | null;
}

export interface PageBulkRemoveVariables {
  ids: (string | null)[];
}
