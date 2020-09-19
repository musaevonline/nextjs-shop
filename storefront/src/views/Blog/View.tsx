import React, {useState} from "react";
import {MetaWrapper} from "@temp/components";
import useShop from "@temp/hooks/useShop";
import Page from "./Page";
import {useBlogArticleListQuery, useBlogCategoryListWithArticlesQuery} from "@sdk/queries/blog";
import {BlogArticleOrderField, OrderDirection} from "@temp/types/globalTypes";

const ARTICLES_PAGINATE_BY = 4;

const View:React.FC = () => {
    const [page, setPage] = useState<number>(0);
    const [articlePaginateState, setArticlePaginateState] = useState({
        first: ARTICLES_PAGINATE_BY,
        last: undefined,
        before: undefined,
        after: undefined
    });
    const shop = useShop();
    const articlesData = useBlogArticleListQuery({
        variables: {
            ...articlePaginateState,
            filter: {isPublished: true},
            sortBy: {direction: OrderDirection.DESC, field: BlogArticleOrderField.DATE},
        }

    });
    const mainArticleData = useBlogArticleListQuery({
        variables: {
            first: 1,
            filter: {isPublished: true},
            sortBy: {direction: OrderDirection.DESC, field: BlogArticleOrderField.DATE},
        }

    });

    const blogCategoriesData = useBlogCategoryListWithArticlesQuery({
        variables: {
            first: 5
        }
    })

    const handleChangeArticlePage = (newPage: number) => {
        if (newPage > page) {
            setArticlePaginateState({
                first:ARTICLES_PAGINATE_BY,
                last: undefined,
                after: articlesData.data.blogArticleList.pageInfo.endCursor,
                before: undefined
            });
        }
        else if (newPage < page){
            setArticlePaginateState({
                first: undefined,
                last: ARTICLES_PAGINATE_BY,
                before: articlesData.data.blogArticleList.pageInfo.startCursor,
                after: undefined
            });
        }
        setPage(newPage);
    }

    return(
        <MetaWrapper
            meta={{
                description: shop ? shop.description : "",
                title: shop ? shop.name : "",
            }}
        >
            <Page articlesData={articlesData.data?.blogArticleList}
                  mainArticleData={mainArticleData.data?.blogArticleList.edges[0]?.node}
                  loading={articlesData.loading || blogCategoriesData.loading}
                  articlePage={page}
                  setArticlePage={handleChangeArticlePage}
                  blogCategoriesData={blogCategoriesData.data?.blogCategoryList}
            />
        </MetaWrapper>
    )
};

export default View;