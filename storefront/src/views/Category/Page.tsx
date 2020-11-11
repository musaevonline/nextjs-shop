import React from "react";

import {Container} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Link} from "react-router-dom";
// import InfiniteScroll from 'react-infinite-scroller';
// import Loader from "@temp/components/Loader";
import {baseUrl} from "@temp/app/routes";
import {ProductList} from "@temp/components/ProductList";
import Hidden from "@material-ui/core/Hidden";
import {TUrlQuery} from "@temp/views/Category/View";
import {ProductsFilter} from "@temp/components/ProductsFilter";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {ProductsCardDetails_products} from "@sdk/queries/types/ProductsCardDetails";
import {Attributes_attributes} from "@sdk/queries/types/Attributes";
import {Category_category} from "@sdk/queries/types/Category";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import {OrderDirection, ProductOrderField} from "@temp/types/globalTypes";

const Page:React.FC<{
    products: ProductsCardDetails_products,
    category: Category_category,
    attributes: Attributes_attributes | null,
    loadMore(): Promise<void>,
    filters: TUrlQuery,
    setFilters(values: TUrlQuery):void,
    loading: boolean;
}> = ({products, category, attributes,
          loadMore, filters, setFilters, loading
      }) => {

    const handleChangeSortBy = (key: ProductOrderField | null) => {
        const field = key;
        let direction = OrderDirection.ASC;
        if (field === filters.sortBy?.field && filters.sortBy?.direction === OrderDirection.ASC){
            direction = OrderDirection.DESC;
        }
        setFilters({sortBy: field ? {field, direction} : null});
    };

    return(
        <div className="category-page">
            <Container maxWidth="xl">
                <div className="my-20">
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        <Link color="inherit" to={baseUrl}>
                            Главная
                        </Link>
                        <span>{category.name}</span>
                    </Breadcrumbs>
                </div>
                <div>
                    <div className="flex">
                        <Hidden smDown>
                            <div className="w-300 mr-40">

                                <Card>
                                    <CardContent>
                                        <ProductsFilter attributes={attributes}
                                                        filters={filters}
                                                        setFilters={setFilters}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </Hidden>
                        <div className="flex-1">
                            <Card>
                                <CardContent>
                                    <div className="mb-20">
                                        <Typography variant="h5">{category.name}</Typography>
                                        <div className="flex mt-10 items-center flex-wrap">
                                            <div className="text-gray-500 mr-10">Сортировать по: </div>
                                            <div className="flex items-center">
                                                <ButtonGroup size="small" variant="outlined">
                                                    <Button disabled={!filters.sortBy?.field}
                                                            onClick={e => handleChangeSortBy(null)}>
                                                        умолчанию
                                                    </Button>
                                                    <Button color={filters.sortBy?.field === ProductOrderField.DATE ? "primary" : "default"}
                                                            onClick={e => handleChangeSortBy(ProductOrderField.DATE)}>дате</Button>
                                                    <Button color={filters.sortBy?.field === ProductOrderField.NAME ? "primary" : "default"}
                                                            onClick={e => handleChangeSortBy(ProductOrderField.NAME)}>названию</Button>
                                                </ButtonGroup>
                                            </div>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <div className="my-20"/>
                                    <ProductList items={products.edges}/>
                                    {products.pageInfo.hasNextPage &&
                                    <div className="my-20 flex justify-center">
                                        <div className="w-512 max-w-full">
                                            <Button variant="contained"
                                                    color="primary"
                                                    onClick={loadMore}
                                                    fullWidth
                                                    disabled={loading}
                                            >
                                                Показать еще
                                            </Button>
                                        </div>
                                    </div>
                                    }
                                </CardContent>
                            </Card>

                        </div>
                    </div>

                </div>
            </Container>
        </div>
    );
};

export default Page;