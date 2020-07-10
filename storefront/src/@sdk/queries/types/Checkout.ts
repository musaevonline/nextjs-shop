/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShippingMethodTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: Checkout
// ====================================================

export interface Checkout_checkout_totalPrice_gross {
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

export interface Checkout_checkout_totalPrice_tax {
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

export interface Checkout_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: Checkout_checkout_totalPrice_gross;
  /**
   * Amount of taxes.
   */
  tax: Checkout_checkout_totalPrice_tax;
}

export interface Checkout_checkout_shippingAddress_country {
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

export interface Checkout_checkout_shippingAddress {
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
  country: Checkout_checkout_shippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface Checkout_checkout_availableShippingMethods_price {
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

export interface Checkout_checkout_availableShippingMethods {
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
  price: Checkout_checkout_availableShippingMethods_price | null;
}

export interface Checkout_checkout_shippingMethod_price {
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

export interface Checkout_checkout_shippingMethod {
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
  price: Checkout_checkout_shippingMethod_price | null;
}

export interface Checkout_checkout {
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
  totalPrice: Checkout_checkout_totalPrice | null;
  /**
   * Returns True, if checkout requires shipping.
   */
  isShippingRequired: boolean;
  lastChange: any;
  shippingAddress: Checkout_checkout_shippingAddress | null;
  /**
   * Shipping methods that can be used with this order.
   */
  availableShippingMethods: (Checkout_checkout_availableShippingMethods | null)[] | null;
  shippingMethod: Checkout_checkout_shippingMethod | null;
}

export interface Checkout {
  /**
   * Look up a checkout by token.
   */
  checkout: Checkout_checkout | null;
}

export interface CheckoutVariables {
  token?: any | null;
}
