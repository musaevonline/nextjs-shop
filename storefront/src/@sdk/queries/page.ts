import {gql} from "@apollo/client";
import {pageFragment} from "@sdk/fragments/page";
import {pageInfoFragment} from "@sdk/fragments/page-info";
import makeQuery from "@temp/hooks/makeQuery";
import {Pages, PagesVariables} from "@sdk/queries/types/Pages";
import {Page, PageVariables} from "@sdk/queries/types/Page";

export const pageQuery = gql`
    ${pageFragment}
    query Page($id: ID, $slug: String){
        page(id: $id, slug: $slug){
            ...PageFragment
        }
    }
`;

export const usePage = makeQuery<Page, PageVariables>(pageQuery);

export const pagesQuery = gql`
    ${pageInfoFragment}
    ${pageFragment}
    query Pages($first: Int!, $filter: PageFilterInput, $after: String, $sortBy: PageSortingInput){
        pages(first: $first, filter: $filter, after: $after, sortBy: $sortBy){
            pageInfo{
                ...PageInfoFragment
            }
            edges{
                node{
                    ...PageFragment
                }
            }
        }
    }
`;

export const usePages = makeQuery<Pages, PagesVariables>(pagesQuery);