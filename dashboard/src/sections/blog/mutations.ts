import {gql} from "@apollo/client";
import makeMutation from "@temp/hooks/makeMutation";

import {blogArticleFragment, blogCategoryFragment} from "./queries";
import {DeleteBlogCategory, DeleteBlogCategoryVariables} from "@temp/sections/blog/types/DeleteBlogCategory";
import {
    BulkDeleteBlogCategory,
    BulkDeleteBlogCategoryVariables
} from "@temp/sections/blog/types/BulkDeleteBlogCategory";
import {CreateBlogCategory, CreateBlogCategoryVariables} from "@temp/sections/blog/types/CreateBlogCategory";
import {UpdateBlogCategory, UpdateBlogCategoryVariables} from "@temp/sections/blog/types/UpdateBlogCategory";
import {DeleteBlogArticle, DeleteBlogArticleVariables} from "@temp/sections/blog/types/DeleteBlogArticle";
import {CreateBlogArticle, CreateBlogArticleVariables} from "@temp/sections/blog/types/CreateBlogArticle";
import {UpdateBlogArticle, UpdateBlogArticleVariables} from "@temp/sections/blog/types/UpdateBlogArticle";
import {BulkDeleteBlogArticle, BulkDeleteBlogArticleVariables} from "@temp/sections/blog/types/BulkDeleteBlogArticle";

export const blogErrorFragment = gql`
    fragment BlogErrorFragment on BlogError {
        code
        field
    }
`;

const deleteBlogCategory = gql`
    ${blogErrorFragment}
    mutation DeleteBlogCategory($id: ID!) {
        blogCategoryDelete(id: $id) {
            errors: blogErrors {
                ...BlogErrorFragment
            }
        }
    }
`;
export const useBlogCategoryDelete = makeMutation<
    DeleteBlogCategory,
    DeleteBlogCategoryVariables
    >(deleteBlogCategory);

const bulkDeleteBlogCategory = gql`
    ${blogErrorFragment}
    mutation BulkDeleteBlogCategory($ids: [ID]!) {
        blogCategoryBulkDelete(ids: $ids) {
            errors: blogErrors {
                ...BlogErrorFragment
            }
        }
    }
`;
export const useBlogCategoryBulkDelete = makeMutation<
    BulkDeleteBlogCategory,
    BulkDeleteBlogCategoryVariables
    >(bulkDeleteBlogCategory);

const createBlogCategory = gql`
    ${blogErrorFragment}
    ${blogCategoryFragment}
    mutation CreateBlogCategory($input: BlogCategoryInput!) {
        blogCategoryCreate(input: $input) {
            errors: blogErrors {
                ...BlogErrorFragment
            }
            blogCategory {
                ...BlogCategoryFragment
            }
        }
    }
`;
export const useBlogCategoryCreate = makeMutation<
    CreateBlogCategory,
    CreateBlogCategoryVariables
    >(createBlogCategory);

const updateBlogCategory = gql`
    ${blogErrorFragment}
    ${blogCategoryFragment}
    mutation UpdateBlogCategory($id: ID!, $input: BlogCategoryInput!) {
        blogCategoryUpdate(id: $id, input: $input) {
            errors: blogErrors {
                ...BlogErrorFragment
            }
            blogCategory {
                ...BlogCategoryFragment
            }
        }
    }
`;
export const useBlogCategoryUpdate = makeMutation<
    UpdateBlogCategory,
    UpdateBlogCategoryVariables
    >(updateBlogCategory);

const deleteBlogArticle = gql`
    ${blogErrorFragment}
    mutation DeleteBlogArticle($id: ID!) {
        blogArticleDelete(id: $id) {
            errors: blogErrors {
                ...BlogErrorFragment
            }
        }
    }
`;
export const useBlogArticleDelete = makeMutation<
    DeleteBlogArticle,
    DeleteBlogArticleVariables
    >(deleteBlogArticle);

const bulkDeleteBlogArticle = gql`
    ${blogErrorFragment}
    mutation BulkDeleteBlogArticle($ids: [ID]!) {
        blogArticleBulkDelete(ids: $ids) {
            errors: blogErrors {
                ...BlogErrorFragment
            }
        }
    }
`;
export const useBlogArticleBulkDelete = makeMutation<
    BulkDeleteBlogArticle,
    BulkDeleteBlogArticleVariables
    >(bulkDeleteBlogArticle);

const createBlogArticle = gql`
    ${blogErrorFragment}
    ${blogArticleFragment}
    mutation CreateBlogArticle($input: BlogArticleInput!) {
        blogArticleCreate(input: $input) {
            errors: blogErrors {
                ...BlogErrorFragment
            }
            blogArticle {
                ...BlogArticleFragment
            }
        }
    }
`;
export const useBlogArticleCreate = makeMutation<
    CreateBlogArticle,
    CreateBlogArticleVariables
    >(createBlogArticle);

const updateBlogArticle = gql`
    ${blogErrorFragment}
    ${blogArticleFragment}
    mutation UpdateBlogArticle($id: ID!, $input: BlogArticleInput!) {
        blogArticleUpdate(id: $id, input: $input) {
            errors: blogErrors {
                ...BlogErrorFragment
            }
            blogArticle {
                ...BlogArticleFragment
            }
        }
    }
`;
export const useBlogArticleUpdate = makeMutation<
    UpdateBlogArticle,
    UpdateBlogArticleVariables
    >(updateBlogArticle);