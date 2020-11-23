import makeQuery from "@temp/hooks/makeQuery";
import { gql } from "@apollo/client";

import { pageInfoFragment, TypedQuery } from "../../queries";
import {
  InitialProductFilterData,
  InitialProductFilterDataVariables
} from "@temp/sections/products/types/InitialProductFilterData";
import {ProductList, ProductListVariables} from "@temp/sections/products/types/ProductList";
import {ProductDetails, ProductDetailsVariables} from "@temp/sections/products/types/ProductDetails";
import {
  ProductVariantDetails,
  ProductVariantDetailsVariables
} from "@temp/sections/products/types/ProductVariantDetails";
import {
  ProductVariantCreateData,
  ProductVariantCreateDataVariables
} from "@temp/sections/products/types/ProductVariantCreateData";
import {ProductImageById, ProductImageByIdVariables} from "@temp/sections/products/types/ProductImageById";
import {
  CreateMultipleVariantsData,
  CreateMultipleVariantsDataVariables
} from "@temp/sections/products/types/CreateMultipleVariantsData";
import {GridAttributes, GridAttributesVariables} from "@temp/sections/products/types/GridAttributes";


export const stockFragment = gql`
    fragment StockFragment on Stock {
        id
        quantity
        quantityAllocated
    }
`;

export const fragmentMoney = gql`
    fragment Money on Money {
        amount
        currency
    }
`;

export const fragmentProductImage = gql`
    fragment ProductImageFragment on ProductImage {
        id
        alt
        sortOrder
        url
    }
`;

export const productFragment = gql`
    ${fragmentMoney}
    fragment ProductFragment on Product {
        id
        name
        unit
        thumbnail {
            url
        }
        isAvailable
        isPublished
        minimalVariantPrice {
            ...Money
        }
        priceRange{
            start{
                amount
                currency
            }
            stop{
                amount
                currency
            }
        }
        productType {
            id
            name
        }
    }
`;

const productVariantAttributesFragment = gql`
    fragment ProductVariantAttributesFragment on Product {
        id
        attributes {
            attribute {
                id
                slug
                name
                inputType
                valueRequired
                values {
                    id
                    name
                    slug
                }
            }
            values {
                id
                name
                slug
            }
        }
        productType {
            id
            variantAttributes {
                id
                name
                values {
                    id
                    name
                    slug
                }
            }
        }
    }
`;

export const productFragmentDetails = gql`
    ${fragmentProductImage}
    ${fragmentMoney}
    ${productVariantAttributesFragment}
    ${stockFragment}
    fragment Product on Product {
        ...ProductVariantAttributesFragment
        name
        slug
        unit
        descriptionJson
        description
        category {
            id
            name
        }
        minimalVariantPrice {
            ...Money
        }
        priceRange {
            start {
                ...Money
            }
            stop {
                ...Money
            }
        }
        isAvailable
        isPublished
        images {
            ...ProductImageFragment
        }
        variants {
            id
            sku
            name
            priceOverride {
                ...Money
            }
            stocks {
                ...StockFragment
            }
        }
        productType {
            id
            name
            hasVariants
        }
    }
`;

export const fragmentVariant = gql`
    ${fragmentMoney}
    ${fragmentProductImage}
    ${stockFragment}
    fragment ProductVariant on ProductVariant {
        id
        attributes {
            attribute {
                id
                name
                slug
                valueRequired
                values {
                    id
                    name
                    slug
                }
            }
            values {
                id
                name
                slug
            }
        }
        costPrice {
            ...Money
        }
        images {
            id
            url
        }
        name
        priceOverride {
            ...Money
        }
        product {
            id
            images {
                ...ProductImageFragment
            }
            name
            thumbnail {
                url
            }
            variants {
                id
                name
                sku
                images {
                    id
                    url
                }
            }
        }
        sku
        stocks {
            ...StockFragment
        }
    }
`;

