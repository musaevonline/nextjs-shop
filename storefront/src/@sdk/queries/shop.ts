import { gql } from "@apollo/client";
import {ShopBaseFragment, ShopImageFragment} from "@sdk/fragments/shop";
import {addressFragment} from "@sdk/fragments/address";

export const shopQuery = gql`
    ${ShopBaseFragment}
    ${ShopImageFragment}
    ${addressFragment}
    query ShopInfo {
        shop{
            ...Shop
            companyAddress{
                ...Address
            },
            images{
                ...ShopImageFragment
            },
            authorizationKeys{
                name
                key
            }
            
        }
    }
`;
