/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WeightUnitsEnum, PermissionEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: ShopInfo
// ====================================================

export interface ShopInfo_shop_domain {
  __typename: "Domain";
  /**
   * The host name of the domain.
   */
  host: string;
  /**
   * Shop's absolute URL.
   */
  url: string;
}

export interface ShopInfo_shop_permissions {
  __typename: "Permission";
  /**
   * Internal code for permission.
   */
  code: PermissionEnum;
  /**
   * Describe action(s) allowed to do by permission.
   */
  name: string;
}

export interface ShopInfo_shop {
  __typename: "Shop";
  /**
   * Shop's default currency.
   */
  defaultCurrency: string;
  /**
   * Default weight unit.
   */
  defaultWeightUnit: WeightUnitsEnum | null;
  /**
   * Display prices with tax in store.
   */
  displayGrossPrices: boolean;
  /**
   * Shop's domain data.
   */
  domain: ShopInfo_shop_domain;
  /**
   * Include taxes in prices.
   */
  includeTaxesInPrices: boolean;
  /**
   * Shop's name.
   */
  name: string;
  /**
   * Enable inventory tracking.
   */
  trackInventoryByDefault: boolean | null;
  /**
   * List of available permissions.
   */
  permissions: (ShopInfo_shop_permissions | null)[];
}

export interface ShopInfo {
  /**
   * Return information about the shop.
   */
  shop: ShopInfo_shop;
}
