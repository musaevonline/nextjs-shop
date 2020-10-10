/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { WeightUnitsEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL fragment: Shop
// ====================================================

export interface Shop_domain {
  __typename: "Domain";
  /**
   * The host name of the domain.
   */
  host: string;
  /**
   * Shop's absolute URL.
   */
  url: string;
}

export interface Shop {
  __typename: "Shop";
  /**
   * Shop's name.
   */
  name: string;
  /**
   * Shop's description.
   */
  description: string | null;
  /**
   * Header text.
   */
  headerText: string | null;
  /**
   * Shop's default currency.
   */
  defaultCurrency: string;
  /**
   * Default shop's email sender's address.
   */
  defaultMailSenderAddress: string | null;
  /**
   * Default shop's email sender's name.
   */
  defaultMailSenderName: string | null;
  /**
   * Default weight unit.
   */
  defaultWeightUnit: WeightUnitsEnum | null;
  /**
   * Shop's domain data.
   */
  domain: Shop_domain;
}
