import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import AppHeader from "@temp/components/AppHeader";
import CompanyAddressInput from "@temp/components/CompanyAddressInput";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import Hr from "@temp/components/Hr";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import useAddressValidation from "@temp/hooks/useAddressValidation";
import useStateFromProps from "@temp/hooks/useStateFromProps";
import { commonMessages, sectionNames } from "@temp/intl";
import { ShopErrorFragment } from "@temp/sections/siteSettings/types/ShopErrorFragment";
import createSingleAutocompleteSelectHandler from "@temp/utils/handlers/singleAutocompleteSelectChangeHandler";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { maybe } from "@temp/misc";
import {AuthorizationKeyType, CountryCode} from "@temp/types/globalTypes";
import { SiteSettings_shop } from "../../types/SiteSettings";
import SiteSettingsDetails from "../SiteSettingsDetails/SiteSettingsDetails";
import SiteSettingsKeys from "../SiteSettingsKeys/SiteSettingsKeys";
import SiteSettingsMailing, {
  SiteSettingsMailingFormData
} from "../SiteSettingsMailing";
import {useFormik} from "formik";
import ShopImages from "@temp/sections/siteSettings/components/ShopImages";
import {ShopImageFragment} from "@temp/sections/siteSettings/types/ShopImageFragment";

export interface SiteSettingsPageAddressFormData {
  city: string;
  companyName: string;
  country: string;
  countryArea: string;
  phone: string;
  postalCode: string;
  streetAddress1: string;
  streetAddress2: string;
}

export interface SiteSettingsPageFormData
    extends SiteSettingsPageAddressFormData,
        SiteSettingsMailingFormData {
  description: string;
  domain: string;
  name: string;
  headerText: string;
}

export interface SiteSettingsPageProps {
  disabled: boolean;
  errors: ShopErrorFragment[];
  shop: SiteSettings_shop;
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onKeyAdd: () => void;
  onKeyRemove: (keyType: AuthorizationKeyType) => void;
  onSubmit: (data: SiteSettingsPageFormData) => void;

  placeholderImage: string;
  onImageEdit?(id: string);
  onImageReorder?(event: { oldIndex: number; newIndex: number });
  onImageUpload(file: File);
  images: ShopImageFragment[];
  onImageDelete: (id: string) => () => void;
  loadingImages: boolean;
}

export function areAddressInputFieldsModified(
    data: SiteSettingsPageAddressFormData
): boolean {
  return ([
    "city",
    "country",
    "countryArea",
    "phone",
    "postalCode",
    "streetAddress1",
    "streetAddress2"
  ] as Array<keyof SiteSettingsPageAddressFormData>)
      .map(key => data[key])
      .some(field => field !== "");
}

const useStyles = makeStyles(
    theme => ({
      hr: {
        gridColumnEnd: "span 2",
        margin: theme.spacing(1, 0)
      }
    }),
    {
      name: "SiteSettingsPage"
    }
);
const countryChoices = Object.keys(CountryCode).map(key => ({value: key, label: key}));