const initialProductFilterDataQuery = gql`
    query InitialProductFilterData(
        $categories: [ID!]
        $productTypes: [ID!]
    ) {
        attributes(first: 100, filter: { filterableInDashboard: true }) {
            edges {
                node {
                    id
                    name
                    slug
                    values {
                        id
                        name
                        slug
                    }
                }
            }
        }
        categories(first: 100, filter: { ids: $categories }) {
            edges {
                node {
                    id
                    name
                }
            }
        }
        productTypes(first: 100, filter: { ids: $productTypes }) {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`;
export const useInitialProductFilterDataQuery = makeQuery<
    InitialProductFilterData,
    InitialProductFilterDataVariables
    >(initialProductFilterDataQuery);

const productListQuery = gql`
    ${productFragment}
    query ProductList(
        $first: Int
        $after: String
        $last: Int
        $before: String
        $filter: ProductFilterInput
        $sort: ProductOrder
    ) {
        products(
            before: $before
            after: $after
            first: $first
            last: $last
            filter: $filter
            sortBy: $sort
        ) {
            edges {
                node {
                    ...ProductFragment
                    attributes {
                        attribute {
                            id
                        }
                        values {
                            id
                            name
                        }
                    }
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
export const TypedProductListQuery = TypedQuery<
    ProductList,
    ProductListVariables
    >(productListQuery);

const productDetailsQuery = gql`
    ${productFragmentDetails}
    query ProductDetails($id: ID!) {
        product(id: $id) {
            ...Product
        }
    }
`;
export const TypedProductDetailsQuery = TypedQuery<
    ProductDetails,
    ProductDetailsVariables
    >(productDetailsQuery);

const productVariantQuery = gql`
    ${fragmentVariant}
    query ProductVariantDetails($id: ID!) {
        productVariant(id: $id) {
            ...ProductVariant
        }
    }
`;
export const TypedProductVariantQuery = TypedQuery<
    ProductVariantDetails,
    ProductVariantDetailsVariables
    >(productVariantQuery);

const productVariantCreateQuery = gql`
    query ProductVariantCreateData($id: ID!) {
        product(id: $id) {
            id
            images {
                id
                sortOrder
                url
            }
            name
            productType {
                id
                variantAttributes {
                    id
                    slug
                    name
                    valueRequired
                    values {
                        id
                        name
                        slug
                    }
                }
            }
            thumbnail {
                url
            }
            variants {
                id
                name
                sku
                images {
                    id
                    url
                }
            }
        }
    }
`;
export const TypedProductVariantCreateQuery = TypedQuery<
    ProductVariantCreateData,
    ProductVariantCreateDataVariables
    >(productVariantCreateQuery);

const productImageQuery = gql`
    query ProductImageById($productId: ID!, $imageId: ID!) {
        product(id: $productId) {
            id
            name
            mainImage: imageById(id: $imageId) {
                id
                alt
                url
            }
            images {
                id
                url(size: 48)
            }
        }
    }
`;
export const TypedProductImageQuery = TypedQuery<
    ProductImageById,
    ProductImageByIdVariables
    >(productImageQuery);

const availableInGridAttributes = gql`
    ${pageInfoFragment}
    query GridAttributes($first: Int!, $after: String, $ids: [ID!]!) {
        availableInGrid: attributes(
            first: $first
            after: $after
            filter: { availableInGrid: true, isVariantOnly: false }
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
            totalCount
        }

        grid: attributes(first: 25, filter: { ids: $ids }) {
            edges {
                node {
                    id
                    name
                }
            }
        }
    }
`;
export const AvailableInGridAttributesQuery = TypedQuery<
    GridAttributes,
    GridAttributesVariables
    >(availableInGridAttributes);

const createMultipleVariantsData = gql`
    ${fragmentMoney}
    ${productVariantAttributesFragment}
    query CreateMultipleVariantsData($id: ID!) {
        product(id: $id) {
            ...ProductVariantAttributesFragment
            basePrice:minimalVariantPrice {
                ...Money
            }
        }
    }
`;
export const useCreateMultipleVariantsData = makeQuery<
    CreateMultipleVariantsData,
    CreateMultipleVariantsDataVariables
    >(createMultipleVariantsData);
