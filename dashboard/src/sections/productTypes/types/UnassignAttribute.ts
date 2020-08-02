/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UnassignAttribute
// ====================================================

export interface UnassignAttribute_attributeUnassign_productErrors {
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

export interface UnassignAttribute_attributeUnassign_productType_productAttributes {
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

export interface UnassignAttribute_attributeUnassign_productType_variantAttributes {
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

export interface UnassignAttribute_attributeUnassign_productType_weight {
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

export interface UnassignAttribute_attributeUnassign_productType {
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
  productAttributes: (UnassignAttribute_attributeUnassign_productType_productAttributes | null)[] | null;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (UnassignAttribute_attributeUnassign_productType_variantAttributes | null)[] | null;
  weight: UnassignAttribute_attributeUnassign_productType_weight | null;
}

export interface UnassignAttribute_attributeUnassign {
  __typename: "AttributeUnassign";
  productErrors: UnassignAttribute_attributeUnassign_productErrors[];
  /**
   * The updated product type.
   */
  productType: UnassignAttribute_attributeUnassign_productType | null;
}

export interface UnassignAttribute {
  /**
   * Un-assign attributes from a given product type.
   */
  attributeUnassign: UnassignAttribute_attributeUnassign | null;
}

export interface UnassignAttributeVariables {
  id: string;
  ids: (string | null)[];
}
