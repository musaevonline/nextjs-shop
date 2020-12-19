import AccountPermissions from "@temp/components/AccountPermissions";
import AppHeader from "@temp/components/AppHeader";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import { sectionNames } from "@temp/intl";
import { PermissionGroupErrorFragment } from "@temp/sections/permissionGroups/types/PermissionGroupErrorFragment";
import { PermissionEnum } from "@temp/types/globalTypes";
import { getFormErrors } from "@temp/utils/errors";
import getPermissionGroupErrorMessage from "@temp/utils/errors/permissionGroups";
import React from "react";
import { useIntl } from "react-intl";

import { PermissionData } from "../PermissionGroupDetailsPage";
import PermissionGroupInfo from "../PermissionGroupInfo";
import {useFormik} from "formik";

export interface PermissionGroupCreatePageFormData {
  name: string;
  hasFullAccess: boolean;
  isActive: boolean;
  permissions: PermissionEnum[];
}

const initialForm: PermissionGroupCreatePageFormData = {
  hasFullAccess: false,
  isActive: false,
  name: "",
  permissions: []
};

export interface PermissionGroupCreatePageProps {
  disabled: boolean;
  errors: PermissionGroupErrorFragment[];
  permissions: PermissionData[];
  saveButtonBarState: ConfirmButtonTransitionState;
  onBack: () => void;
  onSubmit(data: PermissionGroupCreatePageFormData);
}

const PermissionGroupCreatePage: React.FC<PermissionGroupCreatePageProps> = ({
  disabled,
  permissions,
  onBack,
  onSubmit,
  saveButtonBarState,
  errors
}) => {
  const intl = useIntl();

  const formErrors = getFormErrors(["addPermissions"], errors || []);
  const permissionsError = getPermissionGroupErrorMessage(
    formErrors.addPermissions,
    intl
  );
  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialForm,
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
          <Grid>
            <div>
              <PermissionGroupInfo
                data={form.values}
                errors={errors}
                onChange={form.handleChange}
                disabled={disabled}
              />
            </div>
            <div>
              <AccountPermissions
                permissionsExceeded={false}
                data={form.values}
                errorMessage={permissionsError}
                disabled={disabled}
                permissions={permissions}
                onChange={form.handleChange}
                fullAccessLabel={intl.formatMessage({id: "group_has_full_access",
                  defaultMessage: "Group has full access to the store",
                  description: "checkbox label"
                })}
                description={intl.formatMessage({id: "expand_or_restrict_group's_permissions",
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
              disabled={disabled || !form.dirty || !form.isValid}
            />
          </div>
        </Container>
    </form>
  );
};
PermissionGroupCreatePage.displayName = "PermissionGroupCreatePage";
export default PermissionGroupCreatePage;
