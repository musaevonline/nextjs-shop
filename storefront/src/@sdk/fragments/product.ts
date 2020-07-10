import gql from "graphql-tag";
import {productVariantFragment} from "@sdk/fragments/product-variant";
import {productReviewFragment} from "@sdk/fragments/product-review";
import {attributeFragment} from "@sdk/fragments/attribute";

export const productCardFragment = gql`
    ${attributeFragment}
    fragment ProductCardInfo on Product{
        id
        pk
        name
        slug
        stockStatus
        unit
        description
        rating{
            ratingAvg
            count
        }
        thumbnail(size: 540){
            url
            alt
        }
        priceRange{
            start{
                currency
                amount
            }
            stop{
                currency
                amount
            }
        },
        attributes{
            attribute{
                ...Attribute
            }
            values{
                id
                inputType
                name
                slug
            }
        }

    }
`;

export const productWithVariantsFragment = gql`
    ${productCardFragment}
    ${productVariantFragment}
    fragment ProductWithVariants on Product{
        ...ProductCardInfo
        variants{
            ...ProductVariant
        }

    }
`;
export const productWithReviewsFragment = gql`
    ${productCardFragment}
    ${productReviewFragment}
    fragment ProductWithReviews on Product{
        ...ProductCardInfo
        reviews(first: 100){
            edges{
                node{
                    ...ProductReview
                }
            }
        }

    }
`;

export const productFragment = gql`
    ${productCardFragment}
    fragment Product on Product{
        ...ProductCardInfo
    }
`;
