import * as React from 'react'

import './scss/Loader.scss'

const Loader: React.FC<{
	full?: boolean
	height?: string
	absolute?: boolean
}> = ({ full, height, absolute }) => {
	const getHeight = () => {
		return '100vh'
		// const headerHeight =
		//     document.getElementById("header") &&
		//     document.getElementById("header").offsetHeight;
		// const footerHeight =
		//     document.getElementById("footer") &&
		//     document.getElementById("footer").offsetHeight;
		// return window.innerHeight - headerHeight - footerHeight;
	}
	const style = full ? { height: getHeight() } : height ? { height } : {}
	if (absolute) style['position'] = 'absolute'
	return (
		<div className='loader' style={style}>
			<div className='loader__items'>
				<span />
				<span />
				<span />
			</div>
		</div>
	)
}

export default Loader
