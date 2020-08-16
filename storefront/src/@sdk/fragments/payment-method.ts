import { gql } from "@apollo/client";

export const paymentMethodFragment = gql`
    fragment PaymentMethod on PaymentMethod{
        id
        name
        baseUrl
        description
    }
`;

