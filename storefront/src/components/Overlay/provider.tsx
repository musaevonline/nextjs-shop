import React from 'react'
import {
	InnerOverlayContextInterface,
	OverlayContext,
	OverlayTheme,
	OverlayType
} from './context'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const NOTIFICATION_CLOSE_DELAY = 2500

const OverlayProvider: React.FC = ({ children }) => {
	const router = useRouter()
	const [context, setContext] = useState(null)
	const [theme, setTheme] = useState(null)
	const [type, setType] = useState(null)
	useEffect(() => {
		if (type !== OverlayType.message) {
			setType(null)
		}
	}, [router.pathname])

	const handleShow = useCallback(
		(
			type: OverlayType,
			theme?: OverlayTheme,
			context?: InnerOverlayContextInterface
		) => {
			setType(type)
			setTheme(theme)
			setContext(context)
			if (type === OverlayType.message) {
				setTimeout(() => {
					setType(null)
				}, NOTIFICATION_CLOSE_DELAY)
			}
		},
		[]
	)
	const handleHide = useCallback(() => {
		setType(null)
	}, [])
	return (
		<OverlayContext.Provider
			value={{
				context,
				type,
				show: handleShow,
				hide: handleHide,
				theme
			}}
		>
			{children}
		</OverlayContext.Provider>
	)
}

export default OverlayProvider
