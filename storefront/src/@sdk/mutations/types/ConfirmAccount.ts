/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ConfirmAccount
// ====================================================

export interface ConfirmAccount_confirmAccount_accountErrors {
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

export interface ConfirmAccount_confirmAccount_user_defaultShippingAddress_country {
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

export interface ConfirmAccount_confirmAccount_user_defaultShippingAddress {
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
  country: ConfirmAccount_confirmAccount_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface ConfirmAccount_confirmAccount_user_addresses_country {
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

export interface ConfirmAccount_confirmAccount_user_addresses {
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
  country: ConfirmAccount_confirmAccount_user_addresses_country;
  countryArea: string;
  phone: string;
}

export interface ConfirmAccount_confirmAccount_user {
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
  defaultShippingAddress: ConfirmAccount_confirmAccount_user_defaultShippingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (ConfirmAccount_confirmAccount_user_addresses | null)[] | null;
}

export interface ConfirmAccount_confirmAccount {
  __typename: "ConfirmAccount";
  accountErrors: ConfirmAccount_confirmAccount_accountErrors[];
  /**
   * An activated user account.
   */
  user: ConfirmAccount_confirmAccount_user | null;
}

export interface ConfirmAccount {
  /**
   * Confirm user account with token sent by email during registration.
   */
  confirmAccount: ConfirmAccount_confirmAccount | null;
}

export interface ConfirmAccountVariables {
  email: string;
  token: string;
}
