/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddressInput, CheckoutErrorCode, ShippingMethodTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: CheckoutAddressUpdate
// ====================================================

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkoutErrors {
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

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_totalPrice_gross {
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

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_totalPrice_tax {
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

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_totalPrice_gross;
  /**
   * Amount of taxes.
   */
  tax: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_totalPrice_tax;
}

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_availableShippingMethods_price {
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

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_availableShippingMethods {
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
  price: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_availableShippingMethods_price | null;
}

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_lines_totalPrice_gross {
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

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_lines_totalPrice_tax {
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

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_lines_totalPrice_gross;
  /**
   * Amount of taxes.
   */
  tax: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_lines_totalPrice_tax;
}

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_lines_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_lines {
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
  totalPrice: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_lines_totalPrice | null;
  variant: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_lines_variant;
}

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_shippingAddress_country {
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

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_shippingAddress {
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
  country: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_shippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_shippingMethod_price {
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

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_shippingMethod {
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
  price: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_shippingMethod_price | null;
}

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout {
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
  totalPrice: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_totalPrice | null;
  /**
   * Returns True, if checkout requires shipping.
   */
  isShippingRequired: boolean;
  lastChange: any;
  /**
   * Shipping methods that can be used with this order.
   */
  availableShippingMethods: (CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_availableShippingMethods | null)[] | null;
  /**
   * A list of checkout lines, each containing information about an item in the checkout.
   */
  lines: (CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_lines | null)[] | null;
  shippingAddress: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_shippingAddress | null;
  shippingMethod: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout_shippingMethod | null;
}

export interface CheckoutAddressUpdate_checkoutShippingAddressUpdate {
  __typename: "CheckoutShippingAddressUpdate";
  checkoutErrors: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkoutErrors[];
  /**
   * An updated checkout.
   */
  checkout: CheckoutAddressUpdate_checkoutShippingAddressUpdate_checkout | null;
}

export interface CheckoutAddressUpdate {
  /**
   * Update shipping address in the existing checkout.
   */
  checkoutShippingAddressUpdate: CheckoutAddressUpdate_checkoutShippingAddressUpdate | null;
}

export interface CheckoutAddressUpdateVariables {
  checkoutId: string;
  shippingAddress: AddressInput;
}
