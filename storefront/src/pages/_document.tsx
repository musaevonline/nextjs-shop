import React from 'react'

import Document, { Html, Head, Main, NextScript } from 'next/document'
import { apiUrl } from '@temp/constants'
import { ServerStyleSheets } from '@material-ui/styles'

export default class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel='preconnect' href={apiUrl} />
					<link
						rel='apple-touch-icon'
						sizes='57x57'
						href='/_next/static/images/favicons/apple-touch-icon-57x57.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='60x60'
						href='/_next/static/images/favicons/apple-touch-icon-60x60.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='72x72'
						href='/_next/static/images/favicons/apple-touch-icon-72x72.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='76x76'
						href='/_next/static/images/favicons/apple-touch-icon-76x76.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='114x114'
						href='/_next/static/images/favicons/apple-touch-icon-114x114.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='120x120'
						href='/_next/static/images/favicons/apple-touch-icon-120x120.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='144x144'
						href='/_next/static/images/favicons/apple-touch-icon-144x144.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='152x152'
						href='/_next/static/images/favicons/apple-touch-icon-152x152.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='167x167'
						href='/_next/static/images/favicons/apple-touch-icon-167x167.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='180x180'
						href='/_next/static/images/favicons/apple-touch-icon-180x180.png'
					/>
					<link
						rel='apple-touch-icon'
						sizes='1024x1024'
						href='/_next/static/images/favicons/apple-touch-icon-1024x1024.png'
					/>
					<link
						rel='apple-touch-startup-image'
						media='(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 1)'
						href='/_next/static/images/favicons/apple-touch-startup-image-320x460.png'
					/>
					<link
						rel='apple-touch-startup-image'
						media='(device-width: 320px) and (device-height: 480px) and (-webkit-device-pixel-ratio: 2)'
						href='/_next/static/images/favicons/apple-touch-startup-image-640x920.png'
					/>
					<link
						rel='apple-touch-startup-image'
						media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'
						href='/_next/static/images/favicons/apple-touch-startup-image-640x1096.png'
					/>
					<link
						rel='apple-touch-startup-image'
						media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)'
						href='/_next/static/images/favicons/apple-touch-startup-image-750x1294.png'
					/>
					<link
						rel='apple-touch-startup-image'
						media='(device-width: 414px) and (device-height: 736px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 3)'
						href='/_next/static/images/favicons/apple-touch-startup-image-1182x2208.png'
					/>
					<link
						rel='apple-touch-startup-image'
						media='(device-width: 414px) and (device-height: 736px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 3)'
						href='/_next/static/images/favicons/apple-touch-startup-image-1242x2148.png'
					/>
					<link
						rel='apple-touch-startup-image'
						media='(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 1)'
						href='/_next/static/images/favicons/apple-touch-startup-image-748x1024.png'
					/>
					<link
						rel='apple-touch-startup-image'
						media='(device-width: 768px) and (device-height: 1024px) and (orientation: landscape) and (-webkit-device-pixel-ratio: 2)'
						href='/_next/static/images/favicons/apple-touch-startup-image-1496x2048.png'
					/>
					<link
						rel='apple-touch-startup-image'
						media='(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 1)'
						href='/_next/static/images/favicons/apple-touch-startup-image-768x1004.png'
					/>
					<link
						rel='apple-touch-startup-image'
						media='(device-width: 768px) and (device-height: 1024px) and (orientation: portrait) and (-webkit-device-pixel-ratio: 2)'
						href='/_next/static/images/favicons/apple-touch-startup-image-1536x2008.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='16x16'
						href='/_next/static/images/favicons/favicon-16x16.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='32x32'
						href='/_next/static/images/favicons/favicon-32x32.png'
					/>
					<link
						rel='icon'
						type='image/png'
						sizes='228x228'
						href='/_next/static/images/favicons/coast-228x228.png'
					/>
					<link
						rel='manifest'
						href='/_next/static/images/favicons/manifest.json'
					/>
					<link
						rel='shortcut icon'
						href='/_next/static/images/favicons/favicon.ico'
					/>
					<link
						rel='yandex-tableau-widget'
						href='/_next/static/images/favicons/yandex-browser-manifest.json'
					/>
					<meta name='apple-mobile-web-app-capable' content='yes' />
					<meta
						name='apple-mobile-web-app-status-bar-style'
						content='black-translucent'
					/>
					<meta name='apple-mobile-web-app-title' />
					<meta name='application-name' />
					<meta name='mobile-web-app-capable' content='yes' />
					<meta name='msapplication-TileColor' content='#fff' />
					<meta
						name='msapplication-TileImage'
						content='/_next/static/images/favicons/mstile-144x144.png'
					/>
					<meta
						name='msapplication-config'
						content='/_next/static/images/favicons/browserconfig.xml'
					/>
					<meta name='theme-color' content='#fff' />
				</Head>
				<body>
					<Main />
					<NextScript />
					<div id='modal-root' />
				</body>
			</Html>
		)
	}
}

MyDocument.getInitialProps = async (ctx) => {
	const sheets = new ServerStyleSheets()
	const originalRenderPage = ctx.renderPage

	ctx.renderPage = () =>
		originalRenderPage({
			enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
		})

	const initialProps = await Document.getInitialProps(ctx)
	return {
		...initialProps,
		// Styles fragment is rendered after the app and page rendering finish.
		styles: [
			...React.Children.toArray(initialProps.styles),
			sheets.getStyleElement()
		]
	}
}
