/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeUpdateInput, AttributeInputTypeEnum, AttributeValueType, ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AttributeUpdate
// ====================================================

export interface AttributeUpdate_attributeUpdate_attribute_values {
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

export interface AttributeUpdate_attributeUpdate_attribute {
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
  values: (AttributeUpdate_attributeUpdate_attribute_values | null)[] | null;
}

export interface AttributeUpdate_attributeUpdate_errors {
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

export interface AttributeUpdate_attributeUpdate {
  __typename: "AttributeUpdate";
  attribute: AttributeUpdate_attributeUpdate_attribute | null;
  errors: AttributeUpdate_attributeUpdate_errors[];
}

export interface AttributeUpdate {
  /**
   * Updates attribute.
   */
  attributeUpdate: AttributeUpdate_attributeUpdate | null;
}

export interface AttributeUpdateVariables {
  id: string;
  input: AttributeUpdateInput;
}
