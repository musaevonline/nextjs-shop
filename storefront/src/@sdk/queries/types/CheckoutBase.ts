/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CheckoutBase
// ====================================================

export interface CheckoutBase_checkout_totalPrice_gross {
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

export interface CheckoutBase_checkout_totalPrice_tax {
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

export interface CheckoutBase_checkout_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money including taxes.
   */
  gross: CheckoutBase_checkout_totalPrice_gross;
  /**
   * Amount of taxes.
   */
  tax: CheckoutBase_checkout_totalPrice_tax;
}

export interface CheckoutBase_checkout {
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
  totalPrice: CheckoutBase_checkout_totalPrice | null;
  /**
   * Returns True, if checkout requires shipping.
   */
  isShippingRequired: boolean;
  lastChange: any;
}

export interface CheckoutBase {
  /**
   * Look up a checkout by token.
   */
  checkout: CheckoutBase_checkout | null;
}

export interface CheckoutBaseVariables {
  token?: any | null;
}
