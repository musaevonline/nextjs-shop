import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import AppHeader from "@temp/components/AppHeader";
import Container from "@temp/components/Container";
import PageHeader from "@temp/components/PageHeader";
import { sectionNames } from "@temp/intl";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { PageListProps, SortPage } from "@temp/types";
import { PermissionGroupList_permissionGroups_edges_node } from "../../types/PermissionGroupList";
import { PermissionGroupListUrlSortField } from "../../urls";
import PermissionGroupList from "../PermissionGroupList";

export interface PermissionGroupListPageProps
  extends PageListProps,
    SortPage<PermissionGroupListUrlSortField> {
  permissionGroups: PermissionGroupList_permissionGroups_edges_node[];
  onBack: () => void;
  onDelete: (id: string) => void;
  onRowClick: (id: string) => () => void;
}

const PermissionGroupListPage: React.FC<PermissionGroupListPageProps> = ({
  onAdd,
  onBack,
  ...listProps
}) => {
  const intl = useIntl();

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.configuration)}
      </AppHeader>
      <PageHeader title={intl.formatMessage(sectionNames.permissionGroups)}>
        <Button color="primary" variant="contained" onClick={onAdd}>
          <FormattedMessage id="create_permission_group"
            defaultMessage="create permission group"
            description="button"
          />
        </Button>
      </PageHeader>
      <Card>
        <PermissionGroupList {...listProps} />
      </Card>
    </Container>
  );
};
PermissionGroupListPage.displayName = "PermissionGroupListPage";
export default PermissionGroupListPage;
