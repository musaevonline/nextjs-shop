import { gql } from "@apollo/client";

export const categoryBaseFragment = gql`
    fragment CategoryBase on Category {
        id
        name
        slug
        description
        backgroundImage {
            url
        }
    }
`;