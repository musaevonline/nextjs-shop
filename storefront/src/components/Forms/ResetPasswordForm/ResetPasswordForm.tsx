import React, {useEffect, useState} from "react";
import * as yup from 'yup';
import {useFormik} from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Alert} from "@material-ui/lab";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {ResetPassword_setPassword_accountErrors} from "@sdk/mutations/types/ResetPassword";

const IS_REQUIRED_TEXT = 'Обязательно для заполнения';

export type ResetPasswordFormData = {
    password: string
}

const schema = yup.object().shape({
    password: yup.string()
        .min(8, 'Минимальная длина пароля должна быть 8 символов')
        .required(IS_REQUIRED_TEXT)
});

const ResetPasswordForm:React.FC<{
    onSubmit: (values: ResetPasswordFormData) => void,
    errors: ResetPassword_setPassword_accountErrors[] | null,
    loading: boolean
}> = ({onSubmit, errors, loading}) =>{
    const [showPassword, setShowPassword] = useState(false);

    const form = useFormik({
        initialValues:{
            password: ''
        },
        validationSchema:schema,
        onSubmit: onSubmit
    });
    useEffect(() => {
        if (errors && errors.length > 0){
            const formErrors = {};
            errors.forEach(err => {
                formErrors[err.field] = err.message
            });
            form.setErrors(formErrors);
        }
    }, [errors]);

    const formError = errors?.find(err => err.field === null);
    return(
        <form onSubmit={form.handleSubmit} className="flex flex-col">
            {formError && <Alert severity="error" className="my-5">{formError.message}</Alert>}
            <TextField name="password"
                       helperText={(form.touched.password && form.errors.password)}
                       error={!!(form.touched.password && form.errors.password)}
                       onChange={form.handleChange}
                       value={form.values.password}
                       onBlur={form.handleBlur}
                       required={true}
                       margin="dense"
                       type={showPassword ? "text" : "password"}
                       variant="outlined"
                       label="Пароль"
                       InputProps={{
                           endAdornment:
                               <InputAdornment position="end">
                                   <IconButton
                                       aria-label="toggle password visibility"
                                       onClick={e => {setShowPassword(prev => !prev)}}
                                   >
                                       {showPassword ? <Visibility /> : <VisibilityOff />}
                                   </IconButton>
                               </InputAdornment>

                       }}
            />
            <div className="mt-10">
                <Button disabled={!form.isValid || !form.dirty || loading}
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                >
                    Сохранить новый пароль
                </Button>
            </div>

        </form>
    )
};

export default ResetPasswordForm;