/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthorizationKeyType } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: ShopFragment
// ====================================================

export interface ShopFragment_authorizationKeys {
  __typename: "AuthorizationKey";
  /**
   * Authorization key (client ID).
   */
  key: string;
  /**
   * Name of the authorization backend.
   */
  name: AuthorizationKeyType;
}

export interface ShopFragment_companyAddress_country {
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

export interface ShopFragment_companyAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: ShopFragment_companyAddress_country;
  countryArea: string;
  firstName: string;
  /**
   * The ID of the object.
   */
  id: string;
  lastName: string;
  phone: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface ShopFragment_domain {
  __typename: "Domain";
  /**
   * The host name of the domain.
   */
  host: string;
}

export interface ShopFragment {
  __typename: "Shop";
  /**
   * List of configured authorization keys. Authorization keys are used to enable third-party OAuth authorization (currently Facebook or Google).
   */
  authorizationKeys: (ShopFragment_authorizationKeys | null)[];
  /**
   * Company address.
   */
  companyAddress: ShopFragment_companyAddress | null;
  /**
   * URL of a view where customers can set their password.
   */
  customerSetPasswordUrl: string | null;
  /**
   * Default shop's email sender's address.
   */
  defaultMailSenderAddress: string | null;
  /**
   * Default shop's email sender's name.
   */
  defaultMailSenderName: string | null;
  /**
   * Shop's description.
   */
  description: string | null;
  /**
   * Shop's name.
   */
  name: string;
  /**
   * Header text.
   */
  headerText: string | null;
  /**
   * Shop's domain data.
   */
  domain: ShopFragment_domain;
}
