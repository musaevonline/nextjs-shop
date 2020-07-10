import React from "react";
import {Order_lines} from "@sdk/fragments/types/Order";
import {Link} from "react-router-dom";
import {getProductUrl} from "@temp/app/routes";
import {getDBIdFromGraphqlId, priceToString} from "@temp/core/utils";
import {Typography} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import PlaceHolder from 'images/placeholder540x540.png';

const OrderLine:React.FC<{
    line: Order_lines,
    divider?: boolean,
    addReview():void,
    canAddReview: boolean
}> = ({line, divider, addReview, canAddReview}) => {
    return(
        <div className="flex flex-wrap py-10 relative">
            <div className="max-w-300 mr-10 flex items-center">
                <Link to={getProductUrl(line.variant.product.slug, line.variant.product.id)} className="block">
                    <img src={line.thumbnail?.url || PlaceHolder} alt={line.productName} className="object-contain max-w-100"/>
                </Link>
            </div>
            <div className="flex-1 pb-10">
                <div className="mb-5">
                    <Typography component={Link}
                                variant="h6"
                                color="primary"
                                to={getProductUrl(line.variant.product.slug, line.variant.product.id)}
                                className="text-xl">
                        {line.productName}
                    </Typography>
                </div>
                <div className="text-gray-500">№ {getDBIdFromGraphqlId(line.variant.id, 'ProductVariant')}</div>
                <div className="text-base text-gray-500">
                    <div>Количетсво: {line.quantity}</div>
                    <div>Цена за ед.: {priceToString({amount: line.unitPrice.gross.amount, currency: line.unitPrice.currency})}</div>
                    <div>Сумма.: {priceToString({amount: line.unitPrice.gross.amount * line.quantity, currency: line.unitPrice.currency})}</div>
                </div>
                {canAddReview &&
                <div className="mt-10">
                    <Button variant="outlined"
                            size="small"
                            disabled={!!line.productreview}
                            onClick={e => !line.productreview ? addReview() : null}>
                        {line.productreview ? "Отзыв добавлен" : "Оставить отзыв"}
                    </Button>
                </div>
                }
            </div>
            {divider && <Divider absolute/>}
        </div>
    )
};

export default OrderLine;