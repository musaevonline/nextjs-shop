/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingMethodInput, ShippingErrorCode, ShippingMethodTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateShippingMethod
// ====================================================

export interface UpdateShippingMethod_shippingMethodUpdate_errors {
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

export interface UpdateShippingMethod_shippingMethodUpdate_shippingMethod_minimumOrderPrice {
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

export interface UpdateShippingMethod_shippingMethodUpdate_shippingMethod_minimumOrderWeight {
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

export interface UpdateShippingMethod_shippingMethodUpdate_shippingMethod_maximumOrderPrice {
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

export interface UpdateShippingMethod_shippingMethodUpdate_shippingMethod_maximumOrderWeight {
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

export interface UpdateShippingMethod_shippingMethodUpdate_shippingMethod_price {
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

export interface UpdateShippingMethod_shippingMethodUpdate_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  minimumOrderPrice: UpdateShippingMethod_shippingMethodUpdate_shippingMethod_minimumOrderPrice | null;
  minimumOrderWeight: UpdateShippingMethod_shippingMethodUpdate_shippingMethod_minimumOrderWeight | null;
  maximumOrderPrice: UpdateShippingMethod_shippingMethodUpdate_shippingMethod_maximumOrderPrice | null;
  maximumOrderWeight: UpdateShippingMethod_shippingMethodUpdate_shippingMethod_maximumOrderWeight | null;
  name: string;
  price: UpdateShippingMethod_shippingMethodUpdate_shippingMethod_price | null;
  /**
   * Type of the shipping method.
   */
  type: ShippingMethodTypeEnum | null;
}

export interface UpdateShippingMethod_shippingMethodUpdate {
  __typename: "ShippingMethodUpdate";
  errors: UpdateShippingMethod_shippingMethodUpdate_errors[];
  shippingMethod: UpdateShippingMethod_shippingMethodUpdate_shippingMethod | null;
}

export interface UpdateShippingMethod {
  /**
   * Updates a new shipping method.
   */
  shippingMethodUpdate: UpdateShippingMethod_shippingMethodUpdate | null;
}

export interface UpdateShippingMethodVariables {
  id: string;
  input: ShippingMethodInput;
}
