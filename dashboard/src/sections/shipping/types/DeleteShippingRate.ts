/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingErrorCode, ShippingMethodTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: DeleteShippingRate
// ====================================================

export interface DeleteShippingRate_shippingPriceDelete_errors {
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

export interface DeleteShippingRate_shippingPriceDelete_shippingMethod_minimumOrderPrice {
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

export interface DeleteShippingRate_shippingPriceDelete_shippingMethod_minimumOrderWeight {
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

export interface DeleteShippingRate_shippingPriceDelete_shippingMethod_maximumOrderPrice {
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

export interface DeleteShippingRate_shippingPriceDelete_shippingMethod_maximumOrderWeight {
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

export interface DeleteShippingRate_shippingPriceDelete_shippingMethod_price {
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

export interface DeleteShippingRate_shippingPriceDelete_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  minimumOrderPrice: DeleteShippingRate_shippingPriceDelete_shippingMethod_minimumOrderPrice | null;
  minimumOrderWeight: DeleteShippingRate_shippingPriceDelete_shippingMethod_minimumOrderWeight | null;
  maximumOrderPrice: DeleteShippingRate_shippingPriceDelete_shippingMethod_maximumOrderPrice | null;
  maximumOrderWeight: DeleteShippingRate_shippingPriceDelete_shippingMethod_maximumOrderWeight | null;
  name: string;
  price: DeleteShippingRate_shippingPriceDelete_shippingMethod_price | null;
  /**
   * Type of the shipping method.
   */
  type: ShippingMethodTypeEnum | null;
}

export interface DeleteShippingRate_shippingPriceDelete {
  __typename: "ShippingPriceDelete";
  errors: DeleteShippingRate_shippingPriceDelete_errors[];
  /**
   * A shipping method to delete.
   */
  shippingMethod: DeleteShippingRate_shippingPriceDelete_shippingMethod | null;
}

export interface DeleteShippingRate {
  /**
   * Deletes a shipping price.
   */
  shippingPriceDelete: DeleteShippingRate_shippingPriceDelete | null;
}

export interface DeleteShippingRateVariables {
  id: string;
}
