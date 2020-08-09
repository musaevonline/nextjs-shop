import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@temp/components/CardTitle";
import Grid from "@temp/components/Grid";
import Hr from "@temp/components/Hr";
import { AccountErrorFragment } from "@temp/sections/customers/types/AccountErrorFragment";
import { commonMessages } from "@temp/intl";
import { getFormErrors } from "@temp/utils/errors";
import getAccountErrorMessage from "@temp/utils/errors/account";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const useStyles = makeStyles(
  theme => ({
    content: {
      paddingTop: theme.spacing(2)
    },
    hr: {
      margin: theme.spacing(3, 0)
    },
    sectionHeader: {
      marginBottom: theme.spacing()
    }
  }),
  { name: "CustomerInfo" }
);

export interface CustomerInfoProps {
  data: {
    firstName: string;
    lastName: string;
    email: string;
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const CustomerInfo: React.FC<CustomerInfoProps> = props => {
  const { data, disabled, errors, onChange } = props;

  const classes = useStyles(props);
  const intl = useIntl();

  const formErrors = getFormErrors(["firstName", "lastName", "email"], errors);

  return (
    <Card>
      <CardTitle
        title={
          <FormattedMessage id="personal_information"
            defaultMessage="Personal Information"
            description="customer information, header"
          />
        }
      />
      <CardContent className={classes.content}>
        <Typography className={classes.sectionHeader}>
          <FormattedMessage {...commonMessages.generalInformation} />
        </Typography>
        <Grid variant="uniform">
          <TextField
            disabled={disabled}
            error={!!formErrors.firstName}
            fullWidth
            helperText={getAccountErrorMessage(formErrors.firstName, intl)}
            name="firstName"
            type="text"
            label={intl.formatMessage(commonMessages.firstName)}
            value={data.firstName}
            onChange={onChange}
          />
          <TextField
            disabled={disabled}
            error={!!formErrors.lastName}
            fullWidth
            helperText={getAccountErrorMessage(formErrors.lastName, intl)}
            name="lastName"
            type="text"
            label={intl.formatMessage(commonMessages.lastName)}
            value={data.lastName}
            onChange={onChange}
          />
        </Grid>
        <Hr className={classes.hr} />
        <Typography className={classes.sectionHeader}>
          <FormattedMessage id="contact_information"
            defaultMessage="Contact Information"
            description="customer contact section, header"
          />
        </Typography>
        <TextField
          disabled={disabled}
          error={!!formErrors.email}
          fullWidth
          helperText={getAccountErrorMessage(formErrors.email, intl)}
          name="email"
          type="email"
          label={intl.formatMessage(commonMessages.email)}
          value={data.email}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
CustomerInfo.displayName = "CustomerInfo";
export default CustomerInfo;
