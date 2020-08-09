import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import AddressFormatter from "@temp/components/AddressFormatter";
import CardMenu from "@temp/components/CardMenu";
import CardTitle from "@temp/components/CardTitle";
import Skeleton from "@temp/components/Skeleton";
import { buttonMessages } from "@temp/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { AddressTypeEnum } from "@temp/types/globalTypes";
import { CustomerAddresses_user_addresses } from "../../types/CustomerAddresses";

export interface CustomerAddressProps {
  address: CustomerAddresses_user_addresses;
  disabled: boolean;
  isDefaultShippingAddress: boolean;
  addressNumber: number;
  onEdit: () => void;
  onRemove: () => void;
  onSetAsDefault: (type: AddressTypeEnum) => void;
}

const useStyles = makeStyles(
  {
    actions: {
      flexDirection: "row"
    },
    actionsContainer: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
      justifyContent: "flex-end"
    },
    card: {
      display: "flex",
      flexDirection: "column"
    }
  },
  { name: "CustomerAddress" }
);
const CustomerAddress: React.FC<CustomerAddressProps> = props => {
  const {
    address,
    disabled,
    isDefaultShippingAddress,
    onEdit,
    onRemove,
    onSetAsDefault
  } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Card className={classes.card}>
      <CardTitle
        title={
          address ? (
            <>
              {isDefaultShippingAddress
                ? intl.formatMessage({id: "default_address",
                    defaultMessage: "Default Address"
                  })
                : null}
            </>
          ) : (
            <Skeleton />
          )
        }
        height="const"
        toolbar={
          <CardMenu
            disabled={disabled}
            menuItems={[
              {
                label: intl.formatMessage({id: "set_as_default_shipping_address",
                  defaultMessage: "Set as default shipping address",
                  description: "button"
                }),
                onSelect: () => onSetAsDefault(AddressTypeEnum.SHIPPING)
              }
            ]}
          />
        }
      />
      <CardContent>
        <AddressFormatter address={address} />
      </CardContent>
      <div className={classes.actionsContainer}>
        <CardActions className={classes.actions}>
          <Button color="primary" disabled={disabled} onClick={onEdit}>
            <FormattedMessage {...buttonMessages.edit} />
          </Button>
          <Button color="primary" disabled={disabled} onClick={onRemove}>
            <FormattedMessage {...buttonMessages.delete} />
          </Button>
        </CardActions>
      </div>
    </Card>
  );
};
CustomerAddress.displayName = "CustomerAddress";
export default CustomerAddress;
