import React from 'react'
import useShop from '@temp/hooks/useShop'
import { MetaWrapper } from '@temp/components'
import { useBlogArticleQuery } from '@sdk/queries/blog'
import BlogArticlePage from '@temp/views/Blog/BlogArticlePage'
import NotFound from '@temp/components/NotFound'
import { articleStructuredData } from '@temp/core/SEO/articleStructuredData'
import { useRouter } from 'next/router'
import { cleanTextForMeta } from '@temp/misc'

const BlogCategoryView: React.FC = () => {
	const shop = useShop()
	const router = useRouter()
	const { data, loading } = useBlogArticleQuery({
		variables: {
			slug: router.query?.slug as string
		}
	})

	if (!data?.blogArticle && !loading) return <NotFound />

	return (
		<MetaWrapper
			meta={{
				description: cleanTextForMeta(data?.blogArticle?.body || '', 150, true),
				title: data?.blogArticle?.title || ''
			}}
		>
			<script
				className='structured-data-list'
				dangerouslySetInnerHTML={{
					__html: articleStructuredData(data?.blogArticle, shop)
				}}
				type='application/ld+json'
			/>
			<BlogArticlePage article={data?.blogArticle} loading={loading} />
		</MetaWrapper>
	)
}

export default BlogCategoryView
