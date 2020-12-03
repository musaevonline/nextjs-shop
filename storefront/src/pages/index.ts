import {HomePage} from "../views/Home";
import {shopQuery} from "@sdk/queries/shop";
import { initializeApollo, addApolloState } from '../apollo-client'
import {categoriesQuery} from "@sdk/queries/category";
import {pagesQuery} from "@sdk/queries/page";

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: shopQuery,
    nextFetchPolicy: "cache-first"
  })
  await apolloClient.query({
    query: categoriesQuery,
    variables: {
      level: 0
    },
    nextFetchPolicy: "cache-first"
  })
  await apolloClient.query({
    query: pagesQuery,
    variables: {
      first: 5
    },
    nextFetchPolicy: "cache-first"
  })
  return addApolloState(apolloClient, {
    props: {}
  })
}
export default HomePage;