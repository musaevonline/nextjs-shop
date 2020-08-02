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
