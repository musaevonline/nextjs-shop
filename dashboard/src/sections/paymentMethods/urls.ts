import { stringify as stringifyQs } from "qs";
import urlJoin from "url-join";

import { BulkAction, Dialog, Pagination, SingleAction } from "@temp/types";

export const paymentMethodSection = "/payment-methods/";

export const paymentMethodListPath = paymentMethodSection;
export type PaymentMethodListUrlDialog = "remove" | "remove-many";
export type PaymentMethodListUrlQueryParams = BulkAction &
  Dialog<PaymentMethodListUrlDialog> &
  Pagination &
  SingleAction;
export const paymentMethodListUrl = (
  params?: PaymentMethodListUrlQueryParams
) => paymentMethodListPath + "?" + stringifyQs(params);

export const paymentMethodPath = (id: string) =>
  urlJoin(paymentMethodListPath, id);
export type PaymentMethodUrlDialog =
  | "edit"
  | "remove";
export type PaymentMethodUrlQueryParams = Dialog<PaymentMethodUrlDialog> &
  SingleAction;
export const paymentMethodUrl = (
  id: string,
  params?: PaymentMethodUrlQueryParams
) => paymentMethodPath(encodeURIComponent(id)) + "?" + stringifyQs(params);

export const paymentMethodAddPath = urlJoin(paymentMethodListPath, "add");
export const paymentMethodAddUrl = paymentMethodAddPath;
