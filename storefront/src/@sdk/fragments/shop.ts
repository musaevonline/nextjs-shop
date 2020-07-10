import gql from "graphql-tag";

export const ShopBaseFragment = gql`
    fragment Shop on Shop{
        name
        description
        headerText
    }
`;