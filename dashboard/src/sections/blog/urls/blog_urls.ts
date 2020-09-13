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

const blogSectionUrl = "/blog";

export const blogListPath = blogSectionUrl;

export enum BlogListUrlFiltersEnum {
  query = "query"

}

export type BlogListUrlFilters = Filters<BlogListUrlFiltersEnum>;
export type BlogListUrlDialog = "cancel" | TabActionDialog | "remove" | "remove-many";

export enum BlogListUrlSortField {
  name = "name",
}
export type BlogListUrlSort = Sort<BlogListUrlSortField>;
export type BlogListUrlQueryParams = BulkAction &
    Dialog<BlogListUrlDialog> &
    BlogListUrlFilters &
    BlogListUrlSort &
    Pagination &
    SingleAction &
    ActiveTab;

export const blogListUrl = (params?: BlogListUrlQueryParams): string => {
  const blogList = blogListPath;
  if (params === undefined) {
    return blogList;
  } else {
    return urlJoin(blogList, "?" + stringifyQs(params));
  }
};
export const blogPath = (id: string) =>
  urlJoin(blogListPath, id);

export type BlogUrlDialog =
  | "edit"
  | "remove";
export type BlogUrlQueryParams = Dialog<BlogUrlDialog> &
  SingleAction;
export const blogUrl = (
  id: string,
  params?: BlogUrlQueryParams
) => blogPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const blogAddPath = urlJoin(blogListPath, "add");
export const blogAddUrl = blogAddPath;