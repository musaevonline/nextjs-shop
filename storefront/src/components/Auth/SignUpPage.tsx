import React, {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {useSnackbar} from "notistack";
import {SignUpForm} from "@temp/components/Forms/SignUpForm";
import {AccountRegister, AccountRegisterVariables} from "@sdk/mutations/types/AccountRegister";
import {accountRegisterMutation} from "@sdk/mutations/user";
import {SignUpFormData} from "@temp/components/Forms/SignUpForm/SignUpForm";
import {SIGNUP_REDIRECT_URL} from "@temp/core/constants";
import {GoogleLogin, GoogleLoginResponse} from "react-google-login";
import {makeStyles} from "@material-ui/core/styles";
import {AuthorizationKeyType} from "@temp/types/globalTypes";
import useShop from "@temp/hooks/useShop";

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

const SignUpPage:React.FC = () =>{
    const classes = useStyles();
    const shop = useShop();
    const { enqueueSnackbar } = useSnackbar();
    const [successEmail, setSuccessEmail] = useState('');
    const [initialValues, setInitialValues] = useState<SignUpFormData>({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [signUp, responseSignUp] = useMutation<AccountRegister, AccountRegisterVariables>(accountRegisterMutation);

    useEffect(() => {
        setSuccessEmail('');
    }, []);
    const onSubmit = async (values: SignUpFormData) => {
        try {
            const response = await signUp({
                variables: {
                    input: {
                        email: values.email,
                        password: values.password,
                        redirectUrl: SIGNUP_REDIRECT_URL
                    }
                }
            });
            console.log(response);
            const errors = response.data?.accountRegister.accountErrors || [];
            if (errors.length == 0){
                setSuccessEmail(response.data.accountRegister.user.email);

            }
        }catch (e) {
            enqueueSnackbar(e.message, {
                variant:"error"
            })
        }

    };

    const responseGoogleSuccess = (res: GoogleLoginResponse) => {
        setInitialValues({
            email: res.profileObj.email,
            password: "",
            confirmPassword: ""
        });
    }
    const responseGoogleFailure = ({error}): void => {
        if (error === "popup_closed_by_user"){
            enqueueSnackbar("Окно Google было закрыто", {
                variant: "info"
            })
        }else {
            enqueueSnackbar(error, {
                variant: "error"
            })
        }
    }
    const googleAuthKey = shop?.authorizationKeys.find(key => key.name === AuthorizationKeyType.GOOGLE_OAUTH2);
    return(
        <div id="signup-page">
            {successEmail && responseSignUp.data?.accountRegister.requiresConfirmation &&
            <div>
                <p>На вашу почту <span className="font-medium">{successEmail}</span> отправлен email.</p>
                <p>Пожалуйста перейдите по ссылке в письме для активации аккаунта!</p>
            </div>
            }
            {successEmail && !responseSignUp.data?.accountRegister.requiresConfirmation &&
            <div>
                <p>Вы успешно зарегистрированы!</p>
            </div>
            }
            {!successEmail && <SignUpForm onSubmit={onSubmit}
                                          initialValues={initialValues}
                                          errors={responseSignUp.data?.accountRegister.accountErrors}
                                          loading={responseSignUp.loading}/>
            }
            {googleAuthKey &&
            <GoogleLogin clientId={googleAuthKey.key}
                         className={classes.loginButton}
                         buttonText="Создать аккаунт с Google"
                         onSuccess={responseGoogleSuccess}
                         onFailure={responseGoogleFailure}
                         cookiePolicy={'single_host_origin'}
                         disabled={responseSignUp.loading}
            />
            }
        </div>
    );
};

export default SignUpPage;