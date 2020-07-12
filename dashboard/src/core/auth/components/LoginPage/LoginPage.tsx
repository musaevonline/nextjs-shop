import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { formMessages, commonMessages } from "@temp/intl";
import React, {useEffect} from "react";
import {FormattedMessage, IntlShape, useIntl} from "react-intl";
import {useFormik} from "formik";
import * as yup from 'yup';
import {TokenAuth_tokenCreate_accountErrors} from "@temp/core/auth/types/TokenAuth";

const createSchema = (intl: IntlShape) => yup.object().shape({
    email: yup.string()
        .required(intl.formatMessage(formMessages.requiredField))
        .email(intl.formatMessage(formMessages.invalidEmail)),
    password: yup.string().required(intl.formatMessage(formMessages.requiredField))
})

export interface LoginFormData {
    email: string;
    password: string;
}

const useStyles = makeStyles(theme => ({
        buttonContainer: {
            display: "flex",
            justifyContent: "flex-end",
            marginTop: 10
        },
        link: {
            color: theme.palette.primary.main,
            cursor: "pointer",
            textAlign: "center",
            marginTop: 10
        },
        loginButton: {
            width: 140
        },
        panel: {
            "& span": {
                color: theme.palette.error.contrastText
            },
            background: theme.palette.error.main,
            borderRadius: theme.spacing(),
            padding: theme.spacing(1.5)
        }
    }),
    { name: "LoginCard" }
);

export interface LoginCardProps {
    errors?: TokenAuth_tokenCreate_accountErrors[];
    disableLoginButton: boolean;
    onPasswordRecovery: () => void;
    onSubmit?(event: LoginFormData);
}

const LoginCard: React.FC<LoginCardProps> = props => {
    const { errors, onPasswordRecovery, onSubmit } = props;
    const error = !!errors?.length;
    const classes = useStyles(props);
    const intl = useIntl();
    const schema = createSchema(intl)
    const form = useFormik({
        initialValues:{
            email: "",
            password: ""
        },
        validationSchema: schema,
        onSubmit: values => {
            onSubmit(values);
        }
    });

    useEffect(() => {}, [])

    return (
        <form onSubmit={form.handleSubmit}>
            {error && (
                <div className={classes.panel}>
                    <Typography variant="caption">
                        <FormattedMessage id="incorrect_password_username"
                                          defaultMessage="Sorry, your username and/or password are incorrect. Please try again." />
                    </Typography>
                </div>
            )}
            <TextField
                autoFocus
                fullWidth
                autoComplete="email"
                label={intl.formatMessage(commonMessages.email)}
                name="email"
                variant="outlined"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.email}
                inputProps={{
                    "data-tc": "email"
                }}
                margin="normal"
            />
            <TextField
                fullWidth
                autoComplete="password"
                label={intl.formatMessage(commonMessages.password)}
                name="password"
                variant="outlined"
                onChange={form.handleChange}
                onBlur={form.handleBlur}
                value={form.values.password}
                type="password"
                inputProps={{
                    "data-tc": "password"
                }}
            />
            <div className={classes.buttonContainer}>
                <Button
                    className={classes.loginButton}
                    color="primary"
                    disabled={form.dirty && !form.isValid}
                    variant="contained"
                    type="submit"
                    data-tc="submit"
                >
                    <FormattedMessage id="login" defaultMessage="Login" description="button" />
                </Button>
            </div>
            <Typography className={classes.link} onClick={onPasswordRecovery}>
                <FormattedMessage
                    id="reset_password"
                    defaultMessage="Reset your password"
                    description="button"
                />
            </Typography>
        </form>
    );
};
LoginCard.displayName = "LoginCard";
export default LoginCard;
