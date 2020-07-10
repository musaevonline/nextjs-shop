/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountRegisterInput, AccountErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AccountRegister
// ====================================================

export interface AccountRegister_accountRegister_accountErrors {
  __typename: "AccountError";
  /**
   * The error code.
   */
  code: AccountErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface AccountRegister_accountRegister_user_defaultShippingAddress_country {
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

export interface AccountRegister_accountRegister_user_defaultShippingAddress {
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
  country: AccountRegister_accountRegister_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface AccountRegister_accountRegister_user_addresses_country {
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

export interface AccountRegister_accountRegister_user_addresses {
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
  country: AccountRegister_accountRegister_user_addresses_country;
  countryArea: string;
  phone: string;
}

export interface AccountRegister_accountRegister_user {
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
  defaultShippingAddress: AccountRegister_accountRegister_user_defaultShippingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (AccountRegister_accountRegister_user_addresses | null)[] | null;
}

export interface AccountRegister_accountRegister {
  __typename: "AccountRegister";
  accountErrors: AccountRegister_accountRegister_accountErrors[];
  /**
   * Informs whether users need to confirm their email address.
   */
  requiresConfirmation: boolean | null;
  user: AccountRegister_accountRegister_user | null;
}

export interface AccountRegister {
  /**
   * Register a new user.
   */
  accountRegister: AccountRegister_accountRegister | null;
}

export interface AccountRegisterVariables {
  input: AccountRegisterInput;
}
