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

const blogArticlesSectionUrl = `/blog-articles`;

export const blogArticleListPath = blogArticlesSectionUrl;

export enum BlogArticleListUrlFiltersEnum {
  query = "query"

}

export type BlogArticleListUrlFilters = Filters<BlogArticleListUrlFiltersEnum>;
export type BlogArticleListUrlDialog = "cancel" | TabActionDialog | "remove" | "remove-many";

export enum BlogArticleListUrlSortField {
  title = "title",
}
export type BlogArticleListUrlSort = Sort<BlogArticleListUrlSortField>;
export type BlogArticleListUrlQueryParams = BulkAction &
    Dialog<BlogArticleListUrlDialog> &
    BlogArticleListUrlFilters &
    BlogArticleListUrlSort &
    Pagination &
    SingleAction &
    ActiveTab;

export const blogArticleListUrl = (params?: BlogArticleListUrlQueryParams): string => {
  const blogArticleList = blogArticleListPath;
  if (params === undefined) {
    return blogArticleList;
  } else {
    return urlJoin(blogArticleList, "?" + stringifyQs(params));
  }
};
export const blogArticlePath = (id: string) =>
  urlJoin(blogArticleListPath, id);

export type BlogArticleUrlDialog =
  | "edit"
  | "remove";
export type BlogArticleUrlQueryParams = Dialog<BlogArticleUrlDialog> &
  SingleAction;
export const blogArticleUrl = (
  id: string,
  params?: BlogArticleUrlQueryParams
) => blogArticlePath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const blogArticleAddPath = urlJoin(blogArticleListPath, "add");
export const blogArticleAddUrl = blogArticleAddPath;