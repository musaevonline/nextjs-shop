/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: RequestPasswordReset
// ====================================================

export interface RequestPasswordReset_requestPasswordReset_accountErrors {
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

export interface RequestPasswordReset_requestPasswordReset {
  __typename: "RequestPasswordReset";
  accountErrors: RequestPasswordReset_requestPasswordReset_accountErrors[];
}

export interface RequestPasswordReset {
  /**
   * Sends an email with the account password modification link.
   */
  requestPasswordReset: RequestPasswordReset_requestPasswordReset | null;
}

export interface RequestPasswordResetVariables {
  email: string;
  redirectUrl: string;
}
