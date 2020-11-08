import { gql } from "@apollo/client";
import {productCardFragment} from "@sdk/fragments/product";
import {productVariantFragment} from "@sdk/fragments/product-variant";

export const productQuery = gql`
    ${productCardFragment}
    ${productVariantFragment}
    query ProductDetails($id: ID!) {
        product(id: $id) {
            ...ProductCardInfo
            description
            descriptionJson
            category{
                id
                name
                slug
            }
            reviews(first: 1){
                totalCount
               
            }
            variants{
                ...ProductVariant
            }
            images{
                url
                alt
            }
        }
    }
`;
export const productCardQuery = gql`
    ${productCardFragment}
    query ProductCardDetails($id: ID!) {
        product(id: $id) {
            ...ProductCardInfo
        }
    }
`;

export const productsCardQuery = gql`
    ${productCardFragment}
    query ProductsCardDetails($first: Int!, $after: String, $sortBy: ProductOrder, $filter: ProductFilterInput, $ids: [ID]) {
        products(first: $first, after: $after, sortBy: $sortBy, filter: $filter, ids:$ids) {
            pageInfo{
                endCursor
                hasNextPage
            }
            edges{
                node{
                    ...ProductCardInfo
                }
            }
        }
    }
`;