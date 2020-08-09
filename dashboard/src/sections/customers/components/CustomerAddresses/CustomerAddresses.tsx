import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AddressFormatter from "@temp/components/AddressFormatter";
import CardTitle from "@temp/components/CardTitle";
import { buttonMessages } from "@temp/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe } from "@temp/misc";
import { CustomerDetails_user } from "../../types/CustomerDetails";

const useStyles = makeStyles(
  theme => ({
    label: {
      fontWeight: 600,
      marginBottom: theme.spacing(1)
    }
  }),
  { name: "CustomerAddresses" }
);

export interface CustomerAddressesProps {
  customer: CustomerDetails_user;
  disabled: boolean;
  onAddressManageClick: () => void;
}

const CustomerAddresses: React.FC<CustomerAddressesProps> = props => {
  const { customer, disabled, onAddressManageClick } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({id: "address_information",
          defaultMessage: "Address Information",
          description: "header"
        })}
        toolbar={
          <Button
            color="primary"
            disabled={disabled}
            variant="text"
            onClick={onAddressManageClick}
          >
            <FormattedMessage {...buttonMessages.manage} />
          </Button>
        }
      />
      {maybe(() => customer.defaultShippingAddress.id) ? (
        <>
          {maybe(() => customer.defaultShippingAddress) && (
            <CardContent>
              <Typography className={classes.label}>
                <FormattedMessage id="shipping_address"
                  defaultMessage="Shipping Address"
                  description="subsection header"
                />
              </Typography>
              <AddressFormatter
                address={maybe(() => customer.defaultShippingAddress)}
              />
            </CardContent>
          )}
        </>
      ) :
        <CardContent>
          <Typography>
            <FormattedMessage id="customer_has_no_addresses_yet" defaultMessage="This customer has no addresses yet" />
          </Typography>

        </CardContent>
      }
    </Card>
  );
};
CustomerAddresses.displayName = "CustomerAddresses";
export default CustomerAddresses;
