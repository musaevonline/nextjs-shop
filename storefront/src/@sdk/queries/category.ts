import gql from "graphql-tag";
import {categoryBaseFragment} from "@sdk/fragments/category";

export const categoryQuery = gql`
    ${categoryBaseFragment}
    query Category($id: ID! ) {
        category(id: $id) {
            ...CategoryBase
        }
    }
`;
export const categoriesQuery = gql`
    ${categoryBaseFragment}
    query Categories($level: Int, $after: String, $sortBy: CategorySortingInput, $filter: CategoryFilterInput) {
        categories(first: 100, level: $level, after: $after, sortBy: $sortBy, filter: $filter) {
            edges{
                node{
                    ...CategoryBase
                    children(first: 100){
                        edges{
                            node{
                                ...CategoryBase
                                children(first: 100){
                                    edges{
                                        node{
                                            ...CategoryBase
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

        }
    }
`;