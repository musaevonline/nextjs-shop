/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { PermissionEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: VerifyToken
// ====================================================

export interface VerifyToken_tokenVerify_user_avatar {
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

export interface VerifyToken_tokenVerify_user_userPermissions {
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

export interface VerifyToken_tokenVerify_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isStaff: boolean;
  avatar: VerifyToken_tokenVerify_user_avatar | null;
  /**
   * List of user's permissions.
   */
  userPermissions: (VerifyToken_tokenVerify_user_userPermissions | null)[] | null;
}

export interface VerifyToken_tokenVerify {
  __typename: "VerifyToken";
  user: VerifyToken_tokenVerify_user | null;
}

export interface VerifyToken {
  /**
   * Mutation that confirms if token is valid and also returns user data.
   */
  tokenVerify: VerifyToken_tokenVerify | null;
}

export interface VerifyTokenVariables {
  token: string;
}
