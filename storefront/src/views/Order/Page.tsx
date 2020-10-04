import React from "react";
import _ from 'lodash';

import {Container} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Link} from "react-router-dom";
import {baseUrl} from "@temp/app/routes";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Order_orderByToken} from "@sdk/queries/types/Order";
import {getDBIdFromGraphqlId, priceToString} from "@temp/core/utils";
import {getOrderPaymentStatus, getOrderStatus} from "@temp/views/UserProfile/pages/Orders/utils";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Avatar from "@material-ui/core/Avatar";
import Loader from "@temp/components/Loader";



const Page:React.FC<{
    order: Order_orderByToken | null;
    loading: boolean;
}> = ({
          order, loading,
      }) => {
    const orderPk = getDBIdFromGraphqlId(order?.id, "Order");
    const address = order?.shippingAddress;
    return(
        <Container maxWidth="xl">
            <div className="mt-20 mb-10">
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    <Link color="inherit" to={baseUrl}>
                        Главная
                    </Link>
                    <span>Заказ №{orderPk}</span>
                </Breadcrumbs>
            </div>
            <Card>
                <CardContent>
                    {!order && loading && <Loader full/>}
                    {!!order &&
                    <>
                        <Typography variant="h4" gutterBottom><strong>Ваш номер заказа: {orderPk}</strong></Typography>
                        <Typography variant="h5">
                            <span className="text-gray-600">{getOrderPaymentStatus(order.paymentStatus)} / {getOrderStatus(order.status)}</span>
                        </Typography>
                        <div className="overflow-auto">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Товары</TableCell>
                                        <TableCell>Цена за ед.</TableCell>
                                        <TableCell>Вариант</TableCell>
                                        <TableCell>Количество</TableCell>
                                        <TableCell align="right">Общая цена</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {order.lines.map(line => {
                                        return (
                                            <TableRow key={line.id}>
                                                <TableCell>
                                                    <div className="flex items-center">
                                                        <Avatar src={line.thumbnail?.url} variant="rounded" className="mr-5"/>
                                                        <span>{line.productName}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{priceToString({amount: line.unitPrice.gross.amount, currency: line.unitPrice.currency})}</TableCell>
                                                <TableCell>{line.variant.attributes.map((attr, i) =>
                                                    <span key={i}>
                                                        {`${attr.attribute.name}: `}
                                                        {attr.values.map(val => <span key={val.id}>{val.name}</span>)}{"; "}
                                                    </span>)}
                                                </TableCell>
                                                <TableCell>{line.quantity}</TableCell>
                                                <TableCell align="right">{
                                                    priceToString({
                                                        amount: line.unitPrice.gross.amount*line.quantity,
                                                        currency: line.unitPrice.currency
                                                    })}
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })}

                                    <TableRow>
                                        <TableCell rowSpan={3} colSpan={2}/>
                                        <TableCell colSpan={2}>
                                            <Typography variant="h6"><strong>Промежуточный итог:</strong></Typography>
                                        </TableCell>
                                        <TableCell colSpan={1} align="right">
                                            <Typography variant="h6">
                                                <strong>
                                                    {
                                                        priceToString({
                                                            amount: _.sumBy(order.lines, line => line.unitPrice.gross.amount * line.quantity),
                                                            currency: order.total.currency
                                                        })
                                                    }
                                                </strong>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={2}>
                                            <Typography variant="h6"><strong>Доставка:</strong></Typography>
                                        </TableCell>
                                        <TableCell colSpan={1} align="right">
                                            <Typography variant="h6">
                                                <strong>
                                                    {
                                                        priceToString({
                                                            amount: order.shippingPrice.gross.amount,
                                                            currency: order.shippingPrice.currency
                                                        })
                                                    }
                                                </strong>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell colSpan={2}>
                                            <Typography variant="h6"><strong>ИТОГО:</strong></Typography>
                                        </TableCell>
                                        <TableCell colSpan={1} align="right">
                                            <Typography variant="h6">
                                                <strong>
                                                    {
                                                        priceToString({
                                                            amount: order.total.gross.amount,
                                                            currency: order.total.currency
                                                        })
                                                    }
                                                </strong>
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <div>
                                <CardContent>
                                    <Typography variant="h5" paragraph><strong>Адрес доставки</strong></Typography>
                                    <Typography variant="body1"><strong>Имя Фамилия:</strong> {address.firstName} {address.lastName}</Typography>
                                    <Typography variant="body1"><span className="font-medium">Город: </span>{address.city}</Typography>
                                    <Typography variant="body1"><span className="font-medium">Адрес: </span>{address.streetAddress1}</Typography>
                                    {address.postalCode &&
                                    <Typography variant="body1"><span className="font-medium">Поштовый индекс: </span>{address.postalCode}</Typography>
                                    }
                                    {address.companyName &&
                                    <Typography variant="body1"><span className="font-medium">Компания: </span>{address.companyName}</Typography>
                                    }
                                    <Typography variant="body1"><span className="font-medium">Номер телефона: </span>{address.phone}</Typography>

                                </CardContent>
                            </div>
                        </div>
                    </>
                    }
                </CardContent>
            </Card>
        </Container>
    )
};

export default Page;