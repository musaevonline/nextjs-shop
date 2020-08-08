import { gql } from "@apollo/client";

import { TypedQuery } from "@temp/queries";
import { ShopInfo } from "./types/ShopInfo";

const shopInfo = gql`
  query ShopInfo {
    shop {
      defaultCurrency
      defaultWeightUnit
      displayGrossPrices
      domain {
        host
        url
      }
      includeTaxesInPrices
      name
      trackInventoryByDefault
      permissions {
        code
        name
      }
    }
  }
`;
export const TypedShopInfoQuery = TypedQuery<ShopInfo, {}>(shopInfo);
