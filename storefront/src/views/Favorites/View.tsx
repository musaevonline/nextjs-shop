import React, {useContext} from "react";
import Page from "./Page";
import {useQuery} from "@apollo/react-hooks";
import {productsCardQuery} from "@sdk/queries/product";
import {ProductsCardDetails, ProductsCardDetailsVariables} from "@sdk/queries/types/ProductsCardDetails";
import {FavoritesContext} from "@temp/components/FavoritesProvider/context";
import _ from "lodash";

const PAGINATE_BY = 10;
const View:React.FC = () => {
    const {favorites} = useContext(FavoritesContext);

    const {data:products, loading, fetchMore} = useQuery<ProductsCardDetails, ProductsCardDetailsVariables>(productsCardQuery, {
        variables:{
            first: PAGINATE_BY,
            ids: favorites.slice(0, PAGINATE_BY)
        },
        skip: !favorites.length
    });

    const loadMore = async () =>{
        await fetchMore({
            variables: {
                first: PAGINATE_BY,
                ids: favorites.slice(products.products.edges.length, products.products.edges.length + PAGINATE_BY)
            },
            updateQuery: (previousResult, { fetchMoreResult = {} }) => {
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

    return(
        <>
            <Page products={products?.products}
                  loading={loading}
                  loadMore={loadMore}
                  hasMore={favorites.length > products?.products.edges.length}/>
        </>
    )
};

export default View;