import { WindowTitle } from "@temp/components/WindowTitle";
import useNavigator from "@temp/hooks/useNavigator";
import useUser from "@temp/hooks/useUser";
import Navigation from "@temp/icons/Navigation";
import Pages from "@temp/icons/Pages";
import { sectionNames } from "@temp/intl";
import { maybe } from "@temp/misc";
import { PermissionEnum } from "@temp/types/globalTypes";
import React from "react";
import { IntlShape, useIntl } from "react-intl";

import ConfigurationPage, { MenuSection } from "./ConfigurationPage";

export function createConfigurationMenu(intl: IntlShape): MenuSection[] {
  return [
    {
      label: intl.formatMessage({
        defaultMessage: "Miscellaneous"
      }),
      menuItems: [
        {
          description: intl.formatMessage({
            defaultMessage: "Define how users can navigate through your store",
            id: "configurationMenuNavigation"
          }),
          icon: <Navigation fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_MENUS,
          title: intl.formatMessage(sectionNames.navigation),
          url: '/navigation/url'
        },
        {
          description: intl.formatMessage({
            defaultMessage: "Manage and add additional pages",
            id: "configurationMenuPages"
          }),
          icon: <Pages fontSize="inherit" viewBox="0 0 44 44" />,
          permission: PermissionEnum.MANAGE_PAGES,
          title: intl.formatMessage(sectionNames.pages),
          url: '/page/url'
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
