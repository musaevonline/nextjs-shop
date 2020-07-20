import { gql } from "@apollo/client";
import {pageInfoFragment} from "@temp/queries";
import makeQuery from "@temp/hooks/makeQuery";
import {RootCategories} from "@temp/sections/categories/types/RootCategories";
import {CategoryDetails, CategoryDetailsVariables} from "@temp/sections/categories/types/CategoryDetails";

export const categoryFragment = gql`
    fragment CategoryFragment on Category{
        id
        name
        slug
        children(first: 1){
            totalCount
        }
        products(first: 1){
            totalCount
        }
    }
`;

export const categoryDetailsFragment = gql`
    fragment CategoryDetailsFragment on Category {
        id
        backgroundImage {
            alt
            url
        }
        name
        descriptionJson
        description
        parent {
            id
        }
    }
`;

const rootCategoriesQuery = gql`
    ${categoryFragment}
    ${pageInfoFragment}
    query RootCategories(
        $first: Int
        $after: String
        $last: Int
        $before: String
        $filter: CategoryFilterInput
        $sort: CategorySortingInput
    ){
        categories(
            level: 0,
            first: $first,
            after: $after,
            before: $before,
            last: $last,
            filter: $filter,
            sortBy: $sort
        ){
            edges{
                node{
                    ...CategoryFragment
                }
            }
            pageInfo {
                ...PageInfoFragment
            }
        }
    }
`;

export const useRootCategoriesQuery = makeQuery<RootCategories, {}>(
    rootCategoriesQuery
);

export const categoryDetails = gql`
    ${categoryFragment}
    ${categoryDetailsFragment}
    ${pageInfoFragment}
    query CategoryDetails(
        $id: ID!
        $first: Int
        $after: String
        $last: Int
        $before: String
    ) {
        category(id: $id) {
            ...CategoryDetailsFragment
            children(first: $first, after: $after, last: $last, before: $before) {
                edges {
                    node {
                        ...CategoryFragment
                    }
                }
                pageInfo {
                    ...PageInfoFragment
                }
            }
            products(first: $first, after: $after, last: $last, before: $before) {
                pageInfo {
                    ...PageInfoFragment
                }
                edges {
                    cursor
                    node {
                        id
                        name
                        basePrice:minimalVariantPrice {
                            amount
                            currency
                        }
                        isAvailable
                        thumbnail {
                            url
                        }
                        productType {
                            id
                            name
                        }
                    }
                }
            }
        }
    }
`;
export const useCategoryDetailsQuery = makeQuery<
    CategoryDetails,
    CategoryDetailsVariables
    >(categoryDetails);