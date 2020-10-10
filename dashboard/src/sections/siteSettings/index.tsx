import { parse as parseQs } from "qs";
import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";

import {shopImagePath, ShopImageUrlQueryParams, siteSettingsPath, SiteSettingsUrlQueryParams} from "./urls";
import SiteSettingsComponent from "./views/ShopSettings";
import ShopImageComponent from "./views/ShopImage";

const SiteSettings: React.FC<RouteComponentProps<{}>> = ({ location }) => {
  const qs = parseQs(location.search.substr(1));
  const params: SiteSettingsUrlQueryParams = qs;

  return <SiteSettingsComponent params={params} />;
};

const ShopImage: React.FC<RouteComponentProps<any>> = ({
                                                         location,
                                                         match
                                                       }) => {
  const qs = parseQs(location.search.substr(1));
  const params: ShopImageUrlQueryParams = qs;

  return (
      <ShopImageComponent
          imageId={decodeURIComponent(match.params.imageId)}
          params={params}
      />
  );
};

export const SiteSettingsSection: React.FC = () => (
    <>
        <Route path={shopImagePath( ":imageId")} component={ShopImage} exact/>
        <Route path={siteSettingsPath} component={SiteSettings} exact/>
    </>
);
export default SiteSettingsSection;
