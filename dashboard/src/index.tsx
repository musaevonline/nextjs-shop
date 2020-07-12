// import Navigator from "@temp/components/Navigator";

import { defaultDataIdFromObject, InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { BatchHttpLink } from "apollo-link-batch-http";
import { setContext } from "apollo-link-context";
import { ErrorResponse, onError } from "apollo-link-error";
import { createUploadLink } from "apollo-upload-client";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import {BrowserRouter, Route} from "react-router-dom";
import { getAuthToken, removeAuthToken } from "./core/auth";
import { isJwtError } from "./core/auth/errors";
import { DateProvider } from "./components/Date";
import { LocaleProvider } from "./components/Locale";
import { MessageManager } from "./components/messages";
import ThemeProvider from "./components/Theme";
import { API_URI, APP_MOUNT_URI } from "./core/config";
import AppStateProvider from "./containers/AppState";
import {Routes} from "@temp/app";
import { QueryParamProvider } from 'use-query-params';

interface ResponseError extends ErrorResponse {
  networkError?: Error & {
    statusCode?: number;
    bodyText?: string;
  };
}

const invalidTokenLink = onError((error: ResponseError) => {
  if (
      (error.networkError && error.networkError.statusCode === 401) ||
      error.graphQLErrors?.some(isJwtError)
  ) {
    removeAuthToken();
  }
});

const authLink = setContext((_, context) => {
  const authToken = getAuthToken();

  return {
    ...context,
    headers: {
      ...context.headers,
      Authorization: authToken ? `JWT ${authToken}` : null
    }
  };
});

// DON'T TOUCH THIS
// These are separate clients and do not share configs between themselves
// so we need to explicitly set them
const linkOptions = {
  credentials: "same-origin",
  uri: API_URI
};
const uploadLink = createUploadLink(linkOptions);
const batchLink = new BatchHttpLink({
  batchInterval: 100,
  ...linkOptions
});

const link = ApolloLink.split(
    operation => operation.getContext().useBatching,
    batchLink,
    uploadLink
);

const apolloClient = new ApolloClient({
  cache: new InMemoryCache({
    dataIdFromObject: (obj: any) => {
      // We need to set manually shop's ID, since it is singleton and
      // API does not return its ID
      return defaultDataIdFromObject(obj);
    }
  }),
  link: invalidTokenLink.concat(authLink.concat(link))
});

const App: React.FC = () => {
  const isDark = localStorage.getItem("theme") === "true";

  return (
      <ApolloProvider client={apolloClient}>
        <BrowserRouter basename={APP_MOUNT_URI}>
          <ThemeProvider isDefaultDark={isDark}>
            <DateProvider>
              <LocaleProvider>
                <QueryParamProvider ReactRouterRoute={Route}>
                  <MessageManager>
                    <AppStateProvider>
                      <Routes />
                    </AppStateProvider>
                  </MessageManager>
                </QueryParamProvider>
              </LocaleProvider>
            </DateProvider>
          </ThemeProvider>
        </BrowserRouter>
      </ApolloProvider>
  );
};



render(<App />, document.querySelector("#root"));
