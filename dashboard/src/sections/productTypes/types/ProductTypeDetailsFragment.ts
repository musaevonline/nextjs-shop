/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ProductTypeDetailsFragment
// ====================================================

export interface ProductTypeDetailsFragment_productAttributes {
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

export interface ProductTypeDetailsFragment_variantAttributes {
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

export interface ProductTypeDetailsFragment_weight {
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

export interface ProductTypeDetailsFragment {
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
  productAttributes: (ProductTypeDetailsFragment_productAttributes | null)[] | null;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (ProductTypeDetailsFragment_variantAttributes | null)[] | null;
  weight: ProductTypeDetailsFragment_weight | null;
}
