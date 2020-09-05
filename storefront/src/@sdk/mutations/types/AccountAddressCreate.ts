/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddressInput, AccountErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AccountAddressCreate
// ====================================================

export interface AccountAddressCreate_accountAddressCreate_accountErrors {
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

export interface AccountAddressCreate_accountAddressCreate_user_defaultShippingAddress_country {
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

export interface AccountAddressCreate_accountAddressCreate_user_defaultShippingAddress {
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
  country: AccountAddressCreate_accountAddressCreate_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface AccountAddressCreate_accountAddressCreate_user_addresses_country {
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

export interface AccountAddressCreate_accountAddressCreate_user_addresses {
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
  country: AccountAddressCreate_accountAddressCreate_user_addresses_country;
  countryArea: string;
  phone: string;
}

export interface AccountAddressCreate_accountAddressCreate_user {
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
  defaultShippingAddress: AccountAddressCreate_accountAddressCreate_user_defaultShippingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (AccountAddressCreate_accountAddressCreate_user_addresses | null)[] | null;
}

export interface AccountAddressCreate_accountAddressCreate_address_country {
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

export interface AccountAddressCreate_accountAddressCreate_address {
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
  country: AccountAddressCreate_accountAddressCreate_address_country;
  countryArea: string;
  phone: string;
}

export interface AccountAddressCreate_accountAddressCreate {
  __typename: "AccountAddressCreate";
  accountErrors: AccountAddressCreate_accountAddressCreate_accountErrors[];
  /**
   * A user instance for which the address was created.
   */
  user: AccountAddressCreate_accountAddressCreate_user | null;
  address: AccountAddressCreate_accountAddressCreate_address | null;
}

export interface AccountAddressCreate {
  /**
   * Create a new address for the customer.
   */
  accountAddressCreate: AccountAddressCreate_accountAddressCreate | null;
}

export interface AccountAddressCreateVariables {
  input: AddressInput;
}
