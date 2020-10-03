import makeQuery from "@temp/hooks/makeQuery";
import {gql} from "@apollo/client";

import { TypedQuery } from "@temp/queries";
import { PageDetails, PageDetailsVariables } from "./types/PageDetails";
import { PageList, PageListVariables } from "./types/PageList";

export const pageFragment = gql`
  fragment PageFragment on Page {
    id
    title
    slug
    isPublished
    content
  }
`;

export const pageDetailsFragment = gql`
  ${pageFragment}
  fragment PageDetailsFragment on Page {
    ...PageFragment
    contentJson
    publicationDate
  }
`;

const pageList = gql`
  ${pageFragment}
  query PageList(
    $first: Int
    $after: String
    $last: Int
    $before: String
    $sort: PageSortingInput
  ) {
    pages(
      before: $before
      after: $after
      first: $first
      last: $last
      sortBy: $sort
    ) {
      edges {
        node {
          ...PageFragment
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
`;
export const usePageListQuery = makeQuery<PageList, PageListVariables>(
  pageList
);

const pageDetails = gql`
  ${pageDetailsFragment}
  query PageDetails($id: ID!) {
    page(id: $id) {
      ...PageDetailsFragment
    }
  }
`;
export const TypedPageDetailsQuery = TypedQuery<
  PageDetails,
  PageDetailsVariables
>(pageDetails);
