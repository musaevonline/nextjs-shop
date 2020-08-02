/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum, AttributeValueType, ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AttributeValueDelete
// ====================================================

export interface AttributeValueDelete_attributeValueDelete_attribute_values {
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
  /**
   * Type of value (used only when `value` field is set).
   */
  type: AttributeValueType | null;
}

export interface AttributeValueDelete_attributeValueDelete_attribute {
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
   * Whether the attribute should be visible or not in storefront.
   */
  visibleInStorefront: boolean;
  /**
   * Whether the attribute can be filtered in dashboard.
   */
  filterableInDashboard: boolean;
  /**
   * Whether the attribute can be filtered in storefront.
   */
  filterableInStorefront: boolean;
  /**
   * Whether the attribute can be displayed in the admin product list.
   */
  availableInGrid: boolean;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * The position of the attribute in the storefront navigation (0 by default).
   */
  storefrontSearchPosition: number;
  /**
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * List of attribute's values.
   */
  values: (AttributeValueDelete_attributeValueDelete_attribute_values | null)[] | null;
}

export interface AttributeValueDelete_attributeValueDelete_errors {
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

export interface AttributeValueDelete_attributeValueDelete {
  __typename: "AttributeValueDelete";
  /**
   * The updated attribute.
   */
  attribute: AttributeValueDelete_attributeValueDelete_attribute | null;
  errors: AttributeValueDelete_attributeValueDelete_errors[];
}

export interface AttributeValueDelete {
  /**
   * Deletes a value of an attribute.
   */
  attributeValueDelete: AttributeValueDelete_attributeValueDelete | null;
}

export interface AttributeValueDeleteVariables {
  id: string;
}
