import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CardTitle from "@temp/components/CardTitle";
import { DateTime } from "@temp/components/Date";
import Money from "@temp/components/Money";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import StatusLabel from "@temp/components/StatusLabel";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe, renderCollection, transformPaymentStatus } from "@temp/misc";
import { CustomerDetails_user_orders_edges_node } from "../../types/CustomerDetails";

const useStyles = makeStyles(
  {
    link: {
      cursor: "pointer"
    },
    textRight: {
      textAlign: "right"
    }
  },
  { name: "CustomerOrders" }
);

export interface CustomerOrdersProps {
  orders: CustomerDetails_user_orders_edges_node[];
  onViewAllOrdersClick: () => void;
  onRowClick: (id: string) => void;
}

const CustomerOrders: React.FC<CustomerOrdersProps> = props => {
  const { orders, onRowClick, onViewAllOrdersClick } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  const orderList = orders
    ? orders.map(order => ({
        ...order,
        paymentStatus: transformPaymentStatus(order.paymentStatus, intl)
      }))
    : undefined;
  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({id: "recent_orders",
          defaultMessage: "Recent Orders",
          description: "section header"
        })}
        toolbar={
          <Button variant="text" color="primary" onClick={onViewAllOrdersClick}>
            <FormattedMessage id="view_all_orders"
              defaultMessage="View all orders"
              description="button"
            />
          </Button>
        }
      />
      <ResponsiveTable>
        <TableHead>
          <TableRow>
            <TableCell>
              <FormattedMessage id="no_of_order"
                defaultMessage="No. of Order"
                description="number of order"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage id="date"
                defaultMessage="Date"
                description="order placement date"
              />
            </TableCell>
            <TableCell>
              <FormattedMessage id="status"
                defaultMessage="Status"
                description="order status"
              />
            </TableCell>
            <TableCell className={classes.textRight}>
              <FormattedMessage id="total"
                defaultMessage="Total"
                description="order total amount"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderCollection(
            orderList,
            order => (
              <TableRow
                hover={!!order}
                className={!!order ? classes.link : undefined}
                onClick={order ? () => onRowClick(order.id) : undefined}
                key={order ? order.id : "skeleton"}
              >
                <TableCell>
                  {maybe(() => order.number) ? (
                    "#" + order.number
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell>
                  {maybe(() => order.created) ? (
                    <DateTime date={order.created} />
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell>
                  {maybe(() => order.paymentStatus.status) !== undefined ? (
                    order.paymentStatus.status === null ? null : (
                      <StatusLabel
                        status={order.paymentStatus.status}
                        label={order.paymentStatus.localized}
                      />
                    )
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell className={classes.textRight}>
                  {maybe(() => order.total.gross) ? (
                    <Money money={order.total.gross} />
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={6}>
                  <FormattedMessage id="no_orders_found" defaultMessage="No orders found" />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};

CustomerOrders.displayName = "CustomerOrders";
export default CustomerOrders;
