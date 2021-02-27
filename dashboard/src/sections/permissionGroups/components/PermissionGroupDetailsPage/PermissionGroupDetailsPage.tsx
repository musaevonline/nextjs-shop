import AccountPermissions from "@temp/components/AccountPermissions";
import AppHeader from "@temp/components/AppHeader";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import FormSpacer from "@temp/components/FormSpacer";
import Grid from "@temp/components/Grid";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import { ShopInfo_shop_permissions } from "@temp/components/Shop/types/ShopInfo";
import { sectionNames } from "@temp/intl";
import { PermissionGroupErrorFragment } from "@temp/sections/permissionGroups/types/PermissionGroupErrorFragment";
import { MembersListUrlSortField } from "@temp/sections/permissionGroups/urls";
import {
  extractPermissionCodes,
  isGroupFullAccess
} from "@temp/sections/permissionGroups/utils";
import { ListActions, SortPage } from "@temp/types";
import { PermissionEnum } from "@temp/types/globalTypes";
import { getFormErrors } from "@temp/utils/errors";
import getPermissionGroupErrorMessage from "@temp/utils/errors/permissionGroups";
import React from "react";
import {IntlShape, useIntl} from "react-intl";

import {
  PermissionGroupDetails_permissionGroup,
  PermissionGroupDetails_permissionGroup_users
} from "../../types/PermissionGroupDetails";
import PermissionGroupInfo from "../PermissionGroupInfo";
import PermissionGroupMemberList from "../PermissionGroupMemberList";
import {useFormik} from "formik";
import * as yup from 'yup';

const createSchema = (intl: IntlShape) => yup.object().shape({
  hasFullAccess: yup.boolean(),
  isActive: yup.boolean(),
  name: yup.string(),
  permissions: yup.array().nullable(),
  users: yup.array().of(yup.object().shape({
    id: yup.string(),
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string(),
    isActive: yup.boolean(),
    avatar: yup.object().shape({
      url: yup.string()
    }).nullable()
  }))
})


export interface PermissionGroupDetailsPageFormData {
  name: string;
  hasFullAccess: boolean;
  isActive: boolean;
  permissions: PermissionEnum[];
  users: PermissionGroupDetails_permissionGroup_users[];
}

export interface PermissionData extends ShopInfo_shop_permissions {
  lastSource?: boolean;
  disabled?: boolean;
}

export interface PermissionGroupDetailsPageProps
    extends ListActions,
        SortPage<MembersListUrlSortField> {
  disabled: boolean;
  errors: PermissionGroupErrorFragment[];
  members: PermissionGroupDetails_permissionGroup_users[];
  membersModified: boolean;
  permissionGroup: PermissionGroupDetails_permissionGroup;
  permissions: PermissionData[];
  permissionsExceeded: boolean;
  saveButtonBarState: ConfirmButtonTransitionState;
  onAssign: () => void;
  onBack: () => void;
  onUnassign: (ids: string[]) => void;
  onSubmit(data: PermissionGroupDetailsPageFormData);
}

const PermissionGroupDetailsPage: React.FC<PermissionGroupDetailsPageProps> = ({
                                                                                 disabled,
                                                                                 errors,
                                                                                 members,
                                                                                 membersModified,
                                                                                 onBack,
                                                                                 onSubmit,
                                                                                 permissionGroup,
                                                                                 permissions,
                                                                                 permissionsExceeded,
                                                                                 saveButtonBarState,
                                                                                 ...listProps
                                                                               }) => {
  const intl = useIntl();

  const initialForm: PermissionGroupDetailsPageFormData = {
    hasFullAccess: isGroupFullAccess(permissionGroup, permissions),
    isActive: false,
    name: permissionGroup?.name || "",
    permissions: extractPermissionCodes(permissionGroup),
    users: members
  };

  const formErrors = getFormErrors(["addPermissions"], errors);
  const permissionsError = getPermissionGroupErrorMessage(
      formErrors.addPermissions,
      intl
  );

  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialForm,
    validationSchema: createSchema(intl),
    onSubmit: values => {
      onSubmit(values);
    }
  })

  return (
      <form onSubmit={form.handleSubmit}>
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.permissionGroups)}
          </AppHeader>
          <PageHeader title={permissionGroup?.name} />

          <Grid>
            <div>
              <PermissionGroupInfo
                  data={form.values}
                  disabled={disabled}
                  errors={errors}
                  onChange={form.handleChange}
              />
              <FormSpacer />
              <PermissionGroupMemberList
                  disabled={disabled}
                  {...listProps}
                  users={form.values?.users || []}
              />
            </div>
            <div>
              <AccountPermissions
                  permissionsExceeded={permissionsExceeded}
                  data={form.values}
                  disabled={disabled}
                  permissions={permissions}
                  onChange={form.handleChange}
                  errorMessage={permissionsError}
                  fullAccessLabel={intl.formatMessage({id: "group_has_full_access_to_the_store",
                    defaultMessage: "Group has full access to the store",
                    description: "checkbox label"
                  })}
                  description={intl.formatMessage({id: "expand_or_restrict_group's_permissions_to_access",
                    defaultMessage:
                        "Expand or restrict group's permissions to access certain part of shop system.",
                    description: "card description"
                  })}
              />
            </div>
          </Grid>
          <div>
            <SaveButtonBar
                onCancel={onBack}
                onSave={form.handleSubmit}
                state={saveButtonBarState}
                disabled={disabled || !(form.dirty || membersModified) || !form.isValid}
            />
          </div>
        </Container>
      </form>
  );
};
PermissionGroupDetailsPage.displayName = "PermissionGroupDetailsPage";
export default PermissionGroupDetailsPage;
