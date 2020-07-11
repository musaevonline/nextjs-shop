import gql from "graphql-tag";

export const fragmentUser = gql`
    fragment User on User {
        id
        firstName
        lastName
        email
        isStaff
        avatar{
            alt
            url
        }
        userPermissions{
            code
            name
        }
    }
`;