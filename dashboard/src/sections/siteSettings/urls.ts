import { stringify as stringifyQs } from "qs";

import { Dialog } from "@temp/types";
import urlJoin from "url-join";

const siteSettingsSection = "/site-settings";

export const siteSettingsPath = siteSettingsSection;
export type SiteSettingsUrlDialog = "add-key";
export type SiteSettingsUrlQueryParams = Dialog<SiteSettingsUrlDialog>;
export const siteSettingsUrl = (params?: SiteSettingsUrlQueryParams) =>
  siteSettingsPath + "?" + stringifyQs(params);


export const shopImagePath = (imageId: string) =>
  urlJoin(siteSettingsSection, "image", imageId);

export type ShopImageUrlQueryParams = Dialog<"remove">;
export const shopImageUrl = (
  imageId: string,
  params?: ShopImageUrlQueryParams
) =>
  shopImagePath(encodeURIComponent(imageId)) +
  "?" +
  stringifyQs(params);