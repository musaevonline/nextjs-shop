import makeQuery from "@temp/hooks/makeQuery";
import {gql} from "@apollo/client";

import { pageInfoFragment } from "@temp/queries";
import {BlogList, BlogListVariables} from "@temp/sections/blog/types/BlogList";
import {Blog, BlogVariables} from "@temp/sections/blog/types/Blog";
import {BlogCategoryList, BlogCategoryListVariables} from "@temp/sections/blog/types/BlogCategoryList";
import {BlogCategory, BlogCategoryVariables} from "@temp/sections/blog/types/BlogCategory";
import {BlogArticleList, BlogArticleListVariables} from "@temp/sections/blog/types/BlogArticleList";
import {BlogArticle, BlogArticleVariables} from "@temp/sections/blog/types/BlogArticle";

export const blogFragment = gql`
    fragment BlogFragment on BlogType {
        id
        slug
        name
        description
        isPublished
        thumbnail{
            alt
            url
        }
    }
`;

const blogList = gql`
    ${blogFragment}
    ${pageInfoFragment}
    query BlogList(
        $first: Int
        $after: String
        $last: Int
        $before: String
    ) {
        blogList(first: $first, after: $after, last: $last, before: $before) {
            edges {
                node {
                    ...BlogFragment
                }
            }
            pageInfo {
                ...PageInfoFragment
            }
        }
    }
`;
export const useBlogList = makeQuery<
    BlogList,
    BlogListVariables
    >(blogList);

const blog = gql`
    ${blogFragment}
    query Blog($id: ID!) {
        blog(id: $id) {
            ...BlogFragment
        }
    }
`;
export const useBlog = makeQuery<Blog, BlogVariables>(
    blog
);


export const blogCategoryFragment = gql`
    fragment BlogCategoryFragment on BlogCategoryType {
        id
        slug
        name
        description
        isPublished
        thumbnail{
            alt
            url
        }
    }
`;

const blogCategoryList = gql`
    ${blogCategoryFragment}
    ${pageInfoFragment}
    query BlogCategoryList(
        $first: Int
        $after: String
        $last: Int
        $before: String
    ) {
        blogCategoryList(first: $first, after: $after, last: $last, before: $before) {
            edges {
                node {
                    ...BlogCategoryFragment
                }
            }
            pageInfo {
                ...PageInfoFragment
            }
        }
    }
`;
export const useBlogCategoryList = makeQuery<
    BlogCategoryList,
    BlogCategoryListVariables
    >(blogCategoryList);

const blogCategory = gql`
    ${blogCategoryFragment}
    query BlogCategory($id: ID!) {
        blogCategory(id: $id) {
            ...BlogCategoryFragment
        }
    }
`;
export const useBlogCategory = makeQuery<BlogCategory, BlogCategoryVariables>(
    blogCategory
);

export const blogArticleFragment = gql`
    fragment BlogArticleFragment on BlogArticleType {
        id
        slug
        title
        body
        isPublished
        thumbnail{
            alt
            url
        }
    }
`;

const blogArticleList = gql`
    ${blogArticleFragment}
    ${pageInfoFragment}
    query BlogArticleList(
        $first: Int
        $after: String
        $last: Int
        $before: String
    ) {
        blogArticleList(first: $first, after: $after, last: $last, before: $before) {
            edges {
                node {
                    ...BlogArticleFragment
                }
            }
            pageInfo {
                ...PageInfoFragment
            }
        }
    }
`;
export const useBlogArticleList = makeQuery<
    BlogArticleList,
    BlogArticleListVariables
    >(blogArticleList);

const blogArticle = gql`
    ${blogArticleFragment}
    query BlogArticle($id: ID!) {
        blogArticle(id: $id) {
            ...BlogArticleFragment
        }
    }
`;
export const useBlogArticle = makeQuery<BlogArticle, BlogArticleVariables>(
    blogArticle
);
