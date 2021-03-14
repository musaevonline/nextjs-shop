import { useEffect } from 'react'
import { Router } from 'next/router'

const useRouteHistory = () => {
	const routeChangeComplete = () => {
		window.scroll({
			top: 0,
			left: 0,
			behavior: 'smooth'
		})
	}
	useEffect(() => {
		Router.events.on('routeChangeComplete', routeChangeComplete)

		return () => {
			Router.events.off('routeChangeComplete', routeChangeComplete)
		}
	}, [])
}

export default useRouteHistory
