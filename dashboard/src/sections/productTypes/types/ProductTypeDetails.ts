/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WeightUnitsEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ProductTypeDetails
// ====================================================

export interface ProductTypeDetails_productType_productAttributes {
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

export interface ProductTypeDetails_productType_variantAttributes {
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

export interface ProductTypeDetails_productType_weight {
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

export interface ProductTypeDetails_productType {
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
  productAttributes: (ProductTypeDetails_productType_productAttributes | null)[] | null;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (ProductTypeDetails_productType_variantAttributes | null)[] | null;
  weight: ProductTypeDetails_productType_weight | null;
}

export interface ProductTypeDetails_shop {
  __typename: "Shop";
  /**
   * Default weight unit.
   */
  defaultWeightUnit: WeightUnitsEnum | null;
}

export interface ProductTypeDetails {
  /**
   * Look up a product type by ID.
   */
  productType: ProductTypeDetails_productType | null;
  /**
   * Return information about the shop.
   */
  shop: ProductTypeDetails_shop;
}

export interface ProductTypeDetailsVariables {
  id: string;
}
