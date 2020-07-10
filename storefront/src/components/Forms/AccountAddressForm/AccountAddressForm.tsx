import React, {useEffect} from "react";
import * as yup from 'yup';
import {useFormik} from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Alert} from "@material-ui/lab";
import {Grid} from "@material-ui/core";

const IS_REQUIRED_TEXT = 'Обязательно для заполнения';

export type AccountAddressFormData = {
    firstName: string,
    lastName: string,
    companyName: string,
    streetAddress1: string,
    city: string,
    postalCode: string,
    phone: string
}

const schema = yup.object().shape({
    firstName: yup.string().required(IS_REQUIRED_TEXT),
    lastName: yup.string().required(IS_REQUIRED_TEXT),
    companyName: yup.string(),
    streetAddress1: yup.string().required(IS_REQUIRED_TEXT),
    city: yup.string(),
    postalCode: yup.string(),
    phone: yup.string().required(IS_REQUIRED_TEXT),
});

interface Error {
    field: string,
    message: string,
    code: string
}

const AccountAddressForm:React.FC<{
    onSubmit: (values: AccountAddressFormData) => void,
    errors: Error[] | null,
    loading: boolean,
    initialData?: AccountAddressFormData | null
}> = ({onSubmit, errors, loading, initialData}) =>{

    const form = useFormik({
        initialValues: initialData || {
            firstName: "",
            lastName: "",
            companyName: "",
            streetAddress1: "",
            city: "",
            postalCode: "",
            phone: "",
        },
        validationSchema:schema,
        onSubmit: values => {
            onSubmit(values);
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
            <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                    <TextField name="firstName"
                               margin="dense"
                               helperText={(form.touched.firstName && form.errors.firstName)}
                               error={!!(form.touched.firstName && form.errors.firstName)}
                               onChange={form.handleChange}
                               value={form.values.firstName}
                               onBlur={form.handleBlur}
                               required={true}
                               variant="outlined"
                               label="Имя"
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="lastName"
                               margin="dense"
                               helperText={(form.touched.lastName && form.errors.lastName)}
                               error={!!(form.touched.lastName && form.errors.lastName)}
                               onChange={form.handleChange}
                               value={form.values.lastName}
                               onBlur={form.handleBlur}
                               required={true}
                               variant="outlined"
                               label="Фамилия"
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="streetAddress1"
                               margin="dense"
                               helperText={(form.touched.streetAddress1 && form.errors.streetAddress1)}
                               error={!!(form.touched.streetAddress1 && form.errors.streetAddress1)}
                               onChange={form.handleChange}
                               value={form.values.streetAddress1}
                               onBlur={form.handleBlur}
                               required={true}
                               variant="outlined"
                               label="Адрес"
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="phone"
                               margin="dense"
                               helperText={(form.touched.phone && form.errors.phone)}
                               error={!!(form.touched.phone && form.errors.phone)}
                               onChange={form.handleChange}
                               value={form.values.phone}
                               onBlur={form.handleBlur}
                               required={true}
                               variant="outlined"
                               label="Номер телефона"
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="city"
                               margin="dense"
                               helperText={(form.touched.city && form.errors.city)}
                               error={!!(form.touched.city && form.errors.city)}
                               onChange={form.handleChange}
                               value={form.values.city}
                               onBlur={form.handleBlur}
                               variant="outlined"
                               label="Город"
                               fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField name="companyName"
                               margin="dense"
                               helperText={(form.touched.companyName && form.errors.companyName)}
                               error={!!(form.touched.companyName && form.errors.companyName)}
                               onChange={form.handleChange}
                               value={form.values.companyName}
                               onBlur={form.handleBlur}
                               variant="outlined"
                               label="Компания"
                               fullWidth
                    />
                </Grid>
            </Grid>

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

export default AccountAddressForm;