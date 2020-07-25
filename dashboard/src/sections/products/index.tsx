import React from "react";
import { useIntl } from "react-intl";
import {Route, RouteComponentProps, Switch} from "react-router-dom";
import { parse as parseQs } from "qs";

import {sectionNames} from "@temp/intl";
import {WindowTitle} from "@temp/components/WindowTitle";
import {
    productAddPath,
    productListPath,
    productPath,
    ProductUrlQueryParams,
    productVariantCreatorPath
} from "@temp/sections/products/urls";
import {ProductListView} from "@temp/sections/products/views/ProductList";
import ProductCreateView from "@temp/sections/products/views/ProductCreateView";
import {ProductUpdateView} from "@temp/sections/products/views/ProductUpdate";
import {ProductVariantCreatorComponent} from "@temp/sections/products/views/ProductVariantCreator";

const ProductUpdate: React.FC<RouteComponentProps<any>> = ({ match }) => {
  const qs = parseQs(location.search.substr(1));
  const params: ProductUrlQueryParams = qs;

  return (
    <ProductUpdateView
      id={decodeURIComponent(match.params.id)}
      params={params}
    />
  );
};

const ProductVariantCreator: React.FC<RouteComponentProps<{
  id: string;
}>> = ({ match }) => (
  <ProductVariantCreatorComponent id={decodeURIComponent(match.params.id)} />
);

const ProductsSectionComponent = () => {
    const intl = useIntl();

    return (
        <>
            <WindowTitle title={intl.formatMessage(sectionNames.products)} />
            <Switch>
                <Route exact path={productListPath} component={ProductListView} />
                <Route exact path={productAddPath} component={ProductCreateView} />

                <Route
          path={productVariantCreatorPath(":id")}
          component={ProductVariantCreator}
        />

                <Route path={productPath(":id")} component={ProductUpdate} />
            </Switch>
        </>
    );
};

export default ProductsSectionComponent;
