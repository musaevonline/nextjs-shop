import React, { useEffect } from 'react'
import { ssrMode } from '@temp/constants'
import { useRouter } from 'next/router'

const ScrollToTop: React.FC = () => {
	const { pathname } = useRouter()

	useEffect(() => {
		if (!ssrMode) {
			window.scrollTo({
				left: 0,
				top: 0,
				behavior: 'smooth'
			})
		}
	}, [pathname])

	return null
}

export default ScrollToTop
