/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: OrderBase
// ====================================================

export interface OrderBase_lines {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  variantName: string;
}

export interface OrderBase {
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
  lines: (OrderBase_lines | null)[];
}
