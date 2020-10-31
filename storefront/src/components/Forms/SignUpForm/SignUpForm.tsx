import React, {useEffect, useState} from "react";
import * as yup from 'yup';
import {useFormik} from "formik";
import TextField from "@material-ui/core/TextField";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from "@material-ui/core/Button";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Alert} from "@material-ui/lab";
import {AccountRegister_accountRegister_accountErrors} from "@sdk/mutations/types/AccountRegister";

const IS_REQUIRED_TEXT = 'Обязательно для заполнения';
const PASSWORDS_NOT_MATCH = 'Пароли не совпадают';

export type SignUpFormData = {
  email: string,
  password: string,
  confirmPassword: string
}

const schema = yup.object().shape({
  email: yup.string()
      .email('E-mail не валидный')
      .required(IS_REQUIRED_TEXT),
  password: yup.string()
      .required(IS_REQUIRED_TEXT),
  confirmPassword: yup.string()
      .required(IS_REQUIRED_TEXT)
      .oneOf([yup.ref('password'), null], PASSWORDS_NOT_MATCH)
});

const SignUpForm:React.FC<{
  onSubmit: (values: SignUpFormData) => void,
  errors: AccountRegister_accountRegister_accountErrors[] | null,
  initialValues?: SignUpFormData | null,
  loading: boolean
}> = ({onSubmit, errors, loading, initialValues}) =>{
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialValues || {
      email: '',
      password: '',
      confirmPassword: '',
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
                   fullWidth
        />
        <TextField name="confirmPassword"
                   margin="dense"
                   helperText={(form.touched.confirmPassword && form.errors.confirmPassword)}
                   error={!!(form.touched.confirmPassword && form.errors.confirmPassword)}
                   onChange={form.handleChange}
                   value={form.values.confirmPassword}
                   onBlur={form.handleBlur}
                   required={true}
                   type={showConfirmPassword ? "text" : "password"}
                   variant="outlined"
                   label="Повторите пароль"
                   InputProps={{
                     endAdornment:
                         <InputAdornment position="end">
                           <IconButton
                               aria-label="toggle password visibility"
                               onClick={e => {setShowConfirmPassword(prev => !prev)}}
                           >
                             {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
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
            Создать аккаунт
          </Button>
        </div>

      </form>
  )
};

export default SignUpForm;