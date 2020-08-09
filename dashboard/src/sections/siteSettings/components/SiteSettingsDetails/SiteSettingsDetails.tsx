import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import CardTitle from "@temp/components/CardTitle";
import FormSpacer from "@temp/components/FormSpacer";
import { commonMessages } from "@temp/intl";
import { ShopErrorFragment } from "@temp/sections/siteSettings/types/ShopErrorFragment";
import { getFormErrors } from "@temp/utils/errors";
import getShopErrorMessage from "@temp/utils/errors/shop";
import React from "react";
import { useIntl } from "react-intl";

import { SiteSettingsPageFormData } from "../SiteSettingsPage";

interface SiteSettingsDetailsProps {
  data: SiteSettingsPageFormData;
  errors: ShopErrorFragment[];
  disabled: boolean;
  onChange: (event: React.ChangeEvent<any>) => void;
}

const SiteSettingsDetails: React.FC<SiteSettingsDetailsProps> = ({
  data,
  disabled,
  errors,
  onChange
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["name", "domain", "description"], errors);

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage(commonMessages.generalInformation)}
      />
      <CardContent>
        <TextField
          disabled={disabled}
          error={!!formErrors.name}
          fullWidth
          name="name"
          label={intl.formatMessage({id: "name_tour_store",
            defaultMessage: "Name of your store"
          })}
          helperText={
            getShopErrorMessage(formErrors.name, intl) ||
            intl.formatMessage({id: "name_your_store_tab",
              defaultMessage:
                "Name of your store is shown on tab in web browser"
            })
          }
          value={data.name}
          onChange={onChange}
        />
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.domain}
          fullWidth
          name="domain"
          label={intl.formatMessage({id: "url_online_store",
            defaultMessage: "URL of your online store"
          })}
          helperText={getShopErrorMessage(formErrors.domain, intl)}
          value={data.domain}
          onChange={onChange}
        />
        <FormSpacer />
        <TextField
          disabled={disabled}
          error={!!formErrors.description}
          fullWidth
          name="description"
          label={intl.formatMessage({id: "store_description",
            defaultMessage: "Store Description"
          })}
          helperText={
            getShopErrorMessage(formErrors.description, intl) ||
            intl.formatMessage({id: "store_description_taskbar",
              defaultMessage:
                "Store description is shown on taskbar after your store name"
            })
          }
          value={data.description}
          onChange={onChange}
        />
      </CardContent>
    </Card>
  );
};
SiteSettingsDetails.displayName = "SiteSettingsDetails";
export default SiteSettingsDetails;
