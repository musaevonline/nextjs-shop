import React from "react";
import useShop from "@temp/hooks/useShop";
import {MetaWrapper} from "@temp/components";
import {useParams} from "react-router";
import {useBlogArticleQuery} from "@sdk/queries/blog";
import BlogArticlePage from "@temp/views/Blog/BlogArticlePage";
import NotFound from "@temp/components/NotFound";
import {articleStructuredData} from "@temp/core/SEO/articleStructuredData";


const BlogCategoryView:React.FC = () => {
    const shop = useShop();
    const {articleSlug} = useParams<{articleSlug: string}>()
    const {data, loading} = useBlogArticleQuery({
        variables: {
            slug: articleSlug
        }
    });

    if (!data?.blogArticle && !loading) return <NotFound/>

    return(
        <MetaWrapper
            meta={{
                description: shop ? shop.description : "",
                title: shop ? `${data?.blogArticle?.title} - ${shop.name}` : "",
            }}
        >
            <script className="structured-data-list" type="application/ld+json">
                {articleStructuredData(data?.blogArticle, shop)}
            </script>
            <BlogArticlePage article={data?.blogArticle} loading={loading}/>
        </MetaWrapper>
    )
};

export default BlogCategoryView;