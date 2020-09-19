import { maybe, RequireAtLeastOne } from "@temp/misc";
import { DocumentNode } from "graphql";
import { QueryResult, useQuery as useBaseQuery, ApolloQueryResult } from "@apollo/client";

import useUser from "./useUser";
import {useSnackbar} from "notistack";
import {isJwtError} from "@temp/core/errors";

export interface LoadMore<TData, TVariables> {
  loadMore: (
      mergeFunc: (prev: TData, next: TData) => TData,
      extraVariables: Partial<TVariables>
  ) => Promise<ApolloQueryResult<TData>>;
}

export type UseQueryResult<TData, TVariables> = QueryResult<TData, TVariables> &
    LoadMore<TData, TVariables>;
type UseQueryOpts<TData, TVariables> = Partial<{
  displayLoader: boolean;
  skip: boolean;
  variables: TVariables;
  onCompleted?(data: TData):void
}>;
type UseQueryHook<TData, TVariables> = (
    opts: UseQueryOpts<TData, TVariables>
) => UseQueryResult<TData, TVariables>;

function makeQuery<TData, TVariables>(
    query: DocumentNode
): UseQueryHook<TData, TVariables> {
  function useQuery({
                      displayLoader,
                      skip,
                      variables,
                      onCompleted
                    }: UseQueryOpts<TData, TVariables>): UseQueryResult<TData, TVariables> {
    const {enqueueSnackbar} = useSnackbar();
    const user = useUser();

    const queryData = useBaseQuery(query, {
      context: {
        useBatching: true
      },
      errorPolicy: "all",
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      skip,
      variables,
      onCompleted
    });

    // useEffect(() => {
    //   if (displayLoader) {
    //     dispatchAppState({
    //       payload: {
    //         value: queryData.loading
    //       },
    //       type: "displayLoader"
    //     });
    //   }
    // }, [queryData.loading]);

    if (queryData.error) {
      if (queryData.error.graphQLErrors.some(isJwtError)) {
        user.logout();
        enqueueSnackbar( "Сессия истекла", {variant: "info"});
      } else if (
          !queryData.error.graphQLErrors.every(
              err =>
                  maybe(() => err.extensions.exception.code) === "PermissionDenied"
          )
      ) {
        enqueueSnackbar( "Что-то пошло не так!", {variant: "warning"});
      }
    }

    const loadMore = (
        mergeFunc: (previousResults: TData, fetchMoreResult: TData) => TData,
        extraVariables: RequireAtLeastOne<TVariables>
    ) =>
        queryData.fetchMore({
          query,
          updateQuery: (previousResults, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResults;
            }
            return mergeFunc(previousResults, fetchMoreResult);
          },
          variables: { ...variables, ...extraVariables }
        });

    return {
      ...queryData,
      loadMore
    };
  }

  return useQuery;
}

export default makeQuery;
