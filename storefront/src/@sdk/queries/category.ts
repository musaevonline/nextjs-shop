import { gql } from "@apollo/client";
import {categoryBaseFragment} from "@sdk/fragments/category";
import {productCardFragment} from "@sdk/fragments/product";

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

export const categoryProducts = gql`
    ${productCardFragment}
    query CategoryProducts($categoryId: ID!, $firstProducts: Int!){
        category(id: $categoryId){
            id
            name
            products(first: $firstProducts){
                edges{
                    node{
                        ...ProductCardInfo
                    }
                }
            }
        }
    }
`;