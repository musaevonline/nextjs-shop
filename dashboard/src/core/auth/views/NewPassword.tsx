import useNavigator from "@temp/hooks/useNavigator";
import useUser from "@temp/hooks/useUser";
import { parse as parseQs } from "qs";
import React from "react";
import { RouteComponentProps } from "react-router";

import NewPasswordPage, {
  NewPasswordPageFormData
} from "../components/NewPasswordPage";
import { SetPasswordMutation } from "../mutations";
import { SetPassword } from "../types/SetPassword";
import { NewPasswordUrlQueryParams } from "../urls";

const NewPassword: React.FC<RouteComponentProps> = ({ location }) => {
  const navigate = useNavigator();
  const { loginByToken } = useUser();

  const params: NewPasswordUrlQueryParams = parseQs(location.search.substr(1));

  const handleSetPassword = async (data: SetPassword) => {
    if (data.setPassword.accountErrors.length === 0) {
      loginByToken(data.setPassword.token, data.setPassword.user);
      navigate("/", true);
    }
  };

  return (
    <SetPasswordMutation onCompleted={handleSetPassword}>
      {(setPassword, {loading, data}) => {
        const handleSubmit = (data: NewPasswordPageFormData) =>
          setPassword({
            variables: {
              email: params.email,
              password: data.password,
              token: params.token
            }
          });
        return (
          <NewPasswordPage
            errors={data?.setPassword.accountErrors || []}
            disabled={loading}
            onSubmit={handleSubmit}
          />
        );
      }}
    </SetPasswordMutation>
  );
};

NewPassword.displayName = "NewPassword";
export default NewPassword;
