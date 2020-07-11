import { formMessages } from "@temp/intl";
import { AccountErrorCode } from "@temp/types/globalTypes";
import {defineMessages, IntlShape} from "react-intl";

import commonErrorMessages from "./common";

const messages = defineMessages({
  invalidPassword: {
    id: "invalid_password",
    defaultMessage: "Invalid password"
  },
  outOfScopeGroup: {
    id: "group_out_permission",
    defaultMessage: "Group is out of your permission scope"
  },
  outOfScopeUser: {
    id: "user_out_permission",
    defaultMessage: "User is out of your permissions scope"
  },
  passwordNumeric: {
    id: "password_cannot_only_numeric",
    defaultMessage: "Password cannot be entirely numeric"
  },
  tooCommon: {
    id: "password_used",
    defaultMessage: "This password is too commonly used"
  },
  tooShort: {
    id: "password_short",
    defaultMessage: "This password is too short"
  },
  tooSimilar: {
    id: "passwords_too_similar",
    defaultMessage: "These passwords are too similar"
  },
  unique: {
    id: "need_unique",
    defaultMessage: "This needs to be unique"
  },
  userNotFound: {
    id: "user_not_found",
    defaultMessage: "User doesn't exist"
  }
});
function getAccountErrorMessage(
  err: {code: AccountErrorCode},
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case AccountErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case AccountErrorCode.INVALID:
        return intl.formatMessage(commonErrorMessages.invalidToken);
      case AccountErrorCode.INVALID_PASSWORD:
        return intl.formatMessage(messages.invalidPassword);
      case AccountErrorCode.PASSWORD_ENTIRELY_NUMERIC:
        return intl.formatMessage(messages.passwordNumeric);
      case AccountErrorCode.PASSWORD_TOO_COMMON:
        return intl.formatMessage(messages.tooCommon);
      case AccountErrorCode.PASSWORD_TOO_SHORT:
        return intl.formatMessage(messages.tooShort);
      case AccountErrorCode.PASSWORD_TOO_SIMILAR:
        return intl.formatMessage(messages.tooSimilar);
      case AccountErrorCode.REQUIRED:
        return intl.formatMessage(formMessages.requiredField);
      case AccountErrorCode.UNIQUE:
        return intl.formatMessage(messages.unique);
      case AccountErrorCode.NOT_FOUND:
        return intl.formatMessage(messages.userNotFound);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }

  return undefined;
}

export default getAccountErrorMessage;
