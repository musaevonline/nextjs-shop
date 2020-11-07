/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WeightUnitsEnum, AuthorizationKeyType } from "./../../../types/globalTypes";

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

export interface ShopInfo_shop_companyAddress_country {
  __typename: "CountryDisplay";
  /**
   * Country code.
   */
  code: string;
  /**
   * Country name.
   */
  country: string;
}

export interface ShopInfo_shop_companyAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: ShopInfo_shop_companyAddress_country;
  countryArea: string;
  phone: string;
}

export interface ShopInfo_shop_images {
  __typename: "SiteBannerImage";
  /**
   * The ID of the object.
   */
  id: string;
  alt: string;
  description: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * The URL of the image.
   */
  mobileUrl: string;
}

export interface ShopInfo_shop_authorizationKeys {
  __typename: "AuthorizationKey";
  /**
   * Name of the authorization backend.
   */
  name: AuthorizationKeyType;
  /**
   * Authorization key (client ID).
   */
  key: string;
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
   * Shop's default currency.
   */
  defaultCurrency: string;
  /**
   * Default weight unit.
   */
  defaultWeightUnit: WeightUnitsEnum | null;
  /**
   * Shop's domain data.
   */
  domain: ShopInfo_shop_domain;
  /**
   * Company address.
   */
  companyAddress: ShopInfo_shop_companyAddress | null;
  /**
   * List of images for the site.
   */
  images: (ShopInfo_shop_images | null)[] | null;
  /**
   * List of configured authorization keys. Authorization keys are used to enable third-party OAuth authorization (currently Facebook or Google).
   */
  authorizationKeys: (ShopInfo_shop_authorizationKeys | null)[];
}

export interface ShopInfo {
  /**
   * Return information about the shop.
   */
  shop: ShopInfo_shop;
}
