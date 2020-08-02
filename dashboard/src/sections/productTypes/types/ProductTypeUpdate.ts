/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ProductTypeInput, ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductTypeUpdate
// ====================================================

export interface ProductTypeUpdate_productTypeUpdate_productErrors {
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

export interface ProductTypeUpdate_productTypeUpdate_productType_productAttributes {
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

export interface ProductTypeUpdate_productTypeUpdate_productType_variantAttributes {
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

export interface ProductTypeUpdate_productTypeUpdate_productType_weight {
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

export interface ProductTypeUpdate_productTypeUpdate_productType {
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
  productAttributes: (ProductTypeUpdate_productTypeUpdate_productType_productAttributes | null)[] | null;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (ProductTypeUpdate_productTypeUpdate_productType_variantAttributes | null)[] | null;
  weight: ProductTypeUpdate_productTypeUpdate_productType_weight | null;
}

export interface ProductTypeUpdate_productTypeUpdate {
  __typename: "ProductTypeUpdate";
  productErrors: ProductTypeUpdate_productTypeUpdate_productErrors[];
  productType: ProductTypeUpdate_productTypeUpdate_productType | null;
}

export interface ProductTypeUpdate {
  /**
   * Updates an existing product type.
   */
  productTypeUpdate: ProductTypeUpdate_productTypeUpdate | null;
}

export interface ProductTypeUpdateVariables {
  id: string;
  input: ProductTypeInput;
}
