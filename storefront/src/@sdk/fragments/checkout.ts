import { gql } from "@apollo/client";
import {shippingMethodFragment} from "@sdk/fragments/shipping-method";
import {addressFragment} from "@sdk/fragments/address";

export const checkoutLineFragment = gql`
    fragment CheckoutLine on CheckoutLine {
        id
        quantity
        requiresShipping
        totalPrice{
            currency
            gross{
                amount
                currency
            }
            tax{
                amount
                currency
            }
        }
        variant{
            id
        }
    }
`;

export const checkoutBaseFragment = gql`
    fragment CheckoutBase on Checkout {
        id
        created
        token
        email
        quantity
        totalPrice{
            currency
            gross{
                amount
                currency
            }
            tax{
                amount
                currency
            }
        }
        
        isShippingRequired
        lastChange
    }
`;

export const checkoutFragment = gql`
    ${checkoutBaseFragment}
    ${shippingMethodFragment}
    ${checkoutLineFragment}
    ${addressFragment}
    fragment Checkout on Checkout {
        ...CheckoutBase
        availableShippingMethods{
            ...ShippingMethod
        }
        lines{
            ...CheckoutLine
        }
        shippingAddress{
            ...Address
        }
        shippingMethod{
            ...ShippingMethod
        }
    }
`;
