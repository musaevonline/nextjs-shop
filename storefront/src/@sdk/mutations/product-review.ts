import {gql} from '@apollo/client';
import {productReviewFragment} from "@sdk/fragments/product-review";

export const productReviewCreate = gql`
    ${productReviewFragment}
    mutation ProductReviewCreate($input: ProductReviewCreateInput!){
        productReviewCreate(input: $input){
            productErrors{
                code
                field
                message
            }
            productReview{
                ...ProductReview
            }
        }
    }
`;