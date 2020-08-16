import { gql } from "@apollo/client";
import {checkoutFragment} from "@sdk/fragments/checkout";

export const meCheckout = gql`
    ${checkoutFragment}
    query MeCheckout{
        me{
            id
            checkout{
                ...Checkout
            }
        }
    }
`;