import { gql } from "@apollo/client";
import {ShopBaseFragment} from "@sdk/fragments/shop";

export const shopQuery = gql`
    ${ShopBaseFragment}
    query ShopInfo {
        shop{
           ...Shop
        }
    }
`;
