import React from "react";
import {
    Redirect,
    Route,
    RouteComponentProps,
    Switch
} from "react-router-dom";
import {CHECKOUT_STEPS} from "@temp/core/config";
import {Checkout} from "@sdk/fragments/types/Checkout";

interface IRouterProps {
    checkout?: Checkout;
    renderAddress: (props: RouteComponentProps<any>) => React.ReactNode;
    renderShipping: (props: RouteComponentProps<any>) => React.ReactNode;
    renderPayment: (props: RouteComponentProps<any>) => React.ReactNode;
    renderReview: (props: RouteComponentProps<any>) => React.ReactNode;
}

const Router:React.FC<IRouterProps> = ({checkout, renderAddress,
                                           renderShipping, renderPayment,
                                           renderReview}) =>{

    const getStepLink = () => CHECKOUT_STEPS[0].link;
    return(
        <Switch>
            <Route path={CHECKOUT_STEPS[0].link} render={renderAddress} />
            <Route path={CHECKOUT_STEPS[1].link} render={renderShipping} />
            <Route path={CHECKOUT_STEPS[2].link} render={renderPayment} />
            <Route path={CHECKOUT_STEPS[3].link} render={renderReview} />
            <Route render={props => <Redirect {...props} to={getStepLink()} />} />
        </Switch>
    );
};

export default Router;