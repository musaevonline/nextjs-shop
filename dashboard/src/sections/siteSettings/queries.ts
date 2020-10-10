import {gql} from "@apollo/client";

import { fragmentAddress } from "../orders/queries";
import { TypedQuery } from "@temp/queries";
import { SiteSettings } from "./types/SiteSettings";

export const shopImageFragment = gql`
    fragment ShopImageFragment on SiteBannerImage{
        id
        alt
        description
        url
        sortOrder
    }
`;

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
    ${shopImageFragment}
    query SiteSettings {
        shop {
            ...ShopFragment
            images{
                ...ShopImageFragment
            }
        }
    }
`;
export const TypedSiteSettingsQuery = TypedQuery<SiteSettings, {}>(
    siteSettings
);
