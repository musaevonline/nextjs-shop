import * as React from "react";
import {User} from "@sdk/fragments/types/User";
import {TokenAuth_tokenCreate_user} from "@sdk/mutations/types/TokenAuth";
import {ApolloError} from "@apollo/client";

export interface UserContextInterface {
  loading: boolean;
  errors: ApolloError[] | null;
  token: string | null;
  user: User | null;
  authenticate(token: string): void;
  logout(): void;
  login(token: string, user: TokenAuth_tokenCreate_user): void;
  updateUser: (user: User | null) => void;
}

/* tslint:disable:no-empty */
export const UserContext = React.createContext<UserContextInterface>({
  authenticate: token => {},
  errors: null,
  loading: false,
  login: (token, user) => {},
  logout: () => {},
  updateUser: () => {},
  token: null,
  user: null,
});
/* tslint:enable:no-empty */

UserContext.displayName = "UserContext";