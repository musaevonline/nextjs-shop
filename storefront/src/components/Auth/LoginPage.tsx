import React, {useContext} from "react";
import {LoginForm} from "@temp/components/Forms/LoginForm";
import {useMutation} from "@apollo/react-hooks";
import {TokenAuth, TokenAuthVariables} from "@sdk/mutations/types/TokenAuth";
import {tokenAuthMutation} from "@sdk/mutations/user";
import {useSnackbar} from "notistack";
import {UserContext, UserContextInterface} from "@temp/components/User/context";

const LoginPage:React.FC<{
    onForgotPassword: () => void
}> = ({ onForgotPassword }) =>{
    const { enqueueSnackbar } = useSnackbar();
    const auth = useContext<UserContextInterface>(UserContext);

    const [login, responseLogin] = useMutation<TokenAuth, TokenAuthVariables>(tokenAuthMutation);

    const onSubmit = async (values) => {
        try {
            const response = await login({
                variables: values
            });
            const errors = response.data?.tokenCreate.accountErrors || [];
            if (errors.length == 0){
                const data = response.data.tokenCreate;
                auth.login(data.token, data.user);
            }
        }catch (e) {
            enqueueSnackbar(e.message, {
                variant:"error"
            })
        }

    };

    return(
        <div id="login-page">
            <LoginForm onSubmit={onSubmit}
                       onForgotPassword={onForgotPassword}
                       errors={responseLogin.data?.tokenCreate.accountErrors}
                       loading={false}/>
        </div>
    );
};

export default LoginPage;