import { sectionNames } from "@temp/intl";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "@temp/components/WindowTitle";
import {
  paymentMethodAddPath,
  paymentMethodPath,
  paymentMethodListPath,
  PaymentMethodListUrlQueryParams,
  PaymentMethodUrlQueryParams
} from "./urls";
import PaymentMethodCreate from "./views/PaymentMethodCreate";
import PaymentMethodDetailsComponent from "./views/PaymentMethodDetailsView";
import PaymentMethodListComponent from "./views/PaymentMethodList";

const PaymentMethodList: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: PaymentMethodListUrlQueryParams = qs;
  return <PaymentMethodListComponent params={params} />;
};

interface PaymentMethodDetailsRouteProps {
  id: string;
}
const PaymentMethodDetails: React.FC<RouteComponentProps<
  PaymentMethodDetailsRouteProps
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: PaymentMethodUrlQueryParams = qs;
  return (
    <PaymentMethodDetailsComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const PaymentMethodRouter: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.paymentMethods)} />
      <Switch>
        <Route
          exact
          path={paymentMethodListPath}
          component={PaymentMethodList}
        />
        <Route
          exact
          path={paymentMethodAddPath}
          component={PaymentMethodCreate}
        />
        <Route path={paymentMethodPath(":id")} component={PaymentMethodDetails} />
      </Switch>
    </>
  );
};
export default PaymentMethodRouter;
