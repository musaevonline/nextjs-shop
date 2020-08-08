import { Card, CardContent, Typography } from "@material-ui/core";
import AccountPermissionGroups from "@temp/components/AccountPermissionGroups";
import AccountStatus from "@temp/components/AccountStatus";
import AppHeader from "@temp/components/AppHeader";
import CardSpacer from "@temp/components/CardSpacer";
import CardTitle from "@temp/components/CardTitle";
import { ConfirmButtonTransitionState } from "@temp/components/ConfirmButton";
import Container from "@temp/components/Container";
import Grid from "@temp/components/Grid";
import { MultiAutocompleteChoiceType } from "@temp/components/MultiAutocompleteSelectField";
import PageHeader from "@temp/components/PageHeader";
import SaveButtonBar from "@temp/components/SaveButtonBar";
import useLocale from "@temp/hooks/useLocale";
import useStateFromProps from "@temp/hooks/useStateFromProps";
import { sectionNames } from "@temp/intl";
import { getUserName } from "@temp/misc";
import { SearchPermissionGroups_search_edges_node } from "@temp/searches/types/SearchPermissionGroups";
import { StaffErrorFragment } from "@temp/sections/staff/types/StaffErrorFragment";
import { FetchMoreProps, SearchPageProps } from "@temp/types";
import createMultiAutocompleteSelectHandler from "@temp/utils/handlers/multiAutocompleteSelectChangeHandler";
import React from "react";
import {IntlShape, useIntl} from "react-intl";

import { StaffMemberDetails_user } from "../../types/StaffMemberDetails";
import StaffPassword from "../StaffPassword/StaffPassword";
import StaffPreferences from "../StaffPreferences";
import StaffProperties from "../StaffProperties/StaffProperties";
import {useFormik} from "formik";
import * as yup from 'yup';

const createSchema = (intl: IntlShape) => yup.object().shape({
  email: yup.string(),
  firstName: yup.string(),
  isActive: yup.boolean(),
  lastName: yup.string(),
  permissionGroups: yup.array().nullable()
})

export interface StaffDetailsFormData {
  email: string;
  firstName: string;
  isActive: boolean;
  lastName: string;
  permissionGroups: string[];
}

export interface StaffDetailsPageProps extends SearchPageProps {
  availablePermissionGroups: SearchPermissionGroups_search_edges_node[];
  canEditAvatar: boolean;
  canEditPreferences: boolean;
  canEditStatus: boolean;
  canRemove: boolean;
  disabled: boolean;
  fetchMorePermissionGroups: FetchMoreProps;
  saveButtonBarState: ConfirmButtonTransitionState;
  staffMember: StaffMemberDetails_user;
  errors: StaffErrorFragment[];
  onBack: () => void;
  onChangePassword: () => void;
  onDelete: () => void;
  onImageDelete: () => void;
  onSubmit: (data: StaffDetailsFormData) => void;
  onImageUpload(file: File);
}

const StaffDetailsPage: React.FC<StaffDetailsPageProps> = ({
                                                             availablePermissionGroups,
                                                             canEditAvatar,
                                                             canEditPreferences,
                                                             canEditStatus,
                                                             canRemove,
                                                             disabled,
                                                             errors,
                                                             fetchMorePermissionGroups,
                                                             initialSearch,
                                                             onBack,
                                                             onChangePassword,
                                                             onDelete,
                                                             onImageDelete,
                                                             onImageUpload,
                                                             onSearchChange,
                                                             onSubmit,
                                                             saveButtonBarState,
                                                             staffMember
                                                           }: StaffDetailsPageProps) => {
  const intl = useIntl();
  const { locale, setLocale } = useLocale();
  const [
    permissionGroupsDisplayValues,
    setPermissionGroupsDisplayValues
  ] = useStateFromProps<MultiAutocompleteChoiceType[]>(
      (staffMember?.permissionGroups || []).map(group => ({
        disabled: !group.userCanManage,
        label: group.name,
        value: group.id
      })) || []
  );

  const initialForm: StaffDetailsFormData = {
    email: staffMember?.email || "",
    firstName: staffMember?.firstName || "",
    isActive: !!staffMember?.isActive,
    lastName: staffMember?.lastName || "",
    permissionGroups: staffMember?.permissionGroups.map(pg => pg.id) || []
  };

  const form = useFormik({
    enableReinitialize: true,
    initialValues: initialForm,
    validationSchema: createSchema(intl),
    onSubmit: values => {
      onSubmit(values);
    }
  });

  const permissionGroupsChange = createMultiAutocompleteSelectHandler(
      form.handleChange,
      setPermissionGroupsDisplayValues,
      permissionGroupsDisplayValues,
      availablePermissionGroups?.map(group => ({
        label: group.name,
        value: group.id
      })) || []
  );

  return (
      <form onSubmit={form.handleSubmit}>
        <Container>
          <AppHeader onBack={onBack}>
            {intl.formatMessage(sectionNames.staff)}
          </AppHeader>
          <PageHeader title={getUserName(staffMember)} />
          <Grid>
            <div>
              <StaffProperties
                  errors={errors}
                  data={form.values}
                  disabled={disabled}
                  canEditAvatar={canEditAvatar}
                  staffMember={staffMember}
                  onChange={form.handleChange}
                  onImageUpload={onImageUpload}
                  onImageDelete={onImageDelete}
              />
              {canEditPreferences && (
                  <>
                    <CardSpacer />
                    <StaffPassword onChangePassword={onChangePassword} />
                  </>
              )}
            </div>
            <div>
              {canEditPreferences && (
                  <StaffPreferences
                      locale={locale}
                      onLocaleChange={setLocale}
                  />
              )}
              {canEditStatus && (
                  <>
                    <Card>
                      <CardTitle
                          title={intl.formatMessage({id: "permissions",
                            defaultMessage: "Permissions",
                            description: "dialog header"
                          })}
                      />
                      <CardContent>
                        <Typography>
                          {intl.formatMessage({id: "user_is_assigned_to",
                            defaultMessage: "User is assigned to:",
                            description: "card description"
                          })}
                        </Typography>

                        <AccountPermissionGroups
                            formData={form.values}
                            disabled={disabled}
                            errors={errors}
                            initialSearch={initialSearch}
                            availablePermissionGroups={availablePermissionGroups}
                            onChange={permissionGroupsChange}
                            onSearchChange={onSearchChange}
                            displayValues={permissionGroupsDisplayValues}
                            {...fetchMorePermissionGroups}
                        />
                      </CardContent>
                    </Card>
                    <CardSpacer />
                    <AccountStatus
                        data={form.values}
                        disabled={disabled}
                        label={intl.formatMessage({id: "user_active",
                          defaultMessage: "User is active",
                          description: "checkbox label"
                        })}
                        onChange={form.handleChange}
                    />
                  </>
              )}
            </div>
          </Grid>
          <SaveButtonBar
              disabled={disabled || !form.isValid}
              state={saveButtonBarState}
              onCancel={onBack}
              onSave={form.handleSubmit}
              onDelete={canRemove ? onDelete : undefined}
          />
        </Container>
      </form>
  );
};
StaffDetailsPage.displayName = "StaffDetailsPage";
export default StaffDetailsPage;
