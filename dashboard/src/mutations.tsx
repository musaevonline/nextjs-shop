import { ApolloError, MutationUpdaterFn } from "apollo-client";
import { DocumentNode } from "graphql";
import React from "react";
import { Mutation, MutationFunction, MutationResult } from "react-apollo";
import { useIntl } from "react-intl";

import useUser from "./hooks/useUser";
import { commonMessages } from "./intl";
import {isJwtError} from "@temp/core/auth/errors";
import {getMutationStatus} from "@temp/misc";

type MutationResultAdditionalProps = {
    status: | "loading"
        | "success"
        | "error"
        | "default";
}


export interface TypedMutationInnerProps<TData, TVariables> {
    children: (
        mutateFn: MutationFunction<TData, TVariables>,
        result: MutationResult<TData> & MutationResultAdditionalProps
    ) => React.ReactNode;
    onCompleted?: (data: TData) => void;
    onError?: (error: ApolloError) => void;
    variables?: TVariables;
}

// For some reason Mutation returns () => Element instead of () => ReactNode
export function TypedMutation<TData, TVariables>(
    mutation: DocumentNode,
    update?: MutationUpdaterFn<TData>
) {
    return (props: TypedMutationInnerProps<TData, TVariables>) => {
        const intl = useIntl();
        const user = useUser();
        const { children, onCompleted, onError, variables } = props;

        return (
            <Mutation
                mutation={mutation}
                onCompleted={onCompleted}
                onError={(err: ApolloError) => {
                    if (err.networkError) {
                        console.log({
                            text: intl.formatMessage(commonMessages.somethingWentWrong)
                        });
                    }
                    if (
                        err.graphQLErrors[0].extensions.exception?.code ===
                        "ReadOnlyException"
                    ) {
                        console.log({
                            text: intl.formatMessage(commonMessages.readOnly)
                        });
                    } else if (err.graphQLErrors.some(isJwtError)) {
                        user.logout();
                        console.log({
                            text: intl.formatMessage(commonMessages.sessionExpired)
                        });
                    } else {
                        console.log({
                            text: intl.formatMessage(commonMessages.somethingWentWrong)
                        });
                    }
                    if (onError) {
                        onError(err);
                    }
                }}
                variables={variables}
                update={update}
            >
                {(mutateFn, result) => (
                    <>
                        {children(mutateFn, {
                            ...result,
                            status: getMutationStatus(result)
                        })}
                    </>
                )}
            </Mutation>
        );
    };
}
