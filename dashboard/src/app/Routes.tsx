import "../globalStyles/scss/index.scss";

import React from "react";
import {useIntl} from "react-intl";
import useAppState from "@temp/hooks/useAppState";
import {WindowTitle} from "@temp/components/WindowTitle";
import {commonMessages} from "@temp/intl";
import AuthProvider from "@temp/core/auth/AuthProvider";
import AppLayout from "@temp/components/AppLayout";
import {ErrorBoundary} from "react-error-boundary";
import {Route, Switch} from "react-router-dom";
import SectionRoute from "@temp/core/auth/components/SectionRoute";
import {HomePage} from "@temp/sections/Home";
import NotFound from "@temp/components/NotFound";
import LoginLoading from "@temp/core/auth/components/LoginLoading";
import Auth from "@temp/core/auth";
import {productListPath} from "@temp/sections/products/urls";
import ProductsSectionComponent from "@temp/sections/products";
import {categoryListPath} from "@temp/sections/categories/urls";
import CategoriesSectionComponent from "@temp/sections/categories";
import {PermissionEnum} from "@temp/types/globalTypes";
import ConfigurationSection, {createConfigurationMenu} from "@temp/configuration";
import {hasPermission} from "@temp/core/auth/misc";
import AttributeSection from "@temp/sections/attributes";
import {attributeSection} from "@temp/sections/attributes/urls";
import {productTypeListPath} from "@temp/sections/productTypes/urls";
import ProductTypesSection from "@temp/sections/productTypes";

const Routes: React.FC = () => {
    const intl = useIntl();
    const [, dispatchAppState] = useAppState();
    function ErrorFallback({error, componentStack, resetErrorBoundary}) {
        console.error('here', error);
        return (
            <div role="alert">
                <p>Something went wrong:</p>
                <pre>{error.message}</pre>
                <pre>{componentStack}</pre>
                <button onClick={resetErrorBoundary}>Try again</button>
            </div>
        )
    }

    return (
        <>
            <WindowTitle title={intl.formatMessage(commonMessages.dashboard)} />
            <AuthProvider>
                {({
                      hasToken,
                      isAuthenticated,
                      tokenAuthLoading,
                      tokenVerifyLoading,
                      user
                  }) =>
                    isAuthenticated && !tokenAuthLoading && !tokenVerifyLoading ? (
                        <AppLayout>
                            {/*<Navigator />*/}
                            <ErrorBoundary
                                FallbackComponent={ErrorFallback}
                                onError={() =>
                                    dispatchAppState({
                                        payload: {
                                            error: "unhandled"
                                        },
                                        type: "displayError"
                                    })
                                }
                            >
                                <Switch>
                                    <SectionRoute exact path="/" component={HomePage} />
                                    <SectionRoute path={productListPath}
                                                  permissions={[PermissionEnum.MANAGE_PRODUCTS]}
                                                  component={ProductsSectionComponent} />
                                    <SectionRoute path={categoryListPath}
                                                  permissions={[PermissionEnum.MANAGE_PRODUCTS]}
                                                  component={CategoriesSectionComponent}
                                    />

                                    <SectionRoute
                                        permissions={[PermissionEnum.MANAGE_PRODUCTS]}
                                        path={attributeSection}
                                        component={AttributeSection}
                                    />
                                    <SectionRoute
                                        permissions={[PermissionEnum.MANAGE_PRODUCTS]}
                                        path={productTypeListPath}
                                        component={ProductTypesSection}
                                    />
                                    {createConfigurationMenu(intl).filter(menu =>
                                        menu.menuItems.map(item =>
                                            hasPermission(item.permission, user)
                                        )
                                    ).length > 0 && (
                                        <SectionRoute
                                            exact
                                            path="/configuration"
                                            component={ConfigurationSection}
                                        />
                                    )}
                                    <Route component={NotFound} />
                                </Switch>
                            </ErrorBoundary>
                        </AppLayout>
                    ) : hasToken && tokenVerifyLoading ? (
                        <LoginLoading />
                    ) : (
                        <Auth hasToken={hasToken} />
                    )
                }
            </AuthProvider>
        </>
    );
};

export default Routes;