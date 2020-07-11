/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AccountAddressDelete
// ====================================================

export interface AccountAddressDelete_accountAddressDelete_accountErrors {
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

export interface AccountAddressDelete_accountAddressDelete_user_defaultShippingAddress_country {
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

export interface AccountAddressDelete_accountAddressDelete_user_defaultShippingAddress {
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
  country: AccountAddressDelete_accountAddressDelete_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface AccountAddressDelete_accountAddressDelete_user_addresses_country {
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

export interface AccountAddressDelete_accountAddressDelete_user_addresses {
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
  country: AccountAddressDelete_accountAddressDelete_user_addresses_country;
  countryArea: string;
  phone: string;
}

export interface AccountAddressDelete_accountAddressDelete_user {
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
  defaultShippingAddress: AccountAddressDelete_accountAddressDelete_user_defaultShippingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (AccountAddressDelete_accountAddressDelete_user_addresses | null)[] | null;
}

export interface AccountAddressDelete_accountAddressDelete_address_country {
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

export interface AccountAddressDelete_accountAddressDelete_address {
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
  country: AccountAddressDelete_accountAddressDelete_address_country;
  countryArea: string;
  phone: string;
}

export interface AccountAddressDelete_accountAddressDelete {
  __typename: "AccountAddressDelete";
  accountErrors: AccountAddressDelete_accountAddressDelete_accountErrors[];
  /**
   * A user instance for which the address was deleted.
   */
  user: AccountAddressDelete_accountAddressDelete_user | null;
  address: AccountAddressDelete_accountAddressDelete_address | null;
}

export interface AccountAddressDelete {
  /**
   * Delete an address of the logged-in user.
   */
  accountAddressDelete: AccountAddressDelete_accountAddressDelete | null;
}

export interface AccountAddressDeleteVariables {
  id: string;
}
