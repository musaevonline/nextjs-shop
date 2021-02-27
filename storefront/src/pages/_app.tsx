import '../globalStyles/scss/index.scss'

import React from 'react'
import { NextQueryParamProvider } from '@temp/components/NextQueryParamProvider'
import { App as StorefrontApp } from '@temp/app'
import { SnackbarProvider } from 'notistack'
import { Router, StaticRouter } from 'react-router-dom'
import { ShopProvider } from '@temp/components/Shop'
import CheckoutProvider from '@temp/components/CheckoutProvider'
import UserProvider from '@temp/components/User'
import { OverlayProvider } from '@temp/components'
import FavoritesProvider from '@temp/components/FavoritesProvider'
import { ErrorBoundary } from 'react-error-boundary'
import { defaultTheme } from '@temp/themes'
import { ThemeProvider } from '@material-ui/core/styles'
import { ssrMode } from '@temp/constants'
import { history } from '@temp/history'
import { AppProps } from 'next/app'
import { withApollo } from '@temp/core/withApollo'

const AppWithApollo = ({ Component, pageProps }: AppProps) => {
	// const apollo = useApollo(pageProps)
	const Root = withApollo({ ssr: true })((props) => {
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
										<ErrorBoundary
											FallbackComponent={ErrorFallback}
											// onReset={() => {
											//     apolloClient.resetStore()
											// }}
										>
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

	return (
		<ThemeProvider theme={defaultTheme}>
			<SnackbarProvider
				maxSnack={3}
				autoHideDuration={3000}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left'
				}}
				// domRoot={document.getElementById("react-notification")}
			>
				{ssrMode ? (
					<StaticRouter>
						<Root {...pageProps} />
					</StaticRouter>
				) : (
					<Router history={history}>
						<Root {...pageProps} />
					</Router>
				)}
			</SnackbarProvider>
		</ThemeProvider>
	)
}

export default AppWithApollo
