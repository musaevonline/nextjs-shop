import customerIcon from "@assets/images/menu-customers-icon.svg";
import catalogIcon from "@assets/images/menu-catalog-icon.svg";
import homeIcon from "@assets/images/menu-home-icon.svg";
import ordersIcon from "@assets/images/menu-orders-icon.svg";
import blogIcon from "@assets/images/blog-icon.svg";
import { sectionNames } from "@temp/intl";
import { IntlShape } from "react-intl";

import { PermissionEnum } from "../../types/globalTypes";
import {productListUrl} from "@temp/sections/products/urls";
import {categoryListUrl} from "@temp/sections/categories/urls";
import {customerListUrl} from "@temp/sections/customers/urls";
import {orderDraftListUrl, orderListUrl} from "@temp/sections/orders/urls";
import {blogCategoryListUrl} from "@temp/sections/blog/urls/blog_category_urls";
import {blogArticleListUrl} from "@temp/sections/blog/urls/blog_article_urls";

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
      ariaLabel: "orders",
      children: [
        {
          ariaLabel: "orders",
          label: intl.formatMessage(sectionNames.orders),
          permission: PermissionEnum.MANAGE_ORDERS,
          url: orderListUrl()
        },
        {
          ariaLabel: "order drafts",
          label: intl.formatMessage(sectionNames.drafts),
          permission: PermissionEnum.MANAGE_ORDERS,
          url: orderDraftListUrl()
        }
      ],
      icon: ordersIcon,
      label: intl.formatMessage(sectionNames.orders),
      permission: PermissionEnum.MANAGE_ORDERS
    },

    {
      ariaLabel: "customers",
      icon: customerIcon,
      label: intl.formatMessage(sectionNames.customers),
      permission: PermissionEnum.MANAGE_USERS,
      url: customerListUrl()
    },
      {
      ariaLabel: "blog",
      children: [
        {
          ariaLabel: "blogCategories",
          label: intl.formatMessage(sectionNames.blogCategories),
          url: blogCategoryListUrl()
        },
        {
          ariaLabel: "blogArticles",
          label: intl.formatMessage(sectionNames.blogArticles),
          url: blogArticleListUrl()
        }
      ],
      icon: blogIcon,
      label: intl.formatMessage(sectionNames.blog),
      permission: PermissionEnum.MANAGE_BLOG
    },
  ];
}

export default createMenuStructure;
