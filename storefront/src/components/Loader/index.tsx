import * as React from 'react'

import './scss/Loader.scss'
import { ssrMode } from '@temp/constants'

const Loader: React.FC<{
	full?: boolean
	height?: string
	absolute?: boolean
}> = ({ full, height, absolute }) => {
	if (ssrMode) return null
	const style = full ? { height: '100vh' } : height ? { height } : {}
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
