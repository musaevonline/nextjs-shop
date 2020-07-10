import gql from "graphql-tag";
import {productCardFragment} from "@sdk/fragments/product";
import {productVariantFragment} from "@sdk/fragments/product-variant";
import {productReviewFragment} from "@sdk/fragments/product-review";

export const productQuery = gql`
    ${productCardFragment}
    ${productVariantFragment}
    ${productReviewFragment}
    query ProductDetails($id: ID!) {
        product(id: $id) {
            ...ProductCardInfo
            description
            descriptionJson
            category{
                id
                name
                slug
                products(first: 6){
                    edges{
                        node{
                            ...ProductCardInfo
                        }
                    }
                }
            }
            reviews(first: 2){
                edges{
                    node{
                        ...ProductReview                        
                    }
                }
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