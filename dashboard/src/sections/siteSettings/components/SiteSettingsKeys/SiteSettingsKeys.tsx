import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import CardTitle from "@temp/components/CardTitle";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { authorizationKeyTypes, maybe, renderCollection } from "@temp/misc";
import { ICON_BUTTON_SIZE } from "@temp/theme";
import { AuthorizationKeyType } from "@temp/types/globalTypes";
import { SiteSettings_shop_authorizationKeys } from "../../types/SiteSettings";

const useStyles = makeStyles(
  theme => ({
    iconCell: {
      "&:last-child": {
        paddingRight: 0
      },
      width: ICON_BUTTON_SIZE + theme.spacing(0.5)
    }
  }),
  { name: "SiteSettingsKeys" }
);

interface SiteSettingsKeysProps {
  disabled: boolean;
  keys: SiteSettings_shop_authorizationKeys[];
  onAdd: () => void;
  onRemove: (name: AuthorizationKeyType) => void;
}

const SiteSettingsKeys: React.FC<SiteSettingsKeysProps> = props => {
  const { disabled, keys, onAdd, onRemove } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({id: "authentication_keys",
          defaultMessage: "Authentication Keys",
          description: "section header"
        })}
        toolbar={
          <Button
            color="primary"
            disabled={disabled}
            variant="text"
            onClick={onAdd}
          >
            <FormattedMessage id="add_key" defaultMessage="Add key" description="button" />
          </Button>
        }
      />
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormattedMessage id="authentication_type"
                defaultMessage="Authentication Type"
                description="authentication provider name"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage id="key"
                defaultMessage="Key"
                description="authentication provider API key"
              />
            </TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {renderCollection(
            keys,
            key => (
              <TableRow hover={!(disabled || !key)} key={maybe(() => key.name)}>
                <TableCell>
                  {maybe<React.ReactNode>(
                    () => authorizationKeyTypes[key.name],
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell>
                  {maybe<React.ReactNode>(() => key.key, <Skeleton />)}
                </TableCell>
                <TableCell className={classes.iconCell}>
                  <IconButton onClick={() => onRemove(key.name)}>
                    <DeleteIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={3}>
                  <FormattedMessage id="no_keys"
                    defaultMessage="No keys"
                    description="no authentication provider API keys"
                  />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
SiteSettingsKeys.displayName = "SiteSettingsKeys";
export default SiteSettingsKeys;
