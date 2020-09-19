/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

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
   * Shop's domain data.
   */
  domain: Shop_domain;
}
