import { gql } from "@apollo/client";
import {attributeFragment} from "@sdk/fragments/attribute";
import {productImageFragment} from "@sdk/fragments/product-image";

export const productVariantFragment = gql`
    ${attributeFragment}
    ${productImageFragment}
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
            ...ProductImageFragment
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