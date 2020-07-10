import gql from "graphql-tag";

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