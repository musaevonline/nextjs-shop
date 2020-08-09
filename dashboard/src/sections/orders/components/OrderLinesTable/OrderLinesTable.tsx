import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@temp/components/CardTitle";
import Money from "@temp/components/Money";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import StatusLabel from "@temp/components/StatusLabel";
import TableCellAvatar, {
  AVATAR_MARGIN
} from "@temp/components/TableCellAvatar";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe, renderCollection } from "@temp/misc";
import {OrderDetails_order_lines} from "@temp/sections/orders/types/OrderDetails";

const useStyles = makeStyles(
  theme => ({
    clickableRow: {
      cursor: "pointer"
    },
    colName: {
      width: "auto"
    },
    colNameLabel: {
      marginLeft: AVATAR_MARGIN
    },
    colPrice: {
      textAlign: "right",
      width: 120
    },
    colQuantity: {
      textAlign: "center",
      width: 120
    },
    colSku: {
      textAlign: "right",
      textOverflow: "ellipsis",
      width: 120
    },
    colTotal: {
      textAlign: "right",
      width: 120
    },
    infoLabel: {
      display: "inline-block"
    },
    infoLabelWithMargin: {
      marginBottom: theme.spacing()
    },
    infoRow: {
      padding: theme.spacing(2, 3)
    },
    orderNumber: {
      display: "inline",
      marginLeft: theme.spacing(1)
    },
    statusBar: {
      paddingTop: 0
    },
    table: {
      tableLayout: "fixed"
    }
  }),
  { name: "OrderLinesTable" }
);

interface OrderLinesTableProps {
  lines: OrderDetails_order_lines[];
  orderNumber: string;
}

const OrderLinesTable: React.FC<OrderLinesTableProps> = props => {
  const {
    lines,
    orderNumber,
  } = props;
  const classes = useStyles(props);

  const intl = useIntl();
  const quantity = lines
    ? lines.map(line => line.quantity).reduce((prev, curr) => prev + curr, 0)
    : "...";

  return (
    <Card>
      <CardTitle
        title={
          !!lines ? (
            <StatusLabel
              label={
                <>
                  {intl.formatMessage(
                        {id: "order_lines({quantity})",
                          defaultMessage: "Fulfilled ({quantity})",
                          description: "section header"
                        },
                        {
                          quantity
                        }
                      )}
                  <Typography className={classes.orderNumber} variant="body1">
                    {maybe(
                      () => `#${orderNumber}`
                    )}
                  </Typography>
                </>
              }
              status={"success"}
            />
          ) : (
            <Skeleton />
          )
        }
      />
      <ResponsiveTable className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.colName}>
              <span className={classes.colNameLabel}>
                <FormattedMessage id="product"
                  defaultMessage="Product"
                  description="product name"
                />
              </span>
            </TableCell>
            <TableCell className={classes.colSku}>
              <FormattedMessage id="sku"
                defaultMessage="SKU"
                description="ordered product sku"
              />
            </TableCell>
            <TableCell className={classes.colQuantity}>
              <FormattedMessage id="quantity"
                defaultMessage="Quantity"
                description="ordered product quantity"
              />
            </TableCell>
            <TableCell className={classes.colPrice}>
              <FormattedMessage id="price"
                defaultMessage="Price"
                description="product price"
              />
            </TableCell>
            <TableCell className={classes.colTotal}>
              <FormattedMessage id="total"
                defaultMessage="Total"
                description="order line total price"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {renderCollection(lines, line => (
            <TableRow
              className={!!line ? classes.clickableRow : undefined}
              hover={!!line}
              key={maybe(() => line.id)}
            >
              <TableCellAvatar
                className={classes.colName}
                thumbnail={maybe(() => line.thumbnail.url)}
              >
                {maybe(() => line.productName) || <Skeleton />}
              </TableCellAvatar>
              <TableCell className={classes.colSku}>
                {line.productSku || <Skeleton />}
              </TableCell>
              <TableCell className={classes.colQuantity}>
                {line?.quantity || <Skeleton />}
              </TableCell>
              <TableCell className={classes.colPrice}>
                {maybe(() => line.unitPrice.gross) ? (
                  <Money money={line.unitPrice.gross} />
                ) : (
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={classes.colTotal}>
                {maybe(
                  () => line.quantity * line.unitPrice.gross.amount
                ) ? (
                  <Money
                    money={{
                      amount:
                        line.quantity * line.unitPrice.gross.amount,
                      currency: line.unitPrice.gross.currency
                    }}
                  />
                ) : (
                  <Skeleton />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </ResponsiveTable>
    </Card>
  );
};
OrderLinesTable.displayName = "OrderLinesTable";
export default OrderLinesTable;
