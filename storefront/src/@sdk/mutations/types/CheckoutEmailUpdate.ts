/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CheckoutEmailUpdate
// ====================================================

export interface CheckoutEmailUpdate_checkoutEmailUpdate_checkoutErrors {
  __typename: "CheckoutError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error code.
   */
  code: CheckoutErrorCode;
  /**
   * The error message.
   */
  message: string | null;
}

export interface CheckoutEmailUpdate_checkoutEmailUpdate_checkout {
  __typename: "Checkout";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Email of a customer.
   */
  email: string;
}

export interface CheckoutEmailUpdate_checkoutEmailUpdate {
  __typename: "CheckoutEmailUpdate";
  checkoutErrors: CheckoutEmailUpdate_checkoutEmailUpdate_checkoutErrors[];
  /**
   * An updated checkout.
   */
  checkout: CheckoutEmailUpdate_checkoutEmailUpdate_checkout | null;
}

export interface CheckoutEmailUpdate {
  /**
   * Updates email address in the existing checkout object.
   */
  checkoutEmailUpdate: CheckoutEmailUpdate_checkoutEmailUpdate | null;
}

export interface CheckoutEmailUpdateVariables {
  checkoutId: string;
  email: string;
}
