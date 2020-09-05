/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_setPassword_accountErrors {
  __typename: "AccountError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface ResetPassword_setPassword_user_defaultShippingAddress_country {
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

export interface ResetPassword_setPassword_user_defaultShippingAddress {
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
  country: ResetPassword_setPassword_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface ResetPassword_setPassword_user_addresses_country {
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

export interface ResetPassword_setPassword_user_addresses {
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
  country: ResetPassword_setPassword_user_addresses_country;
  countryArea: string;
  phone: string;
}

export interface ResetPassword_setPassword_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  isActive: boolean;
  defaultShippingAddress: ResetPassword_setPassword_user_defaultShippingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (ResetPassword_setPassword_user_addresses | null)[] | null;
}

export interface ResetPassword_setPassword {
  __typename: "SetPassword";
  /**
   * List of errorsAddressCreate that occurred executing the mutation.
   */
  accountErrors: ResetPassword_setPassword_accountErrors[];
  token: string | null;
  /**
   * A user instance.
   */
  user: ResetPassword_setPassword_user | null;
}

export interface ResetPassword {
  /**
   * Sets the user's password from the token sent by email using the RequestPasswordReset mutation.
   */
  setPassword: ResetPassword_setPassword | null;
}

export interface ResetPasswordVariables {
  email: string;
  password: string;
  token: string;
}
