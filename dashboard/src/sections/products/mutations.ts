import gql from "graphql-tag";
import {TypedMutation} from "@temp/mutations";
import {ProductDelete, ProductDeleteVariables} from "@temp/sections/products/types/ProductDelete";
import {ProductImageReorder, ProductImageReorderVariables} from "@temp/sections/products/types/ProductImageReorder";
import {VariantDelete, VariantDeleteVariables} from "@temp/sections/products/types/VariantDelete";
import {ProductImageDelete, ProductImageDeleteVariables} from "@temp/sections/products/types/ProductImageDelete";
import {productBulkDelete, productBulkDeleteVariables} from "@temp/sections/products/types/productBulkDelete";
import {productBulkPublish, productBulkPublishVariables} from "@temp/sections/products/types/productBulkPublish";
import {fragmentVariant, productFragmentDetails} from "@temp/sections/products/queries";
import {VariantCreate, VariantCreateVariables} from "@temp/sections/products/types/VariantCreate";
import {ProductCreate, ProductCreateVariables} from "@temp/sections/products/types/ProductCreate";
import {ProductUpdate, ProductUpdateVariables} from "@temp/sections/products/types/ProductUpdate";
import {SimpleProductUpdate, SimpleProductUpdateVariables} from "@temp/sections/products/types/SimpleProductUpdate";
import {ProductImageCreate, ProductImageCreateVariables} from "@temp/sections/products/types/ProductImageCreate";
import {
    ProductVariantBulkDelete,
    ProductVariantBulkDeleteVariables
} from "@temp/sections/products/types/ProductVariantBulkDelete";
import {VariantUpdate, VariantUpdateVariables} from "@temp/sections/products/types/VariantUpdate";
import {VariantImageUnassign, VariantImageUnassignVariables} from "@temp/sections/products/types/VariantImageUnassign";
import {VariantImageAssign, VariantImageAssignVariables} from "@temp/sections/products/types/VariantImageAssign";

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

const bulkStockErrorFragment = gql`
  fragment BulkStockErrorFragment on BulkStockError {
    code
    field
    index
  }
`;
const stockErrorFragment = gql`
  fragment StockErrorFragment on StockError {
    code
    field
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

export const variantCreateMutation = gql`
  ${fragmentVariant}
  ${productErrorFragment}
  mutation VariantCreate($input: ProductVariantCreateInput!) {
    productVariantCreate(input: $input) {
      errors: productErrors {
        ...ProductErrorFragment
      }
      productVariant {
        ...ProductVariant
      }
    }
  }
`;
export const TypedVariantCreateMutation = TypedMutation<
  VariantCreate,
  VariantCreateVariables
>(variantCreateMutation);


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

export const productCreateMutation = gql`
  ${productErrorFragment}
  ${productFragmentDetails}
  mutation ProductCreate(
    $attributes: [AttributeValueInput]
    $publicationDate: Date
    $category: ID!
    $description: String
    $isPublished: Boolean!
    $name: String!
    $basePrice: Decimal
    $productType: ID!
    $sku: String
    $stocks: [StockInput!]!
  ) {
    productCreate(
      input: {
        attributes: $attributes
        publicationDate: $publicationDate
        category: $category
        description: $description
        isPublished: $isPublished
        name: $name
        basePrice: $basePrice
        productType: $productType
        sku: $sku
        stocks: $stocks
      }
    ) {
      errors: productErrors {
        ...ProductErrorFragment
      }
      product {
        ...Product
      }
    }
  }
`;
export const TypedProductCreateMutation = TypedMutation<
  ProductCreate,
  ProductCreateVariables
>(productCreateMutation);


export const productUpdateMutation = gql`
  ${productErrorFragment}
  ${productFragmentDetails}
  mutation ProductUpdate(
    $id: ID!
    $attributes: [AttributeValueInput]
    $publicationDate: Date
    $category: ID
    $description: String
    $isPublished: Boolean!
    $name: String
    $basePrice: Decimal
  ) {
    productUpdate(
      id: $id
      input: {
        attributes: $attributes
        publicationDate: $publicationDate
        category: $category
        description: $description
        isPublished: $isPublished
        name: $name
        basePrice: $basePrice
      }
    ) {
      errors: productErrors {
        ...ProductErrorFragment
      }
      product {
        ...Product
      }
    }
  }
