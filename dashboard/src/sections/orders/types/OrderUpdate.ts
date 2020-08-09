/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderUpdateInput, OrderErrorCode } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: OrderUpdate
// ====================================================

export interface OrderUpdate_orderUpdate_errors {
  __typename: "OrderError";
  /**
   * The error code.
   */
  code: OrderErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
}

export interface OrderUpdate_orderUpdate_order_shippingAddress_country {
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

export interface OrderUpdate_orderUpdate_order_shippingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: OrderUpdate_orderUpdate_order_shippingAddress_country;
  countryArea: string;
  firstName: string;
  /**
   * The ID of the object.
   */
  id: string;
  lastName: string;
  phone: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface OrderUpdate_orderUpdate_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Email address of the customer.
   */
  userEmail: string | null;
  shippingAddress: OrderUpdate_orderUpdate_order_shippingAddress | null;
}

export interface OrderUpdate_orderUpdate {
  __typename: "OrderUpdate";
  errors: OrderUpdate_orderUpdate_errors[];
  order: OrderUpdate_orderUpdate_order | null;
}

export interface OrderUpdate {
  /**
   * Updates an order.
   */
  orderUpdate: OrderUpdate_orderUpdate | null;
}

export interface OrderUpdateVariables {
  id: string;
  input: OrderUpdateInput;
}
