import { CustomerListUrlSortField } from "@temp/sections/customers/urls";
import { UserSortField } from "@temp/types/globalTypes";
import { createGetSortQueryVariables } from "@temp/utils/sort";

export function getSortQueryField(
  sort: CustomerListUrlSortField
): UserSortField {
  switch (sort) {
    case CustomerListUrlSortField.email:
      return UserSortField.EMAIL;
    case CustomerListUrlSortField.name:
      return UserSortField.LAST_NAME;
    case CustomerListUrlSortField.orders:
      return UserSortField.ORDER_COUNT;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
