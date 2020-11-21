import React from "react";
import Loader from "@temp/components/Loader";
import {MetaWrapper} from "@temp/components";
import {useParams} from "react-router";
import {getGraphqlIdFromDBId} from "@temp/core/utils";
import {useQuery} from "@apollo/client";
import {productsCardQuery} from "@sdk/queries/product";
import Page from "@temp/views/Category/Page";
import {categoryQuery} from "@sdk/queries/category";
import _ from "lodash";
import {attributesQuery} from "@sdk/queries/attribute";
import {Attributes, AttributesVariables} from "@sdk/queries/types/Attributes";
import {Category, CategoryVariables} from "@sdk/queries/types/Category";
import {ProductsCardDetails, ProductsCardDetailsVariables} from "@sdk/queries/types/ProductsCardDetails";
import {DelimitedNumericArrayParam, JsonParam, ObjectParam, useQueryParams} from "use-query-params";
import {OrderDirection, ProductOrderField} from "@temp/types/globalTypes";
import {removeTags} from "@temp/misc";

const PAGINATE_BY = 20;

export type TUrlQuery = {
    attributes?: stateAttribute[] | null,
    priceRange?: number[],
    sortBy?:{
        field: ProductOrderField,
        direction: OrderDirection
    }
}

export type stateAttribute = {
    slug: string
    values: string[]
}

const View:React.FC = () => {
    const {pk} = useParams<{pk: string}>();
    const id = getGraphqlIdFromDBId(pk, "Category");

    const [query, setQuery] = useQueryParams({
        sortBy: ObjectParam,
        attributes: JsonParam,
        priceRange: DelimitedNumericArrayParam
    });
    const {data:categoryResponse} = useQuery<Category, CategoryVariables>(categoryQuery, {variables:{id}});
    const {data:productsResponse, fetchMore, loading} = useQuery<ProductsCardDetails, ProductsCardDetailsVariables>(productsCardQuery, {
        variables: {
            first: PAGINATE_BY,
            filter:{
                categories: [id],
                attributes: query.attributes,
                price:{
                    lte: query.priceRange ? query.priceRange[0] : 0,
                    gte: query.priceRange ? query.priceRange[1] : 99999
                },
            },
            sortBy: query.sortBy ? {
                field: query.sortBy?.field as ProductOrderField,
                direction: query.sortBy?.direction as OrderDirection,
            }: null
        },
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        notifyOnNetworkStatusChange: true
    });
    const {data: categoryAttributesData} = useQuery<Attributes, AttributesVariables>(attributesQuery, {
        variables:{
            first: 100,
            filter: {inCategory: id}
        }
    });

    const setFilters = (values: TUrlQuery):void => {
        setQuery({...query, ...values});
    };

    const loadMore = async (): Promise<void> =>{
        await fetchMore({
            variables: {
                first: PAGINATE_BY,
                after: productsResponse.products.pageInfo.endCursor
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
    return(
        <MetaWrapper
            meta={{
                description: removeTags(categoryResponse?.category?.description),
                title: categoryResponse?.category?.name,
                type: 'product.category',
                custom: [<link key="canonical" rel="canonical" href={window.location.href} />]
            }}
        >
            {(!productsResponse || !categoryResponse) && <Loader full={true}/>}
            {productsResponse && categoryResponse &&
            <Page products={productsResponse.products}
                  category={categoryResponse.category}
                  attributes={categoryAttributesData?.attributes}
                  loadMore={loadMore}
                  filters={query as TUrlQuery}
                  setFilters={setFilters}
                  loading={loading}
            />
            }
        </MetaWrapper>
    );
};

export default View;