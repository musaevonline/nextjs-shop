import gql from "graphql-tag";
import {ShopBaseFragment} from "@sdk/fragments/shop";

export const shopQuery = gql`
    ${ShopBaseFragment}
    query Shop {
        shop{
           ...Shop
        }
    }
`;
