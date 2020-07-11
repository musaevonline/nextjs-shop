import { PermissionEnum } from "@temp/types/globalTypes";
import {User} from "@sdk/fragments/types/User";

export const hasPermission = (permission: PermissionEnum, user: User) =>{
    user.userPermissions.map(perm => perm.code).includes(permission);
    return true
};

