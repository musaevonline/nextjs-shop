import { gql } from "@apollo/client";
import {addressFragment} from "@sdk/fragments/address";
import {shippingMethodFragment} from "@sdk/fragments/shipping-method";
import {TaxedMoney} from "@sdk/fragments/money";
import {productVariantFragment} from "@sdk/fragments/product-variant";
import {paymentMethodFragment} from "@sdk/fragments/payment-method";
import {productReviewFragment} from "@sdk/fragments/product-review";

export const orderLineFragment = gql`
    ${productVariantFragment}
    ${TaxedMoney}
    ${productReviewFragment}
    fragment OrderLine on OrderLine{
        id
        isShippingRequired
        productName
        productSku
        quantity
        quantityFulfilled
        variantName
        thumbnail{
            alt
            url
        }
        unitPrice{
            ...TaxedMoney
        }
        variant{
            ...ProductVariant
            product{
                id
                slug
            }
        },
        productreview{
            ...ProductReview
        }
    }
`;

export const orderBaseFragment = gql`
    fragment OrderBase on Order {
        id
        token
        isPaid
        status
        lines{
            id
            quantity
            variantName
        }
    }
`;
export const orderFragment = gql`
    ${addressFragment}
    ${shippingMethodFragment}
    ${TaxedMoney}
    ${orderLineFragment}
    ${paymentMethodFragment}
    fragment Order on Order {
        id
        token
        isPaid
        status
        statusDisplay
        created
        paymentStatus
        userEmail
        shippingMethodName
        shippingPrice{
            ...TaxedMoney
        }
        payments{
            paymentMethod{
                ...PaymentMethod
            }
        }
        total{
            ...TaxedMoney
        }
        shippingAddress{
            ...Address
        }
        shippingMethod{
            ...ShippingMethod
        }

        lines{
            ...OrderLine
        }
    }
`;