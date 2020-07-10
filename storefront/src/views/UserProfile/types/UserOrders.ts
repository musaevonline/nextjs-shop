/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderFilterInput, OrderSortingInput, OrderStatusFilter, ReportingPeriod, OrderStatus, PaymentChargeStatusEnum, ShippingMethodTypeEnum, AttributeInputTypeEnum, ProductReviewRating, ProductReviewStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: UserOrders
// ====================================================

export interface UserOrders_orders_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
}

export interface UserOrders_orders_edges_node_shippingPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface UserOrders_orders_edges_node_shippingPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface UserOrders_orders_edges_node_shippingPrice_tax {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface UserOrders_orders_edges_node_shippingPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UserOrders_orders_edges_node_shippingPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserOrders_orders_edges_node_shippingPrice_net;
  /**
   * Amount of taxes.
   */
  tax: UserOrders_orders_edges_node_shippingPrice_tax;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UserOrders_orders_edges_node_payments_paymentMethod {
  __typename: "PaymentMethod";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  baseUrl: string | null;
  description: string;
}

export interface UserOrders_orders_edges_node_payments {
  __typename: "Payment";
  paymentMethod: UserOrders_orders_edges_node_payments_paymentMethod | null;
}

export interface UserOrders_orders_edges_node_total_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface UserOrders_orders_edges_node_total_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface UserOrders_orders_edges_node_total_tax {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface UserOrders_orders_edges_node_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UserOrders_orders_edges_node_total_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserOrders_orders_edges_node_total_net;
  /**
   * Amount of taxes.
   */
  tax: UserOrders_orders_edges_node_total_tax;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UserOrders_orders_edges_node_user_defaultShippingAddress_country {
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

export interface UserOrders_orders_edges_node_user_defaultShippingAddress {
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
  country: UserOrders_orders_edges_node_user_defaultShippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface UserOrders_orders_edges_node_user_addresses_country {
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

export interface UserOrders_orders_edges_node_user_addresses {
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
  country: UserOrders_orders_edges_node_user_addresses_country;
  countryArea: string;
  phone: string;
}

export interface UserOrders_orders_edges_node_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isStaff: boolean;
  isActive: boolean;
  defaultShippingAddress: UserOrders_orders_edges_node_user_defaultShippingAddress | null;
  /**
   * List of all user's addresses.
   */
  addresses: (UserOrders_orders_edges_node_user_addresses | null)[] | null;
}

export interface UserOrders_orders_edges_node_shippingAddress_country {
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

export interface UserOrders_orders_edges_node_shippingAddress {
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
  country: UserOrders_orders_edges_node_shippingAddress_country;
  countryArea: string;
  phone: string;
}

export interface UserOrders_orders_edges_node_shippingMethod_price {
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

export interface UserOrders_orders_edges_node_shippingMethod {
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
  price: UserOrders_orders_edges_node_shippingMethod_price | null;
}

export interface UserOrders_orders_edges_node_lines_thumbnail {
  __typename: "Image";
  /**
   * Alt text for an image.
   */
  alt: string | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface UserOrders_orders_edges_node_lines_unitPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface UserOrders_orders_edges_node_lines_unitPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface UserOrders_orders_edges_node_lines_unitPrice_tax {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
}

export interface UserOrders_orders_edges_node_lines_unitPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UserOrders_orders_edges_node_lines_unitPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserOrders_orders_edges_node_lines_unitPrice_net;
  /**
   * Amount of taxes.
   */
  tax: UserOrders_orders_edges_node_lines_unitPrice_tax;
  /**
   * Currency code.
   */
  currency: string;
}

export interface UserOrders_orders_edges_node_lines_variant_stocks {
  __typename: "Stock";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Quantity of a product available for sale.
   */
  stockQuantity: number;
}

export interface UserOrders_orders_edges_node_lines_variant_price {
  __typename: "Money";
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Amount of money.
   */
  amount: number;
}

export interface UserOrders_orders_edges_node_lines_variant_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface UserOrders_orders_edges_node_lines_variant_weight {
  __typename: "Weight";
  /**
   * Weight value.
   */
  value: number;
  /**
   * Weight unit.
   */
  unit: string;
}

export interface UserOrders_orders_edges_node_lines_variant_attributes_attribute_values {
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

export interface UserOrders_orders_edges_node_lines_variant_attributes_attribute {
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
   * Internal representation of an attribute name.
   */
  slug: string | null;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * List of attribute's values.
   */
  values: (UserOrders_orders_edges_node_lines_variant_attributes_attribute_values | null)[] | null;
}

export interface UserOrders_orders_edges_node_lines_variant_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The input type to use for entering attribute values in the dashboard.
   */
  inputType: AttributeInputTypeEnum | null;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Internal representation of a value (unique per attribute).
   */
  slug: string | null;
}

export interface UserOrders_orders_edges_node_lines_variant_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: UserOrders_orders_edges_node_lines_variant_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (UserOrders_orders_edges_node_lines_variant_attributes_values | null)[];
}

export interface UserOrders_orders_edges_node_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  slug: string;
}

export interface UserOrders_orders_edges_node_lines_variant {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
  /**
   * Stocks for the product variant.
   */
  stocks: (UserOrders_orders_edges_node_lines_variant_stocks | null)[] | null;
  /**
   * Override the base price of a product.
   */
  price: UserOrders_orders_edges_node_lines_variant_price | null;
  /**
   * List of images for the product variant.
   */
  images: (UserOrders_orders_edges_node_lines_variant_images | null)[] | null;
  weight: UserOrders_orders_edges_node_lines_variant_weight | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: UserOrders_orders_edges_node_lines_variant_attributes[];
  product: UserOrders_orders_edges_node_lines_variant_product;
}

export interface UserOrders_orders_edges_node_lines_productreview {
  __typename: "ProductReview";
  /**
   * The ID of the object.
   */
  id: string;
  content: string;
  rating: ProductReviewRating;
  title: string;
  status: ProductReviewStatus;
  createdAt: any;
  updatedAt: any;
  advantages: any;
  flaws: any;
  userName: string | null;
  /**
   * The URL of the image.
   */
  userAvatar: string | null;
}

export interface UserOrders_orders_edges_node_lines {
  __typename: "OrderLine";
  /**
   * The ID of the object.
   */
  id: string;
  isShippingRequired: boolean;
  productName: string;
  productSku: string;
  quantity: number;
  quantityFulfilled: number;
  variantName: string;
  /**
   * The main thumbnail for the ordered product.
   */
  thumbnail: UserOrders_orders_edges_node_lines_thumbnail | null;
  /**
   * Price of the single item in the order line.
   */
  unitPrice: UserOrders_orders_edges_node_lines_unitPrice | null;
  /**
   * A purchased product variant. Note: this field may be null if the variant has been removed from stock at all.
   */
  variant: UserOrders_orders_edges_node_lines_variant | null;
  productreview: UserOrders_orders_edges_node_lines_productreview | null;
}

export interface UserOrders_orders_edges_node {
  __typename: "Order";
  /**
   * The ID of the object.
   */
  id: string;
  token: string;
  /**
   * Informs if an order is fully paid.
   */
  isPaid: boolean | null;
  status: OrderStatus;
  /**
   * User-friendly order status.
   */
  statusDisplay: string | null;
  created: any;
  /**
   * Internal payment status.
   */
  paymentStatus: PaymentChargeStatusEnum | null;
  /**
   * Email address of the customer.
   */
  userEmail: string | null;
  shippingMethodName: string | null;
  /**
   * Total price of shipping.
   */
  shippingPrice: UserOrders_orders_edges_node_shippingPrice | null;
  /**
   * List of payments for the order.
   */
  payments: (UserOrders_orders_edges_node_payments | null)[] | null;
  /**
   * Total amount of the order.
   */
  total: UserOrders_orders_edges_node_total | null;
  user: UserOrders_orders_edges_node_user | null;
  shippingAddress: UserOrders_orders_edges_node_shippingAddress | null;
  shippingMethod: UserOrders_orders_edges_node_shippingMethod | null;
  /**
   * List of order lines.
   */
  lines: (UserOrders_orders_edges_node_lines | null)[];
}

export interface UserOrders_orders_edges {
  __typename: "OrderCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: UserOrders_orders_edges_node;
}

export interface UserOrders_orders {
  __typename: "OrderCountableConnection";
  /**
   * Pagination data for this connection.
   */
  pageInfo: UserOrders_orders_pageInfo;
  edges: UserOrders_orders_edges[];
}

export interface UserOrders {
  /**
   * List of orders.
   */
  orders: UserOrders_orders | null;
}

export interface UserOrdersVariables {
  first: number;
  after?: string | null;
  filter?: OrderFilterInput | null;
  sortBy?: OrderSortingInput | null;
  status?: OrderStatusFilter | null;
  created?: ReportingPeriod | null;
}
