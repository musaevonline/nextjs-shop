/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AttributeDelete
// ====================================================

export interface AttributeDelete_attributeDelete_errors {
  __typename: "ProductError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
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

export interface AttributeDelete_attributeDelete {
  __typename: "AttributeDelete";
  errors: AttributeDelete_attributeDelete_errors[];
}

export interface AttributeDelete {
  /**
   * Deletes an attribute.
   */
  attributeDelete: AttributeDelete_attributeDelete | null;
}

export interface AttributeDeleteVariables {
  id: string;
}
