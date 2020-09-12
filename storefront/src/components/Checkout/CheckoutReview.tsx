import "./scss/index.scss";

import React, {useContext} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {checkoutQuery} from "@sdk/queries/checkout";
import {TCheckoutStep} from "@temp/views/Checkout/Page";
import {useHistory} from "react-router";
import Button from "@material-ui/core/Button";
import {checkoutCompleteMutation} from "@sdk/mutations/checkout";
import {getOrderCreatedUrl} from "@temp/app/routes";
import {Divider, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import {Checkout, CheckoutVariables} from "@sdk/queries/types/Checkout";
import {CheckoutComplete, CheckoutCompleteVariables} from "@sdk/mutations/types/CheckoutComplete";
import {useSnackbar} from "notistack";
import {CheckoutContext} from "@temp/components/CheckoutProvider/context";


const CheckoutReview:React.FC<{
    activeStep: TCheckoutStep
}> = ({ activeStep }) =>{
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const {checkout, clearCheckout} = useContext(CheckoutContext);

    /* GRAPHQL */
    const {data:checkoutResponse} = useQuery<Checkout, CheckoutVariables>(checkoutQuery, {
        variables:{token: checkout.token},
        skip: !checkout.token
    });

    const [checkoutComplete] = useMutation<CheckoutComplete, CheckoutCompleteVariables>(checkoutCompleteMutation);

    /* METHODS */

    const submitOrder = async (e) => {
        e.preventDefault();
        const REDIRECT_PATH = '/order/details/';
        const REDIRECT_URL = process.env.STOREFRONT_URL || 'http://localhost:3000' + REDIRECT_PATH;
        if (checkout && checkout.paymentMethod && checkout.shippingMethod) {
            try {
                const response = await checkoutComplete({
                    variables: {
                        checkoutId: checkout.id,
                        paymentMethodId: checkout.paymentMethod.id,
                        redirectUrl: REDIRECT_URL
                    }
                });
                if (response.data.checkoutComplete.checkoutErrors[0]) {
                    enqueueSnackbar(response.data.checkoutComplete.checkoutErrors[0].message, {
                        variant: "error"
                    })
                } else {
                    clearCheckout();
                    history.push(getOrderCreatedUrl(response.data.checkoutComplete.order.token));
                }
            } catch (e) {
                console.error(e);
                enqueueSnackbar(e.message, {
                    variant: "error"
                });
            }
        }else{
            enqueueSnackbar("Ошибка при создании заказа. Все данные были верны?", {
                variant: "error"
            });
        }
    };
    const address = checkoutResponse?.checkout.shippingAddress;
    const shippingMethod = checkoutResponse?.checkout.shippingMethod;
    const paymentMethod = checkout.paymentMethod;

    return(
        <div>
            <div className="flex items-center justify-between mb-10">
                <Divider className="flex-1"/>
                <DoneOutlineIcon className="mx-10" fontSize="small"/>
                <Typography variant='h5' className="pr-10">Детали заказа</Typography>
                <Divider className="flex-1"/>
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" className="pb-10 text-gray-600">Адрес доставки:</Typography>
                    <Divider/>
                    {address &&
                    <div className="text-14 mt-10 leading-relaxed">
                        <div className="font-medium">{address.firstName} {address.lastName}</div>
                        <div>{address.city}</div>
                        <div>{address.streetAddress1}</div>
                        <div>{address.phone}</div>
                        <div>{checkoutResponse.checkout.email}</div>
                    </div>
                    }
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" className="pb-10 text-gray-600">Способ доставки:</Typography>
                    <Divider/>
                    {shippingMethod &&
                    <div className="text-14 mt-10 mb-30 leading-relaxed font-medium">{shippingMethod.name}</div>
                    }
                    <Typography variant="subtitle1" className="pb-10 text-gray-600">Метод оплаты:</Typography>
                    <Divider/>
                    {paymentMethod &&
                    <div className="text-14 my-10 leading-relaxed font-medium">{paymentMethod.name}</div>
                    }
                </Grid>
            </Grid>
            <form className="shipping-method-form">
                <div className="form-actions mt-20 flex justify-end">
                    <Button type="submit"
                            color="primary"
                            variant="contained"
                            onClick={submitOrder}
                            size="large">Оформить заказ</Button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutReview;