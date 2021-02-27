import { gql } from "@apollo/client";

export const ShopImageFragment = gql`
fragment ShopImageFragment on SiteBannerImage{
    id
    alt
    description
    sortOrder
    url(size: "1080x500", method: THUMBNAIL_WEBP)
    largeUrl: url(size: "1280x500", method: THUMBNAIL_WEBP)
    mobileUrl: url(size: "960x540", method: THUMBNAIL_WEBP)
}
`;

export const ShopBaseFragment = gql`
    fragment Shop on Shop{
        name
        description
        headerText
        defaultCurrency
        defaultWeightUnit
        domain{
            host
            url
        }
    }
`;