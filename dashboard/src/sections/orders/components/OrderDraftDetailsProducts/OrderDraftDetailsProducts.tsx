import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import { DebounceForm } from "@temp/components/DebounceForm";
import Form from "@temp/components/Form";
import Money from "@temp/components/Money";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import TableCellAvatar, {
  AVATAR_MARGIN
} from "@temp/components/TableCellAvatar";
import React from "react";
import { FormattedMessage } from "react-intl";

import { maybe, renderCollection } from "@temp/misc";
import { OrderDetails_order_lines } from "../../types/OrderDetails";

export interface FormData {
  quantity: number;
}

const useStyles = makeStyles(
  theme => ({
    colAction: {
      "&:last-child": {
        paddingRight: 0
      },
      width: 76 + theme.spacing(0.5)
    },
    colName: {
      width: "auto"
    },
    colNameLabel: {
      marginLeft: AVATAR_MARGIN
    },
    colPrice: {
      textAlign: "right",
      width: 150
    },
    colQuantity: {
      textAlign: "right",
      width: 80
    },
    colTotal: {
      textAlign: "right",
      width: 150
    },
    quantityField: {
      "& input": {
        padding: "12px 12px 10px",
        textAlign: "right"
      },
      width: 60
    },
    table: {
      tableLayout: "fixed"
    }
  }),
  { name: "OrderDraftDetailsProducts" }
);

interface OrderDraftDetailsProductsProps {
  lines: OrderDetails_order_lines[];
  onOrderLineChange: (id: string, data: FormData) => void;
  onOrderLineRemove: (id: string) => void;
}

const OrderDraftDetailsProducts: React.FC<OrderDraftDetailsProductsProps> = props => {
  const { lines, onOrderLineChange, onOrderLineRemove } = props;

  const classes = useStyles(props);

  return (
    <ResponsiveTable className={classes.table}>
      {maybe(() => !!lines.length) && (
        <TableHead>
          <TableRow>
            <TableCell className={classes.colName}>
              <span className={classes.colNameLabel}>
                <FormattedMessage id="product" defaultMessage="Product" />
              </span>
            </TableCell>
            <TableCell className={classes.colQuantity}>
              <FormattedMessage id="quantity"
                defaultMessage="Quantity"
                description="quantity of ordered products"
              />
            </TableCell>
            <TableCell className={classes.colPrice}>
              <FormattedMessage id="price"
                defaultMessage="Price"
                description="price or ordered products"
              />
            </TableCell>
            <TableCell className={classes.colTotal}>
              <FormattedMessage id="total"
                defaultMessage="Total"
                description="total price of ordered products"
              />
            </TableCell>
            <TableCell className={classes.colAction} />
          </TableRow>
        </TableHead>
      )}
      <TableBody>
        {maybe(() => lines.length) === 0 ? (
          <TableRow>
            <TableCell colSpan={5}>
              <FormattedMessage id="no_products_added_to_order"
                                defaultMessage="No Products added to Order" />
            </TableCell>
          </TableRow>
        ) : (
          renderCollection(lines, line => (
            <TableRow key={line ? line.id : "skeleton"}>
              <TableCellAvatar
                className={classes.colName}
                thumbnail={maybe(() => line.thumbnail.url)}
              >
                {maybe(() => line.productName && line.productSku) ? (
                  <>
                    <Typography variant="body2">{line.productName}</Typography>
                    <Typography variant="caption">{line.productSku}</Typography>
                  </>
                ) : (
                  <Skeleton />
                )}
              </TableCellAvatar>
              <TableCell className={classes.colQuantity}>
                {maybe(() => line.quantity) ? (
                  <Form
                    initial={{ quantity: line.quantity }}
                    onSubmit={data => onOrderLineChange(line.id, data)}
                  >
                    {({ change, data, hasChanged, submit }) => (
                      <DebounceForm
                        change={change}
                        submit={hasChanged ? submit : undefined}
                        time={200}
                      >
                        {debounce => (
                          <TextField
                            className={classes.quantityField}
                            fullWidth
                            name="quantity"
                            type="number"
                            value={data.quantity}
                            onChange={debounce}
                          />
                        )}
                      </DebounceForm>
                    )}
                  </Form>
                ) : (
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={classes.colPrice}>
                {maybe(() => line.unitPrice.net) ? (
                  <Money money={line.unitPrice.net} />
                ) : (
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={classes.colTotal}>
                {maybe(() => line.unitPrice.net && line.quantity) ? (
                  <Money
                    money={{
                      amount: line.unitPrice.net.amount * line.quantity,
                      currency: line.unitPrice.net.currency
                    }}
                  />
                ) : (
                  <Skeleton />
                )}
              </TableCell>
              <TableCell className={classes.colAction}>
                <IconButton onClick={() => onOrderLineRemove(line.id)}>
                  <DeleteIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </ResponsiveTable>
  );
};
OrderDraftDetailsProducts.displayName = "OrderDraftDetailsProducts";
export default OrderDraftDetailsProducts;
