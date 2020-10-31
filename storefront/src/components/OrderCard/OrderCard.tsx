import React, {useState} from "react";
import dateTime from "date-time";
import _ from "lodash";

import {Order} from "@sdk/fragments/types/Order";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import {OrderStatus} from "@temp/types/globalTypes";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {STATIC_PAGES} from "@temp/core/config";
import {Button} from "@material-ui/core";
import {red, green, grey, orange} from "@material-ui/core/colors";
import {getDBIdFromGraphqlId, priceToString} from "@temp/core/utils";
import PrintIcon from "@temp/icons/PrintIcon";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import OrderLine from "@temp/components/OrderCard/OrderLine";

const useStyles = makeStyles(theme => ({
    status:{
        fontSize: "1.3rem",
        padding: 3,
        display: "inline-block",
        margin: "5px 0",
        transform: "rotate(-5deg)",
        textTransform: "uppercase",
        fontWeight: 700,
        borderRadius: 3,
        backgroundColor: grey['50'],
        color: grey['800'],
        borderWidth: 2,
        borderStyle: "solid",
        borderColor: grey['800'],
        [`&[data-status=${OrderStatus.FULFILLED}]`]:{
            backgroundColor: green['50'],
            color: green['800'],
            borderColor: green['800'],
        },
        [`&[data-status=${OrderStatus.CANCELED}]`]:{
            backgroundColor: red['50'],
            color: red['800'],
            borderColor: red['800'],
        },
        [`&[data-status=${OrderStatus.UNFULFILLED}]`]:{
            backgroundColor: orange['50'],
            color: orange['800'],
            borderColor: orange['800'],
        }
    }
}));

const DISPLAY_STATUS = {
    [OrderStatus.FULFILLED] : "Выполнен",
    [OrderStatus.UNFULFILLED] : "Выполняется",
    [OrderStatus.CANCELED] : "Отменен",
    [OrderStatus.DRAFT] : "Черновик",
    [OrderStatus.PARTIALLY_FULFILLED] : "Частично завершен",
};

interface OrderCardProps {
    order: Order,
    addReview(lineId: string):void
}

