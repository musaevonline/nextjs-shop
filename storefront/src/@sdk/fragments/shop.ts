import { gql } from "@apollo/client";

export const ShopBaseFragment = gql`
    fragment Shop on Shop{
        name
        description
        headerText
        domain{
            host
            url
        }
    }
`;