import gql from "graphql-tag";
import {checkoutBaseFragment} from "@sdk/fragments/checkout";
import {addressFragment} from "@sdk/fragments/address";
import {shippingMethodFragment} from "@sdk/fragments/shipping-method";


export const checkoutBaseQuery = gql`
    ${checkoutBaseFragment}
    query CheckoutBase($token: UUID) {
        checkout(token: $token) {
            ...CheckoutBase
        }
    }
`;

export const checkoutQuery = gql`
    ${checkoutBaseFragment}
    ${addressFragment}
    ${shippingMethodFragment}
    query Checkout($token: UUID) {
        checkout(token: $token) {
            ...CheckoutBase
            shippingAddress{
                ...Address
            }
            availableShippingMethods{
                ...ShippingMethod
            }
            shippingMethod{
                ...ShippingMethod
            }
        }
    }
`;