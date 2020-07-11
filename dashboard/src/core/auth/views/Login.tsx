import useNavigator from "@temp/hooks/useNavigator";
import useUser from "@temp/hooks/useUser";
import React, {useState} from "react";

import LoginPage, { LoginFormData } from "../components/LoginPage";
import {passwordForgotUrl} from "../urls";
import {TokenAuth_tokenCreate_accountErrors} from "@temp/core/auth/types/TokenAuth";

const LoginView: React.FC = () => {
  const navigate = useNavigator();
  const [errors, setErrors] = useState<TokenAuth_tokenCreate_accountErrors[]>();
  const { login, tokenAuthLoading } = useUser();

  const handleSubmit = (data: LoginFormData) => login(setErrors, data.email, data.password);

  return (
    <LoginPage
      errors={errors}
      disableLoginButton={tokenAuthLoading}
      onPasswordRecovery={() => navigate(passwordForgotUrl)}
      onSubmit={handleSubmit}
    />
  );
};
LoginView.displayName = "LoginView";
export default LoginView;
