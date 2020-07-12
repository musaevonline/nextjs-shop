import React from "react";
import { useIntl } from "react-intl";
import {Route, Switch} from "react-router-dom";

import {sectionNames} from "@temp/intl";
import {WindowTitle} from "@temp/components/WindowTitle";
import {productListPath} from "@temp/sections/products/urls";
import {ProductListView} from "@temp/sections/products/views/ProductList";

const ProductsSectionComponent = () => {
    const intl = useIntl();

    return (
        <>
            <WindowTitle title={intl.formatMessage(sectionNames.products)} />
            <Switch>
                <Route exact path={productListPath} component={ProductListView} />
            </Switch>
        </>
    );
};

export default ProductsSectionComponent;
