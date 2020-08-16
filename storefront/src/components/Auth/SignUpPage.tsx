import React, {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {useSnackbar} from "notistack";
import {SignUpForm} from "@temp/components/Forms/SignUpForm";
import {AccountRegister, AccountRegisterVariables} from "@sdk/mutations/types/AccountRegister";
import {accountRegisterMutation} from "@sdk/mutations/user";
import {SignUpFormData} from "@temp/components/Forms/SignUpForm/SignUpForm";
import {SIGNUP_REDIRECT_URL} from "@temp/core/constants";

const SignUpPage:React.FC = () =>{
    const { enqueueSnackbar } = useSnackbar();
    const [successEmail, setSuccessEmail] = useState('');
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
                                          errors={responseSignUp.data?.accountRegister.accountErrors}
                                          loading={false}/>
            }
        </div>
    );
};

export default SignUpPage;