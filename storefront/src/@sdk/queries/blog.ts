import { gql } from "@apollo/client";
import { blogArticleFragment, blogCategoryFragment } from "@sdk/fragments/blog";
import { pageInfoFragment } from "@sdk/fragments/page-info";
import makeQuery from "@temp/hooks/makeQuery";
import {
  BlogCategory,
  BlogCategoryVariables,
} from "@sdk/queries/types/BlogCategory";
import {
  BlogArticle,
  BlogArticleVariables,
} from "@sdk/queries/types/BlogArticle";
import {
  BlogCategoryList,
  BlogCategoryListVariables,
} from "@sdk/queries/types/BlogCategoryList";
import {
  BlogArticleList,
  BlogArticleListVariables,
} from "@sdk/queries/types/BlogArticleList";
import {
  BlogCategoryListWithArticles,
  BlogCategoryListWithArticlesVariables,
} from "@sdk/queries/types/BlogCategoryListWithArticles";

export const blogCategoryQuery = gql`
  ${blogCategoryFragment}
  query BlogCategory($slug: String, $id: ID) {
    blogCategory(slug: $slug, id: $id) {
      ...BlogCategoryFragment
    }
  }
`;

export const useBlogCategoryQuery = makeQuery<
  BlogCategory,
  BlogCategoryVariables
>(blogCategoryQuery);

export const blogArticleQuery = gql`
  ${blogArticleFragment}
  query BlogArticle($slug: String, $id: ID) {
    blogArticle(slug: $slug, id: $id) {
      ...BlogArticleFragment
      category {
        id
        slug
        name
      }
    }
  }
`;

export const useBlogArticleQuery = makeQuery<BlogArticle, BlogArticleVariables>(
  blogArticleQuery
);

export const blogCategoryListQuery = gql`
  ${pageInfoFragment}
  ${blogCategoryFragment}
  query BlogCategoryList(
    $first: Int!
    $filter: BlogCategoryFilterInput
    $sortBy: BlogCategoryOrder
    $after: String
  ) {
    blogCategoryList(
      first: $first
      filter: $filter
      sortBy: $sortBy
      after: $after
    ) {
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          ...BlogCategoryFragment
        }
      }
    }
  }
`;
export const blogCategoryListWithArticlesQuery = gql`
  ${pageInfoFragment}
  ${blogCategoryFragment}
  ${blogArticleFragment}
  query BlogCategoryListWithArticles(
    $first: Int!
    $filter: BlogCategoryFilterInput
    $sortBy: BlogCategoryOrder
    $after: String
  ) {
    blogCategoryList(
      first: $first
      filter: $filter
      sortBy: $sortBy
      after: $after
    ) {
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          ...BlogCategoryFragment
          articles(first: 10) {
            edges {
              node {
                ...BlogArticleFragment
              }
            }
          }
        }
      }
    }
  }
`;

export const useBlogCategoryListWithArticlesQuery = makeQuery<
  BlogCategoryListWithArticles,
  BlogCategoryListWithArticlesVariables
>(blogCategoryListWithArticlesQuery);

export const useBlogCategoryListQuery = makeQuery<
  BlogCategoryList,
  BlogCategoryListVariables
>(blogCategoryListQuery);

export const blogArticleListQuery = gql`
  ${pageInfoFragment}
  ${blogArticleFragment}
  query BlogArticleList(
    $first: Int
    $last: Int
    $filter: BlogArticleFilterInput
    $sortBy: BlogArticleOrder
    $after: String
    $before: String
  ) {
    blogArticleList(
      first: $first
      last: $last
      filter: $filter
      sortBy: $sortBy
      after: $after
      before: $before
    ) {
      totalCount
      pageInfo {
        ...PageInfoFragment
      }
      edges {
        node {
          ...BlogArticleFragment
          category {
            id
            slug
            name
          }
        }
      }
    }
  }
`;

export const useBlogArticleListQuery = makeQuery<
  BlogArticleList,
  BlogArticleListVariables
>(blogArticleListQuery);
