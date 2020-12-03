import { useMemo } from 'react';
// import merge from 'deepmerge';
import {apiUrl, ssrMode} from "./constants";
import {
  authLink,
  removeAuthToken,
} from "./core/auth";
import {isJwtError} from "@temp/core/errors";
import {RetryLink} from "@apollo/client/link/retry";
import {BatchHttpLink} from "@apollo/client/link/batch-http";
import {ApolloClient, ApolloLink, defaultDataIdFromObject, HttpLink, InMemoryCache} from "@apollo/client";
import {ErrorResponse, onError} from "@apollo/client/link/error";
import TagManager from 'react-gtm-module';
import {gtmId, isDev} from "@temp/core/config";

if (!isDev && !!gtmId){
  TagManager.initialize({
    gtmId: gtmId
  })
}

interface ResponseError extends ErrorResponse {
  networkError?: Error & {
    statusCode?: number;
    bodyText?: string;
  };
}

const invalidTokenLink = onError((error: ResponseError) => {
  console.log(error);
  try {
    if (
        (error.networkError && error.networkError.statusCode === 401) ||
        error.graphQLErrors?.some(isJwtError)
    ) {
      removeAuthToken();
    }
  }catch (e) {
    console.log(e);
  }

});

const batchLink = new BatchHttpLink({ uri: apiUrl });
const httpLink = ApolloLink.from([
  invalidTokenLink,
  authLink,
  new RetryLink(),
  new HttpLink({
    uri: apiUrl,
    credentials: 'same-origin'
  })
]);
const linkSplit = ApolloLink.split(
    operation => !ssrMode,
    batchLink
);
const link = ApolloLink.from([
  invalidTokenLink,
  authLink,
  new RetryLink(),
  linkSplit
]);

const cache = new InMemoryCache({
  dataIdFromObject: obj => {
    if (obj.__typename === "Shop") {
      return "shop";
    }
    return defaultDataIdFromObject(obj);
  }
});
const createApolloClient = () => {
  return new ApolloClient({
    cache,
    link: ssrMode ? httpLink : link,
    ssrMode: ssrMode,
    // ssrForceFetchDelay: 100
  });
}

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    // const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    // const data = merge(initialState, existingCache)

    // Restore the cache with the merged data
    _apolloClient.cache.restore(initialState)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState(client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo(pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => initializeApollo(state), [state])
  return store
}