const SiteSettingsPage: React.FC<SiteSettingsPageProps> = props => {
  const {
    disabled,
    errors,
    saveButtonBarState,
    shop,
    onBack,
    onKeyAdd,
    onKeyRemove,
    onSubmit,
    images,
    placeholderImage,
    onImageEdit,
    onImageReorder,
    onImageUpload,
    onImageDelete,
    loadingImages
  } = props;
  const classes = useStyles(props);
  const intl = useIntl();
  const [displayCountry, setDisplayCountry] = useStateFromProps(
      maybe(() => shop.companyAddress.country.code, "")
  );

  const {
    errors: validationErrors,
    submit: handleSubmitWithAddress
  } = useAddressValidation<SiteSettingsPageFormData>(onSubmit);

  const initialFormAddress: SiteSettingsPageAddressFormData = {
    city: maybe(() => shop.companyAddress.city, ""),
    companyName: maybe(() => shop.companyAddress.companyName, ""),
    country: maybe(() => shop.companyAddress.country.code, ""),
    countryArea: maybe(() => shop.companyAddress.countryArea, ""),
    phone: maybe(() => shop.companyAddress.phone, ""),
    postalCode: maybe(() => shop.companyAddress.postalCode, ""),
    streetAddress1: maybe(() => shop.companyAddress.streetAddress1, ""),
    streetAddress2: maybe(() => shop.companyAddress.streetAddress2, "")
  };
  const initialForm: SiteSettingsPageFormData = {
    ...initialFormAddress,
    customerSetPasswordUrl: maybe(() => shop.customerSetPasswordUrl, ""),
    defaultMailSenderAddress: maybe(() => shop.defaultMailSenderAddress, ""),
    defaultMailSenderName: maybe(() => shop.defaultMailSenderName, ""),
    description: maybe(() => shop.description, ""),
    domain: maybe(() => shop.domain.host, ""),
    name: maybe(() => shop.name, ""),
    headerText: maybe(() => shop.headerText, "")
  };

  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialForm,
    onSubmit: values => {
      values['country'] = CountryCode.BY;
      const submitFunc = areAddressInputFieldsModified(values)
          ? handleSubmitWithAddress
          : onSubmit;
      submitFunc(values);
    }
  });

  // const countryChoices = mapCountriesToChoices(Object.keys(CountryCode));

  const handleCountryChange = createSingleAutocompleteSelectHandler(
      form.handleChange,
      setDisplayCountry,
      countryChoices
  );

  return (
      <form onSubmit={form.handleSubmit}>
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.configuration)}
          </AppHeader>
          <PageHeader
              title={intl.formatMessage(commonMessages.generalInformation)}
          />
          <Grid variant="inverted">
            <div>
              <Typography>
                {intl.formatMessage(sectionNames.siteSettings)}
              </Typography>
              <Typography variant="body2">
                <FormattedMessage id="general_information_store"
                                  defaultMessage="These are general information about your store. They define what is the URL of your store and what is shown in browsers taskbar." />
              </Typography>
            </div>
            <SiteSettingsDetails
                data={form.values}
                errors={errors}
                disabled={disabled}
                onChange={form.handleChange}
            />
            <Hr className={classes.hr} />
            <div>
              <Typography>
                <FormattedMessage id="banner_images"
                                  defaultMessage="Banner Images"
                                  description="section header"
                />
              </Typography>
            </div>
            <ShopImages
                images={images}
                placeholderImage={placeholderImage}
                onImageDelete={onImageDelete}
                onImageReorder={onImageReorder}
                onImageEdit={onImageEdit}
                onImageUpload={onImageUpload}
                loading={loadingImages}
            />
            <Hr className={classes.hr} />
            <div>
              <Typography>
                <FormattedMessage id="mailing_configuration"
                                  defaultMessage="Mailing Configuration"
                                  description="section header"
                />
              </Typography>
              <Typography variant="body2">
                <FormattedMessage id="find_all_settings_stores_emails"
                                  defaultMessage="This where you will find all of the settings determining your stores e-mails. You can determine main email address and some of the contents of your emails." />
              </Typography>
            </div>
            <SiteSettingsMailing
                data={form.values}
                errors={errors}
                disabled={disabled}
                onChange={form.handleChange}
            />
            <Hr className={classes.hr} />
            <div>
              <Typography>
                <FormattedMessage id="company_information"
                                  defaultMessage="Company Information"
                                  description="section header"
                />
              </Typography>
              <Typography variant="body2">
                <FormattedMessage id="address_used_generate_invoices"
                                  defaultMessage="This address will be used to generate invoices and calculate shipping rates." />
                <FormattedMessage id="email_address_contact_customers"
                                  defaultMessage="Email address you provide here will be used as a contact address for your customers." />
              </Typography>
            </div>
            <CompanyAddressInput
                data={form.values}
                displayCountry={displayCountry}
                countries={countryChoices}
                errors={[...errors, ...validationErrors]}
                disabled={disabled}
                header={intl.formatMessage({id: "store_information",
                  defaultMessage: "Store Information",
                  description: "section header"
                })}
                onChange={form.handleChange}
                onCountryChange={handleCountryChange}
            />
            <Hr className={classes.hr} />
            <div>
              <Typography>
                <FormattedMessage id="authentication_methods"
                                  defaultMessage="Authentication Methods"
                                  description="section header"
                />
              </Typography>
              <Typography variant="body2">
                <FormattedMessage id="authentication_method_customers_log_in"
                                  defaultMessage="Authentication method defines additional ways that customers can log in to your ecommerce." />
              </Typography>
            </div>
            <SiteSettingsKeys
                disabled={disabled}
                keys={maybe(() => shop.authorizationKeys)}
                onAdd={onKeyAdd}
                onRemove={onKeyRemove}
            />
          </Grid>
          <SaveButtonBar
              state={saveButtonBarState}
              disabled={disabled || !form.dirty || !form.isValid}
              onCancel={onBack}
              onSave={form.handleSubmit}
          />
        </Container>
      </form>
  );
};

SiteSettingsPage.displayName = "SiteSettingsPage";
export default SiteSettingsPage;
