/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

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

export interface ShopInfo_shop {
  __typename: "Shop";
  /**
   * Shop's name.
   */
  name: string;
  /**
   * Shop's description.
   */
  description: string | null;
  /**
   * Header text.
   */
  headerText: string | null;
  /**
   * Shop's domain data.
   */
  domain: ShopInfo_shop_domain;
}

export interface ShopInfo {
  /**
   * Return information about the shop.
   */
  shop: ShopInfo_shop;
}
