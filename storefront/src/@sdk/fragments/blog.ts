import { gql } from "@apollo/client";

export const blogCategoryFragment = gql`
  fragment BlogCategoryFragment on BlogCategoryType {
    id
    slug
    name
    description
    thumbnail(size: "800x450", method: CROP_WEBP) {
      url
      alt
    }
  }
`;

export const blogArticleFragment = gql`
  fragment BlogArticleFragment on BlogArticleType {
    id
    slug
    title
    subtitle
    keywords
    tags
    status
    body
    dateAdded
    datePublished
    authorName
    category {
      id
      slug
    }
    thumbnail(size: "800x450", method: CROP_WEBP) {
      url
      alt
    }
  }
`;
