import {formMessages} from "@temp/intl";
import { ShopErrorFragment } from "@temp/sections/siteSettings/types/ShopErrorFragment";
import { ShopErrorCode } from "@temp/types/globalTypes";
import { defineMessages, IntlShape } from "react-intl";

import commonErrorMessages from "./common";

const messages = defineMessages({
  alreadyExists: {id: "authorization_key_already_exists",
    defaultMessage: "Authorization key with this type already exists",
    description: "add authorization key error"
  }
});

function getShopErrorMessage(
  err: Omit<ShopErrorFragment, "__typename"> | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case ShopErrorCode.ALREADY_EXISTS:
        return intl.formatMessage(messages.alreadyExists);
      case ShopErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case ShopErrorCode.REQUIRED:
        return intl.formatMessage(formMessages.requiredField);
      case ShopErrorCode.INVALID:
        return intl.formatMessage(commonErrorMessages.invalid);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }

  return undefined;
}

export default getShopErrorMessage;
