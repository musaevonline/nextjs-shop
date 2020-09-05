/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingMethodInput, ShippingErrorCode, ShippingMethodTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateShippingMethod
// ====================================================

export interface CreateShippingMethod_shippingMethodCreate_errors {
  __typename: "ShippingError";
  /**
   * The error code.
   */
  code: ShippingErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
}

export interface CreateShippingMethod_shippingMethodCreate_shippingMethod_minimumOrderPrice {
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

export interface CreateShippingMethod_shippingMethodCreate_shippingMethod_minimumOrderWeight {
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

export interface CreateShippingMethod_shippingMethodCreate_shippingMethod_maximumOrderPrice {
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

export interface CreateShippingMethod_shippingMethodCreate_shippingMethod_maximumOrderWeight {
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

export interface CreateShippingMethod_shippingMethodCreate_shippingMethod_price {
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

export interface CreateShippingMethod_shippingMethodCreate_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  minimumOrderPrice: CreateShippingMethod_shippingMethodCreate_shippingMethod_minimumOrderPrice | null;
  minimumOrderWeight: CreateShippingMethod_shippingMethodCreate_shippingMethod_minimumOrderWeight | null;
  maximumOrderPrice: CreateShippingMethod_shippingMethodCreate_shippingMethod_maximumOrderPrice | null;
  maximumOrderWeight: CreateShippingMethod_shippingMethodCreate_shippingMethod_maximumOrderWeight | null;
  name: string;
  price: CreateShippingMethod_shippingMethodCreate_shippingMethod_price | null;
  /**
   * Type of the shipping method.
   */
  type: ShippingMethodTypeEnum | null;
}

export interface CreateShippingMethod_shippingMethodCreate {
  __typename: "ShippingMethodCreate";
  errors: CreateShippingMethod_shippingMethodCreate_errors[];
  shippingMethod: CreateShippingMethod_shippingMethodCreate_shippingMethod | null;
}

export interface CreateShippingMethod {
  /**
   * Creates a new shipping method.
   */
  shippingMethodCreate: CreateShippingMethod_shippingMethodCreate | null;
}

export interface CreateShippingMethodVariables {
  input: ShippingMethodInput;
}
