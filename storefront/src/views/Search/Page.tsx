import React from "react";
import Loader from "@temp/components/Loader";
import {ProductCard} from "@temp/components/ProductCard";
import {ProductsCardDetails_products} from "@sdk/queries/types/ProductsCardDetails";
import {Container} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {Link} from "react-router-dom";
import {baseUrl} from "@temp/app/routes";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Page:React.FC<{
    products: ProductsCardDetails_products | null,
    loading: boolean,
    loadMore():void,
}> = ({products, loading, loadMore}) => {

    return(
        <div className="search-page">
            <Container maxWidth="lg">
                <div className="my-20">
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        <Link color="inherit" to={baseUrl}>
                            Главная
                        </Link>
                        <span>Поиск</span>
                    </Breadcrumbs>
                </div>
                <Typography variant="h4">Поиск</Typography>
                {loading && <Loader absolute={true}/>}
                <Card className="mt-10">
                    <CardContent>
                        <Container maxWidth="lg">
                            {products &&
                            <div
                                className="flex-1 flex-wrap grid gap-10 xs:grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

                                {products.edges.map((item, i) => {
                                    return (
                                        <div key={i} className="flex flex-col">
                                            <ProductCard item={item.node}/>
                                        </div>
                                    );
                                })
                                }
                            </div>
                            }
                            {products?.pageInfo.hasNextPage &&
                            <div className="my-20 flex justify-center">
                                <div className="w-full sm:w-512 max-w-full">
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
                            {!products && !loading &&
                            <div className="text-xl">Список пуст</div>
                            }
                        </Container>
                    </CardContent>
                </Card>
            </Container>
        </div>
    )
};

export default Page;