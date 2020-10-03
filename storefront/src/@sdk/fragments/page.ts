import {gql} from "@apollo/client";

export const pageFragment = gql`
fragment PageFragment on Page{
    id
    contentJson
    content
    isPublished
    created
    publicationDate
    slug
    title
}
`;