import { StaffErrorFragment } from "@temp/sections/staff/types/StaffErrorFragment";
import { IntlShape } from "react-intl";

import getAccountErrorMessage from "./account";

function getStaffErrorMessage(
  err: StaffErrorFragment,
  intl: IntlShape
): string {
  return getAccountErrorMessage(
    err && {
      ...err
    },
    intl
  );
}

export default getStaffErrorMessage;
