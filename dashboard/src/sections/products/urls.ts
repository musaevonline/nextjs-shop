import {PaginationState} from "@temp/hooks/usePaginator";
import urlJoin from "url-join";
import {BulkAction, Dialog, TabActionDialog} from "@temp/types";
import {stringifyQs} from "@temp/utils/urls";

const productSection = "/products/";

export const productAddPath = urlJoin(productSection, "add");
export const productAddUrl = productAddPath;

export const productListPath = productSection;

export type ProductListUrlDialog =
  | "publish"
  | "unpublish"
  | "delete"
  | TabActionDialog;

export interface ProductListUrlQueryParams extends PaginationState, BulkAction{
    sort?: ProductListUrlSortField;
    asc?: boolean;
    activeTab?: number;
    action?: string;
    query?: string;
    attributeId?:string
}

export const productListUrl = (params?: ProductListUrlQueryParams): string =>
  productListPath + "?" + stringifyQs(params);

export const productPath = (id: string) => urlJoin(productSection + id);
export type ProductUrlDialog = "remove" | "remove-variants";
export type ProductUrlQueryParams = BulkAction & Dialog<ProductUrlDialog>;
export const productUrl = (id: string, params?: ProductUrlQueryParams) =>
  productPath(encodeURIComponent(id)) + "?" + stringifyQs(params);


export enum ProductListUrlSortField {
  attribute = "attribute",
  name = "name",
  productType = "productType",
  status = "status",
  price = "price"
}