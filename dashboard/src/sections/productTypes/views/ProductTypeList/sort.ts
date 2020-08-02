import { ProductTypeListUrlSortField } from "../../urls";
import { ProductTypeSortField } from "@temp/types/globalTypes";
import { createGetSortQueryVariables } from "@temp/utils/sort";

export function getSortQueryField(
  sort: ProductTypeListUrlSortField
): ProductTypeSortField {
  switch (sort) {
    case ProductTypeListUrlSortField.name:
      return ProductTypeSortField.NAME;
    case ProductTypeListUrlSortField.digital:
      return ProductTypeSortField.DIGITAL;
    default:
      return undefined;
  }
}

export const getSortQueryVariables = createGetSortQueryVariables(
  getSortQueryField
);
