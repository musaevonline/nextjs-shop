import { WindowTitle } from "@temp/components/WindowTitle";
import useNavigator from "@temp/hooks/useNavigator";
import useNotifier from "@temp/hooks/useNotifier";
import React from "react";
import { useIntl } from "react-intl";

import CustomerCreatePage from "../components/CustomerCreatePage";
import { TypedCreateCustomerMutation } from "../mutations";
import { TypedCustomerCreateDataQuery } from "../queries";
import { CreateCustomer } from "../types/CreateCustomer";
import { customerListUrl, customerUrl } from "../urls";

export const CustomerCreate: React.FC<{}> = () => {
  const navigate = useNavigator();
  const notify = useNotifier();
  const intl = useIntl();

  const handleCreateCustomerSuccess = (data: CreateCustomer) => {
    if (data.customerCreate.errors.length === 0) {
      notify({
        text: intl.formatMessage({id: "customer_created",
          defaultMessage: "Customer created"
        })
      });
      navigate(customerUrl(data.customerCreate.user.id));
    }
  };
  return (
    <TypedCustomerCreateDataQuery displayLoader>
      {({ data, loading }) => (
        <TypedCreateCustomerMutation onCompleted={handleCreateCustomerSuccess}>
          {(createCustomer, createCustomerOpts) => (
            <>
              <WindowTitle
                title={intl.formatMessage({id: "create_customer",
                  defaultMessage: "Create customer",
                  description: "window title"
                })}
              />
              <CustomerCreatePage
                // countries={maybe(() => data.shop.countries, [])}
                countries={[]}
                disabled={loading || createCustomerOpts.loading}
                errors={createCustomerOpts.data?.customerCreate.errors || []}
                saveButtonBar={createCustomerOpts.status}
                onBack={() => navigate(customerListUrl())}
                onSubmit={formData => {
                  createCustomer({
                    variables: {
                      input: {
                        defaultShippingAddress: formData.address,
                        email: formData.email,
                        firstName: formData.customerFirstName,
                        lastName: formData.customerLastName,
                        note: formData.note
                      }
                    }
                  });
                }}
              />
            </>
          )}
        </TypedCreateCustomerMutation>
      )}
    </TypedCustomerCreateDataQuery>
  );
};
export default CustomerCreate;
