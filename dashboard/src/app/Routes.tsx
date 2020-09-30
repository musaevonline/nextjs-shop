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
import HomePage from "@temp/sections/home";
import NotFound from "@temp/components/NotFound";
import LoginLoading from "@temp/core/auth/components/LoginLoading";
import Auth from "@temp/core/auth";
import {productListPath} from "@temp/sections/products/urls";
import ProductsSectionComponent from "@temp/sections/products";
import {categoryListPath} from "@temp/sections/categories/urls";
import CategoriesSectionComponent from "@temp/sections/categories";
import {PermissionEnum} from "@temp/types/globalTypes";
import ConfigurationSection, {configurationMenuUrl, createConfigurationMenu} from "@temp/configuration";
import {hasPermission} from "@temp/core/auth/misc";
import AttributeSection from "@temp/sections/attributes";
import {attributeSection} from "@temp/sections/attributes/urls";
import {productTypeListPath} from "@temp/sections/productTypes/urls";
import ProductTypesSection from "@temp/sections/productTypes";
import {staffListPath} from "@temp/sections/staff/urls";
import {permissionGroupListPath} from "@temp/sections/permissionGroups/urls";
import StaffSection from "../sections/staff";
import PermissionGroupSection from "../sections/permissionGroups";
import {siteSettingsPath} from "@temp/sections/siteSettings/urls";
import SiteSettingsSection from "../sections/siteSettings";
import {customerSection} from "@temp/sections/customers/urls";
import { CustomerSection } from "../sections/customers";
import {orderListPath} from "@temp/sections/orders/urls";
import OrdersSection from "../sections/orders";
import {shippingMethodListPath} from "@temp/sections/shipping/urls";
import ShippingSection from "@temp/sections/shipping";
import {paymentMethodListPath} from "@temp/sections/paymentMethods/urls";
import PaymentMethodSection from "@temp/sections/paymentMethods";
import {blogCategoryListPath} from "@temp/sections/blog/urls/blog_category_urls";
import {blogArticleListPath} from "@temp/sections/blog/urls/blog_article_urls";
import {BlogCategoryComponent, BlogArticleComponent} from "@temp/sections/blog";
import {pageListPath} from "@temp/sections/pages/urls";
import PageSection from "@temp/sections/pages";

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
                                    <SectionRoute
                                        permissions={[PermissionEnum.MANAGE_ORDERS]}
                                        path={orderListPath}
                                        component={OrdersSection}
                                    />
                                    <SectionRoute
                                        permissions={[PermissionEnum.MANAGE_USERS]}
                                        path={customerSection}
                                        component={CustomerSection}
                                    />
                                    <SectionRoute
                                        permissions={[PermissionEnum.MANAGE_SHIPPING]}
                                        path={shippingMethodListPath}
                                        component={ShippingSection}
                                    />
                                    <SectionRoute
                                        permissions={[PermissionEnum.MANAGE_ORDERS]}
                                        path={paymentMethodListPath}
                                        component={PaymentMethodSection}
                                    />
                                    <SectionRoute
                                        permissions={[PermissionEnum.MANAGE_STAFF]}
                                        path={staffListPath}
                                        component={StaffSection}
                                    />
                                    <SectionRoute
                                        permissions={[PermissionEnum.MANAGE_STAFF]}
                                        path={permissionGroupListPath}
                                        component={PermissionGroupSection}
                                    />
                                    <SectionRoute
                                        permissions={[PermissionEnum.MANAGE_SETTINGS]}
                                        path={siteSettingsPath}
                                        component={SiteSettingsSection}
                                    />
                                    <SectionRoute path={blogCategoryListPath}
                                                  permissions={[PermissionEnum.MANAGE_BLOG]}
                                                  component={BlogCategoryComponent} />
                                    <SectionRoute path={blogArticleListPath}
                                                  permissions={[PermissionEnum.MANAGE_BLOG]}
                                                  component={BlogArticleComponent} />

                                    <SectionRoute
                                        permissions={[PermissionEnum.MANAGE_PAGES]}
                                        path={pageListPath}
                                        component={PageSection}
                                    />

                                    {createConfigurationMenu(intl).filter(menu =>
                                        menu.menuItems.map(item =>
                                            hasPermission(item.permission, user)
                                        )
                                    ).length > 0 && (
                                        <SectionRoute
                                            exact
                                            path={configurationMenuUrl}
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