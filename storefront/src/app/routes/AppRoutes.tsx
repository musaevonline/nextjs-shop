import * as React from "react";
import { Route, Switch } from "react-router-dom";

import * as paths from "./paths";
import {HomePage} from "@temp/views/Home";
import NotFound from "@temp/components/NotFound";
import {ProductDetailsPage} from "@temp/views/ProductDetails";
import {CheckoutPage} from "@temp/views/Checkout";
import {CategoryPage} from "@temp/views/Category";
import {SignUpConfirmView} from "@temp/views/Auth";
import ResetPasswordPage from "@temp/components/Auth/ResetPasswordPage";
import {UserProfileRouter} from "@temp/views/UserProfile";
import {FavoritesPage} from "@temp/views/Favorites";
import {SearchPage} from "@temp/views/Search";
import {BlogView} from "@temp/views/Blog";

export const Routes: React.FC = () => (
    <>
        <Switch>
            <Route exact path={paths.baseUrl} component={HomePage}/>
            <Route exact path={paths.categoryUrl} component={CategoryPage}/>
            <Route exact path={paths.productDetailsUrl} component={ProductDetailsPage}/>
            <Route exact path={paths.userProfileFavoritesUrl} component={FavoritesPage}/>
            <Route exact path={paths.searchUrl} component={SearchPage}/>
            <Route path={paths.checkoutUrl} component={CheckoutPage}/>

            <Route exact path={paths.signUpConfirmUrl} component={SignUpConfirmView}/>
            <Route exact path={paths.resetPasswordUrl} component={ResetPasswordPage}/>

            <Route path={paths.userPath} component={UserProfileRouter}/>
            <Route path={paths.blogPath} component={BlogView}/>

            <Route component={NotFound}/>
        </Switch>
    </>
);

export default Routes;
