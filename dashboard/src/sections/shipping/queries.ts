import makeQuery from "@temp/hooks/makeQuery";
import {gql} from "@apollo/client";

import { pageInfoFragment } from "@temp/queries";
import {ShippingMethods, ShippingMethodsVariables} from "@temp/sections/shipping/types/ShippingMethods";
import {ShippingMethod, ShippingMethodVariables} from "@temp/sections/shipping/types/ShippingMethod";

export const shippingMethodFragment = gql`
  fragment ShippingMethodFragment on ShippingMethod {
    id
    minimumOrderPrice {
      amount
      currency
    }
    minimumOrderWeight {
      unit
      value
    }
    maximumOrderPrice {
      amount
      currency
    }
    maximumOrderWeight {
      unit
      value
    }
    name
    price {
      amount
      currency
    }
    type
  }
`;

const shippingMethods = gql`
  ${shippingMethodFragment}
  ${pageInfoFragment}
  query ShippingMethods(
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    shippingMethods(first: $first, after: $after, last: $last, before: $before) {
      edges {
        node {
          ...ShippingMethodFragment
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;
export const useShippingMethodList = makeQuery<
    ShippingMethods,
    ShippingMethodsVariables
    >(shippingMethods);

const shippingMethod = gql`
  ${shippingMethodFragment}
  query ShippingMethod($id: ID!) {
    shippingMethod(id: $id) {
      ...ShippingMethodFragment
    }
  }
`;
export const useShippingMethod = makeQuery<ShippingMethod, ShippingMethodVariables>(
    shippingMethod
);
