import {formMessages} from "@temp/intl";
import { PaymentErrorFragment } from "@temp/sections/paymentMethods/types/PaymentErrorFragment";
import { PaymentErrorCode } from "@temp/types/globalTypes";

import commonErrorMessages from "./common";
import {IntlShape} from "react-intl";

function getPaymentErrorMessage(
  err: Omit<PaymentErrorFragment, "__typename"> | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case PaymentErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case PaymentErrorCode.REQUIRED:
        return intl.formatMessage(formMessages.requiredField);
      case PaymentErrorCode.INVALID:
        return intl.formatMessage(commonErrorMessages.invalid);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }

  return undefined;
}

export default getPaymentErrorMessage;
