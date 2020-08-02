import React from "react";
import { useIntl } from "react-intl";
import {Route, RouteComponentProps, Switch} from "react-router-dom";
import { parse as parseQs } from "qs";

import {sectionNames} from "@temp/intl";
import {WindowTitle} from "@temp/components/WindowTitle";
import {
    productAddPath, productImagePath, ProductImageUrlQueryParams,
    productListPath,
    productPath,
    ProductUrlQueryParams, productVariantAddPath,
    productVariantCreatorPath, productVariantEditPath, ProductVariantEditUrlQueryParams
} from "@temp/sections/products/urls";
import {ProductListView} from "@temp/sections/products/views/ProductList";
import ProductCreateView from "@temp/sections/products/views/ProductCreateView";
import {ProductUpdateView} from "@temp/sections/products/views/ProductUpdate";
import {ProductVariantCreatorComponent} from "@temp/sections/products/views/ProductVariantCreator";
import ProductVariantCreateComponent from "./views/ProductVariantCreate";
import ProductVariantComponent from "./views/ProductVariant";
import ProductImageComponent from "./views/ProductImage";

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

const ProductVariantCreate: React.FC<RouteComponentProps<any>> = ({
                                                                      match
                                                                  }) => (
    <ProductVariantCreateComponent
        productId={decodeURIComponent(match.params.id)}
    />
);

const ProductVariant: React.FC<RouteComponentProps<any>> = ({ match }) => {
    const qs = parseQs(location.search.substr(1));
    const params: ProductVariantEditUrlQueryParams = qs;

    return (
        <ProductVariantComponent
            variantId={decodeURIComponent(match.params.variantId)}
            productId={decodeURIComponent(match.params.productId)}
            params={params}
        />
    );
};

const ProductImage: React.FC<RouteComponentProps<any>> = ({
  location,
  match
}) => {
  const qs = parseQs(location.search.substr(1));
  const params: ProductImageUrlQueryParams = qs;

  return (
    <ProductImageComponent
      imageId={decodeURIComponent(match.params.imageId)}
      productId={decodeURIComponent(match.params.productId)}
      params={params}
    />
  );
};

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
                <Route
                    exact
                    path={productVariantAddPath(":id")}
                    component={ProductVariantCreate}
                />
                <Route
                    path={productVariantEditPath(":productId", ":variantId")}
                    component={ProductVariant}
                />
                <Route
                    path={productImagePath(":productId", ":imageId")}
                    component={ProductImage}
                />

                <Route path={productPath(":id")} component={ProductUpdate} />
            </Switch>
        </>
    );
};

export default ProductsSectionComponent;
