import React from 'react'
// import ReactViewer from 'react-viewer'
import dynamic from 'next/dynamic'
import { ssrMode } from '@temp/constants'

const ReactViewer = ssrMode ? () => null : dynamic(() => import('react-viewer'))

interface ViewerProps {
	isOpenViewer: boolean
	setIsOpenViewer(val: boolean): void
	galleryImages: { original: string }[]
	currImg: number
}

const Viewer: React.FC<ViewerProps> = ({
	isOpenViewer,
	galleryImages,
	setIsOpenViewer,
	currImg
}) => {
	return (
		<ReactViewer
			visible={isOpenViewer}
			onClose={() => {
				setIsOpenViewer(false)
			}}
			onMaskClick={() => {
				setIsOpenViewer(false)
			}}
			activeIndex={currImg}
			rotatable={false}
			scalable={false}
			noImgDetails={true}
			images={galleryImages.map((img) => ({
				src: img.original,
				alt: '',
				downloadUrl: img.original
			}))}
			zoomSpeed={0.1}
			minScale={1}
			maxScale={2}
			zIndex={1001}
			downloadInNewWindow
			downloadable
		/>
	)
}

export default Viewer
