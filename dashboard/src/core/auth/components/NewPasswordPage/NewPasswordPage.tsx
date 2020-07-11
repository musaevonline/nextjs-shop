import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {SetPassword_setPassword_accountErrors} from "@temp/core/auth/types/SetPassword";
import getAccountErrorMessage from "@temp/utils/errors/account";
import React, {useEffect} from "react";
import {FormattedMessage, IntlShape, useIntl} from "react-intl";
import {commonMessages, formMessages} from '@temp/intl';
import * as yup from 'yup';
import {useFormik} from "formik";

const useStyles = makeStyles(theme => ({
        errorText: {
            color: theme.palette.error.contrastText
        },
        panel: {
            background: theme.palette.error.main,
            borderRadius: theme.spacing(),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(1.5)
        },
        submit: {
            width: "100%"
        }
    }),
    {
        name: "NewPasswordPage"
    }
);

const createSchema = (intl: IntlShape) => yup.object().shape({
    password: yup.string()
        .required(intl.formatMessage(formMessages.requiredField))
        .min(8, intl.formatMessage(formMessages.minLength8)),
    confirmPassword: yup.string()
        .required(intl.formatMessage(formMessages.requiredField))
        .oneOf([yup.ref('password'), null], intl.formatMessage(formMessages.passwordsNotMatch))
});

export interface NewPasswordPageFormData {
    password: string;
    confirmPassword: string;
}
export interface NewPasswordPageProps {
    disabled: boolean;
    errors: SetPassword_setPassword_accountErrors[];
    onSubmit: (data: NewPasswordPageFormData) => void;
}

const NewPasswordPage: React.FC<NewPasswordPageProps> = props => {
    const { disabled, onSubmit, errors } = props;
    const classes = useStyles(props);
    const intl = useIntl();
    const errorToken = getAccountErrorMessage(
        errors.find(err => err.field === "token"),
        intl
    );
    const errorEmail = getAccountErrorMessage(
        errors.find(err => err.field === "email"),
        intl
    );
    const schema = createSchema(intl);

    const form = useFormik({
        initialValues:{
            password: "",
            confirmPassword: ""
        },
        validationSchema: schema,
        onSubmit: values => {
            onSubmit(values);
        }
    });
    useEffect(() => {
        if (!!errors?.length) {
            const formErrors = {};
            errors.forEach(err => {
                formErrors[err.field] = err.message
            })
            form.setErrors(formErrors);
        }
    }, [errors]);

    return (
        <form onSubmit={form.handleSubmit}>
            <>
                {(!!errorToken || !!errorEmail) && (
                    <div className={classes.panel}>
                        <Typography variant="caption" className={classes.errorText}>
                            {errorToken}
                        </Typography>
                        <Typography variant="caption" className={classes.errorText}>
                            {errorEmail}
                        </Typography>
                    </div>
                )}
                <Typography>
                    <FormattedMessage id="setup_new_password" defaultMessage="Please, setup new password." />
                </Typography>
                <TextField
                    autoFocus
                    autoComplete="none"
                    disabled={disabled}
                    label={intl.formatMessage(commonMessages.newPassword)}
                    name="password"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    type="password"
                    value={form.values.password}
                    error={!!(form.dirty && form.touched.password && form.errors.password)}
                    helperText={form.dirty && form.touched.password && form.errors.password}
                    inputProps={{
                        "data-tc": "password"
                    }}
                />
                <TextField
                    fullWidth
                    autoComplete="none"
                    disabled={disabled}
                    label={intl.formatMessage(commonMessages.confirmPassword)}
                    name="confirmPassword"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    type="password"
                    value={form.values.confirmPassword}
                    error={!!(form.dirty && form.touched.confirmPassword && form.errors.confirmPassword)}
                    helperText={form.dirty && form.touched.confirmPassword && form.errors.confirmPassword}
                    inputProps={{
                        "data-tc": "confirm-password"
                    }}
                />
                <Button
                    className={classes.submit}
                    color="primary"
                    disabled={!form.isValid || disabled}
                    variant="contained"
                    type="submit"
                >
                    <FormattedMessage {...formMessages.setNewPassword} description="button"/>
                </Button>
            </>
        </form>
    );
};

NewPasswordPage.displayName = "NewPasswordPage";
export default NewPasswordPage;
