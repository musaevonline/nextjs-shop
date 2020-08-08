import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { commonMessages } from "@temp/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import {useFormik} from "formik";

const useStyles = makeStyles(
    theme => ({
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
        name: "ResetPasswordPage"
    }
);

export interface ResetPasswordPageFormData {
    email: string;
}
export interface ResetPasswordPageProps {
    disabled: boolean;
    error: string;
    onSubmit: (data: ResetPasswordPageFormData) => void;
}

const ResetPasswordPage: React.FC<ResetPasswordPageProps> = props => {
    const { disabled, error, onSubmit } = props;

    const classes = useStyles(props);
    const intl = useIntl();

    const form = useFormik({
        enableReinitialize: true,
        initialValues: {email: ""},
        onSubmit: values => {
            onSubmit(values);
        }
    })

    return (
        <form onSubmit={form.handleSubmit}>
            <>
                {!!error && (
                    <div className={classes.panel}>
                        <Typography variant="caption" className={classes.errorText}>
                            {error}
                        </Typography>
                    </div>
                )}
                <Typography>
                    <FormattedMessage id="forgot_password" defaultMessage="Forgot your password? Don't worry, we'll reset it for you." />
                </Typography>
                <TextField
                    autoFocus
                    disabled={disabled}
                    fullWidth
                    autoComplete="username"
                    label={intl.formatMessage(commonMessages.email)}
                    name="email"
                    onChange={form.handleChange}
                    value={form.values.email}
                    inputProps={{
                        "data-tc": "email"
                    }}
                />
                <Button
                    className={classes.submit}
                    color="primary"
                    disabled={disabled}
                    variant="contained"
                    type="submit"
                >
                    <FormattedMessage
                        id="send_instructions"
                        defaultMessage="Send Instructions"
                        description="password reset, button"
                    />
                </Button>
            </>
        </form>
    );
};

ResetPasswordPage.displayName = "ResetPasswordPage";
export default ResetPasswordPage;
