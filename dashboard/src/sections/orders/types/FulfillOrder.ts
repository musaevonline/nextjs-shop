/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderFulfillInput, OrderErrorCode, OrderEventsEmailsEnum, OrderEventsEnum, PaymentChargeStatusEnum, OrderStatus, OrderAction } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: FulfillOrder
// ====================================================

export interface FulfillOrder_orderFulfill_errors {
  __typename: "OrderError";
  /**
   * The error code.
   */
  code: OrderErrorCode;
  /**
   * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface FulfillOrder_orderFulfill_order_events_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
}

export interface FulfillOrder_orderFulfill_order_events {
  __typename: "OrderEvent";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Amount of money.
   */
  amount: number | null;
  /**
   * Date when event happened at in ISO 8601 format.
   */
  date: any | null;
  /**
   * Email of the customer.
   */
  email: string | null;
  /**
   * Type of an email sent to the customer.
   */
  emailType: OrderEventsEmailsEnum | null;
  /**
   * Content of the event.
   */
  message: string | null;
  /**
   * Number of items.
   */
  quantity: number | null;
  /**
   * Order event type.
   */
  type: OrderEventsEnum | null;
  /**
   * User who performed the action.
   */
  user: FulfillOrder_orderFulfill_order_events_user | null;
}

export interface FulfillOrder_orderFulfill_order_lines_unitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FulfillOrder_orderFulfill_order_lines_unitPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FulfillOrder_orderFulfill_order_lines_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FulfillOrder_orderFulfill_order_lines_unitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: FulfillOrder_orderFulfill_order_lines_unitPrice_net;
}

export interface FulfillOrder_orderFulfill_order_lines_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface FulfillOrder_orderFulfill_order_lines {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  isShippingRequired: boolean;
  productName: string;
  productSku: string;
  quantity: number;
  quantityFulfilled: number;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: FulfillOrder_orderFulfill_order_lines_unitPrice | null;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: FulfillOrder_orderFulfill_order_lines_thumbnail | null;
}

export interface FulfillOrder_orderFulfill_order_shippingAddress_country {
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

export interface FulfillOrder_orderFulfill_order_shippingAddress {
  __typename: "Address";
  city: string;
  cityArea: string;
  companyName: string;
  /**
   * Shop's default country.
   */
  country: FulfillOrder_orderFulfill_order_shippingAddress_country;
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

export interface FulfillOrder_orderFulfill_order_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface FulfillOrder_orderFulfill_order_shippingPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FulfillOrder_orderFulfill_order_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FulfillOrder_orderFulfill_order_shippingPrice_gross;
}

export interface FulfillOrder_orderFulfill_order_subtotal_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FulfillOrder_orderFulfill_order_subtotal {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FulfillOrder_orderFulfill_order_subtotal_gross;
}

export interface FulfillOrder_orderFulfill_order_total_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FulfillOrder_orderFulfill_order_total_tax {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FulfillOrder_orderFulfill_order_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FulfillOrder_orderFulfill_order_total_gross;
  /**
   * Amount of taxes.
   */
  tax: FulfillOrder_orderFulfill_order_total_tax;
}

export interface FulfillOrder_orderFulfill_order_totalAuthorized {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FulfillOrder_orderFulfill_order_totalCaptured {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FulfillOrder_orderFulfill_order_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
}

export interface FulfillOrder_orderFulfill_order_availableShippingMethods_price {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FulfillOrder_orderFulfill_order_availableShippingMethods {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  price: FulfillOrder_orderFulfill_order_availableShippingMethods_price | null;
}

export interface FulfillOrder_orderFulfill_order {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Informs whether a draft order can be finalized(turned into a regular order).
   */
  canFinalize: boolean;
  created: any;
  customerNote: string;
  /**
   * List of events associated with the order.
   */
  events: (FulfillOrder_orderFulfill_order_events | null)[] | null;
  /**
   * List of order lines.
   */
  lines: (FulfillOrder_orderFulfill_order_lines | null)[];
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  /**
   * Internal payment status.
   */
  paymentStatus: PaymentChargeStatusEnum | null;
  shippingAddress: FulfillOrder_orderFulfill_order_shippingAddress | null;
  shippingMethod: FulfillOrder_orderFulfill_order_shippingMethod | null;
  shippingMethodName: string | null;
  /**
   * Total price of shipping.
   */
  shippingPrice: FulfillOrder_orderFulfill_order_shippingPrice | null;
  status: OrderStatus;
  /**
   * The sum of line prices not including shipping.
   */
  subtotal: FulfillOrder_orderFulfill_order_subtotal | null;
  /**
   * Total amount of the order.
   */
  total: FulfillOrder_orderFulfill_order_total | null;
  /**
   * List of actions that can be performed in the current state of an order.
   */
  actions: (OrderAction | null)[];
  /**
   * Amount authorized for the order.
   */
  totalAuthorized: FulfillOrder_orderFulfill_order_totalAuthorized | null;
  /**
   * Amount captured by payment.
   */
  totalCaptured: FulfillOrder_orderFulfill_order_totalCaptured | null;
  user: FulfillOrder_orderFulfill_order_user | null;
  /**
   * Email address of the customer.
   */
  userEmail: string | null;
  /**
   * Shipping methods that can be used with this order.
   */
  availableShippingMethods: (FulfillOrder_orderFulfill_order_availableShippingMethods | null)[] | null;
}

export interface FulfillOrder_orderFulfill {
  __typename: "OrderFulfill";
  errors: FulfillOrder_orderFulfill_errors[];
  /**
   * Fulfilled order.
   */
  order: FulfillOrder_orderFulfill_order | null;
}

export interface FulfillOrder {
  /**
   * Fulfill order lines.
   */
  orderFulfill: FulfillOrder_orderFulfill | null;
}

export interface FulfillOrderVariables {
  orderId: string;
  input: OrderFulfillInput;
}
