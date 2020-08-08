import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardTitle from "@temp/components/CardTitle";
import FormSpacer from "@temp/components/FormSpacer";
import { Locale, localeNames } from "@temp/components/Locale";
import SingleAutocompleteSelectField from "@temp/components/SingleAutocompleteSelectField";
import { capitalize } from "@temp/misc";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface StaffPreferencesProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

const StaffPreferences: React.FC<StaffPreferencesProps> = ({
  locale,
  onLocaleChange
}) => {
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({id: "preferences",
          defaultMessage: "Preferences",
          description: "section header"
        })}
      />
      <CardContent>
        <SingleAutocompleteSelectField
          choices={Object.values(Locale).map(locale => ({
            label: capitalize(localeNames[locale]),
            value: locale
          }))}
          displayValue={localeNames[locale]}
          helperText={intl.formatMessage({id: "selecting_change_language",
            defaultMessage:
              "Selecting this will change the language of your dashboard"
          })}
          label={intl.formatMessage({id: "preferred_language",
            defaultMessage: "Preferred Language"
          })}
          name="locale"
          value={locale}
          onChange={event => onLocaleChange(event.target.value)}
        />
        <FormSpacer />
        <Typography>
          <FormattedMessage id="language_translations_are_at_varying_degrees"
                            defaultMessage="Please note, while all currency and date adjustments are complete, language translations are at varying degrees of completion." />
        </Typography>
      </CardContent>
    </Card>
  );
};
StaffPreferences.displayName = "StaffPreferences";
export default StaffPreferences;
