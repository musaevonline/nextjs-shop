import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@temp/components/CardTitle";
import { FormSpacer } from "@temp/components/FormSpacer";
import { AccountErrorFragment } from "@temp/sections/customers/types/AccountErrorFragment";
import { getFormErrors } from "@temp/utils/errors";
import getAccountErrorMessage from "@temp/utils/errors/account";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

export interface CustomerCreateNoteProps {
  data: {
    note: string;
  };
  disabled: boolean;
  errors: AccountErrorFragment[];
  onChange: (event: React.ChangeEvent<any>) => void;
}

const CustomerCreateNote: React.FC<CustomerCreateNoteProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["note"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({id: "notes",
          defaultMessage: "Notes",
          description: "notes about customer header"
        })}
      />
      <CardContent>
        <Typography>
          <FormattedMessage id="enter_information_for_customer" defaultMessage="Enter any extra information regarding this customer." />
        </Typography>
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.note}
          fullWidth
          multiline
          name="note"
          helperText={getAccountErrorMessage(formErrors.note, intl)}
          label={intl.formatMessage({id: "note",
            defaultMessage: "Note",
            description: "note about customer"
          })}
          value={data.note}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
CustomerCreateNote.displayName = "CustomerCreateNote";
export default CustomerCreateNote;
