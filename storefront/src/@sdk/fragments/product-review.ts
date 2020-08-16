import { gql } from "@apollo/client";

export const productReviewFragment = gql`
    fragment ProductReview on ProductReview{
        id
        content
        rating
        title
        status
        createdAt
        updatedAt
        advantages
        flaws
        userName
        userAvatar
    }
`;