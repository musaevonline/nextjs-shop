import React from "react";
import {AccountUpdateForm} from "@temp/components/Forms/AccountUpdateForm";
import {AccountUpdate_accountUpdate_accountErrors} from "@sdk/mutations/types/AccountUpdate";
import {AccountUpdateFormData} from "@temp/components/Forms/AccountUpdateForm/AccountUpdateForm";
import {Typography} from "@material-ui/core";
import {AccountPasswordFormData} from "@temp/components/Forms/AccountPasswordForm/AccountPasswordForm";
import {AccountPasswordChange_passwordChange_accountErrors} from "@sdk/mutations/types/AccountPasswordChange";
import {AccountPasswordForm} from "@temp/components/Forms/AccountPasswordForm";
import {AccountEmailForm} from "@temp/components/Forms/AccountEmailForm";
import {AccountEmailFormData} from "@temp/components/Forms/AccountEmailForm/AccountEmailForm";
import {AccountEmailChange_requestEmailChange_accountErrors} from "@sdk/mutations/types/AccountEmailChange";
import {makeStyles} from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles(theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
        "& > div":{
            width: 300,
            marginRight: 24,
            marginBottom: 24
        },
        [theme.breakpoints.down("sm")]: {
            justifyContent: "center",
            "& > div":{
                width: "100%",
                marginRight: 0
            },
        }
    }
}));

interface PageProps {
    onSubmitAccount: (values: AccountUpdateFormData) => void,
    accountUpdateErrors: AccountUpdate_accountUpdate_accountErrors[] | null,
    accountUpdateLoading: boolean,
    accountUpdateInitialData: AccountUpdateFormData,
    onSubmitPasswordChange: (values: AccountPasswordFormData, resetForm: () => void) => void,
    passwordChangeErrors: AccountPasswordChange_passwordChange_accountErrors[] | null,
    passwordChangeLoading: boolean,
    onSubmitEmailChange: (values: AccountEmailFormData, resetForm: () => void) => void,
    emailChangeErrors: AccountEmailChange_requestEmailChange_accountErrors[] | null,
    emailChangeLoading: boolean,
}

const Page:React.FC<PageProps> = ({
                                      onSubmitAccount, accountUpdateLoading,
                                      accountUpdateErrors,
                                      accountUpdateInitialData, onSubmitPasswordChange,
                                      passwordChangeErrors,
                                      passwordChangeLoading, onSubmitEmailChange,
                                      emailChangeErrors,
                                      emailChangeLoading

                                  }) => {

    const classes = useStyles();

    return(
        <div>
            <div className="mb-20">
                <Typography variant="h4">Личные данные</Typography>
            </div>
            <div className={classes.container}>
                <div>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" className="pb-10">Личные данные</Typography>
                            <AccountUpdateForm onSubmit={onSubmitAccount}
                                               loading={accountUpdateLoading}
                                               errors={accountUpdateErrors}
                                               initialData={accountUpdateInitialData}
                            />
                        </CardContent>
                    </Card>

                </div>

                <div>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" className="pb-10">Изменить пароль</Typography>
                            <AccountPasswordForm onSubmit={onSubmitPasswordChange}
                                                 loading={passwordChangeLoading}
                                                 errors={passwordChangeErrors}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" className="pb-10">Изменить email</Typography>
                            <AccountEmailForm onSubmit={onSubmitEmailChange}
                                              loading={emailChangeLoading}
                                              errors={emailChangeErrors}
                            />
                        </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    );
};

export default Page;