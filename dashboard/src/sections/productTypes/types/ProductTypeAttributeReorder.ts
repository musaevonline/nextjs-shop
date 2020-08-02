/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ReorderInput, AttributeTypeEnum, ProductErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ProductTypeAttributeReorder
// ====================================================

export interface ProductTypeAttributeReorder_productTypeReorderAttributes_productErrors {
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

export interface ProductTypeAttributeReorder_productTypeReorderAttributes_productType_productAttributes {
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

export interface ProductTypeAttributeReorder_productTypeReorderAttributes_productType_variantAttributes {
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

export interface ProductTypeAttributeReorder_productTypeReorderAttributes_productType_weight {
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

export interface ProductTypeAttributeReorder_productTypeReorderAttributes_productType {
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
  productAttributes: (ProductTypeAttributeReorder_productTypeReorderAttributes_productType_productAttributes | null)[] | null;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (ProductTypeAttributeReorder_productTypeReorderAttributes_productType_variantAttributes | null)[] | null;
  weight: ProductTypeAttributeReorder_productTypeReorderAttributes_productType_weight | null;
}

export interface ProductTypeAttributeReorder_productTypeReorderAttributes {
  __typename: "ProductTypeReorderAttributes";
  productErrors: ProductTypeAttributeReorder_productTypeReorderAttributes_productErrors[];
  /**
   * Product type from which attributes are reordered.
   */
  productType: ProductTypeAttributeReorder_productTypeReorderAttributes_productType | null;
}

export interface ProductTypeAttributeReorder {
  /**
   * Reorder the attributes of a product type.
   */
  productTypeReorderAttributes: ProductTypeAttributeReorder_productTypeReorderAttributes | null;
}

export interface ProductTypeAttributeReorderVariables {
  move: ReorderInput;
  productTypeId: string;
  type: AttributeTypeEnum;
}
