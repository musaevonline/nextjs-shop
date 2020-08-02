/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeAssignInput, ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AssignAttribute
// ====================================================

export interface AssignAttribute_attributeAssign_productErrors {
  __typename: "ProductAttributeError";
  /**
   * The error code.
   */
  code: ProductErrorCode;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * List of attributes IDs which causes the error.
   */
  attributes: string[] | null;
}

export interface AssignAttribute_attributeAssign_productType_productAttributes {
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
}

export interface AssignAttribute_attributeAssign_productType_variantAttributes {
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
}

export interface AssignAttribute_attributeAssign_productType_weight {
  __typename: "Weight";
  /**
   * Weight unit.
   */
  unit: string;
  /**
   * Weight value.
   */
  value: number;
}

export interface AssignAttribute_attributeAssign_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  hasVariants: boolean;
  isShippingRequired: boolean;
  /**
   * Product attributes of that product type.
   */
  productAttributes: (AssignAttribute_attributeAssign_productType_productAttributes | null)[] | null;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (AssignAttribute_attributeAssign_productType_variantAttributes | null)[] | null;
  weight: AssignAttribute_attributeAssign_productType_weight | null;
}

export interface AssignAttribute_attributeAssign {
  __typename: "AttributeAssign";
  productErrors: AssignAttribute_attributeAssign_productErrors[];
  /**
   * The updated product type.
   */
  productType: AssignAttribute_attributeAssign_productType | null;
}

export interface AssignAttribute {
  /**
   * Assign attributes to a given product type.
   */
  attributeAssign: AssignAttribute_attributeAssign | null;
}

export interface AssignAttributeVariables {
  id: string;
  operations: AttributeAssignInput[];
}
