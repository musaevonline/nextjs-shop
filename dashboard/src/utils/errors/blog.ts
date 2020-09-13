import {formMessages} from "@temp/intl";
import { BlogErrorFragment } from "@temp/sections/blog/types/BlogErrorFragment";
import { BlogErrorCode } from "@temp/types/globalTypes";

import commonErrorMessages from "./common";
import {IntlShape} from "react-intl";

function getBlogErrorMessage(
  err: Omit<BlogErrorFragment, "__typename"> | undefined,
  intl: IntlShape
): string {
  if (err) {
    switch (err.code) {
      case BlogErrorCode.GRAPHQL_ERROR:
        return intl.formatMessage(commonErrorMessages.graphqlError);
      case BlogErrorCode.REQUIRED:
        return intl.formatMessage(formMessages.requiredField);
      case BlogErrorCode.INVALID:
        return intl.formatMessage(commonErrorMessages.invalid);
      default:
        return intl.formatMessage(commonErrorMessages.unknownError);
    }
  }

  return undefined;
}

export default getBlogErrorMessage;
