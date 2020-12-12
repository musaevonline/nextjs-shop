import {gql} from "@apollo/client";

export const productImageFragment = gql`
    fragment ProductImageFragment on ProductImage {
        id
        alt
        sortOrder
        url
        largeThumbnail: thumbnail(size: "540x540", method: THUMBNAIL_WEBP)
        smallThumbnail: thumbnail(size: "60x60", method: THUMBNAIL_WEBP)
    }
`;