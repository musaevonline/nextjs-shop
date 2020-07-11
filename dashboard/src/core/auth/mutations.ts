import gql from "graphql-tag";

import {TypedMutation} from "@temp/mutations";
import {TokenAuth, TokenAuthVariables} from "@temp/core/auth/types/TokenAuth";
import {VerifyToken, VerifyTokenVariables} from "@temp/core/auth/types/VerifyToken";
import {RequestPasswordReset, RequestPasswordResetVariables} from "@temp/core/auth/types/RequestPasswordReset";
import {SetPassword, SetPasswordVariables} from "@temp/core/auth/types/SetPassword";
import {RefreshToken, RefreshTokenVariables} from "@temp/core/auth/types/RefreshToken";
import {fragmentUser} from "@sdk/fragments/user";

export const tokenAuthMutation = gql`
    ${fragmentUser}
    mutation TokenAuth($email: String!, $password: String!) {
        tokenCreate(email: $email, password: $password) {
            accountErrors{
                code
                field
                message
            }
            token
            user {
                ...User
            }
        }
    }
`;

export const TypedTokenAuthMutation = TypedMutation<
    TokenAuth,
    TokenAuthVariables
    >(tokenAuthMutation);

export const tokenVerifyMutation = gql`
    ${fragmentUser}
    mutation VerifyToken($token: String!) {
        tokenVerify(token: $token){
            user{
                ...User
            }
        }
    }
`;

export const TypedVerifyTokenMutation = TypedMutation<
    VerifyToken,
    VerifyTokenVariables
    >(tokenVerifyMutation);

export const requestPasswordReset = gql`
    mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
        requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
            accountErrors{
                code
                field
                message
            }
        }
    }
`;
export const RequestPasswordResetMutation = TypedMutation<
    RequestPasswordReset,
    RequestPasswordResetVariables
    >(requestPasswordReset);

export const setPassword = gql`
    ${fragmentUser}
    mutation SetPassword($email: String!, $password: String!, $token: String!) {
        setPassword(email: $email, password: $password, token: $token) {
            accountErrors {
                code
                field
                message
            }
            token
            user {
                ...User
            }
        }
    }
`;
export const SetPasswordMutation = TypedMutation<
    SetPassword,
    SetPasswordVariables
    >(setPassword);

const refreshToken = gql`
    mutation RefreshToken($token: String!) {
        tokenRefresh(token: $token) {
            token
            payload
        }
    }
`;
export const TokenRefreshMutation = TypedMutation<
    RefreshToken,
    RefreshTokenVariables
    >(refreshToken);
