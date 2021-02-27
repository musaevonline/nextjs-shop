import {
	ApolloClient,
	ApolloLink,
	defaultDataIdFromObject,
	// HttpLink,
	InMemoryCache
} from '@apollo/client'
import { NextPageContext } from 'next'
import createWithApollo from './createWithApollo'
import { ErrorResponse, onError } from '@apollo/client/link/error'
import { isJwtError } from '@temp/core/errors'
import { authLink, removeAuthToken } from '@temp/core/auth'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import { apiUrl } from '@temp/constants'
import { RetryLink } from '@apollo/client/link/retry'

interface ResponseError extends ErrorResponse {
	networkError?: Error & {
		statusCode?: number
		bodyText?: string
	}
}

const invalidTokenLink = onError((error: ResponseError) => {
	console.log(error)
	try {
		if (
			(error.networkError && error.networkError.statusCode === 401) ||
			error.graphQLErrors?.some(isJwtError)
		) {
			removeAuthToken()
		}
	} catch (e) {
		console.log(e)
	}
})

const batchLink = new BatchHttpLink({ uri: apiUrl, batchInterval: 50 })
const link = ApolloLink.from([
	invalidTokenLink,
	authLink,
	new RetryLink(),
	batchLink
])
const cache = new InMemoryCache({
	dataIdFromObject: (obj) => {
		if (obj.__typename === 'Shop') {
			return 'shop'
		}
		return defaultDataIdFromObject(obj)
	}
})

const createClient = (ctx: NextPageContext | undefined) => {
	return new ApolloClient({
		link: link,
		credentials: 'include',
		headers: {
			// cookie: ssrMode ? ctx?.req?.headers.cookie || '' : ''
			cookie: ctx?.req?.headers.cookie || ''
		},
		cache: cache,
		ssrMode: true,
		ssrForceFetchDelay: 100
	})
}

export const withApollo = createWithApollo(createClient)