`;
export const TypedProductUpdateMutation = TypedMutation<
  ProductUpdate,
  ProductUpdateVariables
>(productUpdateMutation);


export const simpleProductUpdateMutation = gql`
  ${bulkStockErrorFragment}
  ${productErrorFragment}
  ${productFragmentDetails}
  ${stockErrorFragment}
  ${fragmentVariant}
  mutation SimpleProductUpdate(
    $id: ID!
    $attributes: [AttributeValueInput]
    $publicationDate: Date
    $category: ID
    $description: String
    $isPublished: Boolean!
    $name: String
    $basePrice: Decimal
    $productVariantId: ID!
    $productVariantInput: ProductVariantInput!
    $addStocks: [StockInput!]!
    $deleteStocks: [ID!]!
    $updateStocks: [StockInput!]!
  ) {
    productUpdate(
      id: $id
      input: {
        attributes: $attributes
        publicationDate: $publicationDate
        category: $category
        description: $description
        isPublished: $isPublished
        name: $name
        basePrice: $basePrice
      }
    ) {
      errors: productErrors {
        ...ProductErrorFragment
      }
      product {
        ...Product
      }
    }
    productVariantUpdate(id: $productVariantId, input: $productVariantInput) {
      errors: productErrors {
        ...ProductErrorFragment
      }
      productVariant {
        ...ProductVariant
      }
    }
    productVariantStocksCreate(
      stocks: $addStocks
      variantId: $productVariantId
    ) {
      errors: bulkStockErrors {
        ...BulkStockErrorFragment
      }
      productVariant {
        ...ProductVariant
      }
    }
    productVariantStocksDelete(
      warehouseIds: $deleteStocks
      variantId: $productVariantId
    ) {
      errors: stockErrors {
        ...StockErrorFragment
      }
      productVariant {
        ...ProductVariant
      }
    }
    productVariantStocksUpdate(
      stocks: $updateStocks
      variantId: $productVariantId
    ) {
      errors: bulkStockErrors {
        ...BulkStockErrorFragment
      }
      productVariant {
        ...ProductVariant
      }
    }
  }
`;
export const TypedSimpleProductUpdateMutation = TypedMutation<
  SimpleProductUpdate,
  SimpleProductUpdateVariables
>(simpleProductUpdateMutation);


export const productImageCreateMutation = gql`
  ${productErrorFragment}
  ${productFragmentDetails}
  mutation ProductImageCreate($product: ID!, $image: Upload!, $alt: String) {
    productImageCreate(input: { alt: $alt, image: $image, product: $product }) {
      errors: productErrors {
        ...ProductErrorFragment
      }
      product {
        ...Product
      }
    }
  }
`;
export const TypedProductImageCreateMutation = TypedMutation<
  ProductImageCreate,
  ProductImageCreateVariables
>(productImageCreateMutation);



export const variantImageAssignMutation = gql`
  ${fragmentVariant}
  ${productErrorFragment}
  mutation VariantImageAssign($variantId: ID!, $imageId: ID!) {
    variantImageAssign(variantId: $variantId, imageId: $imageId) {
      errors: productErrors {
        ...ProductErrorFragment
      }
      productVariant {
        ...ProductVariant
      }
    }
  }
`;
export const TypedVariantImageAssignMutation = TypedMutation<
  VariantImageAssign,
  VariantImageAssignVariables
>(variantImageAssignMutation);


export const variantImageUnassignMutation = gql`
  ${fragmentVariant}
  ${productErrorFragment}
  mutation VariantImageUnassign($variantId: ID!, $imageId: ID!) {
    variantImageUnassign(variantId: $variantId, imageId: $imageId) {
      errors: productErrors {
        ...ProductErrorFragment
      }
      productVariant {
        ...ProductVariant
      }
    }
  }
`;
export const TypedVariantImageUnassignMutation = TypedMutation<
  VariantImageUnassign,
  VariantImageUnassignVariables
>(variantImageUnassignMutation);

export const ProductVariantBulkDeleteMutation = gql`
  ${productErrorFragment}
  mutation ProductVariantBulkDelete($ids: [ID!]!) {
    productVariantBulkDelete(ids: $ids) {
      errors: productErrors {
        ...ProductErrorFragment
      }
    }
  }
`;
export const TypedProductVariantBulkDeleteMutation = TypedMutation<
  ProductVariantBulkDelete,
  ProductVariantBulkDeleteVariables
>(ProductVariantBulkDeleteMutation);


export const variantUpdateMutation = gql`
  ${bulkStockErrorFragment}
  ${fragmentVariant}
  ${productErrorFragment}
  mutation VariantUpdate(
    $addStocks: [StockInput!]!
    $removeStocks: [ID!]!
    $id: ID!
    $attributes: [AttributeValueInput]
    $costPrice: Decimal
    $priceOverride: Decimal
    $sku: String
    $stocks: [StockInput!]!
  ) {
    productVariantUpdate(
      id: $id
      input: {
        attributes: $attributes
        costPrice: $costPrice
        priceOverride: $priceOverride
        sku: $sku
      }
    ) {
      errors: productErrors {
        ...ProductErrorFragment
      }
      productVariant {
        ...ProductVariant
      }
    }
    productVariantStocksUpdate(stocks: $stocks, variantId: $id) {
      errors: bulkStockErrors {
        ...BulkStockErrorFragment
      }
      productVariant {
        ...ProductVariant
      }
    }
    productVariantStocksCreate(stocks: $addStocks, variantId: $id) {
      errors: bulkStockErrors {
        ...BulkStockErrorFragment
      }
      productVariant {
        id
        stocks {
          ...StockFragment
        }
      }
    }
    productVariantStocksDelete(warehouseIds: $removeStocks, variantId: $id) {
      errors: stockErrors {
        code
        field
      }
      productVariant {
        id
        stocks {
          ...StockFragment
        }
      }
    }
  }
`;
export const TypedVariantUpdateMutation = TypedMutation<
  VariantUpdate,
  VariantUpdateVariables
>(variantUpdateMutation);