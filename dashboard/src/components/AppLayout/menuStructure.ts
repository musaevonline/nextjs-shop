import customerIcon from "@assets/images/menu-customers-icon.svg";
import homeIcon from "@assets/images/menu-home-icon.svg";
import translationIcon from "@assets/images/menu-translation-icon.svg";
import { sectionNames } from "@temp/intl";
import { IntlShape } from "react-intl";

import { PermissionEnum } from "../../types/globalTypes";

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
    },

    {
      ariaLabel: "translations",
      icon: translationIcon,
      label: intl.formatMessage(sectionNames.translations),
      permission: PermissionEnum.MANAGE_TRANSLATIONS,
      url: 'languages/'
    }
  ];
}

export default createMenuStructure;
