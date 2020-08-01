import React from "react";
import _ from 'lodash';

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import { fade } from "@material-ui/core/styles/colorManipulator";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import CardTitle from "@temp/components/CardTitle";
import Hr from "@temp/components/Hr";
import { FormChange } from "@temp/hooks/useForm";
import { FormsetAtomicData, FormsetChange } from "@temp/hooks/useFormset";
import { renderCollection } from "@temp/misc";
import { ICON_BUTTON_SIZE } from "@temp/theme";
import { UserError } from "@temp/types";
import { getFieldError } from "@temp/utils/errors";
import { FormattedMessage, useIntl } from "react-intl";
import {Button} from "@material-ui/core";

export type ProductStockInput = FormsetAtomicData<null, string>;
export interface ProductStockFormData {
    sku: string;
}

export interface ProductStocksProps {
    data: ProductStockFormData;
    disabled: boolean;
    errors: UserError[];
    stocks: ProductStockInput[];
    onChange: FormsetChange;
    onFormDataChange: FormChange;
    onStockDelete: (stockId: string) => void;
    onStockAdd: (stockId: string) => void;
}

const useStyles = makeStyles(
    theme => ({
        colAction: {
            padding: 0,
            width: ICON_BUTTON_SIZE + theme.spacing()
        },
        colName: {},
        colQuantity: {
            textAlign: "right",
            width: 200
        },
        editWarehouses: {
            marginRight: -theme.spacing()
        },
        input: {
            padding: theme.spacing(1.5),
            textAlign: "right"
        },
        inputComponent: {
            width: 100
        },
        menuItem: {
            "&:not(:last-of-type)": {
                marginBottom: theme.spacing(2)
            }
        },
        paper: {
            padding: theme.spacing(2)
        },
        popper: {
            boxShadow: `0px 5px 10px 0 ${fade(theme.palette.common.black, 0.05)}`,
            marginTop: theme.spacing(1),
            zIndex: 2
        },
        quantityContainer: {
            paddingTop: theme.spacing()
        },
        quantityHeader: {
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between"
        },
        skuInputContainer: {
            display: "grid",
            gridColumnGap: theme.spacing(3) + "px",
            gridTemplateColumns: "repeat(2, 1fr)"
        }
    }),
    {
        name: "ProductStocks"
    }
);

const ProductStocks: React.FC<ProductStocksProps> = ({
                                                         data,
                                                         disabled,
                                                         errors,
                                                         stocks,
                                                         onChange,
                                                         onFormDataChange,
                                                         onStockDelete,
                                                         onStockAdd
                                                     }) => {
    const classes = useStyles({});
    const intl = useIntl();
    return (
        <Card>
            <CardTitle
                title={intl.formatMessage({ id: "productStockHeader",
                    defaultMessage: "Inventory",
                    description: "product stock, section header"
                })}
            />
            <CardContent>
                <div className={classes.skuInputContainer}>
                    <TextField
                        disabled={disabled}
                        error={!!getFieldError(errors, "sku")}
                        fullWidth
                        helperText={getFieldError(errors, "sku")?.message}
                        label={intl.formatMessage({ id: "sku",
                            defaultMessage: "SKU (Stock Keeping Unit)"
                        })}
                        name="sku"
                        onChange={onFormDataChange}
                        value={data.sku}
                    />
                </div>
            </CardContent>
            <Hr />
            <CardContent className={classes.quantityContainer}>
                <Typography>
                  <span className={classes.quantityHeader}>
                    <span>
                      <FormattedMessage id="quantity"
                                        defaultMessage="Quantity"
                                        description="header"
                      />
                    </span>
                  </span>
                </Typography>
            </CardContent>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.colName}>
                            <FormattedMessage id="№"
                                              defaultMessage="№"
                                              description="table column header"
                            />
                        </TableCell>
                        <TableCell className={classes.colQuantity}>
                            <FormattedMessage id="quantity_available"
                                              defaultMessage="Quantity Available"
                                              description="table column header"
                            />
                        </TableCell>
                        <TableCell className={classes.colAction} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderCollection(stocks, (stock, index) => (
                        <TableRow key={stock.id}>
                            <TableCell className={classes.colName}>{index+1}.</TableCell>
                            <TableCell className={classes.colQuantity}>
                                <TextField
                                    className={classes.inputComponent}
                                    disabled={disabled}
                                    fullWidth
                                    inputProps={{
                                        className: classes.input,
                                        min: 0,
                                        type: "number"
                                    }}
                                    onChange={event => onChange(stock.id, event.target.value)}
                                    value={stock.value}
                                />
                            </TableCell>
                            <TableCell className={classes.colAction}>
                                <IconButton
                                    color="primary"
                                    onClick={() => onStockDelete(stock.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow>
                        <TableCell colSpan={2}>
                            <Button onClick={e => {onStockAdd(_.uniqueId('add_'))}} color="secondary">
                                <FormattedMessage id="add_stock"
                                    defaultMessage="Add stock"
                                    description="button"
                                />
                            </Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Card>
    );
};

ProductStocks.displayName = "ProductStocks";
export default ProductStocks;
