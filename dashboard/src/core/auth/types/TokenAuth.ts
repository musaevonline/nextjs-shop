/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AccountErrorCode, PermissionEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: TokenAuth
// ====================================================

export interface TokenAuth_tokenCreate_accountErrors {
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

export interface TokenAuth_tokenCreate_user_avatar {
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

export interface TokenAuth_tokenCreate_user_userPermissions {
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

export interface TokenAuth_tokenCreate_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isStaff: boolean;
  avatar: TokenAuth_tokenCreate_user_avatar | null;
  /**
   * List of user's permissions.
   */
  userPermissions: (TokenAuth_tokenCreate_user_userPermissions | null)[] | null;
}

export interface TokenAuth_tokenCreate {
  __typename: "CreateToken";
  /**
   * List of errorsAddressCreate that occurred executing the mutation.
   */
  accountErrors: TokenAuth_tokenCreate_accountErrors[];
  token: string | null;
  /**
   * A user instance.
   */
  user: TokenAuth_tokenCreate_user | null;
}

export interface TokenAuth {
  /**
   * Mutation that authenticates a user and returns token and user data.
   * It overrides the default graphql_jwt.ObtainJSONWebToken to wrap potential
   * authentication errorsAddressCreate in our Error type, which is consistent to how the rest of
   * the mutation works.
   */
  tokenCreate: TokenAuth_tokenCreate | null;
}

export interface TokenAuthVariables {
  email: string;
  password: string;
}
