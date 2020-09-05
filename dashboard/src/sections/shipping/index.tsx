import { sectionNames } from "@temp/intl";
import { parse as parseQs } from "qs";
import React from "react";
import { useIntl } from "react-intl";
import { Route, RouteComponentProps, Switch } from "react-router-dom";

import { WindowTitle } from "@temp/components/WindowTitle";
import {
  shippingMethodAddPath,
  shippingMethodPath,
  shippingMethodListPath,
  ShippingMethodListUrlQueryParams,
  ShippingMethodUrlQueryParams
} from "./urls";
import ShippingMethodCreate from "./views/ShippingMethodCreate";
import ShippingMethodDetailsComponent from "./views/ShippingMethodDetailsView";
import ShippingMethodListComponent from "./views/ShippingMethodList";

const ShippingMethodList: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: ShippingMethodListUrlQueryParams = qs;
  return <ShippingMethodListComponent params={params} />;
};

interface ShippingMethodDetailsRouteProps {
  id: string;
}
const ShippingMethodDetails: React.FC<RouteComponentProps<
  ShippingMethodDetailsRouteProps
>> = ({ location, match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: ShippingMethodUrlQueryParams = qs;
  return (
    <ShippingMethodDetailsComponent
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

export const ShippingRouter: React.FC = () => {
  const intl = useIntl();

  return (
    <>
      <WindowTitle title={intl.formatMessage(sectionNames.shipping)} />
      <Switch>
        <Route
          exact
          path={shippingMethodListPath}
          component={ShippingMethodList}
        />
        <Route
          exact
          path={shippingMethodAddPath}
          component={ShippingMethodCreate}
        />
        <Route path={shippingMethodPath(":id")} component={ShippingMethodDetails} />
      </Switch>
    </>
  );
};
export default ShippingRouter;
