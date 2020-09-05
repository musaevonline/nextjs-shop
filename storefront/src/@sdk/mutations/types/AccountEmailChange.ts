/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AccountEmailChange
// ====================================================

export interface AccountEmailChange_requestEmailChange_accountErrors {
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

export interface AccountEmailChange_requestEmailChange_user_defaultShippingAddress_country {
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

export interface AccountEmailChange_requestEmailChange_user_defaultShippingAddress {
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
  country: AccountEmailChange_requestEmailChange_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface AccountEmailChange_requestEmailChange_user_addresses_country {
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

export interface AccountEmailChange_requestEmailChange_user_addresses {
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
  country: AccountEmailChange_requestEmailChange_user_addresses_country;
  countryArea: string;
  phone: string;
}

export interface AccountEmailChange_requestEmailChange_user {
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
  defaultShippingAddress: AccountEmailChange_requestEmailChange_user_defaultShippingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (AccountEmailChange_requestEmailChange_user_addresses | null)[] | null;
}

export interface AccountEmailChange_requestEmailChange {
  __typename: "RequestEmailChange";
  accountErrors: AccountEmailChange_requestEmailChange_accountErrors[];
  /**
   * A user instance.
   */
  user: AccountEmailChange_requestEmailChange_user | null;
}

export interface AccountEmailChange {
  /**
   * Request email change of the logged in user.
   */
  requestEmailChange: AccountEmailChange_requestEmailChange | null;
}

export interface AccountEmailChangeVariables {
  password: string;
  newEmail: string;
  redirectUrl: string;
}