const OrderCard:React.FC<OrderCardProps> = ({ order, addReview }) => {
    const classes = useStyles();

    const [isOpenAddress, setOpenAddress] = useState(false);
    const [isOpenOrder, setOpenOrder] = useState(true);

    const created = dateTime({date: new Date(order.created), local: true});
    const pk = getDBIdFromGraphqlId(order.id, "Order");
    const quantity = _.sumBy(order.lines, line => line.quantity);

    return(
        <div className="order-card">
            <Card className="hover:shadow-lg">

                <div className="flex xs:flex-col sm:flex-row flex-wrap">
                    <div className="flex-1">
                        <div className="flex flex-wrap xs:flex-col sm:flex-row py-5 px-10 sm:items-center">
                            <div className="mr-5">
                                <Button variant="text" size="small"
                                        onClick={e => {setOpenOrder(prev => !prev)}}
                                        startIcon={<KeyboardArrowDownIcon fontSize="small"/>}
                                >
                                    № {pk}
                                </Button>
                            </div>
                            <div className="flex-1 text-center mr-5 text-gray-600">{created}</div>
                            <div className="flex justify-end">
                                {isOpenOrder &&
                                <>
                                    <Button variant="text" size="small" color="primary"
                                            onClick={e => {
                                                setOpenAddress(prev => !prev)
                                            }}
                                            startIcon={<KeyboardArrowDownIcon fontSize="small"/>}
                                    >Детально
                                    </Button>
                                    <Divider orientation="vertical" flexItem/>
                                    <div className="ml-10">
                                        <IconButton size="small" title="Чек">
                                            <PrintIcon fillRule="evenodd"
                                                       clipRule="evenodd"
                                                       viewBox="-1 -1 22 22"/>
                                        </IconButton>
                                    </div>
                                </>
                                }
                                {!isOpenOrder &&
                                    <div className="text-base font-medium">
                                        <span>{quantity} товар{quantity > 1 && quantity < 5 ? 'а' : 'ов'} на </span>
                                        <span>{priceToString({amount: order.total.gross.amount, currency: order.total.currency})}</span>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="flex-1">
                            <Collapse in={isOpenOrder}>
                                <div className="flex flex-col">
                                    <Divider/>
                                    <div className="pb-10 flex-1">
                                        <Collapse in={isOpenAddress}>
                                            <div className="py-10">
                                                <div className="flex flex-wrap mb-5 px-10">
                                                    <div className="w-200 font-medium">Способ оплаты:</div>
                                                    <div className="flex-1 min-w-200">{order.payments[0].paymentMethod?.name || "Удален"}</div>
                                                </div>
                                                <div className="flex flex-wrap mb-5 px-10">
                                                    <div className="w-200 font-medium">Способ доставки:</div>
                                                    <div className="flex-1 min-w-200">{order.shippingMethod?.name || order.shippingMethodName}</div>
                                                </div>
                                                <div className="flex flex-wrap mb-5 px-10">
                                                    <div className="w-200 font-medium">Имя и фамилия:</div>
                                                    <div className="flex-1 min-w-200">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</div>
                                                </div>
                                                <div className="flex flex-wrap mb-5 px-10">
                                                    <div className="w-200 font-medium">Телефон:</div>
                                                    <div className="flex-1 min-w-200">{order.shippingAddress.phone}</div>
                                                </div>
                                                <div className="flex flex-wrap mb-5 px-10">
                                                    <div className="w-200 font-medium">Адрес:</div>
                                                    <div className="flex-1 min-w-200">{order.shippingAddress.city} {order.shippingAddress.streetAddress1}</div>
                                                </div>
                                                <div className="flex flex-wrap mb-5 px-10">
                                                    <div className="w-200 font-medium">Эл. почта:</div>
                                                    <div className="flex-1 min-w-200">{order.userEmail}</div>
                                                </div>
                                                <Divider/>
                                            </div>
                                        </Collapse>
                                        <div className="px-10">
                                            {order.lines.map((line, i) =>
                                                <OrderLine key={line.id}
                                                           line={line}
                                                           divider={i !== order.lines.length - 1}
                                                           addReview={() => addReview(line.id)}
                                                           canAddReview={[OrderStatus.FULFILLED, OrderStatus.CANCELED].includes(order.status)}
                                                />)
                                            }
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className="py-5 px-10 flex flex-wrap justify-between items-center text-lg font-medium">
                                        <div>Доставка ({order.shippingMethodName || order.shippingMethod?.name})</div>
                                        <div>
                                            {priceToString({
                                                amount: order.shippingPrice.gross.amount,
                                                currency: order.shippingPrice.currency
                                            })}
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className="flex flex-wrap px-10 justify-between items-center py-10">
                                        <Typography variant="h6">Итого к оплате</Typography>
                                        <Typography variant="h6">{priceToString({amount: order.total.gross.amount, currency: order.total.currency})}</Typography>
                                    </div>
                                </div>
                            </Collapse>
                        </div>
                    </div>
                    <Divider variant="fullWidth" orientation="vertical" flexItem/>
                    <div className="w-200 px-20">
                        <div className="font-medium py-10 ">{isOpenOrder ? "Статус заказа" : DISPLAY_STATUS[order.status]}</div>
                        <Collapse in={isOpenOrder}>
                            <>
                                <div>
                                    <div className={classes.status} data-status={order.status}>{DISPLAY_STATUS[order.status]}</div>
                                </div>
                                <div className="my-20 ">
                                    <Button component={Link}
                                            to={STATIC_PAGES.returns.url}
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                    >
                                        {STATIC_PAGES.returns.label}
                                    </Button>
                                </div>
                            </>
                        </Collapse>
                    </div>
                </div>
            </Card>
        </div>
    )
};

export default OrderCard;