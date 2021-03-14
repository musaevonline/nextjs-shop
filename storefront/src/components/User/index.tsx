import { useApolloClient } from '@apollo/client'
import * as React from 'react'

import { getAuthToken, removeAuthToken, setAuthToken } from '../../core/auth'
import { UserContext } from './context'
import { tokenVeryficationMutation } from '@sdk/mutations/user'
import {
	VerifyToken,
	VerifyTokenVariables
} from '@sdk/mutations/types/VerifyToken'
import { TokenAuth_tokenCreate_user } from '@sdk/mutations/types/TokenAuth'
import { User } from '@sdk/fragments/types/User'
import { useCallback, useEffect, useState } from 'react'

// class UserProvider extends React.Component<
// 	{
// 		refreshUser: boolean
// 		apolloClient: ApolloClient<any>
// 		onUserLogin: () => void
// 		onUserLogout: () => void
// 		tokenExpirationHandler?(callback: () => void): void
// 	},
// 	UserContextInterface
// > {
// 	constructor(props) {
// 		super(props)
// 		if (props.tokenExpirationHandler) {
// 			props.tokenExpirationHandler(this.logout)
// 		}
// 		const token = getAuthToken()
// 		this.state = {
// 			authenticate: this.authenticate,
// 			errors: null,
// 			loading: !!token,
// 			login: this.login,
// 			logout: this.logout,
// 			updateUser: this.updateUser,
// 			token,
// 			user: null
// 		}
// 	}
//
// 	componentDidMount = () => {
// 		const { token } = this.state
// 		if (this.props.refreshUser && token) {
// 			this.authenticate(token)
// 		}
// 	}
//
// 	login = (token: string, user: TokenAuth_tokenCreate_user) => {
// 		this.setState({
// 			errors: null,
// 			loading: false,
// 			token,
// 			user
// 		})
// 		this.props.onUserLogin()
// 	}
//
// 	logout = () => {
// 		this.setState({ token: null, user: null })
// 		this.props.onUserLogout()
// 	}
//
// 	authenticate = async (token) => {
// 		this.setState({ loading: true })
// 		// const apolloClient = useApolloClient()
// 		const { apolloClient } = this.props
// 		let state = { errors: null, loading: false, token: null, user: null }
// 		console.log(apolloClient, state)
// 		try {
// 			const {
// 				data: {
// 					tokenVerify: { user }
// 				}
// 			} = await apolloClient.mutate<VerifyToken, VerifyTokenVariables>({
// 				mutation: tokenVeryficationMutation,
// 				variables: { token }
// 			})
// 			state = { ...state, user, token }
// 		} catch ({ message }) {
// 			state.errors = message
// 		}
//
// 		this.setState(state)
// 		if (!state.errors) {
// 			this.props.onUserLogin()
// 		} else {
// 			this.props.onUserLogout()
// 		}
// 	}
//
// 	updateUser = (user: User | null) => {
// 		this.setState({ user })
// 	}
//
// 	componentDidUpdate = () => {
// 		if (this.state.token) {
// 			setAuthToken(this.state.token)
// 		} else {
// 			removeAuthToken()
// 		}
// 	}
//
// 	render() {
// 		const { children } = this.props
// 		return (
// 			<UserContext.Provider value={this.state}>{children}</UserContext.Provider>
// 		)
// 	}
// }

interface IProps {
	refreshUser?: boolean
	onUserLogin: () => void
	onUserLogout: () => void
	tokenExpirationHandler?(callback: () => void): void
}

const UserProvider: React.FC<IProps> = ({
	children,
	tokenExpirationHandler,
	onUserLogin,
	onUserLogout,
	refreshUser
}) => {
	const apolloClient = useApolloClient()
	const [errors, setErrors] = useState(null)
	const [token, setToken] = useState<string | null>(getAuthToken())
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(!!token)

	useEffect(() => {
		if (tokenExpirationHandler) {
			tokenExpirationHandler(logout)
		}
	}, [tokenExpirationHandler])

	useEffect(() => {
		if (refreshUser && token) {
			authenticate(token)
		}
	}, [token])

	useEffect(() => {
		if (token) {
			setAuthToken(token)
		} else {
			removeAuthToken()
		}
	}, [token])

	const login = useCallback(
		(token: string, user: TokenAuth_tokenCreate_user) => {
			setErrors(null)
			setLoading(false)
			setToken(token)
			setUser(user)
			onUserLogin()
		},
		[]
	)

	const logout = useCallback(() => {
		setToken(null)
		setUser(null)
		onUserLogout()
	}, [])

	const authenticate = useCallback(
		async (token: string) => {
			setLoading(true)
			try {
				const {
					data: {
						tokenVerify: { user }
					}
				} = await apolloClient.mutate<VerifyToken, VerifyTokenVariables>({
					mutation: tokenVeryficationMutation,
					variables: { token }
				})
				setErrors(null)
				setToken(token)
				setUser(user)
				setLoading(false)
				onUserLogin()
			} catch ({ message }) {
				setErrors(message)
				setLoading(false)
				onUserLogout()
			}
		},
		[user]
	)

	const updateUser = useCallback((user: User | null) => {
		setUser(user)
	}, [])
	return (
		<UserContext.Provider
			value={{
				token,
				user,
				authenticate,
				errors,
				loading,
				login,
				logout,
				updateUser
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export default UserProvider
