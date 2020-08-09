import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Form from "@temp/components/Form";
import { FormSpacer } from "@temp/components/FormSpacer";
import SingleSelectField from "@temp/components/SingleSelectField";
import {buttonMessages, commonMessages} from "@temp/intl";
import { ShopErrorFragment } from "@temp/sections/siteSettings/types/ShopErrorFragment";
import { DialogProps } from "@temp/types";
import { getFormErrors } from "@temp/utils/errors";
import getShopErrorMessage from "@temp/utils/errors/shop";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { authorizationKeyTypes } from "@temp/misc";
import { AuthorizationKeyType } from "@temp/types/globalTypes";

export interface SiteSettingsKeyDialogForm {
  key: string;
  password: string;
  type: AuthorizationKeyType;
}

export interface SiteSettingsKeyDialogProps extends DialogProps {
  errors: ShopErrorFragment[];
  initial: SiteSettingsKeyDialogForm;
  onSubmit: (data: SiteSettingsKeyDialogForm) => void;
}

const SiteSettingsKeyDialog: React.FC<SiteSettingsKeyDialogProps> = ({
  errors,
  initial,
  open,
  onClose,
  onSubmit
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["keyType", "key", "password"], errors);

  return (
    <Dialog onClose={onClose} maxWidth="xs" fullWidth open={open}>
      <Form initial={initial} onSubmit={onSubmit}>
        {({ change, data }) => (
          <>
            <DialogTitle>
              <FormattedMessage id="add_new_authorization_key"
                defaultMessage="Add New Authorization Key"
                description="dialog header"
              />
            </DialogTitle>
            <DialogContent>
              <SingleSelectField
                choices={Object.keys(authorizationKeyTypes).map(key => ({
                  label: authorizationKeyTypes[key],
                  value: key
                }))}
                error={!!formErrors.keyType}
                label={intl.formatMessage({id: "authorization_type",
                  defaultMessage: "Authentication type",
                  description: "authentication provider name"
                })}
                hint={getShopErrorMessage(formErrors.keyType, intl)}
                name="type"
                onChange={change}
                value={data.type}
              />
              <FormSpacer />
              <TextField
                error={!!formErrors.key}
                fullWidth
                label={intl.formatMessage({id: "key",
                  defaultMessage: "Key",
                  description: "authentication provider API key"
                })}
                helperText={getShopErrorMessage(formErrors.key, intl)}
                name="key"
                onChange={change}
                value={data.key}
              />
              <FormSpacer />
              <TextField
                error={!!formErrors.password}
                fullWidth
                label={intl.formatMessage(commonMessages.password)}
                helperText={getShopErrorMessage(formErrors.password, intl)}
                name="password"
                onChange={change}
                value={data.password}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>
                <FormattedMessage {...buttonMessages.back} />
              </Button>
              <Button color="primary" type="submit" variant="contained">
                <FormattedMessage id="add_authentication"
                  defaultMessage="Add authentication"
                  description="button"
                />
              </Button>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};
SiteSettingsKeyDialog.displayName = "SiteSettingsKeyDialog";
export default SiteSettingsKeyDialog;
