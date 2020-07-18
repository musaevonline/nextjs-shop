import React, {useCallback} from "react";
import {BooleanParam, NumberParam, StringParam, useQueryParams} from "use-query-params";
import Container from "@temp/components/Container";
import {CategoryListUrlQueryParams} from "@temp/sections/categories/urls";
import {CategoryListPage} from "@temp/sections/categories/components/CategoryListPage";

const View:React.FC = () => {
    const [query, setQuery] = useQueryParams({
        sort: StringParam,
        asc: BooleanParam,
        activeTab: StringParam,
        action: StringParam,
        query: StringParam,
        after: StringParam,
        before: StringParam,
        first: NumberParam
    });

    const changeUrlParams = useCallback((params: CategoryListUrlQueryParams) => {
        setQuery(params, 'replaceIn');
    }, []);

    return(
        <Container>
            <CategoryListPage params={query as CategoryListUrlQueryParams}
                              changeUrlParams={changeUrlParams}/>
        </Container>
    )
};

export default View;