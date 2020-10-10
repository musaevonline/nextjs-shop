import { gql } from "@apollo/client";
import {ShopBaseFragment} from "@sdk/fragments/shop";
import {addressFragment} from "@sdk/fragments/address";

export const shopQuery = gql`
    ${ShopBaseFragment}
    ${addressFragment}
    query ShopInfo {
        shop{
            ...Shop
            companyAddress{
                ...Address
            }
            
        }
    }
`;
