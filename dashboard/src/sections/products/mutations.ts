import gql from "graphql-tag";
import {TypedMutation} from "@temp/mutations";
import {ProductDelete, ProductDeleteVariables} from "@temp/sections/products/types/ProductDelete";
import {ProductImageReorder, ProductImageReorderVariables} from "@temp/sections/products/types/ProductImageReorder";
import {VariantDelete, VariantDeleteVariables} from "@temp/sections/products/types/VariantDelete";
import {ProductImageDelete, ProductImageDeleteVariables} from "@temp/sections/products/types/ProductImageDelete";
import {productBulkDelete, productBulkDeleteVariables} from "@temp/sections/products/types/productBulkDelete";
import {productBulkPublish, productBulkPublishVariables} from "@temp/sections/products/types/productBulkPublish";

export const bulkProductErrorFragment = gql`
  fragment BulkProductErrorFragment on BulkProductError {
    field
    code
    index
  }
`;
export const productErrorFragment = gql`
  fragment ProductErrorFragment on ProductError {
    field
    code
    message
  }
`;


export const productDeleteMutation = gql`
  ${productErrorFragment}
  mutation ProductDelete($id: ID!) {
    productDelete(id: $id) {
      errors: productErrors {
        ...ProductErrorFragment
      }
      product {
        id
      }
    }
  }
`;
export const TypedProductDeleteMutation = TypedMutation<
  ProductDelete,
  ProductDeleteVariables
>(productDeleteMutation);

export const productImagesReorder = gql`
  ${productErrorFragment}
  mutation ProductImageReorder($productId: ID!, $imagesIds: [ID]!) {
    productImageReorder(productId: $productId, imagesIds: $imagesIds) {
      errors: productErrors {
        ...ProductErrorFragment
      }
      product {
        id
        images {
          id
          alt
          sortOrder
          url
        }
      }
    }
  }
`;
export const TypedProductImagesReorder = TypedMutation<
  ProductImageReorder,
  ProductImageReorderVariables
>(productImagesReorder);


export const variantDeleteMutation = gql`
  ${productErrorFragment}
  mutation VariantDelete($id: ID!) {
    productVariantDelete(id: $id) {
      errors: productErrors {
        ...ProductErrorFragment
      }
      productVariant {
        id
      }
    }
  }
`;
export const TypedVariantDeleteMutation = TypedMutation<
  VariantDelete,
  VariantDeleteVariables
>(variantDeleteMutation);

export const productImageDeleteMutation = gql`
  ${productErrorFragment}
  mutation ProductImageDelete($id: ID!) {
    productImageDelete(id: $id) {
      errors: productErrors {
        ...ProductErrorFragment
      }
      product {
        id
        images {
          id
        }
      }
    }
  }
`;
export const TypedProductImageDeleteMutation = TypedMutation<
  ProductImageDelete,
  ProductImageDeleteVariables
>(productImageDeleteMutation);

export const productBulkDeleteMutation = gql`
  ${productErrorFragment}
  mutation productBulkDelete($ids: [ID!]!) {
    productBulkDelete(ids: $ids) {
      errors: productErrors {
        ...ProductErrorFragment
      }
    }
  }
`;
export const TypedProductBulkDeleteMutation = TypedMutation<
  productBulkDelete,
  productBulkDeleteVariables
>(productBulkDeleteMutation);

export const productBulkPublishMutation = gql`
  ${productErrorFragment}
  mutation productBulkPublish($ids: [ID!]!, $isPublished: Boolean!) {
    productBulkPublish(ids: $ids, isPublished: $isPublished) {
      errors: productErrors {
        ...ProductErrorFragment
      }
    }
  }
`;
export const TypedProductBulkPublishMutation = TypedMutation<
  productBulkPublish,
  productBulkPublishVariables
>(productBulkPublishMutation);

export const ProductVariantBulkCreateMutation = gql`
  ${bulkProductErrorFragment}
  mutation ProductVariantBulkCreate(
    $id: ID!
    $inputs: [ProductVariantBulkCreateInput]!
  ) {
    productVariantBulkCreate(product: $id, variants: $inputs) {
      errors: bulkProductErrors {
        ...BulkProductErrorFragment
      }
    }
  }
`;
