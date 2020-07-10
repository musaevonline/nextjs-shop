import gql from 'graphql-tag';
import {productReviewFragment} from "@sdk/fragments/product-review";

export const productReviewsQuery = gql`
    ${productReviewFragment}
    query ProductReviews($first: Int!, $after: String, $filter: ProductReviewFilterInput, $sortBy: ProductReviewOrder){
        productReviews(first: $first, after: $after, filter: $filter, sortBy: $sortBy){
            pageInfo{
                endCursor
                hasNextPage
            }
            edges{
                node{
                    ...ProductReview
                }
            }
        }
    }
`;