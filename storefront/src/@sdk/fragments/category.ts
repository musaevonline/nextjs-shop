import { gql } from '@apollo/client'

export const categoryBaseFragment = gql`
	fragment CategoryBase on Category {
		id
		name
		slug
		description
		backgroundImage {
			url
		}
		thumbnailSm: thumbnail(size: "255x255", method: THUMBNAIL_WEBP) {
			url
			alt
		}
		thumbnailXs: thumbnail(size: "60x60", method: THUMBNAIL_WEBP) {
			url
			alt
		}
	}
`
