import { gql } from "@apollo/client";
import {orderFragment} from "@sdk/fragments/order";

export const userOrdersQuery = gql`
    ${orderFragment}
    query UserOrders($first: Int!, $after: String,
        $filter: OrderFilterInput, $sortBy: OrderSortingInput,
        $status:OrderStatusFilter, $created: ReportingPeriod){
        orders(first: $first, after: $after, filter: $filter, sortBy: $sortBy, status: $status, created: $created){
            pageInfo{
                endCursor
                hasNextPage
            }
            edges{
                node{
                    ...Order
                }
            }
        }
    }
`;