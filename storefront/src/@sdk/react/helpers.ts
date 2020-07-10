import React from "react";
import {getAuthToken} from "@temp/core/auth";
import {getCheckoutToken} from "@sdk/checkout";


export const useAuth = (
  stateChangeCallback?: (authenticated?: boolean) => void
) => {
  const [authenticated, setAuthenticated] = React.useState(!!getAuthToken());
  const eventHandler = () => {
    const newState = !!getAuthToken();
    if (stateChangeCallback && authenticated !== newState) {
      stateChangeCallback(newState);
    }

    setAuthenticated(newState);
  };

  React.useEffect(() => {
    addEventListener("auth", eventHandler);

    return () => {
      removeEventListener("auth", eventHandler);
    };
  }, [authenticated]);

  return { authenticated };
};
export const useCheckoutToken = (
  stateChangeCallback?: (token?: string) => void
) => {
  const [token, setToken] = React.useState(getCheckoutToken());
  const eventHandler = () => {
    const newToken = getCheckoutToken();
    if (stateChangeCallback && token !== newToken) {
      stateChangeCallback(newToken);
    }

    setToken(newToken);
  };

  React.useEffect(() => {
    addEventListener("checkoutToken", eventHandler);

    return () => {
      removeEventListener("checkoutToken", eventHandler);
    };
  }, [token]);

  return { checkoutToken:token };
};
