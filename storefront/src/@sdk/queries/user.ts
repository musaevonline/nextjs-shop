import { gql } from "@apollo/client";
import {userFragment} from "@sdk/fragments/user";
import {checkoutBaseFragment} from "@sdk/fragments/checkout";
import {productReviewFragment} from "@sdk/fragments/product-review";

export const meQuery = gql`
    ${userFragment}
    ${checkoutBaseFragment}
    query Me {
        me {
            ...User
        }
    }
`;

export const userReviewsQuery = gql`
    ${productReviewFragment}
    query UserReviews($first: Int!, $after: String){
        me{
            id
            reviews(first: $first, after:$after){
                pageInfo{
                    hasNextPage
                    endCursor
                }
                edges{
                    node{
                        ...ProductReview
                        orderLine{
                            id
                            variantName
                            productName
                            thumbnail{
                                alt
                                url
                            }
                            variant{
                                id
                                product{
                                    id
                                    slug
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;