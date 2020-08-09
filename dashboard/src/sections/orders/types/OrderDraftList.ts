/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderDraftFilterInput, OrderSortingInput, PaymentChargeStatusEnum, OrderStatus } from "./../../../types/globalTypes";

// ====================================================
// GraphQL query operation: OrderDraftList
// ====================================================

export interface OrderDraftList_draftOrders_edges_node_total_gross {
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

export interface OrderDraftList_draftOrders_edges_node_total {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: OrderDraftList_draftOrders_edges_node_total_gross;
}

export interface OrderDraftList_draftOrders_edges_node {
  __typename: "Order";
  created: any;
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * User-friendly number of an order.
   */
  number: string | null;
  /**
   * Internal payment status.
   */
  paymentStatus: PaymentChargeStatusEnum | null;
  status: OrderStatus;
  /**
   * Total amount of the order.
   */
  total: OrderDraftList_draftOrders_edges_node_total | null;
  /**
   * Email address of the customer.
   */
  userEmail: string | null;
}

export interface OrderDraftList_draftOrders_edges {
  __typename: "OrderCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: OrderDraftList_draftOrders_edges_node;
}

export interface OrderDraftList_draftOrders_pageInfo {
  __typename: "PageInfo";
  /**
   * When paginating backwards, are there more items?
   */
  hasPreviousPage: boolean;
  /**
   * When paginating forwards, are there more items?
   */
  hasNextPage: boolean;
  /**
   * When paginating backwards, the cursor to continue.
   */
  startCursor: string | null;
  /**
   * When paginating forwards, the cursor to continue.
   */
  endCursor: string | null;
}

export interface OrderDraftList_draftOrders {
  __typename: "OrderCountableConnection";
  edges: OrderDraftList_draftOrders_edges[];
  /**
   * Pagination data for this connection.
   */
  pageInfo: OrderDraftList_draftOrders_pageInfo;
}

export interface OrderDraftList {
  /**
   * List of draft orders.
   */
  draftOrders: OrderDraftList_draftOrders | null;
}

export interface OrderDraftListVariables {
  first?: number | null;
  after?: string | null;
  last?: number | null;
  before?: string | null;
  filter?: OrderDraftFilterInput | null;
  sort?: OrderSortingInput | null;
}
