import { gql } from "@apollo/client";

export const attributeFragment = gql`
    fragment Attribute on Attribute {
        id
        name
        slug
        inputType
        values{
            id
            name
            slug
        }
    }
`;