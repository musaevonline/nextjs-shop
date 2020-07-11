import useUser from "@temp/hooks/useUser";
import React from "react";
import { Route, RouteProps } from "react-router-dom";

import NotFound from "@temp/components/NotFound";
import { PermissionEnum } from "@temp/types/globalTypes";
import { hasPermission } from "../misc";

interface SectionRouteProps extends RouteProps {
  permissions?: PermissionEnum[];
}

export const SectionRoute: React.FC<SectionRouteProps> = ({
  permissions,
  ...props
}) => {
  const { user } = useUser();

  const hasPermissions =
    !permissions ||
    permissions
      .map(permission => hasPermission(permission, user))
      .reduce((prev, curr) => prev && curr);
  return hasPermissions ? <Route {...props} /> : <NotFound />;
};
SectionRoute.displayName = "Route";
export default SectionRoute;
