/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AuthorizationKeyInput, AuthorizationKeyType, ShopErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AuthorizationKeyAdd
// ====================================================

export interface AuthorizationKeyAdd_authorizationKeyAdd_errors {
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

export interface AuthorizationKeyAdd_authorizationKeyAdd_shop_authorizationKeys {
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

export interface AuthorizationKeyAdd_authorizationKeyAdd_shop_companyAddress_country {
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

export interface AuthorizationKeyAdd_authorizationKeyAdd_shop_companyAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: AuthorizationKeyAdd_authorizationKeyAdd_shop_companyAddress_country;
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

export interface AuthorizationKeyAdd_authorizationKeyAdd_shop_domain {
  __typename: "Domain";
  /**
   * The host name of the domain.
   */
  host: string;
}

export interface AuthorizationKeyAdd_authorizationKeyAdd_shop {
  __typename: "Shop";
  /**
   * List of configured authorization keys. Authorization keys are used to enable third-party OAuth authorization (currently Facebook or Google).
   */
  authorizationKeys: (AuthorizationKeyAdd_authorizationKeyAdd_shop_authorizationKeys | null)[];
  /**
   * Company address.
   */
  companyAddress: AuthorizationKeyAdd_authorizationKeyAdd_shop_companyAddress | null;
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
  domain: AuthorizationKeyAdd_authorizationKeyAdd_shop_domain;
}

export interface AuthorizationKeyAdd_authorizationKeyAdd {
  __typename: "AuthorizationKeyAdd";
  errors: AuthorizationKeyAdd_authorizationKeyAdd_errors[];
  /**
   * Updated shop.
   */
  shop: AuthorizationKeyAdd_authorizationKeyAdd_shop | null;
}

export interface AuthorizationKeyAdd {
  /**
   * Adds an authorization key.
   */
  authorizationKeyAdd: AuthorizationKeyAdd_authorizationKeyAdd | null;
}

export interface AuthorizationKeyAddVariables {
  input: AuthorizationKeyInput;
  keyType: AuthorizationKeyType;
}
