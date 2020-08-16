import { gql } from "@apollo/client";
import {addressFragment} from "@sdk/fragments/address";

export const userFragment = gql`
  ${addressFragment}
  fragment User on User {
    id
    email
    firstName
    lastName
    isStaff
    isActive
    defaultShippingAddress {
      ...Address
    }
    addresses {
      ...Address
    }
  }
`;