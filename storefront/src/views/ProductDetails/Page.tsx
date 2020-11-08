import "./scss/index.scss";

import React, {useState} from "react";
import _ from 'lodash';
import {Container} from "@material-ui/core";
import {Link} from "react-router-dom";
import { Element } from 'react-scroll'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {baseUrl, getCategoryUrl} from "@temp/app/routes";
import Grid from "@material-ui/core/Grid";
import {ProductCarousel} from "@temp/components/ProductCarousel";
import {ProductDetails} from "@temp/components/ProductDetails";
import {TFormProductVariantData} from "@temp/components/Forms/ProductVariantForm/ProductVariantForm";
import Carousel from "react-multi-carousel";
import {ProductCard} from "@temp/components/ProductCard";
import {ProductTabs} from "@temp/components/ProductTabs";
import {ProductVariant} from "@sdk/fragments/types/ProductVariant";
import {ProductDetails_product} from "@sdk/queries/types/ProductDetails";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {ProductReviews_productReviews} from "@sdk/queries/types/ProductReviews";
import Typography from "@material-ui/core/Typography";
import {CategoryProducts_category_products} from "@sdk/queries/types/CategoryProducts";

const Page:React.FC<{
    product: ProductDetails_product,
    addVariantToCheckoutSubmit(values: TFormProductVariantData): void,
    checkoutVariantQuantity: (selectedVariantId:string) => number,
    reviews: ProductReviews_productReviews | null,
    reviewsLoading: boolean,
    loadMoreReviews():void,
    categoryProducts: CategoryProducts_category_products
}> = ({
          product, addVariantToCheckoutSubmit, checkoutVariantQuantity,
          reviews, reviewsLoading, loadMoreReviews, categoryProducts
      }) =>{
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

    const relatedProducts = categoryProducts?.edges.filter(edge => edge.node.id !== product?.id);

    const responsive = {
        large:{
            breakpoint: { max: 3000, min: 1376 },
            items: 5,
            slidesToSlide: 3 // optional, default to 1.
        },
        desktop: {
            breakpoint: { max: 1376, min: 1024 },
            items: 4,
            slidesToSlide: 2 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 500 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 500, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    }

    return(
        <div className="product-page">
            <Container maxWidth="xl">
                <div className="mt-20 mb-10">
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        <Link color="inherit" to={baseUrl}>
                            Главная
                        </Link>
                        <Link color="inherit" to={getCategoryUrl(product.category.slug, product.category.id)}>
                            {product.category.name}
                        </Link>
                        <span>{product.name}</span>
                    </Breadcrumbs>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={7}>
                        <Card className="sticky top-70">
                            <CardContent>
                                <div className="product-carousel">
                                    <ProductCarousel images={!!selectedVariant?.images.length ? selectedVariant?.images : product?.images}/>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                        <Card className="sticky top-70">
                            <CardContent>
                                <ProductDetails product={product}
                                                addVariantToCheckoutSubmit={addVariantToCheckoutSubmit}
                                                selectedVariant={selectedVariant}
                                                setSelectedVariant={setSelectedVariant}
                                                selectedQuantity={selectedQuantity}
                                                setSelectedQuantity={setSelectedQuantity}
                                                checkoutVariantQuantity={checkoutVariantQuantity}
                                />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Element name="reviews" className="reviews my-10">
                    <ProductTabs product={product}
                                 reviews={reviews}
                                 reviewsLoading={reviewsLoading}
                                 loadMoreReviews={loadMoreReviews}
                    />
                </Element>

                {relatedProducts?.length > 0 &&
                <Card className="mt-20">
                    <CardContent>
                        <Typography variant="h1" className="text-center" gutterBottom>Рекомендуемые товары</Typography>
                        <div className="separator max-w-300"/>
                        <Carousel swipeable
                                  draggable={false}
                                  responsive={responsive}
                                  keyBoardControl
                                  customTransition="transform 300ms ease-in-out"
                                  transitionDuration={500}
                                  containerClass="carousel-container"
                                  removeArrowOnDeviceType={["tablet", "mobile"]}>
                            {relatedProducts.map((item, i) => <ProductCard key={i} item={item.node}/>)}
                        </Carousel>
                    </CardContent>
                </Card>
                }
            </Container>
        </div>
    );
};

export default Page;