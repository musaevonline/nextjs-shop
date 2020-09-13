import { stringify as stringifyQs } from "qs";
import urlJoin from "url-join";

import {
  ActiveTab,
  BulkAction,
  Dialog,
  SingleAction,
  Filters,
  Pagination,
  Sort,
  TabActionDialog
} from "@temp/types";

const blogCategoriesSectionUrl = `/blog-categories`;

export const blogCategoryListPath = blogCategoriesSectionUrl;

export enum BlogCategoryListUrlFiltersEnum {
  query = "query"

}

export type BlogCategoryListUrlFilters = Filters<BlogCategoryListUrlFiltersEnum>;
export type BlogCategoryListUrlDialog = "cancel" | TabActionDialog | "remove" | "remove-many";

export enum BlogCategoryListUrlSortField {
  name = "name",
}
export type BlogCategoryListUrlSort = Sort<BlogCategoryListUrlSortField>;
export type BlogCategoryListUrlQueryParams = BulkAction &
    Dialog<BlogCategoryListUrlDialog> &
    BlogCategoryListUrlFilters &
    BlogCategoryListUrlSort &
    Pagination &
    SingleAction &
    ActiveTab;

export const blogCategoryListUrl = (params?: BlogCategoryListUrlQueryParams): string => {
  const blogCategoryList = blogCategoryListPath;
  if (params === undefined) {
    return blogCategoryList;
  } else {
    return urlJoin(blogCategoryList, "?" + stringifyQs(params));
  }
};
export const blogCategoryPath = (id: string) =>
  urlJoin(blogCategoryListPath, id);

export type BlogCategoryUrlDialog =
  | "edit"
  | "remove";
export type BlogCategoryUrlQueryParams = Dialog<BlogCategoryUrlDialog> &
  SingleAction;
export const blogCategoryUrl = (
  id: string,
  params?: BlogCategoryUrlQueryParams
) => blogCategoryPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const blogCategoryAddPath = urlJoin(blogCategoryListPath, "add");
export const blogCategoryAddUrl = blogCategoryAddPath;