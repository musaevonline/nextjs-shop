import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Container from "@temp/components/Container";
import FilterBar from "@temp/components/FilterBar";
import PageHeader from "@temp/components/PageHeader";
import { CustomerListUrlSortField } from "@temp/sections/customers/urls";
import { sectionNames } from "@temp/intl";
import {
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps
} from "@temp/types";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { ListCustomers_customers_edges_node } from "../../types/ListCustomers";
import CustomerList from "../CustomerList/CustomerList";
import {
  // createFilterStructure,
  CustomerFilterKeys,
  CustomerListFilterOpts
} from "./filters";

export interface CustomerListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<CustomerFilterKeys, CustomerListFilterOpts>,
    SortPage<CustomerListUrlSortField>,
    TabPageProps {
  customers: ListCustomers_customers_edges_node[];
}

const CustomerListPage: React.FC<CustomerListPageProps> = ({
  currencySymbol,
  currentTab,
  filterOpts,
  initialSearch,
  onAdd,
  onAll,
  onFilterChange,
  onSearchChange,
  onTabChange,
  onTabDelete,
  onTabSave,
  tabs,
  ...customerListProps
}) => {
  const intl = useIntl();

  // const structure = createFilterStructure(intl, filterOpts);

  return (
    <Container>
      <PageHeader title={intl.formatMessage(sectionNames.customers)}>
        <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage id="create_customer"
            defaultMessage="Create customer"
            description="button"
          />
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={intl.formatMessage({id: "all_customers",
            defaultMessage: "All Customers",
            description: "tab name"
          })}
          // currencySymbol={currencySymbol}
          currentTab={currentTab}
          // filterStructure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({id: "search_customer",
            defaultMessage: "Search Customer"
          })}
          tabs={tabs}
          onAll={onAll}
          // onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <CustomerList {...customerListProps} />
      </Card>
    </Container>
  );
};
CustomerListPage.displayName = "CustomerListPage";
export default CustomerListPage;
