import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { AttributeListUrlSortField } from "../../urls";
import AppHeader from "@temp/components/AppHeader";
import FilterBar from "@temp/components/FilterBar";
import { sectionNames } from "@temp/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import Container from "@temp/components/Container";
import PageHeader from "@temp/components/PageHeader";
import {
  FilterPageProps,
  ListActions,
  PageListProps,
  SortPage,
  TabPageProps
} from "@temp/types";
import { AttributeList_attributes_edges_node } from "../../types/AttributeList";
import AttributeList from "../AttributeList/AttributeList";
import {
  AttributeFilterKeys,
  AttributeListFilterOpts
} from "./filters";

export interface AttributeListPageProps
  extends PageListProps,
    ListActions,
    FilterPageProps<AttributeFilterKeys, AttributeListFilterOpts>,
    SortPage<AttributeListUrlSortField>,
    TabPageProps {
  attributes: AttributeList_attributes_edges_node[];
  onBack: () => void;
}

const AttributeListPage: React.FC<AttributeListPageProps> = ({
  currencySymbol,
  filterOpts,
  initialSearch,
  onAdd,
  onBack,
  onFilterChange,
  onSearchChange,
  currentTab,
  onAll,
  onTabChange,
  onTabDelete,
  onTabSave,
  tabs,
  ...listProps
}) => {
  const intl = useIntl();

  // const structure = createFilterStructure(intl, filterOpts);

  return (
    <Container>
      <AppHeader onBack={onBack}>
        <FormattedMessage {...sectionNames.configuration} />
      </AppHeader>
      <PageHeader title={intl.formatMessage(sectionNames.attributes)}>
        <Button onClick={onAdd} color="primary" variant="contained">
          <FormattedMessage id="create_attribute"
            defaultMessage="Create attribute"
            description="button"
          />
        </Button>
      </PageHeader>
      <Card>
        <FilterBar
          allTabLabel={intl.formatMessage({ id: 'all_attributes',
            defaultMessage: "All Attributes",
            description: "tab name"
          })}
          // currencySymbol={currencySymbol}
          currentTab={currentTab}
          // filterStructure={structure}
          initialSearch={initialSearch}
          searchPlaceholder={intl.formatMessage({id: 'search_attribute',
            defaultMessage: "Search Attribute"
          })}
          tabs={tabs}
          onAll={onAll}
          // onFilterChange={onFilterChange}
          onSearchChange={onSearchChange}
          onTabChange={onTabChange}
          onTabDelete={onTabDelete}
          onTabSave={onTabSave}
        />
        <AttributeList {...listProps} />
      </Card>
    </Container>
  );
};
AttributeListPage.displayName = "AttributeListPage";
export default AttributeListPage;
