import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@temp/components/CardTitle";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface StaffPasswordProps {
  onChangePassword: () => void;
}

const StaffPassword: React.FC<StaffPasswordProps> = ({ onChangePassword }) => {
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({id: "password",
          defaultMessage: "Password",
          description: "header"
        })}
        toolbar={
          <Button color="primary" onClick={onChangePassword}>
            <FormattedMessage id="change_your_password"
              defaultMessage="Change your password"
              description="button"
            />
          </Button>
        }
      />
      <CardContent>
        <Typography>
          <FormattedMessage id="you_should_change_password_every_month"
                            defaultMessage="You should change your password every month to avoid security issues." />
        </Typography>
      </CardContent>
    </Card>
  );
};

StaffPassword.displayName = "StaffPassword";
export default StaffPassword;
