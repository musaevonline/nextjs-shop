import urlJoin from "url-join";
import { stringify as stringifyQs } from "qs";

import {
  ActiveTab,
  BulkAction,
  Dialog,
  Filters,
  Pagination,
  Sort,
  TabActionDialog
} from "@temp/types";
import { CategoryPageTab } from "./components/CategoryUpdatePage";
const categorySectionUrl = "/categories/";

export const categoryListPath = categorySectionUrl;
export enum CategoryListUrlFiltersEnum {
  query = "query"
}

export type CategoryListUrlFilters = Filters<CategoryListUrlFiltersEnum>;
export type CategoryListUrlDialog = "delete" | TabActionDialog;

// export interface CategoryListUrlQueryParams extends PaginationState, BulkAction{
//     sort?: CategoryListUrlSortField;
//     asc?: boolean;
//     activeTab?: number;
//     action?: string;
//     query?: string;
// }

export enum CategoryListUrlSortField {
  name = "name",
  product_count = "product_count",
  subcategory_count = "subcategory_count",

}
export type CategoryListUrlSort = Sort<CategoryListUrlSortField>;
export type CategoryListUrlQueryParams = ActiveTab &
  BulkAction &
  CategoryListUrlFilters &
  CategoryListUrlSort &
  Dialog<CategoryListUrlDialog> &
  Pagination;

export const categoryListUrl = (params?: CategoryListUrlQueryParams) =>
  categorySectionUrl + "?" + stringifyQs(params);

export const categoryPath = (id: string) => urlJoin(categorySectionUrl, id);
export type CategoryUrlDialog =
  | "delete"
  | "delete-categories"
  | "delete-products";
export type CategoryUrlQueryParams = BulkAction &
  Dialog<CategoryUrlDialog> &
  Pagination &
  ActiveTab<CategoryPageTab>;
export const categoryUrl = (id: string, params?: CategoryUrlQueryParams) =>
  categoryPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const categoryAddPath = (parentId?: string) => {
  if (parentId) {
    return urlJoin(categoryPath(parentId), "add");
  }
  return urlJoin(categorySectionUrl, "add");
};
export const categoryAddUrl = (parentId?: string) =>
  categoryAddPath(parentId ? encodeURIComponent(parentId) : undefined);
