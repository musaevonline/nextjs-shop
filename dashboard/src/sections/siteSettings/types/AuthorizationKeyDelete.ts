/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthorizationKeyType, ShopErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AuthorizationKeyDelete
// ====================================================

export interface AuthorizationKeyDelete_authorizationKeyDelete_errors {
  __typename: "ShopError";
  /**
   * The error code.
   */
  code: ShopErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
}

export interface AuthorizationKeyDelete_authorizationKeyDelete_shop_authorizationKeys {
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

export interface AuthorizationKeyDelete_authorizationKeyDelete_shop_companyAddress_country {
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

export interface AuthorizationKeyDelete_authorizationKeyDelete_shop_companyAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: AuthorizationKeyDelete_authorizationKeyDelete_shop_companyAddress_country;
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

export interface AuthorizationKeyDelete_authorizationKeyDelete_shop_domain {
  __typename: "Domain";
  /**
   * The host name of the domain.
   */
  host: string;
}

export interface AuthorizationKeyDelete_authorizationKeyDelete_shop {
  __typename: "Shop";
  /**
   * List of configured authorization keys. Authorization keys are used to enable third-party OAuth authorization (currently Facebook or Google).
   */
  authorizationKeys: (AuthorizationKeyDelete_authorizationKeyDelete_shop_authorizationKeys | null)[];
  /**
   * Company address.
   */
  companyAddress: AuthorizationKeyDelete_authorizationKeyDelete_shop_companyAddress | null;
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
  domain: AuthorizationKeyDelete_authorizationKeyDelete_shop_domain;
}

export interface AuthorizationKeyDelete_authorizationKeyDelete {
  __typename: "AuthorizationKeyDelete";
  errors: AuthorizationKeyDelete_authorizationKeyDelete_errors[];
  /**
   * Updated shop.
   */
  shop: AuthorizationKeyDelete_authorizationKeyDelete_shop | null;
}

export interface AuthorizationKeyDelete {
  /**
   * Deletes an authorization key.
   */
  authorizationKeyDelete: AuthorizationKeyDelete_authorizationKeyDelete | null;
}

export interface AuthorizationKeyDeleteVariables {
  keyType: AuthorizationKeyType;
}
