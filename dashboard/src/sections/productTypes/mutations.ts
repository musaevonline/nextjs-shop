
import { TypedMutation } from "@temp/mutations";
import { productTypeDetailsFragment } from "./queries";
import {
  AssignAttribute,
  AssignAttributeVariables
} from "./types/AssignAttribute";
import {
  ProductTypeAttributeReorder,
  ProductTypeAttributeReorderVariables
} from "./types/ProductTypeAttributeReorder";
import {
  ProductTypeBulkDelete,
  ProductTypeBulkDeleteVariables
} from "./types/ProductTypeBulkDelete";
import {
  ProductTypeCreate,
  ProductTypeCreateVariables
} from "./types/ProductTypeCreate";
import {
  ProductTypeDelete,
  ProductTypeDeleteVariables
} from "./types/ProductTypeDelete";
import {
  ProductTypeUpdate,
  ProductTypeUpdateVariables
} from "./types/ProductTypeUpdate";
import {
  UnassignAttribute,
  UnassignAttributeVariables
} from "./types/UnassignAttribute";
import {productErrorFragment} from "@temp/sections/products/mutations";
import {gql} from "@apollo/client";

export const productTypeDeleteMutation = gql`
  ${productErrorFragment}
  mutation ProductTypeDelete($id: ID!) {
    productTypeDelete(id: $id) {
      productErrors {
        ...ProductErrorFragment
      }
      productType {
        id
      }
    }
  }
`;
export const TypedProductTypeDeleteMutation = TypedMutation<
  ProductTypeDelete,
  ProductTypeDeleteVariables
>(productTypeDeleteMutation);

export const productTypeBulkDeleteMutation = gql`
  ${productErrorFragment}
  mutation ProductTypeBulkDelete($ids: [ID]!) {
    productTypeBulkDelete(ids: $ids) {
      productErrors {
        ...ProductErrorFragment
      }
    }
  }
`;
export const TypedProductTypeBulkDeleteMutation = TypedMutation<
  ProductTypeBulkDelete,
  ProductTypeBulkDeleteVariables
>(productTypeBulkDeleteMutation);

export const productTypeUpdateMutation = gql`
  ${productTypeDetailsFragment}
  ${productErrorFragment}
  mutation ProductTypeUpdate($id: ID!, $input: ProductTypeInput!) {
    productTypeUpdate(id: $id, input: $input) {
      productErrors {
        ...ProductErrorFragment
      }
      productType {
        ...ProductTypeDetailsFragment
      }
    }
  }
`;
export const TypedProductTypeUpdateMutation = TypedMutation<
  ProductTypeUpdate,
  ProductTypeUpdateVariables
>(productTypeUpdateMutation);

export const assignAttributeMutation = gql`
  ${productTypeDetailsFragment}
  mutation AssignAttribute($id: ID!, $operations: [AttributeAssignInput!]!) {
    attributeAssign(productTypeId: $id, operations: $operations) {
      productErrors {
        code
        message
        field
        attributes
      }
      productType {
        ...ProductTypeDetailsFragment
      }
    }
  }
`;
export const TypedAssignAttributeMutation = TypedMutation<
  AssignAttribute,
  AssignAttributeVariables
>(assignAttributeMutation);

export const unassignAttributeMutation = gql`
  ${productTypeDetailsFragment}
  ${productErrorFragment}
  mutation UnassignAttribute($id: ID!, $ids: [ID]!) {
    attributeUnassign(productTypeId: $id, attributeIds: $ids) {
      productErrors {
        ...ProductErrorFragment
      }
      productType {
        ...ProductTypeDetailsFragment
      }
    }
  }
`;
export const TypedUnassignAttributeMutation = TypedMutation<
  UnassignAttribute,
  UnassignAttributeVariables
>(unassignAttributeMutation);

export const productTypeCreateMutation = gql`
  ${productTypeDetailsFragment}
  ${productErrorFragment}
  mutation ProductTypeCreate($input: ProductTypeInput!) {
    productTypeCreate(input: $input) {
      productErrors {
        ...ProductErrorFragment
      }
      productType {
        ...ProductTypeDetailsFragment
      }
    }
  }
`;
export const TypedProductTypeCreateMutation = TypedMutation<
  ProductTypeCreate,
  ProductTypeCreateVariables
>(productTypeCreateMutation);

const productTypeAttributeReorder = gql`
  ${productTypeDetailsFragment}
  ${productErrorFragment}
  mutation ProductTypeAttributeReorder(
    $move: ReorderInput!
    $productTypeId: ID!
    $type: AttributeTypeEnum!
  ) {
    productTypeReorderAttributes(
      moves: [$move]
      productTypeId: $productTypeId
      type: $type
    ) {
      productErrors {
        ...ProductErrorFragment
      }
      productType {
        ...ProductTypeDetailsFragment
      }
    }
  }
`;
export const ProductTypeAttributeReorderMutation = TypedMutation<
  ProductTypeAttributeReorder,
  ProductTypeAttributeReorderVariables
>(productTypeAttributeReorder);
