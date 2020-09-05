/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutErrorCode, OrderStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CheckoutComplete
// ====================================================

export interface CheckoutComplete_checkoutComplete_checkoutErrors {
  __typename: "CheckoutError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
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

export interface CheckoutComplete_checkoutComplete_order_lines {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  variantName: string;
}

export interface CheckoutComplete_checkoutComplete_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  token: string;
  /**
   * Informs if an order is fully paid.
   */
  isPaid: boolean | null;
  status: OrderStatus;
  /**
   * List of order lines.
   */
  lines: (CheckoutComplete_checkoutComplete_order_lines | null)[];
}

export interface CheckoutComplete_checkoutComplete {
  __typename: "CheckoutComplete";
  checkoutErrors: CheckoutComplete_checkoutComplete_checkoutErrors[];
  /**
   * Placed order.
   */
  order: CheckoutComplete_checkoutComplete_order | null;
}

export interface CheckoutComplete {
  /**
   * Completes the checkout. As a result a new order is created and a payment charge is made. This action requires a successful payment before it can be performed. In case additional confirmation step as 3D secure is required confirmationNeeded flag will be set to True and no order created until payment is confirmed with second call of this mutation.
   */
  checkoutComplete: CheckoutComplete_checkoutComplete | null;
}

export interface CheckoutCompleteVariables {
  checkoutId: string;
  paymentMethodId: string;
  redirectUrl: string;
}
