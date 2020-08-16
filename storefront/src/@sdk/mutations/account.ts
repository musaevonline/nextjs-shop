import { gql } from "@apollo/client";
import {userFragment} from "@sdk/fragments/user";
import {addressFragment} from "@sdk/fragments/address";

export const accountAddressCreateMutation = gql`
    ${userFragment}
    ${addressFragment}
    mutation AccountAddressCreate($input: AddressInput!){
        accountAddressCreate(input: $input, type: SHIPPING){
            accountErrors{
                code
                field
                message
            }
            user{
                ...User
            }
            address{
                ...Address
            }
        }
    }
`;
export const accountAddressUpdateMutation = gql`
    ${userFragment}
    ${addressFragment}
    mutation AccountAddressUpdate($id: ID!, $input: AddressInput!){
        accountAddressUpdate(id: $id, input: $input){
            accountErrors{
                code
                field
                message
            }
            user{
                ...User
            }
            address{
                ...Address
            }
        }
    }
`;
export const accountAddressDeleteMutation = gql`
    ${userFragment}
    ${addressFragment}
    mutation AccountAddressDelete($id: ID!){
        accountAddressDelete(id: $id){
            accountErrors{
                code
                field
                message
            }
            user{
                ...User
            }
            address{
                ...Address
            }
        }
    }
`;