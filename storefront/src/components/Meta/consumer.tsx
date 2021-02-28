import * as React from 'react'
import Head from 'next/head'

import { Consumer as MetaConsumer } from './context'

const Consumer: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
	<MetaConsumer>
		{({ title, description, image, type, url, custom }) => (
			<>
				<Head>
					<title>{title}</title>
					<meta name='description' content={description} />
					<meta
						name='viewport'
						content='width=device-width, initial-scale=1.0'
					/>
					<meta name='og:url' content={url} />
					<meta name='og:title' content={title} />
					<meta name='og:description' content={description} />
					<meta name='og:type' content={type} />
					<meta name='og:image' content={image} />
					{custom?.map((el) => el)}
				</Head>
				{children}
			</>
		)}
	</MetaConsumer>
)

export default Consumer
