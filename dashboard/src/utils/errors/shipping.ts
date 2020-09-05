import {formMessages} from "@temp/intl";
import { ShippingErrorFragment } from "@temp/sections/shipping/types/ShippingErrorFragment";
import { ShippingErrorCode } from "@temp/types/globalTypes";
import { defineMessages, IntlShape } from "react-intl";

import commonErrorMessages from "./common";

const messages = defineMessages({
  alreadyExists: {
    id: "shippingMethodAlreadyExists",
    defaultMessage: "Default shipping method already exists",
    description: "error message"
  }
});

function getShippingErrorMessage(
  err: Omit<ShippingErrorFragment, "__typename"> | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case ShippingErrorCode.ALREADY_EXISTS:
        return intl.formatMessage(messages.alreadyExists);
      case ShippingErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case ShippingErrorCode.REQUIRED:
        return intl.formatMessage(formMessages.requiredField);
      case ShippingErrorCode.INVALID:
        return intl.formatMessage(commonErrorMessages.invalid);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }

  return undefined;
}

export default getShippingErrorMessage;
