import React, {useCallback} from "react";
import Container from "@temp/components/Container";
import {ProductListPage} from "@temp/sections/products/components/ProductListPage";
import {BooleanParam, StringParam, useQueryParams, NumberParam} from "use-query-params";
import {ProductListUrlQueryParams} from "@temp/sections/products/urls";


const View:React.FC = () => {
    const [query, setQuery] = useQueryParams({
        sort: StringParam,
        asc: BooleanParam,
        activeTab: NumberParam,
        action: StringParam,
        query: StringParam,
        after: StringParam,
        before: StringParam
    });

    const changeUrlParams = useCallback((params: ProductListUrlQueryParams) => {
        setQuery(params, 'replaceIn');
    }, []);

    return(
        <Container>
            <ProductListPage params={query as ProductListUrlQueryParams} changeUrlParams={changeUrlParams}/>
        </Container>
    )
};

export default View;