import { WindowTitle } from "@temp/components/WindowTitle";
import useNavigator from "@temp/hooks/useNavigator";
import useUser from "@temp/hooks/useUser";
import { sectionNames } from "@temp/intl";
import { maybe } from "@temp/misc";
import { PermissionEnum } from "@temp/types/globalTypes";
import React from "react";
import { IntlShape, useIntl } from "react-intl";

import ConfigurationPage, { MenuSection } from "./ConfigurationPage";
import Attributes from "@temp/icons/Attributes";
import ProductTypes from "@temp/icons/ProductTypes";
import {attributeListUrl} from "@temp/sections/attributes/urls";
import {productTypeListUrl} from "@temp/sections/productTypes/urls";
import StaffMembers from "@temp/icons/StaffMembers";
import {staffListUrl} from "@temp/sections/staff/urls";
import PermissionGroups from "@temp/icons/PermissionGroups";
import {permissionGroupListUrl} from "@temp/sections/permissionGroups/urls";
import {siteSettingsUrl} from "@temp/sections/siteSettings/urls";
import SiteSettings from "@temp/icons/SiteSettings";
import ShippingMethods from "@temp/icons/ShippingMethods";
import {shippingMethodListUrl} from "@temp/sections/shipping/urls";

export function createConfigurationMenu(intl: IntlShape): MenuSection[] {
  return [
    {
      label: intl.formatMessage({ id: 'attributes_product_types',
        defaultMessage: "Attributes and Product Types"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Determine attributes used to create product types",
            id: "configurationMenuAttributes"
          }),
          icon: <Attributes fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_PRODUCTS,
          title: intl.formatMessage(sectionNames.attributes),
          url: attributeListUrl()
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Define types of products you sell",
            id: "configurationMenuProductTypes"
          }),
          icon: <ProductTypes fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_PRODUCTS,
          title: intl.formatMessage(sectionNames.productTypes),
          url: productTypeListUrl()
        }
      ]
    },
    {
      label: intl.formatMessage({
        id: "shippingSettings",
        defaultMessage: "Shipping Settings"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Manage how you ship out orders",
            id: "configurationMenuShipping"
          }),
          icon: <ShippingMethods fontSize="inherit" viewBox="0 0 44 44"/>,
          permission: PermissionEnum.MANAGE_SHIPPING,
          title: intl.formatMessage(sectionNames.shipping),
          url: shippingMethodListUrl()
        }
      ]
    },
    {
      label: intl.formatMessage({id: "staff_settings",
        defaultMessage: "Staff Settings"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Manage your employees and their permissions",
            id: "configurationMenuStaff"
          }),
          icon: <StaffMembers fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_STAFF,
          title: intl.formatMessage(sectionNames.staff),
          url: staffListUrl()
        },
        {
          description: intl.formatMessage({
            defaultMessage:
                "Manage your permission groups and their permissions",
            id: "configurationMenuPermissionGroups"
          }),
          icon: <PermissionGroups fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_STAFF,
          title: intl.formatMessage(sectionNames.permissionGroups),
          url: permissionGroupListUrl()
        }
      ]
    },
    {
      label: intl.formatMessage({id: "miscellaneous",
        defaultMessage: "Miscellaneous"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "View and update your site settings",
            id: "configurationMenuSiteSettings"
          }),
          icon: <SiteSettings fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_SETTINGS,
          title: intl.formatMessage(sectionNames.siteSettings),
          url: siteSettingsUrl()
        },
      ]
    }
  ];
}

export const configurationMenuUrl = "/configuration/";

export const ConfigurationSection: React.FC = () => {
  const navigate = useNavigator();
  const user = useUser();
  const intl = useIntl();

  return (
      <>
        <WindowTitle title={intl.formatMessage(sectionNames.configuration)} />
        <ConfigurationPage
            menu={createConfigurationMenu(intl)}
            user={maybe(() => user.user)}
            onSectionClick={navigate}
        />
      </>
  );
};
export default ConfigurationSection;
