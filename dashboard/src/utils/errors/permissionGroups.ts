import {formMessages} from "@temp/intl";
import { PermissionGroupErrorFragment } from "@temp/sections/permissionGroups/types/PermissionGroupErrorFragment";
import { PermissionGroupErrorCode } from "@temp/types/globalTypes";
import { defineMessages, IntlShape } from "react-intl";

import commonErrorMessages from "./common";

const messages = defineMessages({
  assignNonStaffMember: {
    id: "only_staff_can_be_assigned",
    defaultMessage: "Only staff members can be assigned"
  },
  cannotRemoveFromLastGroup: {
    id: "cannot_remove_user_from_last_group",
    defaultMessage: "Cannot remove user from last group"
  },
  duplicatedInputItem: {
    id: "cannot_add_and_remove_group_the_same_time",
    defaultMessage: "Cannot add and remove group the same time"
  },
  permissionOutOfScope: {
    id: 'those_permissions_are_out_of_your_scope',
    defaultMessage: "Those permissions are out of your scope"
  },
  unique: {
    id: 'this_name_should_be_unique',
    defaultMessage: "This name should be unique"
  }
});

function getPermissionGroupErrorMessage(
  err: PermissionGroupErrorFragment,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case PermissionGroupErrorCode.ASSIGN_NON_STAFF_MEMBER:
        return intl.formatMessage(messages.assignNonStaffMember);
      case PermissionGroupErrorCode.DUPLICATED_INPUT_ITEM:
        return intl.formatMessage(messages.duplicatedInputItem);
      case PermissionGroupErrorCode.OUT_OF_SCOPE_PERMISSION:
        return intl.formatMessage(messages.permissionOutOfScope);
      case PermissionGroupErrorCode.CANNOT_REMOVE_FROM_LAST_GROUP:
        return intl.formatMessage(messages.cannotRemoveFromLastGroup);
      case PermissionGroupErrorCode.UNIQUE:
        return intl.formatMessage(messages.unique);
      case PermissionGroupErrorCode.REQUIRED:
        return intl.formatMessage(formMessages.requiredField);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }

  return undefined;
}

export default getPermissionGroupErrorMessage;
