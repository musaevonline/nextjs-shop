import React, {useContext} from "react";
import {LoginForm} from "@temp/components/Forms/LoginForm";
import {useMutation} from "@apollo/client";
import {TokenAuth, TokenAuthVariables} from "@sdk/mutations/types/TokenAuth";
import {socialAuthMutation, tokenAuthMutation} from "@sdk/mutations/user";
import {useSnackbar} from "notistack";
import {UserContext, UserContextInterface} from "@temp/components/User/context";
import {GoogleLogin, GoogleLoginResponse} from 'react-google-login';
import {makeStyles} from "@material-ui/core/styles";
import {SocialAuth, SocialAuthVariables} from "@sdk/mutations/types/SocialAuth";
import useShop from "@temp/hooks/useShop";
import {AuthorizationKeyType} from "@temp/types/globalTypes";

const useStyles = makeStyles(theme => ({
    loginButton: {
        width: "100%",
        justifyContent: "center",
        marginTop: 10,
        border: "1px solid rgb(238, 238, 238) !important",
        height: 36,
        "& > div": {
            padding: "5px !important"
        }
    }
}));

const LoginPage:React.FC<{
    onForgotPassword: () => void
}> = ({ onForgotPassword }) =>{
    const classes = useStyles();
    const shop = useShop();
    const { enqueueSnackbar } = useSnackbar();
    const auth = useContext<UserContextInterface>(UserContext);

    const [login, responseLogin] = useMutation<TokenAuth, TokenAuthVariables>(tokenAuthMutation);
    const [loginSocial, responseSocialLogin] = useMutation<SocialAuth, SocialAuthVariables>(socialAuthMutation);

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
    const responseGoogleSuccess = async (googleRes: GoogleLoginResponse) => {
        try {
            const response = await loginSocial({
                variables: {
                    provider: "google-oauth2",
                    accessToken: googleRes.accessToken
                }
            });
            auth.login(response.data.socialAuth.token, response.data.socialAuth.social.user);
        }catch (e) {
            enqueueSnackbar(e.message, {
                variant:"error"
            })
        }
    }
    const responseGoogleFailure = (e: any): void => {
        console.log('Google oauth failure: ', e)
        if (e?.error === "popup_closed_by_user"){
            enqueueSnackbar("Окно Google было закрыто", {
                variant: "info"
            })
        }else {
            enqueueSnackbar(e?.error, {
                variant: "error"
            })
        }
    }

    const googleAuthKey = shop?.authorizationKeys.find(key => key.name === AuthorizationKeyType.GOOGLE_OAUTH2);

    return(
        <div id="login-page">
            <LoginForm onSubmit={onSubmit}
                       onForgotPassword={onForgotPassword}
                       errors={responseLogin.data?.tokenCreate.accountErrors}
                       loading={responseLogin.loading || responseSocialLogin.loading}
            />
            {googleAuthKey &&
            <GoogleLogin clientId={googleAuthKey.key}
                         className={classes.loginButton}
                         buttonText="Войти с Google"
                         onSuccess={responseGoogleSuccess}
                         onFailure={responseGoogleFailure}
                         cookiePolicy={'single_host_origin'}
                         disabled={responseSocialLogin.loading}
            />
            }
        </div>
    );
};

export default LoginPage;