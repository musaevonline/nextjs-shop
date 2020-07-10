import gql from "graphql-tag";

export const categoryBaseFragment = gql`
    fragment CategoryBase on Category {
        id
        name
        slug
        backgroundImage {
            url
        }
    }
`;