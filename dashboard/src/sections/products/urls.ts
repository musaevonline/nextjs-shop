import {PaginationState} from "@temp/hooks/usePaginator";
import urlJoin from "url-join";
import {BulkAction} from "@temp/types";

const productSection = "/products/";

export const productListPath = productSection;

export interface ProductListUrlQueryParams extends PaginationState, BulkAction{
    sort?: ProductListUrlSortField;
    asc?: boolean;
    activeTab?: number;
    action?: string;
    query?: string;
    attributeId?:string
}

export const productListUrl =  () => productListPath;

export const productPath = (id: string) => urlJoin(productSection + id);
export const productUrl = (id: string) =>
  productPath(encodeURIComponent(id));

export enum ProductListUrlSortField {
  attribute = "attribute",
  name = "name",
  productType = "productType",
  status = "status",
  price = "price"
}