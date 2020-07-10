import gql from "graphql-tag";

export const shippingMethodFragment = gql`
    fragment ShippingMethod on ShippingMethod{
      id
      name
      description
      type
      price{
        amount
        currency
      }
      
    }
`;

