import {gql} from "@apollo/client";

import { TypedMutation } from "@temp/mutations";
import { fragmentAddress } from "../orders/queries";
import {shopFragment, shopImageFragment} from "./queries";
import {
  AuthorizationKeyAdd,
  AuthorizationKeyAddVariables
} from "./types/AuthorizationKeyAdd";
import {
  AuthorizationKeyDelete,
  AuthorizationKeyDeleteVariables
} from "./types/AuthorizationKeyDelete";
import {
  ShopSettingsUpdate,
  ShopSettingsUpdateVariables
} from "./types/ShopSettingsUpdate";
import {ShopImageCreate, ShopImageCreateVariables} from "@temp/sections/siteSettings/types/ShopImageCreate";
import {ShopImageUpdate, ShopImageUpdateVariables} from "@temp/sections/siteSettings/types/ShopImageUpdate";
import {ShopImageDelete, ShopImageDeleteVariables} from "@temp/sections/siteSettings/types/ShopImageDelete";
import {ShopImageReorder, ShopImageReorderVariables} from "@temp/sections/siteSettings/types/ShopImageReorder";

const shopErrorFragment = gql`
  fragment ShopErrorFragment on ShopError {
    code
    field
  }
`;

const authorizationKeyAdd = gql`
  ${shopErrorFragment}
  ${shopFragment}
  mutation AuthorizationKeyAdd(
    $input: AuthorizationKeyInput!
    $keyType: AuthorizationKeyType!
  ) {
    authorizationKeyAdd(input: $input, keyType: $keyType) {
      errors: shopErrors {
        ...ShopErrorFragment
      }
      shop {
        ...ShopFragment
      }
    }
  }
`;
export const TypedAuthorizationKeyAdd = TypedMutation<
    AuthorizationKeyAdd,
    AuthorizationKeyAddVariables
    >(authorizationKeyAdd);

const authorizationKeyDelete = gql`
  ${shopErrorFragment}
  ${shopFragment}
  mutation AuthorizationKeyDelete($keyType: AuthorizationKeyType!) {
    authorizationKeyDelete(keyType: $keyType) {
      errors: shopErrors {
        ...ShopErrorFragment
      }
      shop {
        ...ShopFragment
      }
    }
  }
`;
export const TypedAuthorizationKeyDelete = TypedMutation<
    AuthorizationKeyDelete,
    AuthorizationKeyDeleteVariables
    >(authorizationKeyDelete);

const shopSettingsUpdate = gql`
  ${shopErrorFragment}
  ${shopFragment}
  ${fragmentAddress}
  mutation ShopSettingsUpdate(
    $shopDomainInput: SiteDomainInput!
    $shopSettingsInput: ShopSettingsInput!
    $addressInput: AddressInput
  ) {
    shopSettingsUpdate(input: $shopSettingsInput) {
      errors: shopErrors {
        ...ShopErrorFragment
      }
      shop {
        ...ShopFragment
      }
    }
    shopDomainUpdate(input: $shopDomainInput) {
      errors: shopErrors {
        ...ShopErrorFragment
      }
      shop {
        domain {
          host
          url
        }
      }
    }
    shopAddressUpdate(input: $addressInput) {
      errors: shopErrors {
        ...ShopErrorFragment
      }
      shop {
        companyAddress {
          ...AddressFragment
        }
      }
    }
  }
`;
export const TypedShopSettingsUpdate = TypedMutation<
    ShopSettingsUpdate,
    ShopSettingsUpdateVariables
    >(shopSettingsUpdate);


export const shopImageCreateMutation = gql`
  ${shopErrorFragment}
  ${shopFragment}
  ${shopImageFragment}
  mutation ShopImageCreate($description: String, $image: Upload!, $alt: String) {
    shopImageCreate(input: { alt: $alt, image: $image, description: $description }) {
      errors: shopErrors {
        ...ShopErrorFragment
      }
      shop {
        ...ShopFragment
        images{
          ...ShopImageFragment
        }
      }
    }
  }
`;
export const TypedShopImageCreateMutation = TypedMutation<
    ShopImageCreate,
    ShopImageCreateVariables
    >(shopImageCreateMutation);

export const shopImageUpdateMutation = gql`
  ${shopErrorFragment}
  ${shopFragment}
  ${shopImageFragment}
  mutation ShopImageUpdate($id: ID!, $alt: String!, $description: String) {
    shopImageUpdate(id: $id, input: { alt: $alt, description: $description }) {
      errors: shopErrors {
        ...ShopErrorFragment
      }
      shop {
        ...ShopFragment
        images{
          ...ShopImageFragment
        }
      }
    }
  }
`;
export const TypedShopImageUpdateMutation = TypedMutation<
    ShopImageUpdate,
    ShopImageUpdateVariables
    >(shopImageUpdateMutation);


export const shopImageDeleteMutation = gql`
  ${shopErrorFragment}
  ${shopFragment}
  ${shopImageFragment}
  mutation ShopImageDelete($id: ID!) {
    shopImageDelete(id: $id) {
      errors: shopErrors {
        ...ShopErrorFragment
      }
      shop {
        ...ShopFragment
        images{
          ...ShopImageFragment
        }
      }
    }
  }
`;
export const TypedShopImageDeleteMutation = TypedMutation<
    ShopImageDelete,
    ShopImageDeleteVariables
    >(shopImageDeleteMutation);

export const shopImagesReorder = gql`
  ${shopFragment}
  ${shopErrorFragment}
  ${shopImageFragment}
  mutation ShopImageReorder($imagesIds: [ID]!) {
    shopImageReorder(imagesIds: $imagesIds) {
      errors: shopErrors {
        ...ShopErrorFragment
      }
      shop {
        ...ShopFragment
        images{
          ...ShopImageFragment
        }
      }
    }
  }
`;
export const TypedShopImagesReorder = TypedMutation<
    ShopImageReorder,
    ShopImageReorderVariables
    >(shopImagesReorder);