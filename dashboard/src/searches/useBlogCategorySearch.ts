import makeTopLevelSearch from "@temp/hooks/makeTopLevelSearch";
import { pageInfoFragment } from "@temp/queries";
import { gql } from "@apollo/client";
import {SearchBlogCategories, SearchBlogCategoriesVariables} from "@temp/searches/types/SearchBlogCategories";

export const searchBlogCategories = gql`
  ${pageInfoFragment}
  query SearchBlogCategories($after: String, $first: Int!, $query: String!) {
    search: blogCategoryList(
      after: $after
      first: $first
      filter: { search: $query }
    ) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        ...PageInfoFragment
      }
    }
  }
`;

export default makeTopLevelSearch<SearchBlogCategories, SearchBlogCategoriesVariables>(
  searchBlogCategories
);
