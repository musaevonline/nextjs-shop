import React, {useEffect} from "react";
import {useMutation} from "@apollo/react-hooks";
import {ConfirmAccount, ConfirmAccountVariables} from "@sdk/mutations/types/ConfirmAccount";
import {confirmAccountMutation} from "@sdk/mutations/user";
import {Redirect} from "react-router-dom";
import {useSnackbar} from "notistack";
import {BASE_URL} from "@temp/core/config";
import {useUrlQuery} from "@temp/core/utils";

const SignUpConfirmView:React.FC = ()=>{
    const {enqueueSnackbar} = useSnackbar();
    const query = useUrlQuery();
    const token = query.get('token');
    const email = query.get('email');
    const [confirmAccount] = useMutation<ConfirmAccount, ConfirmAccountVariables>(confirmAccountMutation);

    useEffect(() => {
        handleConfirmAccount()
    }, [token]);

    const handleConfirmAccount = () => {
        confirmAccount({
            variables:{
                email,
                token
            }
        })
            .then(res => {
                const data = res.data.confirmAccount;
                const errors = data.accountErrors;
                if (!errors?.length){
                    enqueueSnackbar("Ваш аккаунт успешно подтвержден!", {
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
    return(
        <>
            <Redirect to={BASE_URL}/>
        </>
    );
};

export default SignUpConfirmView;