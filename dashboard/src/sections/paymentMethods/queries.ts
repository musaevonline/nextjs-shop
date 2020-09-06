import makeQuery from "@temp/hooks/makeQuery";
import {gql} from "@apollo/client";

import { pageInfoFragment } from "@temp/queries";
import {PaymentMethods, PaymentMethodsVariables} from "@temp/sections/paymentMethods/types/PaymentMethods";
import {PaymentMethod, PaymentMethodVariables} from "@temp/sections/paymentMethods/types/PaymentMethod";

export const paymentMethodFragment = gql`
    fragment PaymentMethodFragment on PaymentMethod {
        id
        name
        description
        baseUrl
    }
`;

const paymentMethods = gql`
    ${paymentMethodFragment}
    ${pageInfoFragment}
    query PaymentMethods(
        $first: Int
        $after: String
        $last: Int
        $before: String
    ) {
        paymentMethods(first: $first, after: $after, last: $last, before: $before) {
            edges {
                node {
                    ...PaymentMethodFragment
                }
            }
            pageInfo {
                ...PageInfoFragment
            }
        }
    }
`;
export const usePaymentMethodList = makeQuery<
    PaymentMethods,
    PaymentMethodsVariables
    >(paymentMethods);

const paymentMethod = gql`
    ${paymentMethodFragment}
    query PaymentMethod($id: ID!) {
        paymentMethod(id: $id) {
            ...PaymentMethodFragment
        }
    }
`;
export const usePaymentMethod = makeQuery<PaymentMethod, PaymentMethodVariables>(
    paymentMethod
);
