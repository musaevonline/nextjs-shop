import "./scss/index.scss";

import * as React from "react";

import {MetaWrapper} from "../../components";
import Page from "./Page";
import {productsCardQuery} from "@sdk/queries/product";
import {shopQuery} from "@sdk/queries/shop";
import {Shop} from "@sdk/queries/types/Shop";
import {OrderDirection, ProductOrderField} from "@temp/types/globalTypes";
import {ProductsCardDetails, ProductsCardDetailsVariables} from "@sdk/queries/types/ProductsCardDetails";
import {useQuery} from "@apollo/client";

const View: React.FC = () => {
    const shopDataQuery = useQuery<Shop>(shopQuery);
    const {data:newProductsData} = useQuery<ProductsCardDetails, ProductsCardDetailsVariables>(productsCardQuery, {
        variables: {first: 12, sortBy:{direction: OrderDirection.DESC, field: ProductOrderField.DATE }}
    });
    const {data:popularProductsData} = useQuery<ProductsCardDetails, ProductsCardDetailsVariables>(productsCardQuery, {
        variables: {first: 12, sortBy:{direction: OrderDirection.ASC, field: ProductOrderField.NAME }}
    });
    const shop = shopDataQuery.data?.shop;
    return(
        <MetaWrapper
            meta={{
                description: shop ? shop.description : "",
                title: shop ? shop.name : "",
            }}
        >
                <Page
                    loading={!shopDataQuery.data || !newProductsData}
                    newProducts={newProductsData?.products}
                    popularProducts={popularProductsData?.products}
                    shop={shop}
                />

        </MetaWrapper>
    );
}

export default View;