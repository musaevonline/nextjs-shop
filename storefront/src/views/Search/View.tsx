import React from "react";
import Page from "./Page";
import {ProductsCardDetails, ProductsCardDetailsVariables} from "@sdk/queries/types/ProductsCardDetails";
import {productsCardQuery} from "@sdk/queries/product";
import {useQuery} from "@apollo/react-hooks";
import {useQueryParams, StringParam} from "use-query-params";
import _ from "lodash";

const PAGINATE_BY = 20;

const View:React.FC = () => {
    const [query] = useQueryParams({
        q: StringParam
    });

    const {data, fetchMore, loading} = useQuery<ProductsCardDetails, ProductsCardDetailsVariables>(productsCardQuery, {
        variables:{
            first: PAGINATE_BY,
            filter:{
                search: query.q
            },
        },
        skip: !query.q || query.q.length < 2
    });

    const loadMore = async (): Promise<void> =>{
        await fetchMore({
            variables: {
                first: PAGINATE_BY,
                after: data.products.pageInfo.endCursor
            },
            updateQuery: (previousResult:ProductsCardDetails, { fetchMoreResult = {} }) => {
                if (!previousResult){
                    return fetchMoreResult
                }
                const copy = _.cloneDeep(previousResult);
                return {
                    products: {
                        ...copy.products,
                        edges: [...copy.products.edges, ...fetchMoreResult.products.edges],
                        pageInfo: fetchMoreResult.products.pageInfo,
                    },
                };
            }
        })
    };

    console.log(data);

    return(
        <>
            <Page products={data?.products}
                  loading={loading}
                  loadMore={loadMore}
            />
        </>
    )
};

export default View;