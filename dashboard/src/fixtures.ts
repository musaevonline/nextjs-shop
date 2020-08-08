import {PermissionEnum} from "@temp/types/globalTypes";

export const permissions = [
  {
    code: PermissionEnum.MANAGE_DISCOUNTS,
    name: "Manage sales and vouchers."
  },
  {
    code: PermissionEnum.MANAGE_MENUS,
    name: "Manage navigation."
  },
  {
    code: PermissionEnum.MANAGE_ORDERS,
    name: "Manage orders."
  },
  {
    code: PermissionEnum.MANAGE_PAGES,
    name: "Manage pages."
  },
  {
    code: PermissionEnum.MANAGE_PRODUCTS,
    name: "Manage products."
  },
  {
    code: PermissionEnum.MANAGE_SETTINGS,
    name: "Manage settings."
  },
  {
    code: PermissionEnum.MANAGE_SHIPPING,
    name: "Manage shipping."
  },
  {
    code: PermissionEnum.MANAGE_STAFF,
    name: "Manage staff."
  },
  {
    code: PermissionEnum.MANAGE_USERS,
    name: "Manage customers."
  },
  {
    code: PermissionEnum.MANAGE_PLUGINS,
    name: "Manage plugins."
  },
  {
    code: PermissionEnum.MANAGE_APPS,
    name: "Manage apps."
  },
  {
    code: PermissionEnum.MANAGE_WEBHOOKS,
    name: "Manage webhooks."
  }
].map(perm => ({
  __typename: "Permission" as "Permission",
  ...perm
}));