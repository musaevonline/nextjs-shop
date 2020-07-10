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
import {AccountEmailChange_requestEmailChange_accountErrors} from "@sdk/mutations/types/AccountEmailChange";

const IS_REQUIRED_TEXT = 'Обязательно для заполнения';

export type AccountEmailFormData = {
    newEmail: string,
    password: string
}

const schema = yup.object().shape({
    newEmail: yup.string()
        .required(IS_REQUIRED_TEXT)
        .email("Email не валидный"),
    password: yup.string()
        .required(IS_REQUIRED_TEXT)
});

const AccountEmailForm:React.FC<{
    onSubmit: (values: AccountEmailFormData, resetForm: () => void) => void,
    errors: AccountEmailChange_requestEmailChange_accountErrors[] | null,
    loading: boolean
}> = ({onSubmit, errors, loading}) =>{
    const [showPassword, setShowPassword] = useState(false);

    const form = useFormik({
        initialValues:{
            newEmail: "",
            password: ""
        },
        validationSchema:schema,
        onSubmit: values => {
            onSubmit(values, () => {form.resetForm()});
        }
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
            <TextField name="newEmail"
                       margin="dense"
                       helperText={(form.touched.newEmail && form.errors.newEmail)}
                       error={!!(form.touched.newEmail && form.errors.newEmail)}
                       onChange={form.handleChange}
                       value={form.values.newEmail}
                       onBlur={form.handleBlur}
                       required={true}
                       variant="outlined"
                       label="Новый Email"
                       fullWidth
            />
            <TextField name="password"
                       margin="dense"
                       helperText={(form.touched.password && form.errors.password)}
                       error={!!(form.touched.password && form.errors.password)}
                       onChange={form.handleChange}
                       value={form.values.password}
                       onBlur={form.handleBlur}
                       required={true}
                       type={showPassword ? "text" : "password"}
                       variant="outlined"
                       label="Ваш пароль"
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
                       fullWidth
            />
            <div className="mt-10">
                <Button disabled={!form.isValid || !form.dirty || loading}
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                >
                    Сохранить
                </Button>
            </div>

        </form>
    )
};

export default AccountEmailForm;