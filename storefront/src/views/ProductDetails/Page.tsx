import "./scss/index.scss";

import React, {useState} from "react";
import {Container} from "@material-ui/core";
import {Link} from "react-router-dom";
import { Link as ScrollLink, Element } from 'react-scroll'
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {baseUrl, getCategoryUrl} from "@temp/app/routes";
import Rating from "@material-ui/lab/Rating";
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

const Page:React.FC<{
    product: ProductDetails_product,
    addVariantToCheckoutSubmit(values: TFormProductVariantData): void,
    checkoutVariantQuantity: (selectedVariantId:string) => number,
    reviews: ProductReviews_productReviews | null,
    reviewsLoading: boolean,
    loadMoreReviews():void
}> = ({
          product, addVariantToCheckoutSubmit, checkoutVariantQuantity,
          reviews, reviewsLoading, loadMoreReviews
      }) =>{
    const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);

    const relatedProducts = product.category?.products;

    const responsive = {
        large:{
            breakpoint: { max: 3000, min: 1376 },
            items: 5,
            slidesToSlide: 5 // optional, default to 1.
        },
        desktop: {
            breakpoint: { max: 1376, min: 1024 },
            items: 4,
            slidesToSlide: 4 // optional, default to 1.
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
    };

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
                <Card className="mb-20">
                    <CardContent>
                        <div className="product-page__header">
                            <h2>{product.name}</h2>
                            <div className="product-page__rating">
                                {product.rating.count > 0 &&
                                <Rating
                                    size="medium"
                                    name="simple-controlled"
                                    defaultValue={product.rating.ratingAvg}
                                />
                                }
                                <ScrollLink href="#reviews" activeClass="active" to="reviews" smooth="easeInOutCubic" spy={true} duration={1000}>
                                    <span className="rating__title">Отзывы ({product.rating.count})</span>
                                </ScrollLink>

                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={7}>
                        <Card>
                            <CardContent>
                                <div className="product-carousel">
                                    {product.images && <ProductCarousel images={product.images}/>}
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={5}>
                        <Card>
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

                {relatedProducts?.edges.length > 0 &&
                <Card className="mt-20">
                    <CardContent>
                        <h3 className="mt-20 mb-20 text-center">Рекомендуемые товары</h3>
                        <div className="separator max-w-300"/>
                        <Carousel swipeable
                                  draggable={false}
                                  responsive={responsive}
                                  keyBoardControl
                                  customTransition="transform 300ms ease-in-out"
                                  transitionDuration={500}
                                  containerClass="carousel-container"
                                  removeArrowOnDeviceType={["tablet", "mobile"]}>
                            {relatedProducts.edges.map((item, i) => <ProductCard key={i} item={item.node}/>)}
                        </Carousel>
                    </CardContent>
                </Card>
                }
            </Container>
        </div>
    );
};

export default Page;