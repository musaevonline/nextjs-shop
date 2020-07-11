import React from "react";
import { Route, Switch } from "react-router-dom";

import Layout from "./components/Layout";
// import LoginLoading from "./components/LoginLoading";
import LoginView from "./views/Login";
import {User} from "@sdk/fragments/types/User";
import {TokenAuth_tokenCreate_accountErrors} from "@temp/core/auth/types/TokenAuth";
import {newPasswordPath, passwordForgotPath, passwordResetSuccessPath} from "@temp/core/auth/urls";
import ForgotPasswordView from "@temp/core/auth/views/ForgotPassword";
import NewPassword from "@temp/core/auth/views/NewPassword";
import ResetPasswordSuccessView from "@temp/core/auth/views/ResetPasswordSuccess";

interface UserContext {
  login: (setErrors:(errors:TokenAuth_tokenCreate_accountErrors[]) => void, email: string, password: string) => void;
  loginByToken: (token: string, user: User) => void;
  logout: () => void;
  tokenAuthLoading: boolean;
  tokenRefresh: () => Promise<void>;
  tokenVerifyLoading: boolean;
  user?: User;
}

export const UserContext = React.createContext<UserContext>({
  login: undefined,
  loginByToken: undefined,
  logout: undefined,
  tokenAuthLoading: false,
  tokenRefresh: undefined,
  tokenVerifyLoading: false
});

interface AuthRouterProps {
  hasToken: boolean;
}

const AuthRouter: React.FC<AuthRouterProps> = ({ hasToken }) => (
  <Layout>
    <Switch>
      <Route path={passwordResetSuccessPath} component={ResetPasswordSuccessView} />
      <Route path={passwordForgotPath} component={ForgotPasswordView} />
      <Route path={newPasswordPath} component={NewPassword} />
      <Route component={LoginView} />
    </Switch>
  </Layout>
);

AuthRouter.displayName = "AuthRouter";
export default AuthRouter;

export * from "./utils";
