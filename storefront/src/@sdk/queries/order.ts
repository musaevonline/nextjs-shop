import {gql} from "@apollo/client";
import {orderFragment} from "@sdk/fragments/order";
import makeQuery from "@temp/hooks/makeQuery";
import {Order, OrderVariables} from "@sdk/queries/types/Order";

export const orderQuery = gql`
    ${orderFragment}
    query Order($token: UUID!){
        orderByToken(token: $token){
            ...Order
        }
    }
`;

export const useOrder = makeQuery<Order, OrderVariables>(orderQuery);