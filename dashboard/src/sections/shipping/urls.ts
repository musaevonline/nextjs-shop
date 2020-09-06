import { stringify as stringifyQs } from "qs";
import urlJoin from "url-join";

import { BulkAction, Dialog, Pagination, SingleAction } from "@temp/types";
import { ShippingMethodTypeEnum } from "@temp/types/globalTypes";

export const shippingSection = "/shipping/";

export const shippingMethodListPath = shippingSection;
export type ShippingMethodListUrlDialog = "remove" | "remove-many";
export type ShippingMethodListUrlQueryParams = BulkAction &
  Dialog<ShippingMethodListUrlDialog> &
  Pagination &
  SingleAction;
export const shippingMethodListUrl = (
  params?: ShippingMethodListUrlQueryParams
) => shippingMethodListPath + "?" + stringifyQs(params);

export const shippingMethodPath = (id: string) =>
  urlJoin(shippingMethodListPath, id);
export type ShippingMethodUrlDialog =
  | "add-rate"
  | "edit-rate"
  | "remove"
  | "remove-rate";
export type ShippingMethodUrlQueryParams = Dialog<ShippingMethodUrlDialog> &
  SingleAction &
  Partial<{
    type: ShippingMethodTypeEnum;
  }>;
export const shippingMethodUrl = (
  id: string,
  params?: ShippingMethodUrlQueryParams
) => shippingMethodPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const shippingMethodAddPath = urlJoin(shippingMethodListPath, "add");
export const shippingMethodAddUrl = shippingMethodAddPath;
