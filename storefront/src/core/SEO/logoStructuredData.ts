// import Logo from '../../images/logo.svg';
import { STOREFRONT_URL } from '@temp/constants'
import Logo from 'images/logo.svg'

interface ISchemaLogo {
	'@context': 'https://schema.org'
	'@type': 'Organization'
	url: string
	logo: string
}

export const logoStructuredData = () => {
	const data: ISchemaLogo = {
		'@context': 'https://schema.org',
		'@type': 'Organization',
		url: STOREFRONT_URL,
		logo: STOREFRONT_URL + Logo.slice(1)
	}
	return JSON.stringify(data)
}
