import { gql } from "@apollo/client";
import {productVariantFragment} from "@sdk/fragments/product-variant";

export const productVariantsQuery = gql`
    ${productVariantFragment}
    query ProductVariants($first: Int!, $after: String, $ids: [ID]){
        productVariants(first: $first, after: $after, ids: $ids){
            pageInfo{
                hasNextPage
                endCursor
            }
            edges{
                node{
                    ...ProductVariant
                    product{
                        id
                        name
                        slug
                        thumbnail(size: 60){
                            url
                            alt
                        }
                    }
                }
            }
        }
    }
`;