/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingPriceInput, ShippingErrorCode, ShippingMethodTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CreateShippingRate
// ====================================================

export interface CreateShippingRate_shippingPriceCreate_errors {
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

export interface CreateShippingRate_shippingPriceCreate_shippingMethod_minimumOrderPrice {
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

export interface CreateShippingRate_shippingPriceCreate_shippingMethod_minimumOrderWeight {
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

export interface CreateShippingRate_shippingPriceCreate_shippingMethod_maximumOrderPrice {
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

export interface CreateShippingRate_shippingPriceCreate_shippingMethod_maximumOrderWeight {
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

export interface CreateShippingRate_shippingPriceCreate_shippingMethod_price {
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

export interface CreateShippingRate_shippingPriceCreate_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  minimumOrderPrice: CreateShippingRate_shippingPriceCreate_shippingMethod_minimumOrderPrice | null;
  minimumOrderWeight: CreateShippingRate_shippingPriceCreate_shippingMethod_minimumOrderWeight | null;
  maximumOrderPrice: CreateShippingRate_shippingPriceCreate_shippingMethod_maximumOrderPrice | null;
  maximumOrderWeight: CreateShippingRate_shippingPriceCreate_shippingMethod_maximumOrderWeight | null;
  name: string;
  price: CreateShippingRate_shippingPriceCreate_shippingMethod_price | null;
  /**
   * Type of the shipping method.
   */
  type: ShippingMethodTypeEnum | null;
}

export interface CreateShippingRate_shippingPriceCreate {
  __typename: "ShippingPriceCreate";
  errors: CreateShippingRate_shippingPriceCreate_errors[];
  shippingMethod: CreateShippingRate_shippingPriceCreate_shippingMethod | null;
}

export interface CreateShippingRate {
  /**
   * Creates a new shipping price.
   */
  shippingPriceCreate: CreateShippingRate_shippingPriceCreate | null;
}

export interface CreateShippingRateVariables {
  input: ShippingPriceInput;
}
