import React, {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {forgotPasswordMutation} from "@sdk/mutations/user";
import {useSnackbar} from "notistack";
import {ForgotPassword, ForgotPasswordVariables} from "@sdk/mutations/types/ForgotPassword";
import {RESET_PASSWORD_REDIRECT_URL} from "@temp/core/constants";
import {ForgotPasswordForm} from "@temp/components/Forms/ForgotPasswordForm";
import {ForgotPasswordFormData} from "@temp/components/Forms/ForgotPasswordForm/ForgotPasswordForm";
import AngelLeftIcon from "@temp/icons/AngelLeftIcon";
import {IconButton} from "@material-ui/core";

const ForgotPasswordPage:React.FC<{
    back: () => void
}> = ({ back }) =>{
    const { enqueueSnackbar } = useSnackbar();
    const [successEmail, setSuccessEmail] = useState('');
    const [forgotPassword, forgotPasswordData] = useMutation<ForgotPassword, ForgotPasswordVariables>(forgotPasswordMutation);

    useEffect(() =>{
        setSuccessEmail('');
    }, []);

    const onSubmit = async (values: ForgotPasswordFormData) => {
        try {
            const response = await forgotPassword({
                variables: {
                    email: values.email,
                    redirectUrl: RESET_PASSWORD_REDIRECT_URL
                }
            });
            const errors = response.data?.requestPasswordReset.accountErrors || [];
            if (errors.length == 0){
                setSuccessEmail(values.email);
            }
        }catch (e) {
            enqueueSnackbar(e.message, {
                variant:"error"
            })
        }

    };
    return(
        <div id="forgot-password-page">
            <div className="my-10">
                <IconButton size="small"
                            onClick={back}
                            title={"Назад"}
                >
                    <AngelLeftIcon fillRule="evenodd" clipRule="evenodd"/>
                </IconButton>
            </div>
            {!!successEmail && <div>На ваш email <span className="font-medium">{successEmail}</span> отправлена инструкция для сброса пароля.</div>}
            {!successEmail &&
            <ForgotPasswordForm onSubmit={onSubmit}
                                loading={forgotPasswordData.loading}
                                errors={forgotPasswordData.data?.requestPasswordReset.accountErrors}
            />
            }
        </div>
    );
};

export default ForgotPasswordPage;