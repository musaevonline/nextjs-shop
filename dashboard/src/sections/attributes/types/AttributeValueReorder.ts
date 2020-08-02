/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReorderInput, ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AttributeValueReorder
// ====================================================

export interface AttributeValueReorder_attributeReorderValues_attribute_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface AttributeValueReorder_attributeReorderValues_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attribute's values.
   */
  values: (AttributeValueReorder_attributeReorderValues_attribute_values | null)[] | null;
}

export interface AttributeValueReorder_attributeReorderValues_errors {
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

export interface AttributeValueReorder_attributeReorderValues {
  __typename: "AttributeReorderValues";
  /**
   * Attribute from which values are reordered.
   */
  attribute: AttributeValueReorder_attributeReorderValues_attribute | null;
  errors: AttributeValueReorder_attributeReorderValues_errors[];
}

export interface AttributeValueReorder {
  /**
   * Reorder the values of an attribute.
   */
  attributeReorderValues: AttributeValueReorder_attributeReorderValues | null;
}

export interface AttributeValueReorderVariables {
  id: string;
  move: ReorderInput;
}
