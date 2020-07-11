/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AccountPasswordChange
// ====================================================

export interface AccountPasswordChange_passwordChange_accountErrors {
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

export interface AccountPasswordChange_passwordChange_user_defaultShippingAddress_country {
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

export interface AccountPasswordChange_passwordChange_user_defaultShippingAddress {
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
  country: AccountPasswordChange_passwordChange_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface AccountPasswordChange_passwordChange_user_addresses_country {
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

export interface AccountPasswordChange_passwordChange_user_addresses {
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
  country: AccountPasswordChange_passwordChange_user_addresses_country;
  countryArea: string;
  phone: string;
}

export interface AccountPasswordChange_passwordChange_user {
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
  defaultShippingAddress: AccountPasswordChange_passwordChange_user_defaultShippingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (AccountPasswordChange_passwordChange_user_addresses | null)[] | null;
}

export interface AccountPasswordChange_passwordChange {
  __typename: "PasswordChange";
  accountErrors: AccountPasswordChange_passwordChange_accountErrors[];
  /**
   * A user instance with a new password.
   */
  user: AccountPasswordChange_passwordChange_user | null;
}

export interface AccountPasswordChange {
  /**
   * Change the password of the logged in user.
   */
  passwordChange: AccountPasswordChange_passwordChange | null;
}

export interface AccountPasswordChangeVariables {
  oldPassword: string;
  newPassword: string;
}
