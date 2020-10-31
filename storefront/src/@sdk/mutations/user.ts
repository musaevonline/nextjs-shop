import { gql } from "@apollo/client";
import {userFragment} from "@sdk/fragments/user";


export const tokenAuthMutation = gql`
    ${userFragment}
    mutation TokenAuth($email: String!, $password: String!) {
        tokenCreate(email: $email, password: $password) {
            token
            accountErrors {
                field
                message
            }
            user {
                ...User
            }
        }
    }
`;

export const tokenVeryficationMutation = gql`
    ${userFragment}
    mutation VerifyToken($token: String!) {
        tokenVerify(token: $token) {
            payload
            user {
                ...User
            }
        }
    }
`;
export const accountRegisterMutation = gql`
    ${userFragment}
    mutation AccountRegister($input: AccountRegisterInput!) {
        accountRegister(input: $input) {
            accountErrors{
                code
                field
                message
            }
            requiresConfirmation
            user {
                ...User
            }
        }
    }
`;

export const confirmAccountMutation = gql`
    ${userFragment}
    mutation ConfirmAccount($email: String!, $token: String!) {
        confirmAccount(token: $token, email: $email) {
            accountErrors{
                code
                field
                message
            }
            user {
                ...User
            }
        }
    }
`;
export const forgotPasswordMutation = gql`
    mutation ForgotPassword($email: String!, $redirectUrl: String!) {
        requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
            accountErrors{
                code
                field
                message
            }
        }
    }
`;

export const resetPasswordMutation = gql`
    ${userFragment}
    mutation ResetPassword($email: String!, $password: String!, $token: String!) {
        setPassword(token: $token, email: $email, password: $password) {
            accountErrors{
                code
                field
                message
            }
            token
            user{
                ...User
            }
        }
    }
`;

export const accountUpdateMutation = gql`
    ${userFragment}
    mutation AccountUpdate($input: AccountInput!){
        accountUpdate(input: $input){
            accountErrors{
                code
                field
                message
            }
            user{
                ...User
            }
        }
    }
`;
export const accountPasswordChangeMutation = gql`
    ${userFragment}
    mutation AccountPasswordChange($oldPassword: String!, $newPassword: String!){
        passwordChange(oldPassword: $oldPassword, newPassword: $newPassword){
            accountErrors{
                code
                field
                message
            }
            user{
                ...User
            }
        }
    }
`;
export const accountEmailChangeMutation = gql`
    ${userFragment}
    mutation AccountEmailChange($password: String!, $newEmail: String!, $redirectUrl: String!){
        requestEmailChange(password: $password, newEmail: $newEmail, redirectUrl: $redirectUrl){
            accountErrors{
                code
                field
                message
            }
            user{
                ...User
            }
        }
    }
`;
export const confirmEmailChangeMutation = gql`
    ${userFragment}
    mutation ConfirmEmailChange($token: String!){
        confirmEmailChange(token: $token){
            accountErrors{
                code
                field
                message
            }
            user{
                ...User
            }
        }
    }
`;

export const socialAuthMutation = gql`
    ${userFragment}
    mutation SocialAuth($provider: String!, $accessToken: String!) {
        socialAuth(provider: $provider, accessToken: $accessToken) {
            token
            social{
                id
                created
                extraData
                uid
                provider
                modified
                user{
                    ...User
                }
            }
        }
    }
`;

