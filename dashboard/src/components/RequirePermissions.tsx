import { PermissionEnum } from "@temp/types/globalTypes";
import React from "react";
import {User_userPermissions} from "@sdk/fragments/types/User";

export function hasPermissions(
  userPermissions: User_userPermissions[],
  requiredPermissions: PermissionEnum[]
): boolean {
  return requiredPermissions.reduce(
    (acc, perm) =>
      acc && !!userPermissions.find(userPerm => userPerm.code === perm),
    true
  );
}

export interface RequirePermissionsProps {
  children: React.ReactNode | React.ReactNodeArray;
  requiredPermissions: PermissionEnum[];
  userPermissions: User_userPermissions[];
}

const RequirePermissions: React.FC<RequirePermissionsProps> = ({
  children,
  requiredPermissions,
  userPermissions
}) =>
  hasPermissions(userPermissions, requiredPermissions) ? <>{children}</> : null;

RequirePermissions.displayName = "RequirePermissions";
export default RequirePermissions;
