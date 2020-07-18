import customerIcon from "@assets/images/menu-customers-icon.svg";
import catalogIcon from "@assets/images/menu-catalog-icon.svg";
import homeIcon from "@assets/images/menu-home-icon.svg";
import { sectionNames } from "@temp/intl";
import { IntlShape } from "react-intl";

import { PermissionEnum } from "../../types/globalTypes";
import {productListUrl} from "@temp/sections/products/urls";
import {categoryListUrl} from "@temp/sections/categories/urls";

export interface IMenuItem {
  ariaLabel: string;
  children?: IMenuItem[];
  icon?: any;
  label: string;
  permission?: PermissionEnum;
  url?: string;
}

function createMenuStructure(intl: IntlShape): IMenuItem[] {
  return [
    {
      ariaLabel: "home",
      icon: homeIcon,
      label: intl.formatMessage(sectionNames.home),
      url: "/"
    },
    {
      ariaLabel: "catalogue",
      children: [
        {
          ariaLabel: "products",
          label: intl.formatMessage(sectionNames.products),
          url: productListUrl()
        },
        {
          ariaLabel: "categories",
          label: intl.formatMessage(sectionNames.categories),
          url: categoryListUrl()
        }
      ],
      icon: catalogIcon,
      label: intl.formatMessage(sectionNames.catalog),
      permission: PermissionEnum.MANAGE_PRODUCTS
    },

    {
      ariaLabel: "customers",
      icon: customerIcon,
      label: intl.formatMessage(sectionNames.customers),
      permission: PermissionEnum.MANAGE_USERS,
      url: 'customers/'
      // children: [
      //   {
      //     ariaLabel: "sales",
      //     label: intl.formatMessage(sectionNames.sales),
      //     url: saleListUrl()
      //   },
      // ]
    }
  ];
}

export default createMenuStructure;
