import urljoin from "url-join";

import { searchUrl } from "@temp/app/routes";
import {ShopInfo_shop} from "@sdk/queries/types/ShopInfo";

interface ISchemaPotentialAction {
  "@type": "SearchAction";
  "query-input": string
  target: string;
}

interface ISchemaWebSite {
  "@context": "https://schema.org";
  "@type": "WebSite";
  url: string;
  description: string;
  name: string;
  potentialAction: ISchemaPotentialAction[] | ISchemaPotentialAction
}

export const homeStructuredData = (shop: ShopInfo_shop | null) => {
  const data: ISchemaWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: shop ? shop.description : "",
    name: shop ? shop.name : "",
    potentialAction: {
      "@type": "SearchAction",
      "query-input": "required name=q",
      target: urljoin(location.href, searchUrl, "?q={q}"),
    },
    url: location.href,
  }
  return JSON.stringify(data);
};