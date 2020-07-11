/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountRegisterInput, AccountErrorCode, PermissionEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_accountRegister_accountErrors {
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

export interface SignUp_accountRegister_user_avatar {
  __typename: "Image";
  /**
   * Alt text for an image.
   */
  alt: string | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface SignUp_accountRegister_user_userPermissions {
  __typename: "UserPermission";
  /**
   * Internal code for permission.
   */
  code: PermissionEnum;
  /**
   * Describe action(s) allowed to do by permission.
   */
  name: string;
}

export interface SignUp_accountRegister_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isStaff: boolean;
  avatar: SignUp_accountRegister_user_avatar | null;
  /**
   * List of user's permissions.
   */
  userPermissions: (SignUp_accountRegister_user_userPermissions | null)[] | null;
}

export interface SignUp_accountRegister {
  __typename: "AccountRegister";
  accountErrors: SignUp_accountRegister_accountErrors[];
  /**
   * Informs whether users need to confirm their email address.
   */
  requiresConfirmation: boolean | null;
  user: SignUp_accountRegister_user | null;
}

export interface SignUp {
  /**
   * Register a new user.
   */
  accountRegister: SignUp_accountRegister | null;
}

export interface SignUpVariables {
  input: AccountRegisterInput;
}
