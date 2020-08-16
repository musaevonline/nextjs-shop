import React, {useContext} from "react";
import Page from "./Page";
import {useMutation} from "@apollo/client";
import {AccountUpdate, AccountUpdateVariables} from "@sdk/mutations/types/AccountUpdate";
import {accountEmailChangeMutation, accountPasswordChangeMutation, accountUpdateMutation} from "@sdk/mutations/user";
import {AccountUpdateFormData} from "@temp/components/Forms/AccountUpdateForm/AccountUpdateForm";
import {UserContext} from "@temp/components/User/context";
import {AccountPasswordChange, AccountPasswordChangeVariables} from "@sdk/mutations/types/AccountPasswordChange";
import {AccountPasswordFormData} from "@temp/components/Forms/AccountPasswordForm/AccountPasswordForm";
import {useSnackbar} from "notistack";
import {AccountEmailChange, AccountEmailChangeVariables} from "@sdk/mutations/types/AccountEmailChange";
import {AccountEmailFormData} from "@temp/components/Forms/AccountEmailForm/AccountEmailForm";
import {CONFIRM_EMAIL_CHANGE_REDIRECT_URL} from "@temp/core/constants";

const View:React.FC = () => {
    const user = useContext(UserContext);
    const {enqueueSnackbar} = useSnackbar();
    const [accountUpdate, responseAccountUpdate] = useMutation<AccountUpdate, AccountUpdateVariables>(accountUpdateMutation);
    const [passwordChange, responsePasswordChange] = useMutation<AccountPasswordChange, AccountPasswordChangeVariables>(accountPasswordChangeMutation);
    const [emailChange, responseEmailChange] = useMutation<AccountEmailChange, AccountEmailChangeVariables>(accountEmailChangeMutation);

    const onSubmitAccount = async (values:AccountUpdateFormData) => {
        const response = await accountUpdate({
            variables:{
                input:{
                    firstName: values.firstName,
                    lastName: values.lastName
                }
            }
        });
        const errors = response.data.accountUpdate.accountErrors;
        if (!errors.length){
            user.updateUser(response.data.accountUpdate.user);
            enqueueSnackbar("Данные успешно изменены", {variant: "success"})
        }
    };
    const onSubmitPasswordChange = async (values:AccountPasswordFormData, resetForm) => {
        const response = await passwordChange({
            variables:{
                oldPassword: values.oldPassword,
                newPassword: values.newPassword
            }
        });
        const errors = response.data.passwordChange.accountErrors;
        if (!errors.length){
            resetForm();
            enqueueSnackbar("Пароль успешно изменен", {variant: "success"})
        }
    };
    const onSubmitEmailChange = async (values:AccountEmailFormData, resetForm) => {
        const response = await emailChange({
            variables:{
                newEmail: values.newEmail,
                password: values.password,
                redirectUrl: CONFIRM_EMAIL_CHANGE_REDIRECT_URL
            }
        });
        const errors = response.data.requestEmailChange.accountErrors;
        if (!errors.length){
            resetForm();
            enqueueSnackbar("Вам на текущий email отправлена инструкция для подтверждения", {variant: "success"})
        }
    };

    const accountUpdateInitialData:AccountUpdateFormData = {
        firstName: user.user?.firstName || "",
        lastName: user.user?.lastName || ""
    };

    return(
        <>
            {!user.loading &&
            <Page onSubmitAccount={onSubmitAccount}
                  accountUpdateLoading={responseAccountUpdate.loading}
                  accountUpdateErrors={responseAccountUpdate.data?.accountUpdate.accountErrors}
                  accountUpdateInitialData={accountUpdateInitialData}
                  onSubmitPasswordChange={onSubmitPasswordChange}
                  passwordChangeLoading={responsePasswordChange.loading}
                  passwordChangeErrors={responsePasswordChange.data?.passwordChange.accountErrors}
                  onSubmitEmailChange={onSubmitEmailChange}
                  emailChangeLoading={responseEmailChange.loading}
                  emailChangeErrors={responseEmailChange.data?.requestEmailChange.accountErrors}
            />
            }
        </>
    );
};

export default View;