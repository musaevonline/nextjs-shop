import React from 'react'
import { Header } from '@temp/components/Header'
import { Footer } from '@temp/components/Footer'
import { ScrollTopButton } from '@temp/components/ScrollTopButton'
import ScrollToTop from '@temp/components/ScrollToTop/ScrollToTop'
import { StickyContainer } from 'react-sticky'
import { Overlay, OverlayContext } from '@temp/components'

const App = ({ children }) => {
	const overlay = React.useContext(OverlayContext)
	return (
		<>
			<ScrollToTop />
			<StickyContainer>
				<header className='header'>
					<Header />
				</header>
				<main className='main'>{children}</main>
				<ScrollTopButton />
				<Footer />
				<Overlay context={overlay} />
			</StickyContainer>
		</>
	)
}

export default App
