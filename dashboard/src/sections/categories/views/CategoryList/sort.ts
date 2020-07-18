import { getOrderDirection } from "@temp/utils/sort";
import {CategoryListUrlQueryParams, CategoryListUrlSortField} from "@temp/sections/categories/urls";
import {CategorySortField, CategorySortingInput} from "@temp/types/globalTypes";

export function getSortQueryField(
  sort: CategoryListUrlSortField
): CategorySortField {
  switch (sort) {
    case CategoryListUrlSortField.name:
      return CategorySortField.NAME;
    case CategoryListUrlSortField.subcategory_count:
      return CategorySortField.SUBCATEGORY_COUNT;
    case CategoryListUrlSortField.product_count:
      return CategorySortField.PRODUCT_COUNT;
    default:
      return CategorySortField.NAME;
  }
}

export function getCategorySortQueryVariables(
  params: CategoryListUrlQueryParams
): CategorySortingInput {
  return {
    direction: getOrderDirection(params.asc),
    field: getSortQueryField(params.sort)
  };
}
