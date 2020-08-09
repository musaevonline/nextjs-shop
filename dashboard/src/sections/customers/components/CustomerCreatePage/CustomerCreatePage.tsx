import AppHeader from "@temp/components/AppHeader";
import { CardSpacer } from "@temp/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Form from "@temp/components/Form";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import { AccountErrorFragment } from "@temp/sections/customers/types/AccountErrorFragment";
import useAddressValidation from "@temp/hooks/useAddressValidation";
import { sectionNames } from "@temp/intl";
import { AddressInput } from "@temp/types/globalTypes";
import createSingleAutocompleteSelectHandler from "@temp/utils/handlers/singleAutocompleteSelectChangeHandler";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { AddressTypeInput } from "../../types";
import CustomerCreateAddress from "../CustomerCreateAddress/CustomerCreateAddress";
import CustomerCreateDetails from "../CustomerCreateDetails";
import CustomerCreateNote from "../CustomerCreateNote/CustomerCreateNote";

export interface CustomerCreatePageFormData {
  customerFirstName: string;
  customerLastName: string;
  email: string;
  note: string;
}
export interface CustomerCreatePageSubmitData
  extends CustomerCreatePageFormData {
  address: AddressInput;
}

const initialForm: CustomerCreatePageFormData & AddressTypeInput = {
  city: "",
  cityArea: "",
  companyName: "",
  country: "",
  countryArea: "",
  customerFirstName: "",
  customerLastName: "",
  email: "",
  firstName: "",
  lastName: "",
  note: "",
  phone: "",
  postalCode: "",
  streetAddress1: "",
  streetAddress2: ""
};

export interface CustomerCreatePageProps {
  countries: any[];
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: CustomerCreatePageSubmitData) => void;
}

const CustomerCreatePage: React.FC<CustomerCreatePageProps> = ({
  countries,
  disabled,
  errors: apiErrors,
  saveButtonBar,
  onBack,
  onSubmit
}: CustomerCreatePageProps) => {
  const intl = useIntl();

  const [countryDisplayName, setCountryDisplayName] = React.useState("");
  const countryChoices = countries.map(country => ({
    label: country.country,
    value: country.code
  }));
  const {
    errors: validationErrors,
    submit: handleSubmitWithAddress
  } = useAddressValidation<CustomerCreatePageFormData>(formData =>
    onSubmit({
      address: {
        city: formData.city,
        cityArea: formData.cityArea,
        companyName: formData.companyName,
        country: formData.country,
        countryArea: formData.countryArea,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        postalCode: formData.postalCode,
        streetAddress1: formData.streetAddress1,
        streetAddress2: formData.streetAddress2
      },
      customerFirstName: formData.customerFirstName,
      customerLastName: formData.customerLastName,
      email: formData.email,
      note: formData.note
    })
  );

  const errors = [...apiErrors, ...validationErrors];

  const handleSubmit = (
    formData: CustomerCreatePageFormData & AddressTypeInput
  ) => {
    const areAddressInputFieldsModified = ([
      "city",
      "companyName",
      "country",
      "countryArea",
      "firstName",
      "lastName",
      "phone",
      "postalCode",
      "streetAddress1",
      "streetAddress2"
    ] as Array<keyof AddressTypeInput>)
      .map(key => formData[key])
      .some(field => field !== "");

    if (areAddressInputFieldsModified) {
      handleSubmitWithAddress(formData);
    } else {
      onSubmit({
        address: null,
        customerFirstName: formData.customerFirstName,
        customerLastName: formData.customerLastName,
        email: formData.email,
        note: formData.note
      });
    }
  };

  return (
    <Form initial={initialForm} onSubmit={handleSubmit} confirmLeave>
      {({ change, data, hasChanged, submit }) => {
        const handleCountrySelect = createSingleAutocompleteSelectHandler(
          change,
          setCountryDisplayName,
          countryChoices
        );

        return (
          <Container>
            <AppHeader onBack={onBack}>
              <FormattedMessage {...sectionNames.customers} />
            </AppHeader>
            <PageHeader
              title={intl.formatMessage({id: "create_customer",
                defaultMessage: "Create Customer",
                description: "page header"
              })}
            />
            <Grid>
              <div>
                <CustomerCreateDetails
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
                <CardSpacer />
                <CustomerCreateAddress
                  countries={countryChoices}
                  countryDisplayName={countryDisplayName}
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                  onCountryChange={handleCountrySelect}
                />
                <CardSpacer />
                <CustomerCreateNote
                  data={data}
                  disabled={disabled}
                  errors={errors}
                  onChange={change}
                />
              </div>
            </Grid>
            <SaveButtonBar
              disabled={disabled || !hasChanged}
              state={saveButtonBar}
              onSave={submit}
              onCancel={onBack}
            />
          </Container>
        );
      }}
    </Form>
  );
};
CustomerCreatePage.displayName = "CustomerCreatePage";
export default CustomerCreatePage;
