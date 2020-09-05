/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WeightUnitsEnum, ShopErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: UpdateDefaultWeightUnit
// ====================================================

export interface UpdateDefaultWeightUnit_shopSettingsUpdate_shopErrors {
  __typename: "ShopError";
  /**
   * The error code.
   */
  code: ShopErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface UpdateDefaultWeightUnit_shopSettingsUpdate_shop {
  __typename: "Shop";
  /**
   * Default weight unit.
   */
  defaultWeightUnit: WeightUnitsEnum | null;
}

export interface UpdateDefaultWeightUnit_shopSettingsUpdate {
  __typename: "ShopSettingsUpdate";
  shopErrors: UpdateDefaultWeightUnit_shopSettingsUpdate_shopErrors[];
  /**
   * Updated shop.
   */
  shop: UpdateDefaultWeightUnit_shopSettingsUpdate_shop | null;
}

export interface UpdateDefaultWeightUnit {
  /**
   * Updates shop settings.
   */
  shopSettingsUpdate: UpdateDefaultWeightUnit_shopSettingsUpdate | null;
}

export interface UpdateDefaultWeightUnitVariables {
  unit?: WeightUnitsEnum | null;
}
