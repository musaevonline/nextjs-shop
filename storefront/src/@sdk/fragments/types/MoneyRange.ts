/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: MoneyRange
// ====================================================

export interface MoneyRange_start {
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

export interface MoneyRange_stop {
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

export interface MoneyRange {
  __typename: "MoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: MoneyRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: MoneyRange_stop | null;
}
