import {gql} from "@apollo/client";

import { fragmentAddress } from "../orders/queries";
import { TypedQuery } from "@temp/queries";
import { SiteSettings } from "./types/SiteSettings";

export const shopFragment = gql`
  ${fragmentAddress}
  fragment ShopFragment on Shop {
    authorizationKeys {
      key
      name
    }
    companyAddress {
      ...AddressFragment
    }
    customerSetPasswordUrl
    defaultMailSenderAddress
    defaultMailSenderName
    description
    name
    headerText
    domain {
      host
    }
  }
`;
const siteSettings = gql`
  ${shopFragment}
  query SiteSettings {
    shop {
      ...ShopFragment
    }
  }
`;
export const TypedSiteSettingsQuery = TypedQuery<SiteSettings, {}>(
  siteSettings
);
