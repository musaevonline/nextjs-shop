import React from "react";
import { parse as parseQs } from "qs";
import { useIntl } from "react-intl";
import {Route, RouteComponentProps, Switch} from "react-router-dom";

import {sectionNames} from "@temp/intl";
import {WindowTitle} from "@temp/components/WindowTitle";
import {categoryAddPath, categoryListPath, categoryPath, CategoryUrlQueryParams} from "@temp/sections/categories/urls";
import {CategoryListView} from "@temp/sections/categories/views/CategoryList";
import CategoryDetailsView, {getActiveTab} from "@temp/sections/categories/views/CategoryDetailsView";
import CategoryCreateView from "@temp/sections/categories/views/CategoryCreate";

interface CategoryCreateRouteParams {
  id: string;
}
const CategoryCreate: React.FC<RouteComponentProps<
  CategoryCreateRouteParams
>> = ({ match }) => (
  <CategoryCreateView parentId={match.params.id ? decodeURIComponent(match.params.id) : undefined}/>
);


interface CategoryDetailsRouteParams {
    id: string;
}

const CategoryDetails: React.FC<RouteComponentProps<
    CategoryDetailsRouteParams
    >> = ({ location, match }) => {
    const qs = parseQs(location.search.substr(1));
    const params: CategoryUrlQueryParams = {
        ...qs,
        activeTab: getActiveTab(qs.activeTab)
    };
    return (
        <CategoryDetailsView
            id={decodeURIComponent(match.params.id)}
            params={params}
        />
    );
};

const CategoriesSectionComponent = () => {
    const intl = useIntl();

    return (
        <>
            <WindowTitle title={intl.formatMessage(sectionNames.categories)} />
            <Switch>
                <Route exact path={categoryListPath} component={CategoryListView} />
                <Route exact path={categoryAddPath()} component={CategoryCreate} />
                <Route exact path={categoryAddPath(":id")} component={CategoryCreate} />
                <Route path={categoryPath(":id")} component={CategoryDetails} />
            </Switch>
        </>
    );
};

export default CategoriesSectionComponent;
