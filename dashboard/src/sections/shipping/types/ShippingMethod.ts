/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingMethodTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ShippingMethod
// ====================================================

export interface ShippingMethod_shippingMethod_minimumOrderPrice {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ShippingMethod_shippingMethod_minimumOrderWeight {
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

export interface ShippingMethod_shippingMethod_maximumOrderPrice {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ShippingMethod_shippingMethod_maximumOrderWeight {
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

export interface ShippingMethod_shippingMethod_price {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface ShippingMethod_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  minimumOrderPrice: ShippingMethod_shippingMethod_minimumOrderPrice | null;
  minimumOrderWeight: ShippingMethod_shippingMethod_minimumOrderWeight | null;
  maximumOrderPrice: ShippingMethod_shippingMethod_maximumOrderPrice | null;
  maximumOrderWeight: ShippingMethod_shippingMethod_maximumOrderWeight | null;
  price: ShippingMethod_shippingMethod_price | null;
  name: string;
  description: string;
  /**
   * Type of the shipping method.
   */
  type: ShippingMethodTypeEnum | null;
}

export interface ShippingMethod {
  /**
   * Look up a shipping zone by ID.
   */
  shippingMethod: ShippingMethod_shippingMethod | null;
}

export interface ShippingMethodVariables {
  id: string;
}
