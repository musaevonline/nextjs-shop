import { gql } from "@apollo/client";
import {attributeFragment} from "@sdk/fragments/attribute";

export const productVariantFragment = gql`
    ${attributeFragment}
    fragment ProductVariant on ProductVariant{
        id
        name
        sku
        stocks{
            id
            stockQuantity
        }
        price{
            currency
            amount
        }
        images{
            id
            url
            alt
        }
        weight{
            value
            unit
        },
        attributes{
            attribute{
                ...Attribute
            }
            values{
                id
                name
                slug
            }
        }
    }
`;