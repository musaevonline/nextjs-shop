import { IFilter } from "@temp/components/Filter";
import { FilterOpts } from "@temp/types";
import { StaffMemberStatus } from "@temp/types/globalTypes";
import { createOptionsField } from "@temp/utils/filters/fields";
import { defineMessages, IntlShape } from "react-intl";

export enum StaffFilterKeys {
  status = "status"
}

export interface StaffListFilterOpts {
  status: FilterOpts<StaffMemberStatus>;
}

const messages = defineMessages({
  active: {
    id: "active",
    defaultMessage: "Active",
    description: "staff member's account"
  },
  deactivated: {
    id: "deactivated",
    defaultMessage: "Deactivated",
    description: "staff member's account"
  },
  status: {
    id: "status",
    defaultMessage: "Status",
    description: "staff member's account"
  }
});

export function createFilterStructure(
  intl: IntlShape,
  opts: StaffListFilterOpts
): IFilter<StaffFilterKeys> {
  return [
    {
      ...createOptionsField(
        StaffFilterKeys.status,
        intl.formatMessage(messages.status),
        [opts.status.value],
        false,
        [
          {
            label: intl.formatMessage(messages.active),
            value: StaffMemberStatus.ACTIVE
          },
          {
            label: intl.formatMessage(messages.deactivated),
            value: StaffMemberStatus.DEACTIVATED
          }
        ]
      ),
      active: opts.status.active
    }
  ];
}
