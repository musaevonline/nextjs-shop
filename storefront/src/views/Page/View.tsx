import React from 'react'
import { MetaWrapper } from '@temp/components'
import Page from '@temp/views/Page/Page'
import { usePage } from '@sdk/queries/page'
import { useRouter } from 'next/router'
import { cleanTextForMeta } from '@temp/misc'
import Loader from '@temp/components/Loader'

const View: React.FC = () => {
	const router = useRouter()
	const { data: pageData, loading: pageLoading } = usePage({
		variables: {
			slug: router.query?.slug as string
		}
	})
	return (
		<MetaWrapper
			meta={{
				title: pageData?.page.title || '',
				description: cleanTextForMeta(pageData?.page?.content, 150, true)
			}}
		>
			{!pageData && <Loader full={!pageData} absolute={!!pageData} />}
			<Page page={pageData?.page} loading={pageLoading} />
		</MetaWrapper>
	)
}

export default View
