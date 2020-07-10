/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: TaxedMoney
// ====================================================

export interface TaxedMoney_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface TaxedMoney_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface TaxedMoney_tax {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface TaxedMoney {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: TaxedMoney_gross;
  /**
   * Amount of money without taxes.
   */
  net: TaxedMoney_net;
  /**
   * Amount of taxes.
   */
  tax: TaxedMoney_tax;
  /**
   * Currency code.
   */
  currency: string;
}
