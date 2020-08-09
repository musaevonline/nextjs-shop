import AppHeader from "@temp/components/AppHeader";
import { CardSpacer } from "@temp/components/CardSpacer";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import { AccountErrorFragment } from "@temp/sections/customers/types/AccountErrorFragment";
import { sectionNames } from "@temp/intl";
import React from "react";
import { useIntl } from "react-intl";

import { getUserName, maybe } from "@temp/misc";
import { CustomerDetails_user } from "../../types/CustomerDetails";
import CustomerAddresses from "../CustomerAddresses";
import CustomerDetails from "../CustomerDetails";
import CustomerInfo from "../CustomerInfo";
import CustomerOrders from "../CustomerOrders";
import CustomerStats from "../CustomerStats";
import {useFormik} from "formik";

export interface CustomerDetailsPageFormData {
  firstName: string;
  lastName: string;
  email: string;
  isActive: boolean;
  note: string;
}

export interface CustomerDetailsPageProps {
  customer: CustomerDetails_user;
  disabled: boolean;
  errors: AccountErrorFragment[];
  saveButtonBar: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit: (data: CustomerDetailsPageFormData) => void;
  onViewAllOrdersClick: () => void;
  onRowClick: (id: string) => void;
  onAddressManageClick: () => void;
  onDelete: () => void;
}

const CustomerDetailsPage: React.FC<CustomerDetailsPageProps> = ({
                                                                   customer,
                                                                   disabled,
                                                                   errors,
                                                                   saveButtonBar,
                                                                   onBack,
                                                                   onSubmit,
                                                                   onViewAllOrdersClick,
                                                                   onRowClick,
                                                                   onAddressManageClick,
                                                                   onDelete
                                                                 }: CustomerDetailsPageProps) => {
  const intl = useIntl();
  const initialForm = {
    email: maybe(() => customer.email, ""),
    firstName: maybe(() => customer.firstName, ""),
    isActive: maybe(() => customer.isActive, false),
    lastName: maybe(() => customer.lastName, ""),
    note: maybe(() => customer.note, "")
  };

  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialForm,
    onSubmit
  })

  return (
      <form onSubmit={form.handleSubmit}>
            <Container>
              <AppHeader onBack={onBack}>
                {intl.formatMessage(sectionNames.customers)}
              </AppHeader>
              <PageHeader title={getUserName(customer, true)} />
              <Grid>
                <div>
                  <CustomerDetails
                      customer={customer}
                      data={form.values}
                      disabled={disabled}
                      errors={errors}
                      onChange={form.handleChange}
                  />
                  <CardSpacer />
                  <CustomerInfo
                      data={form.values}
                      disabled={disabled}
                      errors={errors}
                      onChange={form.handleChange}
                  />
                  <CardSpacer />
                  <CustomerOrders
                      orders={maybe(() =>
                          customer.orders.edges.map(edge => edge.node)
                      )}
                      onViewAllOrdersClick={onViewAllOrdersClick}
                      onRowClick={onRowClick}
                  />
                </div>
                <div>
                  <CustomerAddresses
                      customer={customer}
                      disabled={disabled}
                      onAddressManageClick={onAddressManageClick}
                  />
                  <CardSpacer />
                  <CustomerStats customer={customer} />
                </div>
              </Grid>
              <SaveButtonBar
                  disabled={disabled || !form.dirty || !form.isValid}
                  state={saveButtonBar}
                  onSave={form.handleSubmit}
                  onCancel={onBack}
                  onDelete={onDelete}
              />
            </Container>
      </form>
  );
};
CustomerDetailsPage.displayName = "CustomerDetailsPage";
export default CustomerDetailsPage;
