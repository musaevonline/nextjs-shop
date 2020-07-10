import React, {useEffect} from "react";
import * as yup from 'yup';
import {useFormik} from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Alert} from "@material-ui/lab";
import {ForgotPassword_requestPasswordReset_accountErrors} from "@sdk/mutations/types/ForgotPassword";

const IS_REQUIRED_TEXT = 'Обязательно для заполнения';

export type ForgotPasswordFormData = {
    email: string
}

const schema = yup.object().shape({
    email: yup.string()
        .email('E-mail не валидный')
        .required(IS_REQUIRED_TEXT)
});

const ForgotPasswordForm:React.FC<{
    onSubmit: (values: ForgotPasswordFormData) => void,
    errors: ForgotPassword_requestPasswordReset_accountErrors[] | null,
    loading: boolean
}> = ({onSubmit, errors, loading}) =>{
    const form = useFormik({
        initialValues:{
            email: ''
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
            <TextField name="email"
                       helperText={(form.touched.email && form.errors.email)}
                       error={!!(form.touched.email && form.errors.email)}
                       onChange={form.handleChange}
                       value={form.values.email}
                       onBlur={form.handleBlur}
                       required={true}
                       variant="outlined"
                       margin="dense"
                       label="Email"
                       fullWidth
            />
            <div className="mt-10">
                <Button disabled={!form.isValid || !form.dirty || loading}
                        variant="contained"
                        color="primary"
                        type="submit"
                        fullWidth
                >
                    Отправить инструкцию
                </Button>
            </div>

        </form>
    )
};

export default ForgotPasswordForm;