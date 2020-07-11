import React from "react";
import { MutationFunction, MutationResult } from "react-apollo";
import { useIntl } from "react-intl";

import { UserContext } from "./";
import {
  TokenRefreshMutation,
  // TokenRefreshMutation,
  TypedTokenAuthMutation,
  TypedVerifyTokenMutation
} from "./mutations";
import { RefreshToken, RefreshTokenVariables } from "./types/RefreshToken";
import { TokenAuth, TokenAuthVariables } from "./types/TokenAuth";
import { VerifyToken, VerifyTokenVariables } from "./types/VerifyToken";
import {
  getAuthToken,
  removeAuthToken,
  setAuthToken
} from "./utils";
import {maybe} from "@temp/misc";
import {User} from "@sdk/fragments/types/User";

interface AuthProviderOperationsProps {
  children: (props: {
    hasToken: boolean;
    isAuthenticated: boolean;
    tokenAuthLoading: boolean;
    tokenVerifyLoading: boolean;
    user: User;
  }) => React.ReactNode;
}
const AuthProviderOperations: React.FC<AuthProviderOperationsProps> = ({
  children
}) => {
  const intl = useIntl();

  const handleLogin = () => {
    if (process.env.NODE_ENV === 'develop') {
      console.log(intl);
    }
  };

  return (
    <TypedTokenAuthMutation>
      {(...tokenAuth) => (
        <TypedVerifyTokenMutation>
          {(...tokenVerify) => (
            <TokenRefreshMutation>
              {(...tokenRefresh) => (
                <AuthProvider
                  tokenAuth={tokenAuth}
                  tokenVerify={tokenVerify}
                  tokenRefresh={tokenRefresh}
                  onLogin={handleLogin}
                >
                  {children}
                </AuthProvider>
              )}
            </TokenRefreshMutation>
          )}
        </TypedVerifyTokenMutation>
      )}
    </TypedTokenAuthMutation>
  );
};

interface AuthProviderProps {
  children: (props: {
    hasToken: boolean;
    isAuthenticated: boolean;
    tokenAuthLoading: boolean;
    tokenVerifyLoading: boolean;
    user: User;
  }) => React.ReactNode;
  tokenAuth: [
    MutationFunction<TokenAuth, TokenAuthVariables>,
    MutationResult<TokenAuth>
  ];
  tokenVerify: [
    MutationFunction<VerifyToken, VerifyTokenVariables>,
    MutationResult<VerifyToken>
  ];
  tokenRefresh: [
    MutationFunction<RefreshToken, RefreshTokenVariables>,
    MutationResult<RefreshToken>
  ];
  onLogin?: () => void;
}

interface AuthProviderState {
  user: User;
  persistToken: boolean;
}

class AuthProvider extends React.Component<
  AuthProviderProps,
  AuthProviderState
> {
  constructor(props) {
    super(props);
    this.state = { persistToken: false, user: undefined };
  }

  componentWillReceiveProps(props: AuthProviderProps) {
    const { tokenAuth, tokenVerify } = props;
    const tokenAuthOpts = tokenAuth[1];
    const tokenVerifyOpts = tokenVerify[1];

    if (tokenAuthOpts.error || tokenVerifyOpts.error) {
      this.logout();
    }
    if (tokenAuthOpts.data) {
      const user = tokenAuthOpts.data.tokenCreate.user;
      // FIXME: Now we set state also when auth fails and returned user is
      // `null`, because the LoginView uses this `null` to display error.
      this.setState({ user });
      if (user) {
        setAuthToken(
          tokenAuthOpts.data.tokenCreate.token,
          this.state.persistToken
        );
      }
    } else {
      if (maybe(() => tokenVerifyOpts.data.tokenVerify === null)) {
        this.logout();
      } else {
        const user = maybe(() => tokenVerifyOpts.data.tokenVerify.user);
        if (!!user) {
          this.setState({ user });
        }
      }
    }
  }

  componentDidMount() {
    const { user } = this.state;
    const token = getAuthToken();
    if (!!token && !user) {
      this.verifyToken(token);
    } else {
      /* FIXME */
      // loginWithCredentialsManagementAPI(this.login);
      console.log('login with credentials')
    }
  }

  login = async (email: string, password: string) => {
    const { tokenAuth, onLogin } = this.props;
    const [tokenAuthFn] = tokenAuth;

    tokenAuthFn({ variables: { email, password } }).then(result => {
      if (result && !result.data.tokenCreate.accountErrors.length) {
        if (!!onLogin) {
          onLogin();
        }
        /* FIXME */
        console.log('save credentials');
        // saveCredentials(result.data.tokenCreate.user, password);
      }
    });
  };

  loginByToken = (token: string, user: User) => {
    this.setState({ user });
    setAuthToken(token, this.state.persistToken);
  };

  logout = () => {
    this.setState({ user: undefined });
    removeAuthToken();
  };

  verifyToken = (token: string) => {
    const { tokenVerify } = this.props;
    const [tokenVerifyFn] = tokenVerify;

    return tokenVerifyFn({ variables: { token } });
  };

  refreshToken = async () => {
    const { tokenRefresh } = this.props;
    const [tokenRefreshFn] = tokenRefresh;
    const token = getAuthToken();

    const refreshData = await tokenRefreshFn({ variables: { token } });

    setAuthToken(refreshData.data.tokenRefresh.token, this.state.persistToken);
  };

  render() {
    const { children, tokenAuth, tokenVerify } = this.props;
    const tokenAuthOpts = tokenAuth[1];
    const tokenVerifyOpts = tokenVerify[1];
    const { user } = this.state;
    const isAuthenticated = !!user;

    return (
      <UserContext.Provider
        value={{
          login: this.login,
          loginByToken: this.loginByToken,
          logout: this.logout,
          tokenAuthLoading: tokenAuthOpts.loading,
          // tokenRefresh: this.refreshToken,
          tokenVerifyLoading: tokenVerifyOpts.loading,
          user
        }}
      >
        {children({
          hasToken: !!getAuthToken(),
          isAuthenticated,
          tokenAuthLoading: tokenAuthOpts.loading,
          tokenVerifyLoading: tokenVerifyOpts.loading,
          user
        })}
      </UserContext.Provider>
    );
  }
}

export default AuthProviderOperations;
