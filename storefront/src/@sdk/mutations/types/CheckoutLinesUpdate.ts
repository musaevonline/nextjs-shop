/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CheckoutLineInput, CheckoutErrorCode, ShippingMethodTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CheckoutLinesUpdate
// ====================================================

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkoutErrors {
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

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_totalPrice_gross {
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

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_totalPrice_tax {
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

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: CheckoutLinesUpdate_checkoutLinesUpdate_checkout_totalPrice_gross;
  /**
   * Amount of taxes.
   */
  tax: CheckoutLinesUpdate_checkoutLinesUpdate_checkout_totalPrice_tax;
}

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_availableShippingMethods_price {
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

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_availableShippingMethods {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: string;
  /**
   * Type of the shipping method.
   */
  type: ShippingMethodTypeEnum | null;
  price: CheckoutLinesUpdate_checkoutLinesUpdate_checkout_availableShippingMethods_price | null;
}

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_lines_totalPrice_gross {
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

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_lines_totalPrice_tax {
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

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: CheckoutLinesUpdate_checkoutLinesUpdate_checkout_lines_totalPrice_gross;
  /**
   * Amount of taxes.
   */
  tax: CheckoutLinesUpdate_checkoutLinesUpdate_checkout_lines_totalPrice_tax;
}

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_lines_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_lines {
  __typename: "CheckoutLine";
  /**
   * The ID of the object.
   */
  id: string;
  quantity: number;
  /**
   * Indicates whether the item need to be delivered.
   */
  requiresShipping: boolean | null;
  /**
   * The sum of the checkout line price, taxes and discounts.
   */
  totalPrice: CheckoutLinesUpdate_checkoutLinesUpdate_checkout_lines_totalPrice | null;
  variant: CheckoutLinesUpdate_checkoutLinesUpdate_checkout_lines_variant;
}

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_shippingAddress_country {
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

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_shippingAddress {
  __typename: "Address";
  /**
   * The ID of the object.
   */
  id: string;
  firstName: string;
  lastName: string;
  companyName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postalCode: string;
  /**
   * Shop's default country.
   */
  country: CheckoutLinesUpdate_checkoutLinesUpdate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_shippingMethod_price {
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

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout_shippingMethod {
  __typename: "ShippingMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  description: string;
  /**
   * Type of the shipping method.
   */
  type: ShippingMethodTypeEnum | null;
  price: CheckoutLinesUpdate_checkoutLinesUpdate_checkout_shippingMethod_price | null;
}

export interface CheckoutLinesUpdate_checkoutLinesUpdate_checkout {
  __typename: "Checkout";
  /**
   * The ID of the object.
   */
  id: string;
  created: any;
  token: any;
  /**
   * Email of a customer.
   */
  email: string;
  quantity: number;
  /**
   * The sum of the the checkout line prices, with all the taxes,shipping costs, and discounts included.
   */
  totalPrice: CheckoutLinesUpdate_checkoutLinesUpdate_checkout_totalPrice | null;
  /**
   * Returns True, if checkout requires shipping.
   */
  isShippingRequired: boolean;
  lastChange: any;
  /**
   * Shipping methods that can be used with this order.
   */
  availableShippingMethods: (CheckoutLinesUpdate_checkoutLinesUpdate_checkout_availableShippingMethods | null)[] | null;
  /**
   * A list of checkout lines, each containing information about an item in the checkout.
   */
  lines: (CheckoutLinesUpdate_checkoutLinesUpdate_checkout_lines | null)[] | null;
  shippingAddress: CheckoutLinesUpdate_checkoutLinesUpdate_checkout_shippingAddress | null;
  shippingMethod: CheckoutLinesUpdate_checkoutLinesUpdate_checkout_shippingMethod | null;
}

export interface CheckoutLinesUpdate_checkoutLinesUpdate {
  __typename: "CheckoutLinesUpdate";
  checkoutErrors: CheckoutLinesUpdate_checkoutLinesUpdate_checkoutErrors[];
  /**
   * An updated checkout.
   */
  checkout: CheckoutLinesUpdate_checkoutLinesUpdate_checkout | null;
}

export interface CheckoutLinesUpdate {
  /**
   * Updates checkout line in the existing checkout.
   */
  checkoutLinesUpdate: CheckoutLinesUpdate_checkoutLinesUpdate | null;
}

export interface CheckoutLinesUpdateVariables {
  checkoutId: string;
  lines: (CheckoutLineInput | null)[];
}
