import { PageListUrlSortField } from "@temp/sections/pages/urls";
import { PageSortField } from "@temp/types/globalTypes";
import { createGetSortQueryVariables } from "@temp/utils/sort";

export function getSortQueryField(sort: PageListUrlSortField): PageSortField {
  switch (sort) {
    case PageListUrlSortField.title:
      return PageSortField.TITLE;
    case PageListUrlSortField.visible:
      return PageSortField.VISIBILITY;
    case PageListUrlSortField.slug:
      return PageSortField.SLUG;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
