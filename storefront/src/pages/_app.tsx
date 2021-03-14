import '../globalStyles/scss/index.scss'

import React, { useMemo } from 'react'
// import NextApp from 'next/app'
import { NextQueryParamProvider } from '@temp/components/NextQueryParamProvider'
import { App as StorefrontApp } from '@temp/app'
import { SnackbarProvider } from 'notistack'
import { ShopProvider } from '@temp/components/Shop'
import CheckoutProvider from '@temp/components/CheckoutProvider'
import UserProvider from '@temp/components/User'
import { OverlayProvider } from '@temp/components'
import FavoritesProvider from '@temp/components/FavoritesProvider'
import { ErrorBoundary } from 'react-error-boundary'
import {
	defaultTheme,
	desktopSsrMatchMedia,
	mobileSsrMatchMedia
} from '@temp/themes'
import { ssrMode } from '@temp/constants'
import { AppProps } from 'next/app'
import { withApollo } from '@temp/core/withApollo'
import { gtmId, isDev } from '@temp/core/config'
import TagManager from 'react-gtm-module'
// import UAParser from 'ua-parser-js'
import { ThemeProvider } from '@material-ui/styles'

async function initTagManager() {
	TagManager.initialize({
		gtmId: gtmId
	})
}

if (!ssrMode && !isDev && !!gtmId) {
	initTagManager().then(() => {
		console.log('App started! GTM initialized!')
	})
}

function ErrorFallback({ error, componentStack, resetErrorBoundary }) {
	console.log('error boundary', error)
	return (
		<div role='alert'>
			<p>Something went wrong:</p>
			<pre>{error.message}</pre>
			<pre>{componentStack}</pre>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	)
}

const AppWithApollo = ({ Component, pageProps }: AppProps) => {
	const Root = withApollo({ ssr: true })((props) => {
		return (
			<NextQueryParamProvider>
				{/*<ApolloProvider client={apollo}>*/}
				<ShopProvider>
					<CheckoutProvider>
						{({ checkoutContext }) => (
							<UserProvider
								refreshUser={true}
								onUserLogin={() => {
									checkoutContext.findUserCheckout()
								}}
								onUserLogout={() => {
									if (checkoutContext.checkout.token) {
										checkoutContext.resetCheckout()
									}
								}}
							>
								<OverlayProvider>
									<FavoritesProvider>
										<ErrorBoundary FallbackComponent={ErrorFallback}>
											<StorefrontApp>
												<Component {...pageProps} />
											</StorefrontApp>
										</ErrorBoundary>
									</FavoritesProvider>
								</OverlayProvider>
							</UserProvider>
						)}
					</CheckoutProvider>
				</ShopProvider>
				{/*</ApolloProvider>*/}
			</NextQueryParamProvider>
		)
	})
	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])
	const theme = useMemo(() => {
		return {
			...defaultTheme,
			props: {
				MuiUseMediaQuery: {
					ssrMatchMedia:
						pageProps.deviceType === 'mobile'
							? mobileSsrMatchMedia
							: desktopSsrMatchMedia
				}
			}
		}
	}, [pageProps.deviceType, defaultTheme])
	// useRouteHistory()
	return (
		<ThemeProvider theme={theme}>
			<SnackbarProvider
				maxSnack={3}
				autoHideDuration={3000}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				// domRoot={document.getElementById("react-notification")}
			>
				{/*{ssrMode ? (*/}
				{/*	<StaticRouter>*/}
				{/*		<Root {...pageProps} />*/}
				{/*	</StaticRouter>*/}
				{/*) : (*/}
				{/*	<Router history={history}>*/}
				{/*		<Root {...pageProps} />*/}
				{/*	</Router>*/}
				{/*)}*/}
				<Root {...pageProps} />
			</SnackbarProvider>
		</ThemeProvider>
	)
}

// AppWithApollo.getInitialProps = async (ctx) => {
// 	const initialProps = await NextApp.getInitialProps(ctx)
// 	const parser = new UAParser(ctx.ctx.req.headers['user-agent'])
// 	const deviceType = parser.getDevice().type || 'desktop'
// 	return { pageProps: { ...initialProps, deviceType } }
// }

export default AppWithApollo
