/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CustomerCreateData
// ====================================================

export interface CustomerCreateData_shop {
  __typename: "Shop";
  /**
   * Shop's name.
   */
  name: string;
}

export interface CustomerCreateData {
  /**
   * Return information about the shop.
   */
  shop: CustomerCreateData_shop;
}
