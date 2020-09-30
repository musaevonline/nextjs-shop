import { gql } from "@apollo/client";
import { attributeFragment } from "@sdk/fragments/attribute";

export const attributesQuery = gql`
  ${attributeFragment}
  query Attributes(
    $first: Int!
    $sortBy: AttributeSortingInput
    $filter: AttributeFilterInput
  ) {
    attributes(first: $first, sortBy: $sortBy, filter: $filter) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          ...Attribute
        }
      }
    }
  }
`;
