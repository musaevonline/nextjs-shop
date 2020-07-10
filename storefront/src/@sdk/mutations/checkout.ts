import gql from "graphql-tag";
import {checkoutFragment} from "@sdk/fragments/checkout";
import {addressFragment} from "@sdk/fragments/address";
import {orderBaseFragment} from "@sdk/fragments/order";


export const checkoutCreateMutation = gql`
    ${checkoutFragment}
    ${addressFragment}
    mutation CheckoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
            checkoutErrors{
                field
                code
                message
            }
            checkout{
                ...Checkout
            }
        }
    }
`;

export const checkoutAddressUpdateMutation = gql`
    ${checkoutFragment}
    ${addressFragment}
    mutation CheckoutAddressUpdate($checkoutId: ID!, $shippingAddress: AddressInput!) {
        checkoutShippingAddressUpdate(checkoutId: $checkoutId, shippingAddress: $shippingAddress) {
            checkoutErrors{
                field
                code
                message
            }
            checkout{
                ...Checkout
            }
        }
    }
`;

export const checkoutEmailUpdateMutation = gql`
    mutation CheckoutEmailUpdate($checkoutId: ID!, $email: String!) {
        checkoutEmailUpdate(checkoutId: $checkoutId, email: $email) {
            checkoutErrors{
                field
                code
                message
            }
            checkout{
                id
                email
            }
        }
    }
`;

export const checkoutShippingMethodUpdateMutation = gql`
    ${checkoutFragment}
    mutation CheckoutShippingMethodUpdate($checkoutId: ID!, $shippingMethodId: ID!) {
        checkoutShippingMethodUpdate(checkoutId: $checkoutId, shippingMethodId: $shippingMethodId) {
            checkoutErrors{
                field
                code
                message
            }
            checkout{
                ...Checkout
            }
        }
    }
`;

export const checkoutCompleteMutation = gql`
    ${orderBaseFragment}
    mutation CheckoutComplete($checkoutId: ID!, $paymentMethodId: ID!, $redirectUrl: String!) {
        checkoutComplete(checkoutId: $checkoutId, paymentMethodId: $paymentMethodId, redirectUrl: $redirectUrl) {
            checkoutErrors{
                field
                code
                message
            }
            order{
                ...OrderBase
            }
        }
    }
`;

/* CHECKOUT LINES CHANGES */

export const checkoutLinesAddMutation = gql`
    ${checkoutFragment}
    mutation CheckoutLinesAdd($checkoutId: ID!, $lines: [CheckoutLineInput]!) {
        checkoutLinesAdd(checkoutId: $checkoutId, lines: $lines) {
            checkoutErrors{
                field
                code
                message
            }
            checkout{
                ...Checkout
            }
        }
    }
`;
export const checkoutLinesUpdateMutation = gql`
    ${checkoutFragment}
    mutation CheckoutLinesUpdate($checkoutId: ID!, $lines: [CheckoutLineInput]!) {
        checkoutLinesUpdate(checkoutId: $checkoutId, lines: $lines) {
            checkoutErrors{
                field
                code
                message
            }
            checkout{
                ...Checkout
            }
        }
    }
`;
export const checkoutLineDeleteMutation = gql`
    ${checkoutFragment}
    mutation CheckoutLineDelete($checkoutId: ID!, $lineId: ID, $variantId: ID) {
        checkoutLineDelete(checkoutId: $checkoutId, lineId: $lineId, variantId: $variantId) {
            checkoutErrors{
                field
                code
                message
            }
            checkout{
                ...Checkout
            }
        }
    }
`;