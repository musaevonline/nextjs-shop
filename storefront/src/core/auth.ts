import * as React from "react";
import {checkoutTokenEvent} from "@sdk/checkout";
import {ErrorResponse, onError} from "@apollo/client/link/error";
import {ApolloLink} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import {ssrMode} from "@temp/constants";

export const authEvent = !ssrMode ? new Event("auth") : null;

export function getAuthToken(): string | null {
  try {
    return localStorage.getItem("token");
  } catch {
    return null;
  }
}

export function setAuthToken(token: string) {
  localStorage.setItem("token", token);
  dispatchEvent(authEvent);
}

export function removeAuthToken() {
  localStorage.removeItem("token");
  dispatchEvent(authEvent);
}

export function clearStorage(): void {
  localStorage.clear();
  dispatchEvent(authEvent);
  dispatchEvent(checkoutTokenEvent);
}

interface ResponseError extends ErrorResponse {
  networkError?: Error & {
    statusCode?: number;
    bodyText?: string;
  };
}

export const invalidTokenLinkWithTokenHandlerComponent = (
  component: React.ComponentClass
): { component: React.FC<any>; link: ApolloLink } => {
  // tslint:disable-next-line:no-empty
  let tokenExpirationCallback = () => {
    console.log('token expiration callback')};

  const tokenExpirationHandler = callback => {
    tokenExpirationCallback = callback;
  };
  const extendedComponent = props => {
    return React.createElement(component, {
      ...props,
      tokenExpirationHandler,
    });
  };
  const link = onError((error: ResponseError) => {
    if (error.networkError && error.networkError.statusCode === 401) {
      tokenExpirationCallback();
    }
  });
  return { component: extendedComponent, link };
};

export const authLink = setContext((_, context) => {
  const authToken = getAuthToken();
  if (authToken) {
    return {
      ...context,
      headers: {
        ...context.headers,
        Authorization: authToken ? `JWT ${authToken}` : null,
      },
    };
  } else {
    return context;
  }
});