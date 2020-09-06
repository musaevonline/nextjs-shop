import {gql} from "@apollo/client";
import makeMutation from "@temp/hooks/makeMutation";

import { paymentMethodFragment } from "./queries";
import {DeletePaymentMethod, DeletePaymentMethodVariables} from "@temp/sections/paymentMethods/types/DeletePaymentMethod";
import {
    BulkDeletePaymentMethod,
    BulkDeletePaymentMethodVariables
} from "@temp/sections/paymentMethods/types/BulkDeletePaymentMethod";
import {CreatePaymentMethod, CreatePaymentMethodVariables} from "@temp/sections/paymentMethods/types/CreatePaymentMethod";
import {UpdatePaymentMethod, UpdatePaymentMethodVariables} from "@temp/sections/paymentMethods/types/UpdatePaymentMethod";

export const paymentErrorFragment = gql`
    fragment PaymentErrorFragment on PaymentError {
        code
        field
    }
`;

const deletePaymentMethod = gql`
    ${paymentErrorFragment}
    mutation DeletePaymentMethod($id: ID!) {
        paymentMethodDelete(id: $id) {
            errors: paymentErrors {
                ...PaymentErrorFragment
            }
        }
    }
`;
export const usePaymentMethodDelete = makeMutation<
    DeletePaymentMethod,
    DeletePaymentMethodVariables
    >(deletePaymentMethod);

const bulkDeletePaymentMethod = gql`
    ${paymentErrorFragment}
    mutation BulkDeletePaymentMethod($ids: [ID]!) {
        paymentMethodBulkDelete(ids: $ids) {
            errors: paymentErrors {
                ...PaymentErrorFragment
            }
        }
    }
`;
export const usePaymentMethodBulkDelete = makeMutation<
    BulkDeletePaymentMethod,
    BulkDeletePaymentMethodVariables
    >(bulkDeletePaymentMethod);

// const updateDefaultWeightUnit = gql`
//     mutation UpdateDefaultWeightUnit($unit: WeightUnitsEnum) {
//         shopSettingsUpdate(input: { defaultWeightUnit: $unit,  }) {
//             shopErrors {
//                 code
//                 field
//                 message
//             }
//             shop {
//                 defaultWeightUnit
//             }
//         }
//     }
// `;
// export const useDefaultWeightUnitUpdate = makeMutation<
//     UpdateDefaultWeightUnit,
//     UpdateDefaultWeightUnitVariables
//     >(updateDefaultWeightUnit);

const createPaymentMethod = gql`
    ${paymentErrorFragment}
    ${paymentMethodFragment}
    mutation CreatePaymentMethod($input: PaymentMethodInput!) {
        paymentMethodCreate(input: $input) {
            errors: paymentErrors {
                ...PaymentErrorFragment
            }
            paymentMethod {
                ...PaymentMethodFragment
            }
        }
    }
`;
export const usePaymentMethodCreate = makeMutation<
    CreatePaymentMethod,
    CreatePaymentMethodVariables
    >(createPaymentMethod);

const updatePaymentMethod = gql`
    ${paymentErrorFragment}
    ${paymentMethodFragment}
    mutation UpdatePaymentMethod($id: ID!, $input: PaymentMethodInput!) {
        paymentMethodUpdate(id: $id, input: $input) {
            errors: paymentErrors {
                ...PaymentErrorFragment
            }
            paymentMethod {
                ...PaymentMethodFragment
            }
        }
    }
`;
export const usePaymentMethodUpdate = makeMutation<
    UpdatePaymentMethod,
    UpdatePaymentMethodVariables
    >(updatePaymentMethod);