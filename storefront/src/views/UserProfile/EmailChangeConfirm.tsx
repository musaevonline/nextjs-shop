import React, {useContext, useEffect} from "react";
import {useSnackbar} from "notistack";
import {useUrlQuery} from "@temp/core/utils";
import {useMutation} from "@apollo/client";
import {confirmEmailChangeMutation} from "@sdk/mutations/user";
import {ConfirmEmailChange, ConfirmEmailChangeVariables} from "@sdk/mutations/types/ConfirmEmailChange";
import {Redirect} from "react-router-dom";
import {userProfileSettingsUrl} from "@temp/app/routes";
import {UserContext} from "@temp/components/User/context";

const EmailChangeConfirm:React.FC = () => {
    const {enqueueSnackbar} = useSnackbar();
    const query = useUrlQuery();
    const token = query.get('token');
    const user = useContext(UserContext);
    const [confirm] = useMutation<ConfirmEmailChange, ConfirmEmailChangeVariables>(confirmEmailChangeMutation);

    useEffect(() => {
        handleConfirm()
    }, [token]);

    const handleConfirm = () => {
        confirm({
            variables:{
                token
            }
        })
            .then(res => {
                const data = res.data.confirmEmailChange;
                const errors = data.accountErrors;
                if (!errors?.length){
                    user.logout();
                    enqueueSnackbar("Ваш email успешно изменен! Войдите в аккаунт с новыми данными", {
                        variant: "success"
                    });
                }else{
                    enqueueSnackbar("Токен недействителен или истек срок действия", {
                        variant: "error"
                    });
                }
            })
            .catch(err => {
                enqueueSnackbar(err.message, {
                    variant: "error"
                })
            })
    };

    return <>
        <Redirect to={userProfileSettingsUrl}/>
    </>
};

export default EmailChangeConfirm;