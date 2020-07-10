import React from 'react';
import {TextField} from "@material-ui/core";


const FormTextField = ({ form, errors={}, name, ...props })=>{
  return (
    <TextField name={name}
               helperText={(form.touched[name] && form.errors[name])}
               error={!!(form.touched[name] && form.errors[name])}
               onChange={form.handleChange}
               value={form.values[name]}
               onBlur={form.handleBlur}
               fullWidth
               {...props}
    />
  );
};

export default FormTextField;