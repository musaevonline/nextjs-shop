/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AttributeInputTypeEnum } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: CreateMultipleVariantsData
// ====================================================

export interface CreateMultipleVariantsData_product_attributes_attribute_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface CreateMultipleVariantsData_product_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * Whether the attribute requires values to be passed or not.
   */
  valueRequired: boolean;
  /**
   * List of attribute's values.
   */
  values: (CreateMultipleVariantsData_product_attributes_attribute_values | null)[] | null;
}

export interface CreateMultipleVariantsData_product_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface CreateMultipleVariantsData_product_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: CreateMultipleVariantsData_product_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (CreateMultipleVariantsData_product_attributes_values | null)[];
}

export interface CreateMultipleVariantsData_product_productType_variantAttributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface CreateMultipleVariantsData_product_productType_variantAttributes {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
  /**
   * List of attribute's values.
   */
  values: (CreateMultipleVariantsData_product_productType_variantAttributes_values | null)[] | null;
}

export interface CreateMultipleVariantsData_product_productType {
  __typename: "ProductType";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Variant attributes of that product type.
   */
  variantAttributes: (CreateMultipleVariantsData_product_productType_variantAttributes | null)[] | null;
}

export interface CreateMultipleVariantsData_product_basePrice {
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

export interface CreateMultipleVariantsData_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of attributes assigned to this product.
   */
  attributes: CreateMultipleVariantsData_product_attributes[];
  productType: CreateMultipleVariantsData_product_productType;
  basePrice: CreateMultipleVariantsData_product_basePrice | null;
}

export interface CreateMultipleVariantsData {
  /**
   * Look up a product by ID.
   */
  product: CreateMultipleVariantsData_product | null;
}

export interface CreateMultipleVariantsDataVariables {
  id: string;
}
