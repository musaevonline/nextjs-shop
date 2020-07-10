/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: ForgotPassword
// ====================================================

export interface ForgotPassword_requestPasswordReset_accountErrors {
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

export interface ForgotPassword_requestPasswordReset {
  __typename: "RequestPasswordReset";
  accountErrors: ForgotPassword_requestPasswordReset_accountErrors[];
}

export interface ForgotPassword {
  /**
   * Sends an email with the account password modification link.
   */
  requestPasswordReset: ForgotPassword_requestPasswordReset | null;
}

export interface ForgotPasswordVariables {
  email: string;
  redirectUrl: string;
}
