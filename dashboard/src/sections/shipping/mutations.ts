import {gql} from "@apollo/client";
import makeMutation from "@temp/hooks/makeMutation";

import { shippingMethodFragment } from "./queries";
import {DeleteShippingMethod, DeleteShippingMethodVariables} from "@temp/sections/shipping/types/DeleteShippingMethod";
import {
    BulkDeleteShippingMethod,
    BulkDeleteShippingMethodVariables
} from "@temp/sections/shipping/types/BulkDeleteShippingMethod";
import {
    UpdateDefaultWeightUnit,
    UpdateDefaultWeightUnitVariables
} from "@temp/sections/shipping/types/UpdateDefaultWeightUnit";
import {CreateShippingMethod, CreateShippingMethodVariables} from "@temp/sections/shipping/types/CreateShippingMethod";
import {UpdateShippingMethod, UpdateShippingMethodVariables} from "@temp/sections/shipping/types/UpdateShippingMethod";

export const shippingErrorFragment = gql`
    fragment ShippingErrorFragment on ShippingError {
        code
        field
    }
`;

const deleteShippingMethod = gql`
    ${shippingErrorFragment}
    mutation DeleteShippingMethod($id: ID!) {
        shippingMethodDelete(id: $id) {
            errors: shippingErrors {
                ...ShippingErrorFragment
            }
        }
    }
`;
export const useShippingMethodDelete = makeMutation<
    DeleteShippingMethod,
    DeleteShippingMethodVariables
    >(deleteShippingMethod);

const bulkDeleteShippingMethod = gql`
    ${shippingErrorFragment}
    mutation BulkDeleteShippingMethod($ids: [ID]!) {
        shippingMethodBulkDelete(ids: $ids) {
            errors: shippingErrors {
                ...ShippingErrorFragment
            }
        }
    }
`;
export const useShippingMethodBulkDelete = makeMutation<
    BulkDeleteShippingMethod,
    BulkDeleteShippingMethodVariables
    >(bulkDeleteShippingMethod);

const updateDefaultWeightUnit = gql`
    mutation UpdateDefaultWeightUnit($unit: WeightUnitsEnum) {
        shopSettingsUpdate(input: { defaultWeightUnit: $unit }) {
            shopErrors {
                code
                field
                message
            }
            shop {
                defaultWeightUnit
            }
        }
    }
`;
export const useDefaultWeightUnitUpdate = makeMutation<
    UpdateDefaultWeightUnit,
    UpdateDefaultWeightUnitVariables
    >(updateDefaultWeightUnit);

const createShippingMethod = gql`
    ${shippingErrorFragment}
    ${shippingMethodFragment}
    mutation CreateShippingMethod($input: ShippingMethodInput!) {
        shippingMethodCreate(input: $input) {
            errors: shippingErrors {
                ...ShippingErrorFragment
            }
            shippingMethod {
                ...ShippingMethodFragment
            }
        }
    }
`;
export const useShippingMethodCreate = makeMutation<
    CreateShippingMethod,
    CreateShippingMethodVariables
    >(createShippingMethod);

const updateShippingMethod = gql`
    ${shippingErrorFragment}
    ${shippingMethodFragment}
    mutation UpdateShippingMethod($id: ID!, $input: ShippingMethodInput!) {
        shippingMethodUpdate(id: $id, input: $input) {
            errors: shippingErrors {
                ...ShippingErrorFragment
            }
            shippingMethod {
                ...ShippingMethodFragment
            }
        }
    }
`;
export const useShippingMethodUpdate = makeMutation<
    UpdateShippingMethod,
    UpdateShippingMethodVariables
    >(updateShippingMethod);