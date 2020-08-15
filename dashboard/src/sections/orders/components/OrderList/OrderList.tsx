import { makeStyles } from "@material-ui/core/styles";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import { DateTime } from "@temp/components/Date";
import Money from "@temp/components/Money";
import ResponsiveTable from "@temp/components/ResponsiveTable";
import Skeleton from "@temp/components/Skeleton";
import StatusLabel from "@temp/components/StatusLabel";
import TableCellHeader from "@temp/components/TableCellHeader";
import TablePagination from "@temp/components/TablePagination";
import {
    maybe,
    renderCollection,
    transformOrderStatus,
    transformPaymentStatus
} from "@temp/misc";
import { OrderListUrlSortField } from "@temp/sections/orders/urls";
import { ListProps, SortPage } from "@temp/types";
import { getArrowDirection } from "@temp/utils/sort";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { OrderList_orders_edges_node } from "../../types/OrderList";
import {TableHead} from "@material-ui/core";

const useStyles = makeStyles(
    theme => ({
        [theme.breakpoints.up("lg")]: {
            colCustomer: {
                width: 220
            },
            colDate: {},
            colFulfillment: {
                width: 230
            },
            colNumber: {
                width: 120
            },
            colPayment: {
                width: 220
            },
            colTotal: {}
        },
        colCustomer: {},
        colDate: {},
        colFulfillment: {},
        colNumber: {},
        colPayment: {},
        colTotal: {
            textAlign: "right"
        },
        link: {
            cursor: "pointer"
        }
    }),
    { name: "OrderList" }
);

interface OrderListProps extends ListProps, SortPage<OrderListUrlSortField> {
    orders: OrderList_orders_edges_node[];
}

const numberOfColumns = 6;

export const OrderList: React.FC<OrderListProps> = props => {
    const {
        disabled,
        settings,
        orders,
        pageInfo,
        onPreviousPage,
        onNextPage,
        onUpdateListSettings,
        onRowClick,
        onSort,
        sort
    } = props;
    const classes = useStyles(props);

    const intl = useIntl();

    const orderList = orders
        ? orders.map(order => ({
            ...order,
            paymentStatus: transformPaymentStatus(order.paymentStatus, intl),
            status: transformOrderStatus(order.status, intl)
        }))
        : undefined;
    return (
        <ResponsiveTable>
            <TableHead>
                <TableRow>
                    <TableCellHeader
                        direction={
                            sort.sort === OrderListUrlSortField.number
                                ? getArrowDirection(sort.asc)
                                : undefined
                        }
                        arrowPosition="right"
                        onClick={() => onSort(OrderListUrlSortField.number)}
                        className={classes.colNumber}
                    >
                        <FormattedMessage id="num_of_order" defaultMessage="No. of Order" />
                    </TableCellHeader>
                    <TableCellHeader
                        direction={
                            sort.sort === OrderListUrlSortField.date
                                ? getArrowDirection(sort.asc)
                                : undefined
                        }
                        onClick={() => onSort(OrderListUrlSortField.date)}
                        className={classes.colDate}
                    >
                        <FormattedMessage id="date"
                                          defaultMessage="Date"
                                          description="date when order was placed"
                        />
                    </TableCellHeader>
                    <TableCellHeader
                        direction={
                            sort.sort === OrderListUrlSortField.customer
                                ? getArrowDirection(sort.asc)
                                : undefined
                        }
                        onClick={() => onSort(OrderListUrlSortField.customer)}
                        className={classes.colCustomer}
                    >
                        <FormattedMessage id="customer"
                                          defaultMessage="Customer"
                                          description="e-mail or full name"
                        />
                    </TableCellHeader>
                    <TableCellHeader
                        direction={
                            sort.sort === OrderListUrlSortField.payment
                                ? getArrowDirection(sort.asc)
                                : undefined
                        }
                        onClick={() => onSort(OrderListUrlSortField.payment)}
                        className={classes.colPayment}
                    >
                        <FormattedMessage id="payment"
                                          defaultMessage="Payment"
                                          description="payment status"
                        />
                    </TableCellHeader>
                    <TableCellHeader
                        direction={
                            sort.sort === OrderListUrlSortField.fulfillment
                                ? getArrowDirection(sort.asc)
                                : undefined
                        }
                        onClick={() => onSort(OrderListUrlSortField.fulfillment)}
                        className={classes.colFulfillment}
                    >
                        <FormattedMessage id="fulfillment_status" defaultMessage="Fulfillment status" />
                    </TableCellHeader>
                    <TableCellHeader
                        direction={
                            sort.sort === OrderListUrlSortField.total
                                ? getArrowDirection(sort.asc)
                                : undefined
                        }
                        textAlign="right"
                        onClick={() => onSort(OrderListUrlSortField.total)}
                        className={classes.colTotal}
                    >
                        <FormattedMessage id="total"
                                          defaultMessage="Total"
                                          description="total order price"
                        />
                    </TableCellHeader>
                </TableRow>
            </TableHead>
            <TableFooter>
                <TableRow>
                    <TablePagination
                        colSpan={numberOfColumns}
                        settings={settings}
                        hasNextPage={pageInfo && !disabled ? pageInfo.hasNextPage : false}
                        onNextPage={onNextPage}
                        onUpdateListSettings={onUpdateListSettings}
                        hasPreviousPage={
                            pageInfo && !disabled ? pageInfo.hasPreviousPage : false
                        }
                        onPreviousPage={onPreviousPage}
                    />
                </TableRow>
            </TableFooter>
            <TableBody>
                {renderCollection(
                    orderList,
                    order => (
                        <TableRow
                            hover={!!order}
                            className={!!order ? classes.link : undefined}
                            onClick={order ? onRowClick(order.id) : undefined}
                            key={order ? order.id : "skeleton"}
                        >
                            <TableCell className={classes.colNumber}>
                                {maybe(() => order.number) ? "#" + order.number : <Skeleton />}
                            </TableCell>
                            <TableCell className={classes.colDate}>
                                {maybe(() => order.created) ? (
                                    <DateTime date={order.created} />
                                ) : (
                                    <Skeleton />
                                )}
                            </TableCell>
                            <TableCell className={classes.colCustomer}>
                                {maybe(() => order.userEmail) !== undefined ? (
                                    order.userEmail
                                ) : (
                                    <Skeleton />
                                )}
                            </TableCell>
                            <TableCell className={classes.colPayment}>
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
                            <TableCell className={classes.colFulfillment}>
                                {maybe(() => order.status) ? (
                                    <StatusLabel
                                        status={order.status.status}
                                        label={order.status.localized}
                                    />
                                ) : (
                                    <Skeleton />
                                )}
                            </TableCell>
                            <TableCell className={classes.colTotal}>
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
                            <TableCell colSpan={numberOfColumns}>
                                <FormattedMessage id="no_orders_found" defaultMessage="No orders found" />
                            </TableCell>
                        </TableRow>
                    )
                )}
            </TableBody>
        </ResponsiveTable>
    );
};
OrderList.displayName = "OrderList";
export default OrderList;
